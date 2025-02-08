import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Reward, REWARDS } from '../types';

interface GameState {
  pulls: number;
  inventory: Reward[];
  selectedReward: Reward | null;
  isAnimating: boolean;
  setPulls: (pulls: number) => void;
  addToInventory: (reward: Reward) => void;
  setSelectedReward: (reward: Reward | null) => void;
  setIsAnimating: (isAnimating: boolean) => void;
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
      setPulls: (pulls) => set({ pulls }),
      addToInventory: (reward) => set((state) => ({ 
        inventory: [...state.inventory, reward],
        pulls: state.pulls - 1
      })),
      setSelectedReward: (reward) => set({ selectedReward: reward }),
      setIsAnimating: (isAnimating) => set({ isAnimating }),
      pullReward: () => {
        const { pulls, addToInventory, setSelectedReward, setIsAnimating } = get();
        
        if (pulls > 0) {
          setIsAnimating(true);
          const rarity = getRarityByChance();
          const reward = getRandomRewardByRarity(rarity);
          
          setTimeout(() => {
            if (rarity === 'zonk') {
              setSelectedReward(null);
            } else {
              setSelectedReward(reward);
              addToInventory(reward);
            }
            setIsAnimating(false);
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