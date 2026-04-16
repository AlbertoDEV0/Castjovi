import { useApp } from '../context/AppContext';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ZoomIn } from 'lucide-react';

export function MyAlbum() {
  const { userPhotos, dailyChallenge, monthlyChallenge, collections } = useApp();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Agrupar todas las fotos disponibles
  const allPhotos = [
    // Foto del reto diario si existe
    ...(dailyChallenge.imageUrl ? [{
      id: dailyChallenge.id,
      imageUrl: dailyChallenge.imageUrl,
      title: dailyChallenge.title,
      type: 'daily' as const,
      date: dailyChallenge.date,
    }] : []),
    // Foto del reto mensual si existe
    ...(monthlyChallenge.imageUrl ? [{
      id: monthlyChallenge.id,
      imageUrl: monthlyChallenge.imageUrl,
      title: monthlyChallenge.title,
      type: 'monthly' as const,
      date: monthlyChallenge.date,
    }] : []),
    // Fotos de colecciones
    ...collections.flatMap(collection =>
      collection.figures
        .filter(figure => figure.completed && figure.imageUrl)
        .map(figure => ({
          id: `${collection.id}-${figure.id}`,
          imageUrl: figure.imageUrl!,
          title: `${figure.name} - ${collection.name}`,
          type: 'collection' as const,
          date: new Date(),
          collectionId: collection.id,
          figureId: figure.id,
        }))
    ),
    // Fotos del usuario
    ...userPhotos,
  ];

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'daily':
        return 'Repte Diari';
      case 'monthly':
        return 'Repte Mensual';
      case 'collection':
        return 'Col·lecció';
      default:
        return '';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'daily':
        return 'rgba(0, 161, 232, 0.4)';
      case 'monthly':
        return 'rgba(255, 0, 70, 0.4)';
      case 'collection':
        return 'rgba(132, 204, 22, 0.4)';
      default:
        return 'rgba(255, 255, 255, 0.4)';
    }
  };

  if (allPhotos.length === 0) {
    return (
      <div 
        className="text-center p-20 rounded-[2rem]"
        style={{
          background: 'rgba(255, 255, 255, 0.35)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.5)',
          border: '1px solid rgba(255, 255, 255, 0.4)',
        }}
      >
        <p className="text-3xl font-black text-gray-600">
          Encara no tens fotos al teu àlbum 📷
        </p>
        <p className="text-xl text-gray-500 font-semibold mt-4">
          Completa repts i col·leccions per afegir fotos!
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-4 gap-8">
        {allPhotos.map((photo) => (
          <button
            key={photo.id}
            onClick={() => setSelectedImage(photo.imageUrl)}
            className="group relative rounded-[2rem] overflow-hidden transition-all duration-300 hover:translate-y-[-8px] hover:scale-[1.02] text-left"
            style={{
              background: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.4)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
            }}
          >
            {/* Imagen */}
            <div className="w-full aspect-square overflow-hidden bg-gray-100 relative">
              <img
                src={photo.imageUrl}
                alt={photo.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <ZoomIn className="size-16 text-white" />
              </div>
            </div>

            {/* Info */}
            <div className="p-6">
              <div 
                className="inline-block px-4 py-1.5 rounded-full mb-3"
                style={{
                  background: getTypeColor(photo.type),
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                }}
              >
                <span className="text-sm font-black text-white" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.2)' }}>
                  {getTypeLabel(photo.type)}
                </span>
              </div>
              <p className="text-xl font-black text-gray-800 line-clamp-2 leading-tight">
                {photo.title}
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* Modal de vista ampliada */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-8 bg-black/90 backdrop-blur-md"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl max-h-full"
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-6 -right-6 p-5 rounded-full transition-all hover:scale-110 z-10"
                style={{
                  background: 'linear-gradient(145deg, #ff0046, #ff4570)',
                  boxShadow: '0 6px 0 #d12456, 0 10px 20px rgba(255, 0, 70, 0.4)',
                }}
              >
                <X className="size-10 text-white" />
              </button>
              <img
                src={selectedImage}
                alt="Vista ampliada"
                className="rounded-[3rem] max-w-full max-h-[85vh] object-contain"
                style={{
                  boxShadow: '0 30px 100px rgba(0, 0, 0, 0.8)',
                  border: '8px solid white',
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
