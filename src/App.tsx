import { Navbar } from './components/Navbar';
import { GachaScene } from './components/GachaScene';
import { useGameStore } from './store/gameStore';

function App() {
  const { pulls, pullReward, selectedReward, isAnimating, showReward, inventory, showAllRewards, setShowAllRewards } = useGameStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-rose-200">
      <Navbar />
      
      <main className="pt-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="romantic-card">
            <div className="h-[60vh] relative">
              <GachaScene />
              
              {showReward && selectedReward && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="romantic-card p-8 max-w-md w-full text-center transform transition-all animate-fade-in">
                    {selectedReward.rarity === 'zonk' ? (
                      <div className="text-center">
                        <h2 className="romantic-text text-2xl text-gray-600 mb-4">
                          {selectedReward.name}
                        </h2>
                        <p className="text-gray-500 mb-4">{selectedReward.description}</p>
                        <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-800 text-sm">
                          ZONK
                        </span>
                      </div>
                    ) : (
                      <>
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
                      </>
                    )}
                  </div>
                </div>
              )}

              {showAllRewards && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="romantic-card p-8 max-w-4xl w-full text-center transform transition-all animate-fade-in">
                    <h2 className="romantic-text text-3xl text-rose-600 mb-6">Your Love's Mystery Rewards</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {inventory.filter(reward => reward.rarity !== 'zonk').map((reward, index) => (
                        <div key={index} className="romantic-card p-4">
                          <h3 className="romantic-text text-xl text-rose-600 mb-2">
                            {reward.name}
                          </h3>
                          <img 
                            src={reward.imageUrl} 
                            alt={reward.name}
                            className="w-full h-32 object-cover rounded-lg mb-2"
                          />
                          <p className="text-sm text-gray-700 mb-2">{reward.description}</p>
                          <div className="flex items-center justify-center gap-2">
                            <span className={`px-2 py-0.5 rounded-full text-xs ${
                              reward.rarity === 'legendary' ? 'bg-yellow-100 text-yellow-800' :
                              reward.rarity === 'epic' ? 'bg-purple-100 text-purple-800' :
                              reward.rarity === 'rare' ? 'bg-blue-100 text-blue-800' :
                              reward.rarity === 'common' ? 'bg-green-100 text-green-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {reward.rarity.toUpperCase()}
                            </span>
                            <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 text-xs">
                              {reward.type}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="mt-6 text-center">
              {pulls > 0 ? (
                <button
                  onClick={pullReward}
                  disabled={isAnimating}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isAnimating ? 'Opening...' : 'Open Love\'s Mystery Box'}
                </button>
              ) : (
                <button
                  onClick={() => setShowAllRewards(true)}
                  className="btn-primary"
                >
                  Claim All Rewards
                </button>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;