import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Star } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CollectionCard } from '../components/CollectionCard';
import { CollectionDetail } from '../components/CollectionDetail';
import { MyAlbum } from '../components/MyAlbum';
import { motion, AnimatePresence } from 'motion/react';
import logo from 'figma:asset/0081a052804ec7847481a069748cce6d1f99d5ed.png';

export default function Album() {
  const navigate = useNavigate();
  const { stars, collections } = useApp();
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null);
  const [albumView, setAlbumView] = useState<'menu' | 'collections' | 'myalbum'>('menu');

  const selectedCollectionData = collections.find(c => c.id === selectedCollection);

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

      {/* Decoraciones con nueva paleta - más elementos */}
      <div className="absolute top-20 left-20 w-20 h-20 rounded-full opacity-30 blur-sm" style={{ background: 'linear-gradient(135deg, #00a1e8, #4ab8f0)' }}></div>
      <div className="absolute bottom-40 right-20 w-24 h-24 rounded-full opacity-30 blur-sm" style={{ background: 'linear-gradient(135deg, #84cc16, #a3e635)' }}></div>
      <div className="absolute top-1/3 left-1/4 w-32 h-32 rounded-full opacity-25 blur-md" style={{ background: 'linear-gradient(135deg, #ff0046, #ff4570)' }}></div>
      <div className="absolute bottom-1/4 right-1/3 w-28 h-28 rounded-full opacity-25 blur-md" style={{ background: 'linear-gradient(135deg, #ffdd00, #ffe747)' }}></div>
      <div className="absolute top-2/3 right-1/4 w-20 h-20 rounded-full opacity-20 blur-sm" style={{ background: 'linear-gradient(135deg, #ff8000, #ffa347)' }}></div>
      <div className="absolute bottom-1/3 left-1/3 w-24 h-24 rounded-full opacity-20 blur-sm" style={{ background: 'linear-gradient(135deg, #00a1e8, #4ab8f0)' }}></div>

      {/* Header con liquid glass estilo Apple */}
      <div className="flex items-center justify-between mb-16 relative z-10">
        <button
          onClick={() => {
            if (selectedCollection) {
              setSelectedCollection(null);
            } else if (albumView !== 'menu') {
              setAlbumView('menu');
            } else {
              navigate('/');
            }
          }}
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

        {/* Logo CASTJOVI con imagen más grande */}
        <div className="relative">
          <img 
            src={logo} 
            alt="CASTJOVI Logo" 
            className="h-32 w-auto drop-shadow-2xl"
          />
        </div>

        {/* Contador de estrellas con liquid glass */}
        <div 
          className="flex items-center gap-4 px-8 py-4 rounded-full"
          style={{
            background: 'rgba(255, 255, 255, 0.35)',
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.5), 0 1px 0 rgba(255, 255, 255, 0.3)',
            border: '1px solid rgba(255, 255, 255, 0.4)',
          }}
        >
          <Star className="size-10 fill-[#ffdd00] text-[#ffdd00] drop-shadow-lg" />
          <span 
            className="text-4xl font-black"
            style={{
              color: '#ff8000',
              filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.2))',
            }}
          >
            {stars}
          </span>
        </div>
      </div>

      {/* Contenido */}
      <AnimatePresence mode="wait">
        {albumView === 'menu' ? (
          <motion.div
            key="menu"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="max-w-4xl mx-auto relative z-10"
          >
            <div className="text-center mb-12">
              <h2 
                className="text-5xl font-black mb-3"
                style={{
                  color: '#ff8000',
                  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
                }}
              >
                Àlbum 📚
              </h2>
              <p className="text-xl text-gray-600 font-semibold">Tria una opció</p>
            </div>
            
            <div className="flex gap-10 justify-center">
              {/* Botón Col·leccions */}
              <button
                onClick={() => setAlbumView('collections')}
                className="group relative w-80 h-96 rounded-[2.5rem] overflow-hidden transition-all duration-200 hover:translate-y-[-8px] active:translate-y-1"
                style={{
                  background: 'rgba(0, 161, 232, 0.3)',
                  backdropFilter: 'blur(20px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                  boxShadow: '0 8px 32px rgba(0, 161, 232, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.5), 0 1px 0 rgba(255, 255, 255, 0.3)',
                  border: '1px solid rgba(0, 161, 232, 0.4)',
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/25 to-transparent"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                  <div className="text-8xl mb-4 filter drop-shadow-lg transform group-hover:scale-110 transition-transform">🎨</div>
                  <h2 
                    className="text-5xl font-black text-white mb-2"
                    style={{ textShadow: '3px 3px 6px rgba(0,0,0,0.3)' }}
                  >
                    Col·leccions
                  </h2>
                  <div className="w-16 h-1 bg-white/60 rounded-full"></div>
                </div>
              </button>

              {/* Botón El Teu Àlbum */}
              <button
                onClick={() => setAlbumView('myalbum')}
                className="group relative w-80 h-96 rounded-[2.5rem] overflow-hidden transition-all duration-200 hover:translate-y-[-8px] active:translate-y-1"
                style={{
                  background: 'rgba(132, 204, 22, 0.3)',
                  backdropFilter: 'blur(20px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                  boxShadow: '0 8px 32px rgba(132, 204, 22, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.5), 0 1px 0 rgba(255, 255, 255, 0.3)',
                  border: '1px solid rgba(132, 204, 22, 0.4)',
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/25 to-transparent"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                  <div className="text-8xl mb-4 filter drop-shadow-lg transform group-hover:scale-110 transition-transform">📸</div>
                  <h2 
                    className="text-5xl font-black text-white mb-2"
                    style={{ textShadow: '3px 3px 6px rgba(0,0,0,0.3)' }}
                  >
                    El Teu Àlbum
                  </h2>
                  <div className="w-16 h-1 bg-white/60 rounded-full"></div>
                </div>
              </button>
            </div>
          </motion.div>
        ) : albumView === 'collections' && !selectedCollection ? (
          <motion.div
            key="list"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="max-w-6xl mx-auto relative z-10"
          >
            <div className="text-center mb-12">
              <h2 
                className="text-5xl font-black mb-3"
                style={{
                  color: '#ff8000',
                  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
                }}
              >
                Col·leccions Disponibles 📚
              </h2>
              <p className="text-xl text-gray-600 font-semibold">Desbloqueja col·leccions amb les teves estrelles!</p>
            </div>
            
            <div className="grid grid-cols-3 gap-10">
              {collections.map((collection) => (
                <CollectionCard
                  key={collection.id}
                  collection={collection}
                  onSelect={() => setSelectedCollection(collection.id)}
                />
              ))}
            </div>
          </motion.div>
        ) : albumView === 'collections' && selectedCollectionData ? (
          <motion.div
            key="detail"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <CollectionDetail collection={selectedCollectionData} />
          </motion.div>
        ) : albumView === 'myalbum' ? (
          <motion.div
            key="myalbum"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="max-w-7xl mx-auto relative z-10"
          >
            <div className="text-center mb-12">
              <h2 
                className="text-5xl font-black mb-3"
                style={{
                  color: '#ff8000',
                  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
                }}
              >
                El Teu Àlbum 📸
              </h2>
              <p className="text-xl text-gray-600 font-semibold">Totes les teves creacions!</p>
            </div>
            
            {/* Placeholder - será implementado en el siguiente todo */}
            <MyAlbum />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
}