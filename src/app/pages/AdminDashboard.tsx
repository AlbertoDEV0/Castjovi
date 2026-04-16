import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Check, X } from 'lucide-react';
import { motion } from 'motion/react';
import logo from 'figma:asset/0081a052804ec7847481a069748cce6d1f99d5ed.png';
import { toast } from 'sonner';
import { useApp } from '../context/AppContext';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { pendingPosts, monthlySubmissions } = useApp();

  // Contar posts y submissions pendientes
  const pendingPostsCount = pendingPosts.filter(p => p.status === 'pending').length;
  const pendingFiguresCount = monthlySubmissions.filter(s => s.status === 'pending').length;

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
          onClick={() => navigate('/admin/login')}
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
              Sortir
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
          Panel d'Administració 👨‍💼
        </h2>
        <p className="text-xl text-gray-600 font-semibold">Selecciona què vols gestionar</p>
      </div>

      {/* Tarjetas de navegación */}
      <div className="max-w-5xl mx-auto grid grid-cols-2 gap-10 relative z-10">
        {/* Card Posts Socials */}
        <button
          onClick={() => navigate('/admin/postsocial')}
          className="rounded-[2rem] p-12 transition-all duration-200 hover:translate-y-[-8px] active:translate-y-2 text-left relative overflow-hidden"
          style={{
            background: 'rgba(132, 204, 22, 0.3)',
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            boxShadow: '0 12px 0 #65a30d, 0 16px 40px rgba(132, 204, 22, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.5)',
            border: '2px solid rgba(132, 204, 22, 0.4)',
          }}
        >
          <div className="text-8xl mb-6">💬</div>
          <h3 className="text-4xl font-black text-white mb-3" style={{ textShadow: '3px 3px 6px rgba(0,0,0,0.3)' }}>
            Posts Socials
          </h3>
          <p className="text-xl font-semibold text-white/90 mb-6">
            Revisa i aprova publicacions dels usuaris
          </p>
          {pendingPostsCount > 0 && (
            <div 
              className="inline-block px-6 py-3 rounded-full"
              style={{
                background: 'rgba(255, 255, 255, 0.4)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <span className="text-2xl font-black text-white" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
                {pendingPostsCount} pendent{pendingPostsCount !== 1 ? 's' : ''}
              </span>
            </div>
          )}
        </button>

        {/* Card Figures Mensuals */}
        <button
          onClick={() => navigate('/admin/figures')}
          className="rounded-[2rem] p-12 transition-all duration-200 hover:translate-y-[-8px] active:translate-y-2 text-left relative overflow-hidden"
          style={{
            background: 'rgba(255, 0, 70, 0.3)',
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            boxShadow: '0 12px 0 #d12456, 0 16px 40px rgba(255, 0, 70, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.5)',
            border: '2px solid rgba(255, 0, 70, 0.4)',
          }}
        >
          <div className="text-8xl mb-6">🎨</div>
          <h3 className="text-4xl font-black text-white mb-3" style={{ textShadow: '3px 3px 6px rgba(0,0,0,0.3)' }}>
            Figures Mensuals
          </h3>
          <p className="text-xl font-semibold text-white/90 mb-6">
            Aprova figures per votacions mensuals
          </p>
          {pendingFiguresCount > 0 && (
            <div 
              className="inline-block px-6 py-3 rounded-full"
              style={{
                background: 'rgba(255, 255, 255, 0.4)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <span className="text-2xl font-black text-white" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
                {pendingFiguresCount} pendent{pendingFiguresCount !== 1 ? 's' : ''}
              </span>
            </div>
          )}
        </button>
      </div>
    </motion.div>
  );
}