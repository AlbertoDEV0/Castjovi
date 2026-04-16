import { useNavigate } from 'react-router';
import { ArrowLeft, Edit, Clock } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { motion } from 'motion/react';
import logo from 'figma:asset/0081a052804ec7847481a069748cce6d1f99d5ed.png';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

export default function Figures() {
  const navigate = useNavigate();
  const { dailyChallenge, monthlyChallenge, lastDailySubmissionTime, rotateDailyChallenge, rotateMonthlyChallenge } = useApp();
  const [timeLeft, setTimeLeft] = useState<string>('');
  
  // Hidden Triggers para rotar figuras (demo)
  const [dailyClickCount, setDailyClickCount] = useState(0);
  const [monthlyClickCount, setMonthlyClickCount] = useState(0);
  const [lastDailyClick, setLastDailyClick] = useState(0);
  const [lastMonthlyClick, setLastMonthlyClick] = useState(0);

  useEffect(() => {
    if (!lastDailySubmissionTime) return;

    const timer = setInterval(() => {
      const now = Date.now();
      const difference = (lastDailySubmissionTime + 24 * 60 * 60 * 1000) - now;

      if (difference <= 0) {
        setTimeLeft('');
        clearInterval(timer);
      } else {
        const hours = Math.floor(difference / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [lastDailySubmissionTime]);

  const isDailyLocked = lastDailySubmissionTime && (Date.now() < lastDailySubmissionTime + 24 * 60 * 60 * 1000);

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
      {/* ... rest of the background logic ... */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%),
                           radial-gradient(circle at 80% 80%, transparent 0%, rgba(255,200,150,0.3) 50%, transparent 100%)`,
        }}
      />

      <div className="absolute top-20 right-20 w-20 h-20 rounded-full opacity-30 blur-sm" style={{ background: 'linear-gradient(135deg, #ff0046, #ff4570)' }}></div>
      <div className="absolute bottom-40 left-20 w-24 h-24 rounded-full opacity-30 blur-sm" style={{ background: 'linear-gradient(135deg, #84cc16, #a3e635)' }}></div>

      <div className="flex items-center justify-between mb-16 relative z-10">
        <button
          onClick={() => navigate('/')}
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

      <div className="text-center mb-12 relative z-10">
        <h2 
          className="text-5xl font-black mb-2"
          style={{
            color: '#ff8000',
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
          }}
        >
          Reptes de Figures! 🎨
        </h2>
        <p className="text-xl text-gray-600 font-semibold">Completa els reptes i guanya estrelles</p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-3 gap-8 relative z-10">
        {/* Figura Mensual */}
        <button
          onClick={() => {
            if (!monthlyChallenge.submitted) {
              navigate('/challenge/monthly');
            } else {
              if (monthlyClickCount > 0 && Date.now() - lastMonthlyClick < 1000) {
                rotateMonthlyChallenge();
                toast.success('⏭️ Figura mensual rotada! Següent repte PRO carregat 🏆');
                setMonthlyClickCount(0);
              } else {
                setMonthlyClickCount(monthlyClickCount + 1);
                setLastMonthlyClick(Date.now());
              }
            }
          }}
          className={`group relative w-full rounded-[2rem] overflow-hidden transition-all duration-200 ${monthlyChallenge.submitted ? 'cursor-default' : 'hover:translate-y-[-8px] active:translate-y-1'}`}
          style={{
            background: monthlyChallenge.submitted ? 'rgba(132, 204, 22, 0.3)' : 'rgba(255, 221, 0, 0.3)',
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            boxShadow: monthlyChallenge.submitted 
              ? '0 8px 32px rgba(132, 204, 22, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.5)' 
              : '0 8px 32px rgba(255, 221, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.5)',
            border: monthlyChallenge.submitted ? '1px solid rgba(132, 204, 22, 0.4)' : '1px solid rgba(255, 221, 0, 0.4)',
            minHeight: '400px',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/25 to-transparent"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
            <div className="text-8xl mb-6 filter drop-shadow-lg transform group-hover:scale-110 transition-transform">
              {monthlyChallenge.submitted ? '✅' : '🏆'}
            </div>
            <h2 
              className="text-3xl font-black text-white text-center"
              style={{ textShadow: '3px 3px 6px rgba(0,0,0,0.3)' }}
            >
              {monthlyChallenge.submitted ? 'FIGURA ENVIADA' : 'Figura Mensual'}
            </h2>
          </div>
        </button>

        {/* Figura Diaria */}
        <button
          onClick={() => {
            if (!isDailyLocked) {
              navigate('/challenge/daily');
            } else {
              if (dailyClickCount > 0 && Date.now() - lastDailyClick < 1000) {
                rotateDailyChallenge();
                toast.success('⏭️ Figura diària rotada! Següent repte carregat ⭐');
                setDailyClickCount(0);
              } else {
                setDailyClickCount(dailyClickCount + 1);
                setLastDailyClick(Date.now());
              }
            }
          }}
          className={`group relative w-full rounded-[2rem] overflow-hidden transition-all duration-200 ${isDailyLocked ? 'cursor-default' : 'hover:translate-y-[-8px] active:translate-y-1'}`}
          style={{
            background: isDailyLocked ? 'rgba(132, 204, 22, 0.3)' : 'rgba(255, 0, 70, 0.3)',
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            boxShadow: isDailyLocked 
              ? '0 8px 32px rgba(132, 204, 22, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.5)' 
              : '0 8px 32px rgba(255, 0, 70, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.5)',
            border: isDailyLocked ? '1px solid rgba(132, 204, 22, 0.4)' : '1px solid rgba(255, 0, 70, 0.4)',
            minHeight: '400px',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/25 to-transparent"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
            <div className="text-8xl mb-6 filter drop-shadow-lg transform group-hover:scale-110 transition-transform">
              {isDailyLocked ? '✅' : '⭐'}
            </div>
            <h2 
              className="text-3xl font-black text-white text-center mb-2"
              style={{ textShadow: '3px 3px 6px rgba(0,0,0,0.3)' }}
            >
              {isDailyLocked ? 'FIGURA ENVIADA' : 'Figura Diària'}
            </h2>
            {isDailyLocked && timeLeft && (
              <div className="mt-4 flex flex-col items-center bg-black/20 rounded-2xl px-6 py-3 backdrop-blur-md">
                <div className="flex items-center gap-2 mb-1">
                  <Clock className="size-5 text-white" />
                  <span className="text-sm font-black text-white/80 uppercase">Proper repte en:</span>
                </div>
                <span className="text-2xl font-black text-white tabular-nums tracking-wider">
                  {timeLeft}
                </span>
              </div>
            )}
          </div>
        </button>

        {/* Edición */}
        <button
          onClick={() => navigate('/editor')}
          className="group relative w-full rounded-[2rem] overflow-hidden transition-all duration-200 hover:translate-y-[-8px] active:translate-y-1"
          style={{
            background: 'rgba(0, 161, 232, 0.3)',
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            boxShadow: '0 8px 32px rgba(0, 161, 232, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.5), 0 1px 0 rgba(255, 255, 255, 0.3)',
            border: '1px solid rgba(0, 161, 232, 0.4)',
            minHeight: '400px',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/25 to-transparent"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
            <Edit className="size-20 mb-6 text-white filter drop-shadow-lg transform group-hover:scale-110 transition-transform" />
            <h2 
              className="text-3xl font-black text-white text-center"
              style={{ textShadow: '3px 3px 6px rgba(0,0,0,0.3)' }}
            >
              Editor de Fotos
            </h2>
          </div>
        </button>
      </div>
    </motion.div>
  );
}