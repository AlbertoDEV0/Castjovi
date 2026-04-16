import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Shield, Check, X, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../context/AppContext';
import logo from 'figma:asset/0081a052804ec7847481a069748cce6d1f99d5ed.png';
import { toast } from 'sonner';

export default function AdminFigures() {
  const navigate = useNavigate();
  const { monthlySubmissions, approveMonthlySubmission, rejectMonthlySubmission, addVotingCandidate } = useApp();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const pendingSubmissions = monthlySubmissions.filter(submission => submission.status === 'pending');

  const handleApprove = (submissionId: string) => {
    const submission = monthlySubmissions.find(s => s.id === submissionId);
    if (!submission) return;

    // Aprobar la submission
    approveMonthlySubmission(submissionId);

    // Añadir a votaciones mensuals
    addVotingCandidate({
      id: submissionId,
      username: submission.username,
      userAvatar: submission.userAvatar,
      avatarColor: submission.avatarColor,
      imageUrl: submission.imageUrl,
      title: submission.title,
      date: submission.date,
    });

    toast.success('Figura aprovada i afegida a Votacions Mensuals! ✅🗳️');
  };

  const handleReject = (submissionId: string) => {
    rejectMonthlySubmission(submissionId);
    toast.error('Figura mensual rebutjada ❌');
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
        <div className="flex justify-center mb-4">
          <div 
            className="p-6 rounded-full"
            style={{
              background: 'linear-gradient(145deg, #ff0046, #ff4570)',
              boxShadow: '0 6px 0 #d12456, 0 8px 20px rgba(255, 0, 70, 0.3)',
            }}
          >
            <Shield className="size-16 text-white" />
          </div>
        </div>
        <h2 
          className="text-5xl font-black mb-2"
          style={{
            color: '#ff8000',
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
          }}
        >
          Figures Mensuals Enviades 🎨
        </h2>
        <p className="text-xl text-gray-600 font-semibold">Revisa i aprova les figures dels usuaris</p>
      </div>

      {/* Contenido */}
      <div className="max-w-7xl mx-auto relative z-10">
        {pendingSubmissions.length === 0 ? (
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
            <Shield className="size-24 text-gray-400 mx-auto mb-4" />
            <p className="text-3xl font-black text-gray-600">
              No hi ha figures pendents de revisió
            </p>
            <p className="text-xl text-gray-500 font-semibold mt-4">
              Totes les figures han estat revisades!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-8">
            {pendingSubmissions.map((submission) => (
              <div
                key={submission.id}
                className="rounded-[2rem] overflow-hidden transition-all duration-200 hover:translate-y-[-4px]"
                style={{
                  background: 'rgba(255, 255, 255, 0.15)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                }}
              >
                {/* Header */}
                <div className="p-4 flex items-center gap-3">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
                    style={{
                      background: `linear-gradient(145deg, ${submission.avatarColor}, ${submission.avatarColor}dd)`,
                      boxShadow: `0 4px 0 ${submission.avatarColor}cc`,
                    }}
                  >
                    {submission.userAvatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-black text-gray-800 truncate">{submission.username}</h3>
                    <p className="text-xs text-gray-500 font-semibold">
                      {new Date(submission.date).toLocaleDateString('ca-ES')}
                    </p>
                  </div>
                </div>

                {/* Título y descripción */}
                <div className="px-4 pb-3">
                  <p className="text-xl font-black text-gray-800 mb-2">{submission.title}</p>
                  <p className="text-sm text-gray-600 font-semibold line-clamp-2">{submission.description}</p>
                </div>

                {/* Imagen */}
                <div className="w-full aspect-square overflow-hidden bg-gray-100 relative group cursor-pointer"
                  onClick={() => setSelectedImage(submission.imageUrl)}
                >
                  <img
                    src={submission.imageUrl}
                    alt={submission.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Eye className="size-12 text-white" />
                  </div>
                </div>

                {/* Acciones */}
                <div className="p-4 flex gap-3">
                  <button
                    onClick={() => handleApprove(submission.id)}
                    className="flex-1 py-3 px-4 rounded-full text-lg font-black transition-all duration-200 hover:scale-105 active:scale-95"
                    style={{
                      background: 'rgba(132, 204, 22, 0.3)',
                      backdropFilter: 'blur(20px) saturate(180%)',
                      WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                      color: 'white',
                      boxShadow: '0 4px 16px rgba(132, 204, 22, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.5)',
                      border: '1px solid rgba(132, 204, 22, 0.4)',
                      textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                    }}
                  >
                    <Check className="inline size-5 mr-2" />
                    Aprovar
                  </button>

                  <button
                    onClick={() => handleReject(submission.id)}
                    className="flex-1 py-3 px-4 rounded-full text-lg font-black transition-all duration-200 hover:scale-105 active:scale-95"
                    style={{
                      background: 'rgba(255, 0, 70, 0.3)',
                      backdropFilter: 'blur(20px) saturate(180%)',
                      WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                      color: 'white',
                      boxShadow: '0 4px 16px rgba(255, 0, 70, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.5)',
                      border: '1px solid rgba(255, 0, 70, 0.4)',
                      textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                    }}
                  >
                    <X className="inline size-5 mr-2" />
                    Rebutjar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal de imagen ampliada */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.8)' }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl max-h-[90vh]"
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-4 -right-4 p-4 rounded-full transition-all hover:scale-110 z-10"
                style={{
                  background: 'linear-gradient(145deg, #ff0046, #ff4570)',
                  boxShadow: '0 4px 0 #d12456, 0 6px 15px rgba(255, 0, 70, 0.3)',
                }}
              >
                <X className="size-8 text-white" />
              </button>
              <img
                src={selectedImage}
                alt="Vista ampliada"
                className="rounded-3xl max-w-full max-h-[90vh] object-contain"
                style={{
                  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}