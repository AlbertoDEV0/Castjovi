import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Trophy, Star, Crown } from 'lucide-react';
import { useApp } from '../context/AppContext';
import logo from 'figma:asset/0081a052804ec7847481a069748cce6d1f99d5ed.png';

export default function Podium() {
  const navigate = useNavigate();
  const { getTopFiveWinners } = useApp();
  
  const winners = getTopFiveWinners();
  
  // Reorganizar para el layout especial: 4 | 2 | 1 | 3 | 5
  const podiumLayout = winners.length >= 5 ? [
    winners[3], // Posición 4
    winners[1], // Posición 2
    winners[0], // Posición 1 (GANADOR)
    winners[2], // Posición 3
    winners[4], // Posición 5
  ] : winners;

  const getSizeClasses = (index: number) => {
    if (index === 2) { // Posición 1 (centro)
      return 'scale-110';
    } else if (index === 1 || index === 3) { // Posiciones 2 y 3
      return 'scale-100';
    } else { // Posiciones 4 y 5
      return 'scale-90';
    }
  };

  const getPositionNumber = (index: number) => {
    if (index === 2) return 1; // Centro
    if (index === 1) return 2; // Izquierda del centro
    if (index === 3) return 3; // Derecha del centro
    if (index === 0) return 4; // Más a la izquierda
    return 5; // Más a la derecha
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
      <div className="absolute top-20 left-20 w-20 h-20 rounded-full opacity-30 blur-sm" style={{ background: 'linear-gradient(135deg, #ff0046, #ff4570)' }}></div>
      <div className="absolute bottom-40 right-20 w-24 h-24 rounded-full opacity-30 blur-sm" style={{ background: 'linear-gradient(135deg, #00a1e8, #4ab8f0)' }}></div>

      {/* Header */}
      <div className="flex items-center justify-between mb-16 relative z-10">
        <button
          onClick={() => navigate('/social')}
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
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', duration: 0.6 }}
          className="flex items-center justify-center gap-4 mb-4"
        >
          <Trophy className="size-20 text-[#ffdd00] fill-[#ffdd00] drop-shadow-lg" />
          <h2 
            className="text-6xl font-black"
            style={{
              color: '#ff8000',
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
            }}
          >
            La Figura del Mes
          </h2>
          <Trophy className="size-20 text-[#ffdd00] fill-[#ffdd00] drop-shadow-lg" />
        </motion.div>
        <p className="text-2xl text-gray-600 font-semibold">
          🏆 Top 5 Guanyadors! 🏆
        </p>
      </div>

      {/* Podio - Layout especial: 4 | 2 | 1 | 3 | 5 */}
      {winners.length >= 5 && winners[0].totalVotes > 0 ? (
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-5 gap-6 items-end">
            {podiumLayout.map((winner, index) => {
              const position = getPositionNumber(index);
              const isWinner = position === 1;
              
              return (
                <motion.div
                  key={winner.id}
                  initial={{ opacity: 0, y: 100 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.15, type: 'spring' }}
                  className={`relative ${getSizeClasses(index)}`}
                >
                  {/* Badge de posición */}
                  <div 
                    className="absolute -top-6 left-1/2 -translate-x-1/2 z-20 w-16 h-16 rounded-full flex items-center justify-center"
                    style={{
                      background: isWinner 
                        ? 'linear-gradient(145deg, #ffdd00, #ffe747)'
                        : position === 2
                        ? 'linear-gradient(145deg, #d4d4d4, #e5e5e5)'
                        : position === 3
                        ? 'linear-gradient(145deg, #cd7f32, #e8a876)'
                        : 'linear-gradient(145deg, #84cc16, #a3e635)',
                      boxShadow: isWinner
                        ? '0 4px 0 #d4b800, 0 6px 15px rgba(255, 221, 0, 0.5)'
                        : position === 2
                        ? '0 4px 0 #a8a8a8, 0 6px 15px rgba(212, 212, 212, 0.5)'
                        : position === 3
                        ? '0 4px 0 #a15a1a, 0 6px 15px rgba(205, 127, 50, 0.5)'
                        : '0 4px 0 #65a30d, 0 6px 15px rgba(132, 204, 22, 0.5)',
                    }}
                  >
                    {isWinner && <Crown className="size-10 text-white" />}
                    {!isWinner && (
                      <span className="text-3xl font-black text-white" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
                        {position}
                      </span>
                    )}
                  </div>

                  {/* Card del ganador */}
                  <div
                    className={`rounded-[2rem] overflow-hidden transition-all duration-200 ${isWinner ? 'ring-4 ring-[#ffdd00]' : ''}`}
                    style={{
                      background: 'rgba(255, 255, 255, 0.25)',
                      backdropFilter: 'blur(20px)',
                      WebkitBackdropFilter: 'blur(20px)',
                      boxShadow: isWinner 
                        ? '0 12px 40px rgba(255, 221, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.4), 0 1px 0 rgba(255, 255, 255, 0.3)'
                        : '0 8px 32px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.3), 0 1px 0 rgba(255, 255, 255, 0.2)',
                      border: isWinner ? '2px solid rgba(255, 221, 0, 0.6)' : '1px solid rgba(255, 255, 255, 0.3)',
                    }}
                  >
                    {/* Header */}
                    <div className="p-4 flex flex-col items-center gap-2">
                      <div 
                        className="w-16 h-16 rounded-full flex items-center justify-center text-3xl"
                        style={{
                          background: `linear-gradient(145deg, ${winner.avatarColor}, ${winner.avatarColor}dd)`,
                          boxShadow: `0 4px 0 ${winner.avatarColor}cc, 0 6px 15px ${winner.avatarColor}66`,
                        }}
                      >
                        {winner.userAvatar}
                      </div>
                      <h3 className="text-xl font-black text-gray-800 text-center">{winner.username}</h3>
                    </div>

                    {/* Imagen */}
                    <div className="w-full aspect-square overflow-hidden bg-gray-100">
                      <img
                        src={winner.imageUrl}
                        alt={winner.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Info */}
                    <div className="p-4">
                      <p className="text-base text-gray-800 font-bold text-center mb-3 line-clamp-2">
                        {winner.title}
                      </p>
                      
                      <div className="flex items-center justify-center gap-2">
                        <Star className="size-6 text-[#ffdd00] fill-[#ffdd00]" />
                        <span className="text-2xl font-black text-gray-800">
                          {winner.averageScore.toFixed(1)}/5
                        </span>
                      </div>
                      
                      <div className="text-center mt-2">
                        <span className="text-sm text-gray-600 font-semibold">
                          ({winner.totalVotes} punts totals)
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Mensaje de felicitación */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="mt-12 text-center"
          >
            <div 
              className="inline-block px-12 py-6 rounded-[2rem]"
              style={{
                background: 'rgba(255, 0, 70, 0.3)',
                backdropFilter: 'blur(20px) saturate(180%)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                boxShadow: '0 8px 32px rgba(255, 0, 70, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.5)',
                border: '1px solid rgba(255, 0, 70, 0.4)',
              }}
            >
              <p className="text-3xl font-black text-white" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
                {winners.length > 0 && `🎉 Felicitats ${winners[0].username}! Ets el/la guanyador/a! 🎉`}
              </p>
            </div>
          </motion.div>
        </div>
      ) : (
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <div 
            className="p-20 rounded-[2rem]"
            style={{
              background: 'rgba(255, 255, 255, 0.35)',
              backdropFilter: 'blur(20px) saturate(180%)',
              WebkitBackdropFilter: 'blur(20px) saturate(180%)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.5)',
              border: '1px solid rgba(255, 255, 255, 0.4)',
            }}
          >
            <Trophy className="size-24 text-gray-400 mx-auto mb-4" />
            <p className="text-3xl font-black text-gray-600">
              No hi ha guanyadors encara
            </p>
            <p className="text-xl text-gray-500 font-semibold mt-4">
              Espera que acabin les votacions per veure els resultats! 🎨
            </p>
          </div>
        </div>
      )}
    </motion.div>
  );
}