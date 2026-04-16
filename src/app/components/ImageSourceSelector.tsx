import { useState, useRef } from 'react';
import { Upload, Camera, Image as ImageIcon, Check, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';
import { useApp } from '../context/AppContext';

interface ImageSourceSelectorProps {
  onImageSelected: (imageUrl: string, photoId?: string) => void;
  showAlbumOption?: boolean;
  title?: string;
  className?: string;
}

export function ImageSourceSelector({ 
  onImageSelected, 
  showAlbumOption = true,
  title = 'Selecciona una imatge',
  className = ''
}: ImageSourceSelectorProps) {
  const { userPhotos, dailyChallenge, monthlyChallenge, collections } = useApp();
  const [showAlbumModal, setShowAlbumModal] = useState(false);
  const [showCameraModal, setShowCameraModal] = useState(false);
  const [selectedAlbumImage, setSelectedAlbumImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

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

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result as string;
        onImageSelected(imageUrl);
        toast.success('Imatge carregada correctament! 📸');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCameraCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      setCameraStream(stream);
      setShowCameraModal(true);
      
      // Esperar a que el video esté listo
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      }, 100);
    } catch (error) {
      console.error('Error accessing camera:', error);
      toast.error('No s\'ha pogut accedir a la càmera');
      // Fallback a input file con capture
      cameraInputRef.current?.click();
    }
  };

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0);
        const imageUrl = canvas.toDataURL('image/jpeg');
        onImageSelected(imageUrl);
        toast.success('Foto capturada! 📸');
        closeCameraModal();
      }
    }
  };

  const closeCameraModal = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
    }
    setShowCameraModal(false);
  };

  const handleAlbumSelect = () => {
    if (allAlbumPhotos.length === 0) {
      toast.error('El teu àlbum està buit. Completa reptes primer!');
      return;
    }
    setShowAlbumModal(true);
  };

  const confirmAlbumSelection = () => {
    if (selectedAlbumImage) {
      const photo = allAlbumPhotos.find(p => p.imageUrl === selectedAlbumImage);
      onImageSelected(selectedAlbumImage, photo?.id);
      toast.success('Imatge seleccionada del teu àlbum! ✨');
      setShowAlbumModal(false);
      setSelectedAlbumImage(null);
    }
  };

  return (
    <div className={className}>
      <h3 className="text-2xl font-black text-gray-800 mb-4">{title}</h3>
      
      <div className="grid grid-cols-3 gap-4">
        {/* Botón: Subir desde archivos */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="p-6 rounded-2xl transition-all duration-200 hover:translate-y-[-4px] active:translate-y-1 flex flex-col items-center gap-3"
          style={{
            background: 'linear-gradient(145deg, #00a1e8, #4ab8f0)',
            boxShadow: '0 6px 0 #0086c3, 0 8px 20px rgba(0, 161, 232, 0.3)',
          }}
        >
          <Upload className="size-12 text-white" />
          <span className="text-lg font-black text-white text-center" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
            Pujar arxiu
          </span>
        </button>

        {/* Botón: Cámara */}
        <button
          type="button"
          onClick={handleCameraCapture}
          className="p-6 rounded-2xl transition-all duration-200 hover:translate-y-[-4px] active:translate-y-1 flex flex-col items-center gap-3"
          style={{
            background: 'linear-gradient(145deg, #84cc16, #a3e635)',
            boxShadow: '0 6px 0 #65a30d, 0 8px 20px rgba(132, 204, 22, 0.3)',
          }}
        >
          <Camera className="size-12 text-white" />
          <span className="text-lg font-black text-white text-center" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
            Fer foto
          </span>
        </button>

        {/* Botón: Seleccionar desde álbum */}
        {showAlbumOption && (
          <button
            type="button"
            onClick={handleAlbumSelect}
            className="p-6 rounded-2xl transition-all duration-200 hover:translate-y-[-4px] active:translate-y-1 flex flex-col items-center gap-3"
            style={{
              background: 'linear-gradient(145deg, #ff8000, #ffa347)',
              boxShadow: '0 6px 0 #d96b00, 0 8px 20px rgba(255, 128, 0, 0.3)',
            }}
          >
            <ImageIcon className="size-12 text-white" />
            <span className="text-lg font-black text-white text-center" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
              El teu àlbum
            </span>
          </button>
        )}
      </div>

      {/* Input oculto para archivos */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Input oculto para cámara (fallback) */}
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Modal de cámara */}
      <AnimatePresence>
        {showCameraModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.8)' }}
            onClick={closeCameraModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="rounded-[2rem] overflow-hidden max-w-3xl w-full relative"
              style={{
                background: 'linear-gradient(145deg, #ffffff, #f5f5f5)',
                boxShadow: '0 10px 0 #d0d0d0, 0 15px 50px rgba(0, 0, 0, 0.3)',
              }}
            >
              <button
                onClick={closeCameraModal}
                className="absolute top-4 right-4 z-10 p-3 rounded-full transition-all hover:scale-110"
                style={{
                  background: 'linear-gradient(145deg, #ff0046, #ff4570)',
                  boxShadow: '0 4px 0 #d12456, 0 6px 15px rgba(255, 0, 70, 0.3)',
                }}
              >
                <X className="size-8 text-white" />
              </button>

              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full aspect-video bg-black"
              />

              <div className="p-6 flex justify-center">
                <button
                  onClick={capturePhoto}
                  className="px-12 py-4 rounded-full text-2xl font-black transition-all duration-200 hover:translate-y-[-4px] active:translate-y-1"
                  style={{
                    background: 'linear-gradient(145deg, #84cc16, #a3e635)',
                    color: 'white',
                    boxShadow: '0 6px 0 #65a30d, 0 8px 20px rgba(132, 204, 22, 0.3)',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                  }}
                >
                  Capturar Foto 📸
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal de álbum */}
      <AnimatePresence>
        {showAlbumModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.6)' }}
            onClick={() => setShowAlbumModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="rounded-[2.5rem] overflow-hidden max-w-4xl w-full relative"
              style={{
                background: 'linear-gradient(145deg, #ffffff, #f5f5f5)',
                boxShadow: '0 10px 0 #d0d0d0, 0 15px 50px rgba(0, 0, 0, 0.3)',
              }}
            >
              <button
                onClick={() => setShowAlbumModal(false)}
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
                  className="text-4xl font-black mb-6 text-center"
                  style={{ color: '#ff8000' }}
                >
                  El teu àlbum 📚
                </h2>

                {allAlbumPhotos.length > 0 ? (
                  <>
                    <div className="grid grid-cols-4 gap-4 max-h-96 overflow-y-auto p-4 rounded-2xl mb-6" style={{
                      background: 'linear-gradient(145deg, #f9f9f9, #f3f3f3)',
                      boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.1)',
                    }}>
                      {allAlbumPhotos.map((photo) => (
                        <button
                          key={photo.id}
                          type="button"
                          onClick={() => setSelectedAlbumImage(photo.imageUrl)}
                          className="aspect-square rounded-xl overflow-hidden transition-all duration-200 hover:scale-105 relative"
                          style={{
                            border: selectedAlbumImage === photo.imageUrl ? '4px solid #00a1e8' : '2px solid rgba(200, 200, 200, 0.4)',
                            boxShadow: selectedAlbumImage === photo.imageUrl 
                              ? '0 0 20px rgba(0, 161, 232, 0.6)' 
                              : '0 4px 8px rgba(0, 0, 0, 0.1)',
                          }}
                        >
                          <img
                            src={photo.imageUrl}
                            alt={photo.title}
                            className="w-full h-full object-cover"
                          />
                          {selectedAlbumImage === photo.imageUrl && (
                            <div 
                              className="absolute inset-0 flex items-center justify-center"
                              style={{ background: 'rgba(0, 161, 232, 0.3)' }}
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

                    <button
                      onClick={confirmAlbumSelection}
                      disabled={!selectedAlbumImage}
                      className="w-full py-5 rounded-full text-2xl font-black transition-all duration-200 hover:translate-y-[-4px] active:translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{
                        background: selectedAlbumImage 
                          ? 'linear-gradient(145deg, #84cc16, #a3e635)' 
                          : 'linear-gradient(145deg, #e5e7eb, #d1d5db)',
                        color: 'white',
                        boxShadow: selectedAlbumImage 
                          ? '0 6px 0 #65a30d, 0 8px 20px rgba(132, 204, 22, 0.3)' 
                          : '0 4px 0 #9ca3af',
                        textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                      }}
                    >
                      Confirmar Selecció
                    </button>
                  </>
                ) : (
                  <div className="text-center py-12 rounded-2xl" style={{
                    background: 'linear-gradient(145deg, #f9f9f9, #f3f3f3)',
                  }}>
                    <ImageIcon className="size-16 text-gray-400 mx-auto mb-3" />
                    <p className="text-2xl font-black text-gray-400">El teu àlbum està buit</p>
                    <p className="text-lg text-gray-500 font-semibold mt-1">
                      Completa reptes per afegir fotos!
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
