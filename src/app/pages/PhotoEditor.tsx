import { useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Upload, Image as ImageIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';
import logo from 'figma:asset/0081a052804ec7847481a069748cce6d1f99d5ed.png';
import { toast } from 'sonner';
import { Check } from 'lucide-react';

export default function PhotoEditor() {
  const navigate = useNavigate();
  const { userPhotos, dailyChallenge, monthlyChallenge, collections, updatePhotoInAlbum } = useApp();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedPhotoId, setSelectedPhotoId] = useState<string | null>(null);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturation, setSaturation] = useState(100);
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [positionX, setPositionX] = useState(0);
  const [positionY, setPositionY] = useState(0);

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

  const handleSelectFromAlbum = (imageUrl: string, photoId: string) => {
    setSelectedImage(imageUrl);
    setSelectedPhotoId(photoId);
    // Reset filters cuando se selecciona una nueva imagen
    setBrightness(100);
    setContrast(100);
    setSaturation(100);
    setBackgroundColor('#ffffff');
    setScale(1);
    setRotation(0);
    setPositionX(0);
    setPositionY(0);
    toast.success('Imatge importada del teu àlbum! ✨');
  };

  const handleSave = async () => {
    if (!selectedImage || !selectedPhotoId) return;

    try {
      // Crear un canvas para aplicar los filtros reales
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        toast.error('Error al processar la imatge');
        return;
      }

      // Cargar la imagen
      const img = new Image();
      img.crossOrigin = 'anonymous'; // Intentar evitar problemas de CORS
      
      img.onload = () => {
        // Configurar el tamaño del canvas
        canvas.width = img.width;
        canvas.height = img.height;

        // Aplicar filtros CSS al contexto
        ctx.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`;
        
        // Aplicar fondo si no es blanco
        if (backgroundColor !== '#ffffff') {
          ctx.fillStyle = backgroundColor;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        // Dibujar la imagen con las transformaciones
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.scale(scale, scale);
        ctx.rotate((rotation * Math.PI) / 180);
        ctx.translate(-canvas.width / 2 + positionX, -canvas.height / 2 + positionY);
        ctx.drawImage(img, 0, 0);
        ctx.restore();

        // Convertir el canvas a base64
        const editedImageUrl = canvas.toDataURL('image/jpeg', 0.9);
        
        // Actualizar en el álbum
        updatePhotoInAlbum(selectedPhotoId, editedImageUrl);
        
        toast.success('Foto editada i guardada al teu àlbum! ✨');
        navigate('/album');
      };

      img.onerror = () => {
        // Si falla por CORS, guardar la URL original con un indicador
        toast.warning('⚠️ No es poden aplicar filtres a aquesta imatge. S\'ha guardat l\'original.');
        updatePhotoInAlbum(selectedPhotoId, selectedImage);
        navigate('/album');
      };

      img.src = selectedImage;
    } catch (error) {
      toast.error('Error al guardar la foto editada');
      console.error('Error saving edited photo:', error);
    }
  };

  const filterStyle = {
    filter: `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`,
    backgroundColor: backgroundColor,
  };

  const transformStyle = {
    transform: `scale(${scale}) rotate(${rotation}deg) translate(${positionX}px, ${positionY}px)`,
    transition: 'transform 0.1s ease-out',
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
          backgroundImage: `radial-gradient(circle at 20% 50%, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%),
                           radial-gradient(circle at 80% 80%, transparent 0%, rgba(255,200,150,0.3) 50%, transparent 100%)`,
        }}
      />

      {/* Decoraciones */}
      <div className="absolute top-20 left-20 w-20 h-20 rounded-full opacity-30 blur-sm" style={{ background: 'linear-gradient(135deg, #00a1e8, #4ab8f0)' }}></div>
      <div className="absolute bottom-40 right-20 w-24 h-24 rounded-full opacity-30 blur-sm" style={{ background: 'linear-gradient(135deg, #84cc16, #a3e635)' }}></div>

      {/* Header */}
      <div className="flex items-center justify-between mb-16 relative z-10">
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
            <span className="text-sm font-black text-white/90" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>
              enrere
            </span>
          </div>
        </button>

        <div className="relative">
          <img 
            src={logo} 
            alt="CASTJOVI Logo" 
            className="h-32 w-auto drop-shadow-2xl"
          />
        </div>

        <div className="w-36"></div>
      </div>

      {/* Título */}
      <div className="text-center mb-12 relative z-10">
        <h2 
          className="text-5xl font-black mb-2"
          style={{
            color: '#ff8000',
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
          }}
        >
          Editor de Fotos ✨
        </h2>
        <p className="text-xl text-gray-600 font-semibold">Tria una imatge del teu àlbum per editar!</p>
      </div>

      {/* Contenido */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 gap-8 relative z-10">
        {/* Panel izquierdo - Preview */}
        <div>
          <div 
            className="rounded-[2rem] p-6 mb-6"
            style={{
              background: 'rgba(255, 255, 255, 0.35)',
              backdropFilter: 'blur(20px) saturate(180%)',
              WebkitBackdropFilter: 'blur(20px) saturate(180%)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.5)',
              border: '1px solid rgba(255, 255, 255, 0.4)',
            }}
          >
            {selectedImage ? (
              <div className="aspect-square rounded-xl overflow-hidden" style={filterStyle}>
                <img
                  src={selectedImage}
                  alt="Selected"
                  className="w-full h-full object-cover"
                  style={transformStyle}
                />
              </div>
            ) : (
              <div className="aspect-square rounded-xl bg-gray-200 flex items-center justify-center">
                <div className="text-center">
                  <ImageIcon className="size-24 text-gray-400 mx-auto mb-4" />
                  <p className="text-2xl font-black text-gray-400">Tria una imatge</p>
                  <p className="text-lg text-gray-500 font-semibold mt-2">del teu àlbum</p>
                </div>
              </div>
            )}
          </div>

          {/* Botón de guardar */}
          {selectedImage && (
            <button
              onClick={handleSave}
              className="w-full py-4 px-6 rounded-full text-xl font-black transition-all duration-200 hover:translate-y-[-4px] active:translate-y-1"
              style={{
                background: 'rgba(132, 204, 22, 0.3)',
                backdropFilter: 'blur(20px) saturate(180%)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                color: 'white',
                boxShadow: '0 8px 32px rgba(132, 204, 22, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.5)',
                border: '1px solid rgba(132, 204, 22, 0.4)',
                textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
              }}
            >
              Guardar Edició
            </button>
          )}
        </div>

        {/* Panel derecho - Controles */}
        <div>
          {/* Controles de ajuste */}
          <div 
            className="rounded-[2rem] p-8 mb-6"
            style={{
              background: 'rgba(255, 255, 255, 0.35)',
              backdropFilter: 'blur(20px) saturate(180%)',
              WebkitBackdropFilter: 'blur(20px) saturate(180%)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.5)',
              border: '1px solid rgba(255, 255, 255, 0.4)',
            }}
          >
            <h3 className="text-3xl font-black text-gray-800 mb-6">Ajustos</h3>
            
            <div className="space-y-6">
              {/* Brightness */}
              <div>
                <label className="text-xl font-black text-gray-700 mb-2 block">
                  Brillantor: {brightness}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="200"
                  value={brightness}
                  onChange={(e) => setBrightness(Number(e.target.value))}
                  className="w-full h-3 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: 'linear-gradient(90deg, #ffdd00, #ffe747)',
                  }}
                />
              </div>

              {/* Contrast */}
              <div>
                <label className="text-xl font-black text-gray-700 mb-2 block">
                  Contrast: {contrast}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="200"
                  value={contrast}
                  onChange={(e) => setContrast(Number(e.target.value))}
                  className="w-full h-3 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: 'linear-gradient(90deg, #00a1e8, #4ab8f0)',
                  }}
                />
              </div>

              {/* Saturation */}
              <div>
                <label className="text-xl font-black text-gray-700 mb-2 block">
                  Saturació: {saturation}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="200"
                  value={saturation}
                  onChange={(e) => setSaturation(Number(e.target.value))}
                  className="w-full h-3 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: 'linear-gradient(90deg, #ff0046, #ff4570)',
                  }}
                />
              </div>

              {/* Background Color */}
              <div>
                <label className="text-xl font-black text-gray-700 mb-2 block">
                  Color de Fons
                </label>
                <div className="flex gap-3">
                  {['#ffffff', '#f3f4f6', '#ffdd00', '#00a1e8', '#84cc16', '#ff0046'].map((color) => (
                    <button
                      key={color}
                      onClick={() => setBackgroundColor(color)}
                      className="w-16 h-16 rounded-full transition-all duration-200 hover:scale-110"
                      style={{
                        background: color,
                        border: backgroundColor === color ? '4px solid #000' : '2px solid #ccc',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Escala */}
              <div>
                <label className="text-xl font-black text-gray-700 mb-2 block">
                  Escala: {scale.toFixed(1)}x
                </label>
                <input
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.1"
                  value={scale}
                  onChange={(e) => setScale(Number(e.target.value))}
                  className="w-full h-3 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: 'linear-gradient(90deg, #84cc16, #a3e635)',
                  }}
                />
              </div>

              {/* Rotación */}
              <div>
                <label className="text-xl font-black text-gray-700 mb-2 block">
                  Rotació: {rotation}°
                </label>
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={rotation}
                  onChange={(e) => setRotation(Number(e.target.value))}
                  className="w-full h-3 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: 'linear-gradient(90deg, #ff8000, #ffa347)',
                  }}
                />
              </div>

              {/* Posición X */}
              <div>
                <label className="text-xl font-black text-gray-700 mb-2 block">
                  Moure Horitzontalment: {positionX}px
                </label>
                <input
                  type="range"
                  min="-100"
                  max="100"
                  value={positionX}
                  onChange={(e) => setPositionX(Number(e.target.value))}
                  className="w-full h-3 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: 'linear-gradient(90deg, #00a1e8, #4ab8f0)',
                  }}
                />
              </div>

              {/* Posición Y */}
              <div>
                <label className="text-xl font-black text-gray-700 mb-2 block">
                  Moure Verticalment: {positionY}px
                </label>
                <input
                  type="range"
                  min="-100"
                  max="100"
                  value={positionY}
                  onChange={(e) => setPositionY(Number(e.target.value))}
                  className="w-full h-3 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: 'linear-gradient(90deg, #ff0046, #ff4570)',
                  }}
                />
              </div>
            </div>
          </div>

          {/* Galería de fotos del álbum */}
          {allAlbumPhotos.length > 0 ? (
            <div 
              className="rounded-[2rem] p-6"
              style={{
                background: 'rgba(255, 255, 255, 0.35)',
                backdropFilter: 'blur(20px) saturate(180%)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.5)',
                border: '1px solid rgba(255, 255, 255, 0.4)',
              }}
            >
              <h3 className="text-2xl font-black text-gray-800 mb-4">El teu àlbum 📸</h3>
              <p className="text-base text-gray-600 font-semibold mb-4">
                Selecciona una foto per començar a editar
              </p>
              <div className="grid grid-cols-3 gap-3 max-h-96 overflow-y-auto">
                {allAlbumPhotos.map((photo) => (
                  <button
                    key={photo.id}
                    onClick={() => handleSelectFromAlbum(photo.imageUrl, photo.id)}
                    className="aspect-square rounded-xl overflow-hidden transition-all duration-200 hover:scale-105 relative group"
                    style={{
                      border: selectedImage === photo.imageUrl ? '4px solid #00a1e8' : '2px solid rgba(255, 255, 255, 0.4)',
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
            </div>
          ) : (
            <div 
              className="rounded-[2rem] p-8 text-center"
              style={{
                background: 'rgba(255, 255, 255, 0.35)',
                backdropFilter: 'blur(20px) saturate(180%)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.5)',
                border: '1px solid rgba(255, 255, 255, 0.4)',
              }}
            >
              <ImageIcon className="size-20 text-gray-400 mx-auto mb-4" />
              <h3 className="text-2xl font-black text-gray-800 mb-2">El teu àlbum està buit</h3>
              <p className="text-lg text-gray-600 font-semibold">
                Completa reptes o col·leccions per afegir fotos!
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}