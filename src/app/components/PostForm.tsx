import { useState } from 'react';
import { X, Check, Image as ImageIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { toast } from 'sonner';
import { useApp } from '../context/AppContext';

interface PostFormProps {
  onClose: () => void;
  onSubmit: (title: string, description: string, imageUrl: string) => void;
}

export function PostForm({ onClose, onSubmit }: PostFormProps) {
  const { userPhotos, dailyChallenge, monthlyChallenge, collections, userProfile } = useApp();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Agrupar todas las fotos disponibles desde Tu Álbum
  const allAlbumPhotos = [
    // Foto del reto diario si existe
    ...(dailyChallenge.imageUrl ? [{
      id: dailyChallenge.id,
      imageUrl: dailyChallenge.imageUrl,
      title: dailyChallenge.title,
    }] : []),
    // Foto del reto mensual si existe
    ...(monthlyChallenge.imageUrl ? [{
      id: monthlyChallenge.id,
      imageUrl: monthlyChallenge.imageUrl,
      title: monthlyChallenge.title,
    }] : []),
    // Fotos de colecciones
    ...collections.flatMap(collection =>
      collection.figures
        .filter(figure => figure.completed && figure.imageUrl)
        .map(figure => ({
          id: `${collection.id}-${figure.id}`,
          imageUrl: figure.imageUrl!,
          title: `${figure.name} - ${collection.name}`,
        }))
    ),
    // Fotos del usuario
    ...userPhotos.map(photo => ({
      id: photo.id,
      imageUrl: photo.imageUrl,
      title: photo.title,
    })),
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !description.trim()) {
      toast.error('Has d\'omplir tots els camps');
      return;
    }

    if (!selectedImage) {
      toast.error('Has de seleccionar una imatge del teu àlbum');
      return;
    }

    if (description.length > 225) {
      toast.error('La descripció no pot superar els 225 caràcters');
      return;
    }

    onSubmit(title, description, selectedImage);
    toast.success('Post enviat! Revisarem la teva creació aviat 🎨');
    onClose();
  };

  const charsLeft = 225 - description.length;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.6)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="rounded-[2.5rem] overflow-hidden max-w-3xl w-full relative"
        style={{
          background: 'linear-gradient(145deg, #ffffff, #f5f5f5)',
          boxShadow: '0 10px 0 #d0d0d0, 0 15px 50px rgba(0, 0, 0, 0.3)',
        }}
      >
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-10 p-3 rounded-full transition-all hover:scale-110"
          style={{
            background: 'linear-gradient(145deg, #ff0046, #ff4570)',
            boxShadow: '0 4px 0 #d12456, 0 6px 15px rgba(255, 0, 70, 0.3)',
          }}
        >
          <X className="size-8 text-white" />
        </button>

        <div className="p-10">
          <h2 
            className="text-4xl font-black mb-8 text-center"
            style={{
              color: '#ff8000',
            }}
          >
            Comparteix la teva creació! 📸
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Selector de imagen del álbum */}
            <div>
              <label className="text-2xl font-black text-gray-800 mb-4 block">
                Selecciona una imatge del teu àlbum
              </label>
              {allAlbumPhotos.length > 0 ? (
                <div className="grid grid-cols-4 gap-3 max-h-80 overflow-y-auto p-4 rounded-2xl" style={{
                  background: 'linear-gradient(145deg, #f9f9f9, #f3f3f3)',
                  boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.1)',
                }}>
                  {allAlbumPhotos.map((photo) => (
                    <button
                      key={photo.id}
                      type="button"
                      onClick={() => setSelectedImage(photo.imageUrl)}
                      className="aspect-square rounded-xl overflow-hidden transition-all duration-200 hover:scale-105 relative group"
                      style={{
                        border: selectedImage === photo.imageUrl ? '4px solid #00a1e8' : '2px solid rgba(200, 200, 200, 0.4)',
                        boxShadow: selectedImage === photo.imageUrl 
                          ? '0 0 20px rgba(0, 161, 232, 0.6)' 
                          : '0 4px 8px rgba(0, 0, 0, 0.1)',
                      }}
                    >
                      <img
                        src={photo.imageUrl}
                        alt={photo.title}
                        className="w-full h-full object-cover"
                      />
                      {selectedImage === photo.imageUrl && (
                        <div 
                          className="absolute inset-0 flex items-center justify-center"
                          style={{
                            background: 'rgba(0, 161, 232, 0.3)',
                          }}
                        >
                          <div 
                            className="w-12 h-12 rounded-full flex items-center justify-center"
                            style={{
                              background: 'linear-gradient(145deg, #00a1e8, #4ab8f0)',
                              boxShadow: '0 4px 0 #0086c3',
                            }}
                          >
                            <Check className="size-8 text-white" />
                          </div>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 rounded-2xl" style={{
                  background: 'linear-gradient(145deg, #f9f9f9, #f3f3f3)',
                }}>
                  <ImageIcon className="size-16 text-gray-400 mx-auto mb-3" />
                  <p className="text-xl font-black text-gray-400">El teu àlbum està buit</p>
                  <p className="text-base text-gray-500 font-semibold mt-1">
                    Completa reptes per afegir fotos!
                  </p>
                </div>
              )}
            </div>

            {/* Título */}
            <div>
              <label className="text-2xl font-black text-gray-800 mb-2 block">
                Títol
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Dona-li un títol a la teva creació..."
                maxLength={50}
                className="w-full px-6 py-4 rounded-full text-xl font-semibold focus:outline-none"
                style={{
                  background: 'linear-gradient(145deg, #ffffff, #f9f9f9)',
                  boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.1)',
                }}
              />
            </div>

            {/* Descripción */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-2xl font-black text-gray-800">
                  Descripció
                </label>
                <span 
                  className={`text-lg font-black ${charsLeft < 50 ? 'text-red-500' : 'text-gray-500'}`}
                >
                  {charsLeft} caràcters restants
                </span>
              </div>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Explica'ns com has fet la teva figura..."
                maxLength={225}
                rows={4}
                className="w-full px-6 py-4 rounded-3xl text-xl font-semibold focus:outline-none resize-none"
                style={{
                  background: 'linear-gradient(145deg, #ffffff, #f9f9f9)',
                  boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.1)',
                }}
              />
            </div>

            {/* Aviso de moderación */}
            <div 
              className="p-4 rounded-2xl"
              style={{
                background: 'rgba(132, 204, 22, 0.1)',
                border: '2px solid #84cc16',
              }}
            >
              <p className="text-base font-semibold text-gray-700 text-center">
                ℹ️ El teu post serà revisat per un adult abans de publicar-se per garantir un entorn segur
              </p>
            </div>

            {/* Botón enviar */}
            <button
              type="submit"
              className="w-full py-5 rounded-full text-3xl font-black transition-all duration-200 hover:translate-y-[-4px] active:translate-y-1"
              style={{
                background: 'linear-gradient(145deg, #84cc16, #a3e635)',
                color: 'white',
                boxShadow: '0 8px 0 #65a30d, 0 12px 25px rgba(132, 204, 22, 0.4)',
                textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
              }}
            >
              Enviar Post
            </button>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
}