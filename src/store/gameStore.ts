import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Reward, REWARDS } from '../types';

interface GameState {
  pulls: number;
  inventory: Reward[];
  selectedReward: Reward | null;
  isAnimating: boolean;
  showReward: boolean;
  showAllRewards: boolean;
  setPulls: (pulls: number) => void;
  addToInventory: (reward: Reward) => void;
  setSelectedReward: (reward: Reward | null) => void;
  setIsAnimating: (isAnimating: boolean) => void;
  setShowReward: (show: boolean) => void;
  setShowAllRewards: (show: boolean) => void;
  pullReward: () => void;
}

const getRarityByChance = (): Reward['rarity'] => {
  const chance = Math.random() * 100;
  if (chance < 35) return 'zonk';
  if (chance < 60) return 'common';
  if (chance < 80) return 'rare';
  if (chance < 95) return 'epic';
  return 'legendary';
};

const getRandomRewardByRarity = (rarity: Reward['rarity']): Reward => {
  const rarityRewards = REWARDS.filter(reward => reward.rarity === rarity);
  const randomIndex = Math.floor(Math.random() * rarityRewards.length);
  return rarityRewards[randomIndex];
};

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      pulls: 10,
      inventory: [],
      selectedReward: null,
      isAnimating: false,
      showReward: false,
      showAllRewards: false,
      setPulls: (pulls) => set({ pulls }),
      addToInventory: (reward) => set((state) => ({ 
        inventory: [...state.inventory, reward]
      })),
      setSelectedReward: (reward) => set({ selectedReward: reward }),
      setIsAnimating: (isAnimating) => set({ isAnimating }),
      setShowReward: (show) => set({ showReward: show }),
      setShowAllRewards: (show) => set({ showAllRewards: show }),
      pullReward: () => {
        const { pulls } = get();
        
        if (pulls > 0) {
          // 1. Start animation and hide any previous reward
          set({ 
            isAnimating: true, 
            showReward: false,
            selectedReward: null,
            showAllRewards: false
          });
          
          // Decrease pulls immediately
          set(state => ({ pulls: state.pulls - 1 }));
          
          // 2. Get the reward
          const rarity = getRarityByChance();
          const reward = getRandomRewardByRarity(rarity);
          
          // 3. After box opening animation (2 seconds)
          setTimeout(() => {
            set({ isAnimating: false });
            
            // 4. Show reward after a short delay
            setTimeout(() => {
              set({ 
                selectedReward: reward,
                showReward: true
              });
              
              // Only add non-zonk rewards to inventory
              if (reward.rarity !== 'zonk') {
                set(state => ({ 
                  inventory: [...state.inventory, reward]
                }));
              }
            }, 500);
          }, 2000);
        }
      },
    }),
    {
      name: 'love-mystery-storage',
      partialize: (state) => ({ 
        pulls: state.pulls,
        inventory: state.inventory
      })
    }
  )
);