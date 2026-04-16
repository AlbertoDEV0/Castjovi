import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Check, X } from 'lucide-react';
import { motion } from 'motion/react';
import logo from 'figma:asset/0081a052804ec7847481a069748cce6d1f99d5ed.png';
import { toast } from 'sonner';
import { useApp } from '../context/AppContext';

export default function AdminPostSocial() {
  const navigate = useNavigate();
  const { pendingPosts, approvePost, rejectPost } = useApp();

  const handleApprove = (postId: string) => {
    approvePost(postId);
    toast.success('Post aprovat i publicat a Social! ✅');
  };

  const handleReject = (postId: string) => {
    rejectPost(postId);
    toast.error('Post rebutjat ❌');
  };

  // Filtrar solo los posts pendientes
  const posts = pendingPosts.filter(p => p.status === 'pending');

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
      <div className="absolute top-20 left-20 w-20 h-20 rounded-full opacity-30 blur-sm" style={{ background: 'linear-gradient(135deg, #84cc16, #a3e635)' }}></div>
      <div className="absolute bottom-40 right-20 w-24 h-24 rounded-full opacity-30 blur-sm" style={{ background: 'linear-gradient(135deg, #00a1e8, #4ab8f0)' }}></div>

      {/* Header */}
      <div className="flex items-center justify-between mb-16 relative z-10">
        <button
          onClick={() => navigate('/admin/dashboard')}
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
          Posts Socials 💬
        </h2>
        <p className="text-xl text-gray-600 font-semibold">Posts pendents de revisió per publicar a Social</p>
      </div>

      {/* Lista de posts pendientes */}
      <div className="max-w-6xl mx-auto relative z-10">
        {posts.length === 0 ? (
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
              No hi ha posts socials pendents de revisió ✅
            </p>
            <p className="text-xl text-gray-500 font-semibold mt-4">
              Els posts publicats apareixeran a la secció Social
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {posts.map((post) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="rounded-[2rem] overflow-hidden"
                style={{
                  background: 'linear-gradient(145deg, #ffffff, #f5f5f5)',
                  boxShadow: '0 8px 0 #d0d0d0, 0 12px 30px rgba(0, 0, 0, 0.15)',
                }}
              >
                <div className="grid grid-cols-2 gap-8 p-8">
                  {/* Imagen */}
                  <div className="rounded-xl overflow-hidden aspect-square">
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Información */}
                  <div className="flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <div 
                          className="w-16 h-16 rounded-full flex items-center justify-center text-3xl"
                          style={{
                            background: `linear-gradient(145deg, ${post.avatarColor}, ${post.avatarColor}dd)`,
                            boxShadow: `0 4px 0 ${post.avatarColor}cc, 0 6px 15px ${post.avatarColor}66`,
                          }}
                        >
                          {post.userAvatar}
                        </div>
                        <div>
                          <h3 className="text-2xl font-black text-gray-800">{post.username}</h3>
                          <p className="text-sm text-gray-500 font-semibold">
                            {post.date.toLocaleDateString('ca-ES')}
                          </p>
                        </div>
                      </div>

                      <h4 className="text-3xl font-black text-gray-900 mb-3">{post.title}</h4>
                      <p className="text-xl text-gray-700 font-semibold mb-4 leading-relaxed">
                        {post.description}
                      </p>
                      
                      <div 
                        className="inline-block px-4 py-2 rounded-full"
                        style={{
                          background: 'rgba(132, 204, 22, 0.2)',
                          border: '2px solid #84cc16',
                        }}
                      >
                        <span className="text-base font-black text-[#84cc16]">
                          📤 Post Social
                        </span>
                      </div>
                    </div>

                    {/* Botones de acción */}
                    <div className="flex gap-4 mt-6">
                      <button
                        onClick={() => handleReject(post.id)}
                        className="flex-1 py-4 px-6 rounded-full text-xl font-black transition-all duration-200 hover:translate-y-[-4px] active:translate-y-1 flex items-center justify-center gap-3"
                        style={{
                          background: 'linear-gradient(145deg, #ff0046, #ff4570)',
                          color: 'white',
                          boxShadow: '0 6px 0 #d12456, 0 8px 20px rgba(255, 0, 70, 0.3)',
                          textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                        }}
                      >
                        <X className="size-6" />
                        Rebutjar
                      </button>

                      <button
                        onClick={() => handleApprove(post.id)}
                        className="flex-1 py-4 px-6 rounded-full text-xl font-black transition-all duration-200 hover:translate-y-[-4px] active:translate-y-1 flex items-center justify-center gap-3"
                        style={{
                          background: 'linear-gradient(145deg, #84cc16, #a3e635)',
                          color: 'white',
                          boxShadow: '0 6px 0 #65a30d, 0 8px 20px rgba(132, 204, 22, 0.3)',
                          textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                        }}
                      >
                        <Check className="size-6" />
                        Aprovar i Publicar
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}