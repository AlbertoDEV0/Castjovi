import { Lock, Star, Check } from 'lucide-react';
import { Collection } from '../context/AppContext';
import { useApp } from '../context/AppContext';
import { toast } from 'sonner';

interface CollectionCardProps {
  collection: Collection;
  onSelect: () => void;
}

const themeEmojis = {
  savana: '🦁',
  mar: '🐠',
  jungla: '🐒',
};

const themeGradients = {
  savana: 'rgba(255, 221, 0, 0.3)',
  mar: 'rgba(0, 161, 232, 0.3)',
  jungla: 'rgba(132, 204, 22, 0.3)',
};

const themeShadows = {
  savana: '0 8px 32px rgba(255, 221, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.5), 0 1px 0 rgba(255, 255, 255, 0.3)',
  mar: '0 8px 32px rgba(0, 161, 232, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.5), 0 1px 0 rgba(255, 255, 255, 0.3)',
  jungla: '0 8px 32px rgba(132, 204, 22, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.5), 0 1px 0 rgba(255, 255, 255, 0.3)',
};

const themeBorders = {
  savana: '1px solid rgba(255, 221, 0, 0.4)',
  mar: '1px solid rgba(0, 161, 232, 0.4)',
  jungla: '1px solid rgba(132, 204, 22, 0.4)',
};

export function CollectionCard({ collection, onSelect }: CollectionCardProps) {
  const { unlockCollection } = useApp();

  const handleUnlock = (e: React.MouseEvent) => {
    e.stopPropagation();
    const success = unlockCollection(collection.id);
    if (success) {
      toast.success(`¡Col·lecció ${collection.name} desbloquejada!`);
    } else {
      toast.error('No tens suficients estrelles');
    }
  };

  const completedCount = collection.figures.filter(f => f.completed).length;
  const totalCount = collection.figures.length;
  const isComplete = completedCount === totalCount;

  return (
    <div
      onClick={collection.unlocked ? onSelect : undefined}
      className={`relative aspect-square rounded-[2rem] overflow-hidden transition-all duration-200 ${
        collection.unlocked ? 'hover:translate-y-[-8px] active:translate-y-1 cursor-pointer' : ''
      }`}
      style={{ 
        background: themeGradients[collection.theme],
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        boxShadow: themeShadows[collection.theme],
        border: themeBorders[collection.theme],
      }}
    >
      {/* Brillo superior */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent"></div>

      {/* Contenido */}
      <div className="absolute inset-0 p-8 flex flex-col items-center justify-center">
        <div className="text-9xl mb-6 filter drop-shadow-2xl transform transition-transform duration-300 group-hover:scale-110">
          {themeEmojis[collection.theme]}
        </div>
        <h3 className="text-4xl font-black text-white mb-3 text-center" style={{ textShadow: '3px 3px 8px rgba(0,0,0,0.4)' }}>
          {collection.name}
        </h3>

        {collection.unlocked ? (
          <>
            <div 
              className="px-6 py-2 rounded-full mt-2"
              style={{
                background: 'rgba(255, 255, 255, 0.3)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <span className="text-2xl font-black text-white" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
                {completedCount}/{totalCount} completades
              </span>
            </div>
            {isComplete && (
              <div 
                className="absolute top-6 right-6 p-4 rounded-full"
                style={{
                  background: 'linear-gradient(145deg, #10B981, #059669)',
                  boxShadow: '0 4px 0 #047857, 0 6px 15px rgba(16, 185, 129, 0.4)',
                }}
              >
                <Check className="size-8 text-white" />
              </div>
            )}
          </>
        ) : (
          <>
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
              <Lock className="size-32 text-white/90 drop-shadow-2xl" />
            </div>
            <button
              onClick={handleUnlock}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 px-8 py-4 rounded-full font-black transition-all duration-200 hover:translate-y-[-4px] active:translate-y-1 z-10"
              style={{
                background: 'rgba(255, 255, 255, 0.3)',
                backdropFilter: 'blur(20px) saturate(180%)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.5), 0 1px 0 rgba(255, 255, 255, 0.3)',
                border: '1px solid rgba(255, 255, 255, 0.4)',
              }}
            >
              <Star className="size-7 fill-[#FFD700] text-[#FFD700]" />
              <span className="text-2xl text-white" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>{collection.cost}</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
}