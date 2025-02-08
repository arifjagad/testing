import React from 'react';
import { Heart } from 'lucide-react';
import { useGameStore } from '../store/gameStore';

export function Navbar() {
  const pulls = useGameStore((state) => state.pulls);

  return (
    <nav className="fixed top-0 w-full px-6 py-4 bg-white/80 backdrop-blur-sm border-b border-rose-100">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Heart className="text-rose-500" size={24} />
          <h1 className="romantic-text text-2xl text-rose-600">Love's Mystery</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="romantic-card px-4 py-2">
            <span className="text-rose-600 font-semibold">{pulls} Pulls Left</span>
          </div>
        </div>
      </div>
    </nav>
  );
}