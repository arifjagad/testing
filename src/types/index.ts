export interface Reward {
  id: number;
  name: string;
  description: string;
  type: 'voucher' | 'gift' | 'special';
  rarity: 'zonk' | 'common' | 'rare' | 'epic' | 'legendary';
  value: number;
  imageUrl: string;
  animation: {
    particleColor: string;
    effectType: 'hearts' | 'sparkles' | 'petals' | 'stars';
  };
}

export const REWARDS: Reward[] = [
  // Zonk Rewards (35%)
  {
    id: 1,
    name: "Better Luck Next Time",
    description: "Don't give up! Love is all about trying again.",
    type: "special",
    rarity: "zonk",
    value: 0,
    imageUrl: "https://images.unsplash.com/photo-1516478177764-9fe5bd7e9717",
    animation: {
      particleColor: "#808080",
      effectType: "hearts"
    }
  },
  {
    id: 2,
    name: "Empty Love Letter",
    description: "A blank canvas waiting for your love story.",
    type: "special",
    rarity: "zonk",
    value: 0,
    imageUrl: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461",
    animation: {
      particleColor: "#C0C0C0",
      effectType: "petals"
    }
  },
  // Common Rewards (25%)
  {
    id: 3,
    name: "Movie Night Special",
    description: "VIP cinema experience with dinner and drinks",
    type: "voucher",
    rarity: "common",
    value: 50,
    imageUrl: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba",
    animation: {
      particleColor: "#FFC0CB",
      effectType: "sparkles"
    }
  },
  {
    id: 4,
    name: "Love Letter Writing Kit",
    description: "Premium stationery set with romantic designs",
    type: "gift",
    rarity: "common",
    value: 30,
    imageUrl: "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0",
    animation: {
      particleColor: "#FFE4E1",
      effectType: "hearts"
    }
  },
  // Rare Rewards (20%)
  {
    id: 5,
    name: "Dance Class Package",
    description: "Private dance lessons for couples",
    type: "voucher",
    rarity: "rare",
    value: 100,
    imageUrl: "https://images.unsplash.com/photo-1509670572852-5823184def8c",
    animation: {
      particleColor: "#DDA0DD",
      effectType: "sparkles"
    }
  },
  {
    id: 6,
    name: "Spa Day Package",
    description: "A relaxing couples spa day with massage and treatments",
    type: "gift",
    rarity: "rare",
    value: 120,
    imageUrl: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874",
    animation: {
      particleColor: "#FFB6C1",
      effectType: "petals"
    }
  },
  // Epic Rewards (15%)
  {
    id: 7,
    name: "Romantic Dinner Voucher",
    description: "An intimate candlelit dinner for two at a luxury restaurant",
    type: "voucher",
    rarity: "epic",
    value: 150,
    imageUrl: "https://images.unsplash.com/photo-1529516548873-9ce57c8f155e",
    animation: {
      particleColor: "#FF69B4",
      effectType: "hearts"
    }
  },
  {
    id: 8,
    name: "Romantic Photoshoot Session",
    description: "Professional couple photoshoot with luxury album",
    type: "special",
    rarity: "epic",
    value: 180,
    imageUrl: "https://images.unsplash.com/photo-1533747732305-ea76764c3f8f",
    animation: {
      particleColor: "#FF1493",
      effectType: "sparkles"
    }
  },
  // Legendary Rewards (5%)
  {
    id: 9,
    name: "Sunset Cruise Experience",
    description: "Romantic evening cruise with champagne",
    type: "special",
    rarity: "legendary",
    value: 200,
    imageUrl: "https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6",
    animation: {
      particleColor: "#FFD700",
      effectType: "stars"
    }
  },
  {
    id: 10,
    name: "Luxury Weekend Getaway",
    description: "Two nights at a 5-star romantic resort",
    type: "special",
    rarity: "legendary",
    value: 500,
    imageUrl: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4",
    animation: {
      particleColor: "#FFA500",
      effectType: "stars"
    }
  }
];

export type RewardId = Reward['id'];

// Helper function to get reward by ID
export const getRewardById = (id: RewardId): Reward | undefined => {
  return REWARDS.find(reward => reward.id === id);
};