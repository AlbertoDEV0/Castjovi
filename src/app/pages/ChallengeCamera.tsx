import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { ArrowLeft, Check, Star, Image as ImageIcon } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { motion } from 'motion/react';
import logo from 'figma:asset/0081a052804ec7847481a069748cce6d1f99d5ed.png';
import { toast } from 'sonner';
import { ImageSourceSelector } from '../components/ImageSourceSelector';

export default function ChallengeCamera() {
  const navigate = useNavigate();
  const { type } = useParams<{ type: 'daily' | 'monthly' | 'camera' }>();
  const { dailyChallenge, monthlyChallenge, completeChallenge, addUserPhoto, userPhotos, collections } = useApp();
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  const challenge = type === 'camera' ? null : (type === 'daily' ? dailyChallenge : monthlyChallenge);

  // Cargar la imagen existente si ya fue completado/enviado
  useEffect(() => {
    if (challenge?.imageUrl) {
      setCapturedImage(challenge.imageUrl);
    }
  }, [challenge]);

  // Agrupar todas las fotos disponibles desde Tu Álbum
  const allAlbumPhotos = [
    // Foto del reto diario si existe (solo si no es el reto actual)
    ...(dailyChallenge.imageUrl && type !== 'daily' ? [{
      id: dailyChallenge.id,
      imageUrl: dailyChallenge.imageUrl,
      title: dailyChallenge.title,
    }] : []),
    // Foto del reto mensual si existe (solo si no es el reto actual)
    ...(monthlyChallenge.imageUrl && type !== 'monthly' ? [{
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

  const handleSelectFromAlbum = (imageUrl: string) => {
    setCapturedImage(imageUrl);
    toast.success('Imatge seleccionada! ✨');
  };

  const handleComplete = () => {
    if (capturedImage && challenge) {
      completeChallenge(challenge.id, capturedImage);
      toast.success('Repte completat! 🎉');
      navigate('/figures');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen relative overflow-hidden p-8"
      style={{
        background: 'linear-gradient(135deg, #FFE5B4 0%, #FFDAB9 25%, #FFE4C4 50%, #FFEFD5 75%, #FFF8DC 100%)',
      }}
    >
      {/* Patrón de textura */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)`,
        }}
      />

      {/* Header con liquid glass estilo Apple */}
      <div className="flex items-center justify-between mb-12 relative z-10">
        <button
          onClick={() => navigate('/figures')}
          className="w-36 h-36 rounded-[2rem] flex items-center justify-center transition-all duration-200 hover:translate-y-[-4px] active:translate-y-1"
          style={{
            background: 'rgba(255, 221, 0, 0.3)',
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            boxShadow: '0 8px 32px rgba(255, 221, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.5), 0 1px 0 rgba(255, 255, 255, 0.3)',
            border: '1px solid rgba(255, 221, 0, 0.4)',
          }}
        >
          <div className="flex flex-col items-center gap-2">
            <ArrowLeft className="size-12 text-white drop-shadow-lg" />
            <span className="text-xl font-black text-white" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
              Tornar
            </span>
          </div>
        </button>

        {/* Logo CASTJOVI con imagen más grande */}
        <div className="relative">
          <img 
            src={logo} 
            alt="CASTJOVI Logo" 
            className="h-32 w-auto drop-shadow-2xl"
          />
        </div>

        <div className="w-36"></div>
      </div>

      {/* Contenido */}
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Descripción del reto */}
        <div 
          className="rounded-[2rem] p-10 mb-10"
          style={{
            background: 'linear-gradient(145deg, #ffffff, #f5f5f5)',
            boxShadow: '0 8px 0 #d0d0d0, 0 12px 30px rgba(0, 0, 0, 0.15)',
          }}
        >
          <div className="flex items-start gap-6 mb-6">
            <div className="text-7xl filter drop-shadow-lg">{type === 'monthly' ? '🏆' : '⭐'}</div>
            <div className="flex-1">
              <h2 
                className="text-4xl font-black mb-3"
                style={{
                  color: '#ff8000',
                }}
              >
                {challenge?.title}
              </h2>
              <p className="text-2xl text-gray-700 font-semibold leading-relaxed">
                {challenge?.description}
              </p>
            </div>
          </div>
          <div 
            className="flex items-center gap-3 px-6 py-3 rounded-full inline-flex"
            style={{
              background: 'linear-gradient(145deg, #ffdd00, #ffe747)',
              boxShadow: '0 4px 0 #d4b800, 0 6px 15px rgba(255, 221, 0, 0.3)',
            }}
          >
            <Star className="size-8 fill-white text-white drop-shadow" />
            <span className="text-3xl font-black text-white" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.2)' }}>
              {challenge?.stars} estrelles
            </span>
          </div>
        </div>

        {/* Grid con preview e imágenes del álbum */}
        <div className="grid grid-cols-2 gap-8">
          {/* Panel izquierdo - Preview de imagen seleccionada */}
          <div>
            <div 
              className="rounded-[2rem] p-8 mb-6"
              style={{
                background: 'linear-gradient(145deg, #ffffff, #f5f5f5)',
                boxShadow: '0 8px 0 #d0d0d0, 0 12px 30px rgba(0, 0, 0, 0.15)',
              }}
            >
              {capturedImage ? (
                <div 
                  className="aspect-square rounded-xl overflow-hidden"
                  style={{
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                  }}
                >
                  <img
                    src={capturedImage}
                    alt="Figura creada"
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="aspect-square rounded-xl bg-gray-200 flex items-center justify-center">
                  <div className="text-center">
                    <ImageIcon className="size-32 text-gray-400 mx-auto mb-4" />
                    <p className="text-2xl font-black text-gray-400">Tria una imatge</p>
                    <p className="text-lg text-gray-500 font-semibold mt-2">o captura una foto</p>
                  </div>
                </div>
              )}
            </div>

            {/* Botones de acción */}
            {capturedImage && (
              <div className="flex gap-4">
                <button
                  onClick={() => setCapturedImage(null)}
                  className="flex-1 px-8 py-4 rounded-full text-xl font-black transition-all duration-200 hover:translate-y-[-4px] active:translate-y-1"
                  style={{
                    background: 'linear-gradient(145deg, #9CA3AF, #6B7280)',
                    color: 'white',
                    boxShadow: '0 6px 0 #4B5563, 0 10px 20px rgba(156, 163, 175, 0.4)',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                  }}
                >
                  Canviar
                </button>
                
                <button
                  onClick={handleComplete}
                  className="flex-1 flex items-center justify-center gap-3 px-8 py-4 rounded-full text-xl font-black transition-all duration-200 hover:translate-y-[-4px] active:translate-y-1"
                  style={{
                    background: 'linear-gradient(145deg, #84cc16, #a3e635)',
                    color: 'white',
                    boxShadow: '0 6px 0 #65a30d, 0 10px 20px rgba(132, 204, 22, 0.4)',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                  }}
                >
                  <Check className="size-8" />
                  {type === 'monthly' ? 'Enviar al Concurs' : 'Completar Repte'}
                </button>
              </div>
            )}
          </div>

          {/* Panel derecho - Selector de imágenes multicanal */}
          <div 
            className="rounded-[2rem] p-8"
            style={{
              background: 'linear-gradient(145deg, #ffffff, #f5f5f5)',
              boxShadow: '0 8px 0 #d0d0d0, 0 12px 30px rgba(0, 0, 0, 0.15)',
            }}
          >
            <ImageSourceSelector
              onImageSelected={(imageUrl) => setCapturedImage(imageUrl)}
              showAlbumOption={true}
              title="Selecciona o crea una imatge"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}