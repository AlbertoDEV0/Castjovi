import { motion, AnimatePresence } from 'motion/react';
import { Info, Star, X, Flame } from 'lucide-react';
import logo from 'figma:asset/0081a052804ec7847481a069748cce6d1f99d5ed.png';
import { useApp } from '../context/AppContext';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

export default function Home() {
  const navigate = useNavigate();
  const { stars, userProfile, updateUserProfile, streak } = useApp();
  const [showInfo, setShowInfo] = useState(false);
  const [showProfileEdit, setShowProfileEdit] = useState(false);
  const [showStreakInfo, setShowStreakInfo] = useState(false);
  
  // Long Press para acceder a Admin
  const [longPressTimer, setLongPressTimer] = useState<number | null>(null);

  const handleLongPressStart = () => {
    setLongPressTimer(setTimeout(() => {
      navigate('/admin');
      toast.success('Acceso a Admin concedido! 🔑');
    }, 1000));
  };

  const handleLongPressEnd = () => {
    if (longPressTimer) {
      clearTimeout(longPressTimer);
      setLongPressTimer(null);
    }
  };

  // Emojis disponibles para el avatar
  const availableAvatars = ['😊', '😎', '🤓', '🥳', '😺', '🐶', '🐼', '🦁', '🐯', '🦊', '🐻', '🐨', '🐷', '🐸', '🦄'];
  const availableColors = ['#00a1e8', '#ffdd00', '#84cc16', '#ff8000', '#ff0046'];

  const [tempUsername, setTempUsername] = useState(userProfile.username || '');
  const [tempAvatar, setTempAvatar] = useState(userProfile.avatar || '😊');
  const [tempColor, setTempColor] = useState(userProfile.avatarColor || '#ffdd00');

  const handleSaveProfile = () => {
    if (tempUsername.trim()) {
      updateUserProfile({
        username: tempUsername.trim(),
        avatar: tempAvatar,
        avatarColor: tempColor,
      });
      toast.success('Perfil actualitzat! ✨');
      setShowProfileEdit(false);
    } else {
      toast.error('El nom no pot estar buit!');
    }
  };

  return (
    <div 
      className="min-h-screen relative overflow-hidden p-8 flex flex-col items-center justify-center"
      style={{
        background: 'linear-gradient(135deg, #FFE5B4 0%, #FFDAB9 25%, #FFE4C4 50%, #FFEFD5 75%, #FFF8DC 100%)',
      }}
    >
      {/* Patrón de textura de plastilina */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%),
                           radial-gradient(circle at 80% 80%, transparent 0%, rgba(255,200,150,0.3) 50%, transparent 100%),
                           radial-gradient(circle at 40% 20%, transparent 0%, rgba(255,220,180,0.3) 50%, transparent 100%)`,
        }}
      />

      {/* Decoraciones de formas de plastilina con nueva paleta */}
      <div className="absolute top-10 left-10 w-24 h-24 rounded-full opacity-40 blur-sm" style={{ background: 'linear-gradient(135deg, #ff0046, #ff4570)' }}></div>
      <div className="absolute bottom-20 right-20 w-32 h-32 rounded-full opacity-40 blur-sm" style={{ background: 'linear-gradient(135deg, #00a1e8, #4ab8f0)' }}></div>
      <div className="absolute top-1/3 right-10 w-20 h-20 rounded-full opacity-40 blur-sm" style={{ background: 'linear-gradient(135deg, #84cc16, #a3e635)' }}></div>
      <div className="absolute bottom-1/4 left-16 w-28 h-28 rounded-full opacity-40 blur-sm" style={{ background: 'linear-gradient(135deg, #ffdd00, #ffe747)' }}></div>

      {/* Perfil del usuario - Arriba a la izquierda */}
      <button
        onClick={() => setShowProfileEdit(true)}
        className="absolute top-8 left-8 flex items-center gap-4 p-4 rounded-full transition-all duration-200 hover:scale-105 active:scale-95 z-50"
        style={{
          background: 'rgba(255, 255, 255, 0.35)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.5)',
          border: '1px solid rgba(255, 255, 255, 0.4)',
        }}
      >
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center text-3xl"
          style={{
            background: userProfile.avatarColor || '#ffdd00',
            boxShadow: '0 4px 0 rgba(0,0,0,0.1)',
          }}
        >
          {userProfile.avatar || '😊'}
        </div>
        <span className="text-2xl font-black" style={{ color: '#ff8000' }}>
          {userProfile.username || 'Toca per configurar'}
        </span>
      </button>

      {/* Botón de Ranking flotante */}
      <button
        onClick={() => navigate('/rankings')}
        className="absolute top-8 right-8 p-6 rounded-full transition-all duration-200 hover:scale-110 active:scale-95 z-50"
        style={{
          background: 'rgba(255, 221, 0, 0.35)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          boxShadow: '0 8px 32px rgba(255, 221, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.5), 0 1px 0 rgba(255, 255, 255, 0.3)',
          border: '1px solid rgba(255, 221, 0, 0.5)',
        }}
      >
        <Star className="size-12 text-white drop-shadow-lg" />
      </button>

      {/* Racha de días - Abajo a la derecha */}
      <button
        onClick={() => setShowStreakInfo(true)}
        className="absolute bottom-8 right-8 flex items-center gap-3 px-6 py-4 rounded-full z-50 transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
        style={{
          background: 'rgba(255, 128, 0, 0.35)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          boxShadow: '0 8px 32px rgba(255, 128, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.5)',
          border: '1px solid rgba(255, 128, 0, 0.5)',
        }}
      >
        <Flame className="size-10 text-white drop-shadow-lg" fill="white" />
        <div className="flex flex-col">
          <span className="text-3xl font-black text-white" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
            {streak.currentStreak}
          </span>
          <span className="text-sm font-bold text-white/90" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>
            dies
          </span>
        </div>
      </button>

      {/* Logo CASTJOVI con imagen más grande */}
      <div className="mb-16 relative z-10">
        <img 
          src={logo} 
          alt="CASTJOVI Logo" 
          className="h-48 w-auto drop-shadow-2xl cursor-pointer"
          onMouseDown={handleLongPressStart}
          onMouseUp={handleLongPressEnd}
          onTouchStart={handleLongPressStart}
          onTouchEnd={handleLongPressEnd}
        />
      </div>

      {/* Contador de estrellas con botón info */}
      <div className="mb-12 flex items-center gap-6 relative z-10">
        <div
          className="flex items-center gap-4 px-8 py-4 rounded-full relative transition-all duration-200"
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

        <button
          onClick={() => setShowInfo(true)}
          className="p-4 rounded-full relative transition-all duration-200 hover:scale-110 active:scale-95"
          style={{
            background: 'rgba(255, 221, 0, 0.35)',
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            boxShadow: '0 8px 32px rgba(255, 221, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.5), 0 1px 0 rgba(255, 255, 255, 0.3)',
            border: '1px solid rgba(255, 221, 0, 0.5)',
          }}
        >
          <Info className="size-8 text-white drop-shadow-lg" />
        </button>
      </div>

      {/* Modal de información de estrellas */}
      <AnimatePresence>
        {showInfo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.5)' }}
            onClick={() => setShowInfo(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="rounded-[2.5rem] p-10 max-w-2xl w-full relative"
              style={{
                background: 'linear-gradient(145deg, #ffffff, #f5f5f5)',
                boxShadow: '0 10px 0 #d0d0d0, 0 15px 40px rgba(0, 0, 0, 0.3)',
              }}
            >
              <button
                onClick={() => setShowInfo(false)}
                className="absolute top-6 right-6 p-3 rounded-full transition-all hover:scale-110"
                style={{
                  background: 'linear-gradient(145deg, #ff0046, #ff4570)',
                  boxShadow: '0 4px 0 #d12456, 0 6px 15px rgba(255, 0, 70, 0.3)',
                }}
              >
                <X className="size-8 text-white" />
              </button>

              <div className="text-center mb-8">
                <Star className="size-20 fill-[#ffdd00] text-[#ffdd00] mx-auto mb-4 drop-shadow-lg" />
                <h2 className="text-5xl font-black mb-4" style={{ color: '#ff8000' }}>
                  Com aconseguir estrelles?
                </h2>
              </div>

              <div className="space-y-6">
                <div 
                  className="p-6 rounded-3xl"
                  style={{
                    background: 'linear-gradient(145deg, #00a1e8, #4ab8f0)',
                    boxShadow: '0 6px 0 #0086c3, 0 8px 20px rgba(0, 161, 232, 0.3)',
                  }}
                >
                  <h3 className="text-3xl font-black text-white mb-2">🎨 Figures Diàries</h3>
                  <p className="text-xl text-white font-semibold">Completa el repte diari i guanya 10 estrelles!</p>
                </div>

                <div 
                  className="p-6 rounded-3xl"
                  style={{
                    background: 'linear-gradient(145deg, #ff0046, #ff4570)',
                    boxShadow: '0 6px 0 #d12456, 0 8px 20px rgba(255, 0, 70, 0.3)',
                  }}
                >
                  <h3 className="text-3xl font-black text-white mb-2">🏆 Figures Mensuals</h3>
                  <p className="text-xl text-white font-semibold">Participa en el concurs mensual i guanya 50 estrelles!</p>
                </div>

                <div 
                  className="p-6 rounded-3xl"
                  style={{
                    background: 'linear-gradient(145deg, #84cc16, #a3e635)',
                    boxShadow: '0 6px 0 #65a30d, 0 8px 20px rgba(132, 204, 22, 0.3)',
                  }}
                >
                  <h3 className="text-3xl font-black text-white mb-2">📚 Col·leccions</h3>
                  <p className="text-xl text-white font-semibold">Completa figures de col·leccions per guanyar més estrelles!</p>
                </div>
              </div>

              <p className="text-center text-xl font-bold mt-8" style={{ color: '#ff8000' }}>
                Utilitza les estrelles per desbloquejar col·leccions!
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal de edición de perfil */}
      <AnimatePresence>
        {showProfileEdit && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.5)' }}
            onClick={() => setShowProfileEdit(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="rounded-[2.5rem] p-10 max-w-2xl w-full relative"
              style={{
                background: 'linear-gradient(145deg, #ffffff, #f5f5f5)',
                boxShadow: '0 10px 0 #d0d0d0, 0 15px 40px rgba(0, 0, 0, 0.3)',
              }}
            >
              <button
                onClick={() => setShowProfileEdit(false)}
                className="absolute top-6 right-6 p-3 rounded-full transition-all hover:scale-110"
                style={{
                  background: 'linear-gradient(145deg, #ff0046, #ff4570)',
                  boxShadow: '0 4px 0 #d12456, 0 6px 15px rgba(255, 0, 70, 0.3)',
                }}
              >
                <X className="size-8 text-white" />
              </button>

              <h2 className="text-4xl font-black mb-8 text-center" style={{ color: '#ff8000' }}>
                Personalitza el teu perfil
              </h2>

              {/* Nombre de usuario */}
              <div className="mb-6">
                <label className="block text-2xl font-bold mb-3" style={{ color: '#ff8000' }}>
                  El teu nom:
                </label>
                <input
                  type="text"
                  value={tempUsername}
                  onChange={(e) => setTempUsername(e.target.value)}
                  placeholder="Escriu el teu nom"
                  className="w-full px-6 py-4 rounded-2xl text-2xl font-bold"
                  style={{
                    background: 'rgba(255, 255, 255, 0.8)',
                    border: '2px solid rgba(255, 128, 0, 0.3)',
                    color: '#ff8000',
                  }}
                  maxLength={20}
                />
              </div>

              {/* Selector de avatar */}
              <div className="mb-6">
                <label className="block text-2xl font-bold mb-3" style={{ color: '#ff8000' }}>
                  Tria el teu avatar:
                </label>
                <div className="grid grid-cols-5 gap-3">
                  {availableAvatars.map((emoji) => (
                    <button
                      key={emoji}
                      onClick={() => setTempAvatar(emoji)}
                      className="p-4 rounded-2xl text-4xl transition-all hover:scale-110"
                      style={{
                        background: tempAvatar === emoji ? 'rgba(255, 221, 0, 0.3)' : 'rgba(255, 255, 255, 0.5)',
                        border: tempAvatar === emoji ? '3px solid #ffdd00' : '2px solid rgba(0,0,0,0.1)',
                      }}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              {/* Selector de color */}
              <div className="mb-8">
                <label className="block text-2xl font-bold mb-3" style={{ color: '#ff8000' }}>
                  Tria el teu color:
                </label>
                <div className="flex gap-4 justify-center">
                  {availableColors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setTempColor(color)}
                      className="w-16 h-16 rounded-full transition-all hover:scale-110"
                      style={{
                        background: color,
                        border: tempColor === color ? '4px solid white' : '2px solid rgba(0,0,0,0.2)',
                        boxShadow: tempColor === color ? '0 0 0 4px rgba(0,0,0,0.2), 0 4px 12px rgba(0,0,0,0.3)' : '0 2px 8px rgba(0,0,0,0.2)',
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Vista previa */}
              <div className="mb-8 flex justify-center">
                <div className="flex items-center gap-4 px-8 py-4 rounded-full" style={{ background: 'rgba(255,255,255,0.5)' }}>
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center text-4xl"
                    style={{
                      background: tempColor,
                      boxShadow: '0 4px 0 rgba(0,0,0,0.1)',
                    }}
                  >
                    {tempAvatar}
                  </div>
                  <span className="text-3xl font-black" style={{ color: '#ff8000' }}>
                    {tempUsername || 'El teu nom'}
                  </span>
                </div>
              </div>

              {/* Botón guardar */}
              <button
                onClick={handleSaveProfile}
                className="w-full py-5 rounded-2xl text-3xl font-black text-white transition-all hover:scale-105 active:scale-95"
                style={{
                  background: 'linear-gradient(145deg, #84cc16, #a3e635)',
                  boxShadow: '0 6px 0 #65a30d, 0 8px 20px rgba(132, 204, 22, 0.3)',
                }}
              >
                Guardar perfil ✨
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal de información de racha */}
      <AnimatePresence>
        {showStreakInfo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.5)' }}
            onClick={() => setShowStreakInfo(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="rounded-[2.5rem] p-10 max-w-2xl w-full relative"
              style={{
                background: 'linear-gradient(145deg, #ffffff, #f5f5f5)',
                boxShadow: '0 10px 0 #d0d0d0, 0 15px 40px rgba(0, 0, 0, 0.3)',
              }}
            >
              <button
                onClick={() => setShowStreakInfo(false)}
                className="absolute top-6 right-6 p-3 rounded-full transition-all hover:scale-110"
                style={{
                  background: 'linear-gradient(145deg, #ff0046, #ff4570)',
                  boxShadow: '0 4px 0 #d12456, 0 6px 15px rgba(255, 0, 70, 0.3)',
                }}
              >
                <X className="size-8 text-white" />
              </button>

              <div className="text-center mb-8">
                <Flame className="size-24 text-[#ff8000] mx-auto mb-4 drop-shadow-lg" fill="#ff8000" />
                <h2 className="text-5xl font-black mb-4" style={{ color: '#ff8000' }}>
                  La teva racha!
                </h2>
                <div 
                  className="inline-block px-8 py-4 rounded-3xl"
                  style={{
                    background: 'linear-gradient(145deg, #ff8000, #ffa347)',
                    boxShadow: '0 6px 0 #d66900, 0 8px 20px rgba(255, 128, 0, 0.3)',
                  }}
                >
                  <p className="text-6xl font-black text-white">
                    {streak.currentStreak} dies consecutius
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div 
                  className="p-6 rounded-3xl"
                  style={{
                    background: 'linear-gradient(145deg, #00a1e8, #4ab8f0)',
                    boxShadow: '0 6px 0 #0086c3, 0 8px 20px rgba(0, 161, 232, 0.3)',
                  }}
                >
                  <h3 className="text-3xl font-black text-white mb-2">🎯 Què és la racha?</h3>
                  <p className="text-xl text-white font-semibold">
                    És el nombre de dies consecutius que has completat el repte diari!
                  </p>
                </div>

                <div 
                  className="p-6 rounded-3xl"
                  style={{
                    background: 'linear-gradient(145deg, #84cc16, #a3e635)',
                    boxShadow: '0 6px 0 #65a30d, 0 8px 20px rgba(132, 204, 22, 0.3)',
                  }}
                >
                  <h3 className="text-3xl font-black text-white mb-2">⭐ Beneficis</h3>
                  <p className="text-xl text-white font-semibold">
                    Cada dia que compleixes un repte diàri, augmentes la teva racha i guanyes 10 estrelles!
                  </p>
                </div>

                <div 
                  className="p-6 rounded-3xl"
                  style={{
                    background: 'linear-gradient(145deg, #ffdd00, #ffe747)',
                    boxShadow: '0 6px 0 #d9b700, 0 8px 20px rgba(255, 221, 0, 0.3)',
                  }}
                >
                  <h3 className="text-3xl font-black text-white mb-2">🔥 Consell</h3>
                  <p className="text-xl text-white font-semibold">
                    No deixis passar cap dia sense fer la figura diària o perdràs la racha!
                  </p>
                </div>
              </div>

              <p className="text-center text-xl font-bold mt-8" style={{ color: '#ff8000' }}>
                {streak.currentStreak === 0 
                  ? "Comença avui la teva racha! 💪" 
                  : `Segueix així! Ja portes ${streak.currentStreak} ${streak.currentStreak === 1 ? 'dia' : 'dies'}! 🚀`}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Botones principales con efecto liquid glass estilo Apple */}
      <div className="flex flex-wrap justify-center gap-10 relative z-10 max-w-6xl">
        {/* Botón Figures */}
        <button
          onClick={() => navigate('/figures')}
          className="group relative w-60 h-80 rounded-[2.5rem] overflow-hidden transition-all duration-200 hover:translate-y-[-8px] active:translate-y-1"
          style={{
            background: 'rgba(255, 0, 70, 0.3)',
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            boxShadow: '0 8px 32px rgba(255, 0, 70, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.5), 0 1px 0 rgba(255, 255, 255, 0.3)',
            border: '1px solid rgba(255, 0, 70, 0.4)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/25 to-transparent"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
            <div className="text-8xl mb-4 filter drop-shadow-lg transform group-hover:scale-110 transition-transform">🎨</div>
            <h2 
              className="text-5xl font-black text-white mb-2"
              style={{ textShadow: '3px 3px 6px rgba(0,0,0,0.3)' }}
            >
              Figures
            </h2>
            <div className="w-16 h-1 bg-white/60 rounded-full"></div>
          </div>
        </button>

        {/* Botón Álbum */}
        <button
          onClick={() => navigate('/album')}
          className="group relative w-60 h-80 rounded-[2.5rem] overflow-hidden transition-all duration-200 hover:translate-y-[-8px] active:translate-y-1"
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
            <div className="text-8xl mb-4 filter drop-shadow-lg transform group-hover:scale-110 transition-transform">📚</div>
            <h2 
              className="text-5xl font-black text-white mb-2"
              style={{ textShadow: '3px 3px 6px rgba(0,0,0,0.3)' }}
            >
              Àlbum
            </h2>
            <div className="w-16 h-1 bg-white/60 rounded-full"></div>
          </div>
        </button>

        {/* Botón Social */}
        <button
          onClick={() => navigate('/social')}
          className="group relative w-60 h-80 rounded-[2.5rem] overflow-hidden transition-all duration-200 hover:translate-y-[-8px] active:translate-y-1"
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
            <div className="text-8xl mb-4 filter drop-shadow-lg transform group-hover:scale-110 transition-transform">💬</div>
            <h2 
              className="text-5xl font-black text-white mb-2"
              style={{ textShadow: '3px 3px 6px rgba(0,0,0,0.3)' }}
            >
              Social
            </h2>
            <div className="w-16 h-1 bg-white/60 rounded-full"></div>
          </div>
        </button>
      </div>

      {/* Mensaje de bienvenida */}
      <div className="mt-12 text-center relative z-10">
        <p 
          className="text-2xl font-bold"
          style={{
            color: '#ff8000',
          }}
        >
          Crea, juga i comparteix les teves figures de plastilina! 🎨
        </p>
      </div>
    </div>
  );
}