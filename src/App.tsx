import React from 'react';
import { Navbar } from './components/Navbar';
import { GachaScene } from './components/GachaScene';
import { useGameStore } from './store/gameStore';

function App() {
  const { pulls, pullReward, selectedReward, isAnimating } = useGameStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-rose-200">
      <Navbar />
      
      <main className="pt-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="romantic-card">
            <div className="h-[60vh] relative">
              <GachaScene />
              
              {!isAnimating && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm">
                  {selectedReward ? (
                    <div className="romantic-card p-8 max-w-md w-full text-center transform transition-all animate-fade-in">
                      <h2 className="romantic-text text-2xl text-rose-600 mb-4">
                        {selectedReward.name}
                      </h2>
                      <img 
                        src={selectedReward.imageUrl} 
                        alt={selectedReward.name}
                        className="w-full h-48 object-cover rounded-lg mb-4"
                      />
                      <p className="text-gray-700 mb-4">{selectedReward.description}</p>
                      <div className="flex items-center justify-center gap-2 mb-4">
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          selectedReward.rarity === 'legendary' ? 'bg-yellow-100 text-yellow-800' :
                          selectedReward.rarity === 'epic' ? 'bg-purple-100 text-purple-800' :
                          selectedReward.rarity === 'rare' ? 'bg-blue-100 text-blue-800' :
                          selectedReward.rarity === 'common' ? 'bg-green-100 text-green-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {selectedReward.rarity.toUpperCase()}
                        </span>
                        <span className="px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-sm">
                          {selectedReward.type}
                        </span>
                      </div>
                    </div>
                  ) : pulls > 0 ? (
                    <div className="text-center text-white">
                      <h2 className="romantic-text text-3xl mb-4">Belum Beruntung!</h2>
                      <p className="text-lg opacity-80">Jangan menyerah, coba lagi!</p>
                    </div>
                  ) : null}
                </div>
              )}
            </div>
            
            <div className="mt-6 text-center">
              <button
                onClick={pullReward}
                disabled={pulls <= 0 || isAnimating}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isAnimating ? 'Opening...' : 'Open Love\'s Mystery Box'}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;