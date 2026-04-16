import { useState } from 'react';
import { Check, X, Camera } from 'lucide-react';
import { Collection } from '../context/AppContext';
import { useApp } from '../context/AppContext';
import { toast } from 'sonner';
import { ImageSourceSelector } from './ImageSourceSelector';

interface CollectionDetailProps {
  collection: Collection;
}

const themeGradients = {
  savana: 'linear-gradient(145deg, #ffdd00, #ffe747)',
  mar: 'linear-gradient(145deg, #00a1e8, #4ab8f0)',
  jungla: 'linear-gradient(145deg, #84cc16, #a3e635)',
};

const themeShadows = {
  savana: '0 8px 0 #d4b800, 0 12px 25px rgba(255, 221, 0, 0.4)',
  mar: '0 8px 0 #0086c3, 0 12px 25px rgba(0, 161, 232, 0.4)',
  jungla: '0 8px 0 #65a30d, 0 12px 25px rgba(132, 204, 22, 0.4)',
};

export function CollectionDetail({ collection }: CollectionDetailProps) {
  const { completeFigureInCollection } = useApp();
  const [selectedFigure, setSelectedFigure] = useState<string | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  const handleImageCapture = (image: string) => {
    setCapturedImage(image);
  };

  const handleComplete = () => {
    if (selectedFigure && capturedImage) {
      completeFigureInCollection(collection.id, selectedFigure, capturedImage);
      toast.success('¡Figura completada! +5 estrelles');
      setSelectedFigure(null);
      setCapturedImage(null);
    }
  };

  const completedCount = collection.figures.filter(f => f.completed).length;
  const totalCount = collection.figures.length;
  const progress = (completedCount / totalCount) * 100;

  return (
    <div className="max-w-7xl mx-auto relative z-10">
      {/* Header de la colección */}
      <div
        className="rounded-[2rem] p-10 mb-10"
        style={{ 
          background: themeGradients[collection.theme],
          boxShadow: themeShadows[collection.theme],
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-[2rem]"></div>
        <h2 className="relative text-6xl font-black text-white text-center mb-6" style={{ textShadow: '4px 4px 10px rgba(0,0,0,0.4)' }}>
          Col·lecció {collection.name} 🎨
        </h2>
        <div 
          className="relative h-10 rounded-full overflow-hidden"
          style={{
            background: 'rgba(255, 255, 255, 0.3)',
            boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.2)',
          }}
        >
          <div
            className="h-full flex items-center justify-center transition-all duration-500"
            style={{ 
              width: `${progress}%`,
              background: 'linear-gradient(145deg, #10B981, #059669)',
              boxShadow: '0 2px 8px rgba(16, 185, 129, 0.4)',
            }}
          >
            {progress > 0 && (
              <span className="text-white font-black text-lg" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
                {completedCount}/{totalCount}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Modal de captura */}
      {selectedFigure && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-8 animate-in fade-in duration-200">
          <div 
            className="rounded-[2rem] p-10 max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            style={{
              background: 'linear-gradient(145deg, #ffffff, #f5f5f5)',
              boxShadow: '0 10px 0 #d0d0d0, 0 20px 50px rgba(0, 0, 0, 0.3)',
            }}
          >
            <div className="flex items-center justify-between mb-8">
              <h3 
                className="text-4xl font-black"
                style={{
                  color: '#ff8000',
                }}
              >
                {collection.figures.find(f => f.id === selectedFigure)?.name}
              </h3>
              <button
                onClick={() => {
                  setSelectedFigure(null);
                  setCapturedImage(null);
                }}
                className="p-3 rounded-full transition-all duration-200 hover:translate-y-[-2px] active:translate-y-0"
                style={{
                  background: 'linear-gradient(145deg, #9CA3AF, #6B7280)',
                  boxShadow: '0 4px 0 #4B5563, 0 6px 15px rgba(156, 163, 175, 0.4)',
                }}
              >
                <X className="size-8 text-white" />
              </button>
            </div>

            {!capturedImage ? (
              <div className="flex flex-col items-center">
                <ImageSourceSelector
                  onImageSelected={handleImageCapture}
                  title="Selecciona o fes una foto"
                />
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <div 
                  className="w-full rounded-[2rem] overflow-hidden mb-8"
                  style={{
                    boxShadow: '0 8px 0 #d0d0d0, 0 12px 30px rgba(0, 0, 0, 0.2)',
                  }}
                >
                  <img
                    src={capturedImage}
                    alt="Captured figure"
                    className="w-full h-auto"
                  />
                </div>
                
                <div className="flex gap-6">
                  <button
                    onClick={() => setCapturedImage(null)}
                    className="px-8 py-4 rounded-full text-xl font-black transition-all duration-200 hover:translate-y-[-4px] active:translate-y-1"
                    style={{
                      background: 'linear-gradient(145deg, #9CA3AF, #6B7280)',
                      color: 'white',
                      boxShadow: '0 6px 0 #4B5563, 0 10px 20px rgba(156, 163, 175, 0.4)',
                      textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                    }}
                  >
                    Repetir
                  </button>
                  <button
                    onClick={handleComplete}
                    className="flex items-center gap-3 px-8 py-4 rounded-full text-xl font-black transition-all duration-200 hover:translate-y-[-4px] active:translate-y-1"
                    style={{
                      background: 'linear-gradient(145deg, #84cc16, #a3e635)',
                      color: 'white',
                      boxShadow: '0 6px 0 #65a30d, 0 10px 20px rgba(132, 204, 22, 0.4)',
                      textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                    }}
                  >
                    <Check className="size-8" />
                    Completar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Grid de figuras */}
      <div className="grid grid-cols-4 gap-8">
        {collection.figures.map((figure) => (
          <button
            key={figure.id}
            onClick={() => !figure.completed && setSelectedFigure(figure.id)}
            disabled={figure.completed}
            className="relative aspect-square rounded-[2rem] overflow-hidden transition-all duration-200 hover:translate-y-[-8px] active:translate-y-1 disabled:hover:translate-y-0 disabled:cursor-default"
            style={{
              background: figure.completed 
                ? 'linear-gradient(145deg, #E5E7EB, #D1D5DB)' 
                : 'linear-gradient(145deg, #F9FAFB, #E5E7EB)',
              boxShadow: figure.completed
                ? '0 8px 0 #9CA3AF, 0 12px 25px rgba(156, 163, 175, 0.3)'
                : '0 8px 0 #D1D5DB, 0 12px 25px rgba(229, 231, 235, 0.4)',
            }}
          >
            {figure.completed && figure.imageUrl ? (
              <>
                <img
                  src={figure.imageUrl}
                  alt={figure.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-6">
                  <h4 className="text-white font-black text-2xl" style={{ textShadow: '2px 2px 6px rgba(0,0,0,0.6)' }}>
                    {figure.name}
                  </h4>
                </div>
                <div 
                  className="absolute top-4 right-4 p-3 rounded-full"
                  style={{
                    background: 'linear-gradient(145deg, #10B981, #059669)',
                    boxShadow: '0 4px 0 #047857, 0 6px 15px rgba(16, 185, 129, 0.4)',
                  }}
                >
                  <Check className="size-8 text-white" />
                </div>
              </>
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col items-center justify-center p-6">
                <div className="text-7xl mb-6 opacity-40">❓</div>
                <h4 className="text-gray-700 font-black text-2xl text-center mb-4">
                  {figure.name}
                </h4>
                {!figure.completed && (
                  <div 
                    className="p-3 rounded-full"
                    style={{
                      background: 'linear-gradient(145deg, #00a1e8, #4ab8f0)',
                      boxShadow: '0 4px 0 #0086c3, 0 6px 15px rgba(0, 161, 232, 0.3)',
                    }}
                  >
                    <Camera className="size-10 text-white" />
                  </div>
                )}
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}