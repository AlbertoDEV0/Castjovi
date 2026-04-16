import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Heart, MessageCircle, Share2, Shield, ChevronLeft, ChevronRight, Vote, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import PostDetail from '../components/PostDetail';
import { PostForm } from '../components/PostForm';
import VotingCard from '../components/VotingCard';
import logo from 'figma:asset/0081a052804ec7847481a069748cce6d1f99d5ed.png';
import { toast } from 'sonner';
import { useApp, globalMockPosts } from '../context/AppContext';

export default function Social() {
  const navigate = useNavigate();
  const { addPendingPost, approvedPosts, userProfile, likedPosts, toggleLike, getPostLikes, votingCandidates, voteForCandidate, userVotes, availableScores } = useApp();
  
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedPost, setSelectedPost] = useState<any | null>(null);
  const [showPostForm, setShowPostForm] = useState(false);
  const [viewMode, setViewMode] = useState<'feed' | 'voting'>('feed');
  
  // Función para obtener el número real de comentarios desde localStorage
  const getCommentsCount = (postId: string) => {
    try {
      if (typeof window === 'undefined' || !window.localStorage) {
        return 0;
      }
      const stored = localStorage.getItem(`comments_${postId}`);
      if (stored) {
        const comments = JSON.parse(stored);
        return Array.isArray(comments) ? comments.length : 0;
      }
    } catch {
      return 0;
    }
    return 0;
  };

  // Función para calcular "timeAgo" dinámico
  const getTimeAgo = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - new Date(date).getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Ara mateix';
    if (diffMins < 60) return `Fa ${diffMins} min`;
    if (diffHours < 24) return `Fa ${diffHours} ${diffHours === 1 ? 'hora' : 'hores'}`;
    return `Fa ${diffDays} ${diffDays === 1 ? 'dia' : 'dies'}`;
  };

  // Combinar posts aprobados con mockPosts
  const allPosts = [
    ...approvedPosts.map(post => ({
      ...post,
      timeAgo: getTimeAgo(post.createdDate),
      comments: getCommentsCount(post.id),
    })),
    ...globalMockPosts.map(post => ({
      ...post,
      comments: getCommentsCount(post.id),
    })),
  ];
  
  const postsPerPage = 9;
  const totalPages = Math.ceil(allPosts.length / postsPerPage);
  const startIndex = currentPage * postsPerPage;
  const currentPosts = allPosts.slice(startIndex, startIndex + postsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleShareMyIdeas = () => {
    setShowPostForm(true);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      toast.success('Foto enviada! Revisarem la teva creació aviat 🎨');
    }
  };

  const handleSharePost = (postId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    toast.success('Post compartit amb els teus amics! 📤');
  };

  const handlePostSubmit = (title: string, description: string, imageUrl: string) => {
    addPendingPost({
      username: userProfile.username || 'Tu',
      userAvatar: userProfile.avatar || '😊',
      avatarColor: userProfile.avatarColor || '#ffdd00',
      title,
      description,
      imageUrl,
    });
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

      {/* Decoraciones con nueva paleta */}
      <div className="absolute top-20 left-20 w-20 h-20 rounded-full opacity-30 blur-sm" style={{ background: 'linear-gradient(135deg, #ff0046, #ff4570)' }}></div>
      <div className="absolute bottom-40 right-20 w-24 h-24 rounded-full opacity-30 blur-sm" style={{ background: 'linear-gradient(135deg, #00a1e8, #4ab8f0)' }}></div>

      {/* Header con liquid glass estil Apple */}
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

        <div className="w-36"></div>
      </div>

      {/* Banner de seguridad con liquid glass */}
      <div 
        className="max-w-7xl mx-auto mb-10 rounded-[2rem] p-6 flex items-center gap-4 relative z-10"
        style={{
          background: 'rgba(132, 204, 22, 0.3)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          boxShadow: '0 8px 32px rgba(132, 204, 22, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.5), 0 1px 0 rgba(255, 255, 255, 0.3)',
          border: '1px solid rgba(132, 204, 22, 0.4)',
        }}
      >
        <div 
          className="p-4 rounded-full"
          style={{
            background: 'rgba(255, 255, 255, 0.3)',
          }}
        >
          <Shield className="size-10 text-white" />
        </div>
        <div>
          <h3 className="text-2xl font-black text-white mb-1" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
            Espai Segur i Moderat
          </h3>
          <p className="text-lg text-white/90 font-semibold">
            Totes les publicacions són revisades per adults per garantir un entorn segur
          </p>
        </div>
      </div>

      {/* Título */}
      <div className="text-center mb-10 relative z-10">
        <h2 
          className="text-5xl font-black mb-2"
          style={{
            color: '#ff8000',
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
          }}
        >
          Comunitat CASTJOVI 💬
        </h2>
        <p className="text-xl text-gray-600 font-semibold">
          {viewMode === 'feed' ? 'Descobreix les creacions d\'altres usuaris!' : 'Vota les millors figures del mes!'}
        </p>
      </div>

      {/* Toggle Feed/Votaciones */}
      <div className="max-w-3xl mx-auto mb-10 flex gap-4 justify-center relative z-10">
        <button
          onClick={() => setViewMode('feed')}
          className="px-10 py-4 rounded-full text-2xl font-black transition-all duration-200 hover:translate-y-[-4px] active:translate-y-1"
          style={{
            background: viewMode === 'feed' 
              ? 'rgba(0, 161, 232, 0.3)' 
              : 'rgba(255, 255, 255, 0.35)',
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            color: 'white',
            boxShadow: viewMode === 'feed'
              ? '0 8px 32px rgba(0, 161, 232, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.5)'
              : '0 4px 16px rgba(0, 0, 0, 0.1)',
            border: viewMode === 'feed'
              ? '1px solid rgba(0, 161, 232, 0.4)'
              : '1px solid rgba(255, 255, 255, 0.4)',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
          }}
        >
          <MessageCircle className="inline size-8 mr-2" />
          Feed Social
        </button>

        <button
          onClick={() => setViewMode('voting')}
          className="px-10 py-4 rounded-full text-2xl font-black transition-all duration-200 hover:translate-y-[-4px] active:translate-y-1"
          style={{
            background: viewMode === 'voting' 
              ? 'rgba(255, 128, 0, 0.3)' 
              : 'rgba(255, 255, 255, 0.35)',
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            color: 'white',
            boxShadow: viewMode === 'voting'
              ? '0 8px 32px rgba(255, 128, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.5)'
              : '0 4px 16px rgba(0, 0, 0, 0.1)',
            border: viewMode === 'voting'
              ? '1px solid rgba(255, 128, 0, 0.4)'
              : '1px solid rgba(255, 255, 255, 0.4)',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
          }}
        >
          <Vote className="inline size-8 mr-2" />
          Votacions Mensuals
          {votingCandidates.length > 0 && (
            <span className="ml-2 px-3 py-1 rounded-full text-lg" style={{
              background: 'rgba(255, 255, 255, 0.3)',
            }}>
              {votingCandidates.length}
            </span>
          )}
        </button>

        {/* Botón para ver el podio */}
        {votingCandidates.length >= 5 && (
          <button
            onClick={() => navigate('/podium')}
            className="px-10 py-4 rounded-full text-2xl font-black transition-all duration-200 hover:translate-y-[-4px] active:translate-y-1"
            style={{
              background: 'rgba(255, 221, 0, 0.3)',
              backdropFilter: 'blur(20px) saturate(180%)',
              WebkitBackdropFilter: 'blur(20px) saturate(180%)',
              color: 'white',
              boxShadow: '0 8px 32px rgba(255, 221, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.5)',
              border: '1px solid rgba(255, 221, 0, 0.4)',
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
            }}
          >
            <TrendingUp className="inline size-8 mr-2" />
            Veure Podio 🏆
          </button>
        )}
      </div>

      {/* Indicador de votos restantes */}
      {viewMode === 'voting' && (
        <div 
          className="max-w-3xl mx-auto mb-8 rounded-[2rem] p-4 flex items-center justify-center gap-3 relative z-10"
          style={{
            background: 'rgba(255, 221, 0, 0.3)',
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            boxShadow: '0 4px 16px rgba(255, 221, 0, 0.3)',
            border: '1px solid rgba(255, 221, 0, 0.4)',
          }}
        >
          <Vote className="size-8 text-white" />
          <span className="text-2xl font-black text-white" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
            Puntuacions disponibles: {availableScores.length} / 5
          </span>
        </div>
      )}

      {/* Feed con grid horizontal de 3 en 3 */}
      <div className="max-w-7xl mx-auto relative z-10">
        <AnimatePresence mode="wait">
          {viewMode === 'feed' ? (
            <motion.div
              key={`feed-${currentPage}`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-3 gap-8"
            >
              {currentPosts.map((post) => (
                <div
                  key={post.id}
                  onClick={() => setSelectedPost(post)}
                  className="rounded-[2rem] overflow-hidden transition-all duration-200 hover:translate-y-[-4px] cursor-pointer"
                  style={{
                    background: 'rgba(255, 255, 255, 0.15)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.3), 0 1px 0 rgba(255, 255, 255, 0.2)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                  }}
                >
                  {/* Header del post */}
                  <div className="p-4 flex items-center gap-3">
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
                      style={{
                        background: `linear-gradient(145deg, ${post.avatarColor}, ${post.avatarColor}dd)`,
                        boxShadow: `0 4px 0 ${post.avatarColor}cc, 0 6px 15px ${post.avatarColor}66`,
                      }}
                    >
                      {post.userAvatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-black text-gray-800 truncate">{post.username}</h3>
                        {post.verified && (
                          <div 
                            className="p-1 rounded-full flex-shrink-0"
                            style={{
                              background: 'linear-gradient(145deg, #84cc16, #65a30d)',
                            }}
                          >
                            <Shield className="size-4 text-white" />
                          </div>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 font-semibold">{post.timeAgo}</p>
                    </div>
                  </div>

                  {/* Texto del post */}
                  <div className="px-4 pb-3">
                    <p className="text-base text-gray-800 font-bold line-clamp-2">{post.figure}</p>
                  </div>

                  {/* Imagen */}
                  <div className="w-full aspect-square overflow-hidden bg-gray-100">
                    <img
                      src={post.image}
                      alt={post.figure}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Acciones */}
                  <div className="p-4 flex items-center gap-4">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleLike(post.id);
                      }}
                      className="flex items-center gap-2 transition-all duration-200 hover:scale-110 active:scale-95"
                    >
                      <div 
                        className="p-2 rounded-full"
                        style={{
                          background: likedPosts.has(post.id) 
                            ? 'rgba(255, 0, 70, 0.25)' 
                            : 'rgba(229, 231, 235, 0.25)',
                          backdropFilter: 'blur(10px)',
                          WebkitBackdropFilter: 'blur(10px)',
                          border: likedPosts.has(post.id)
                            ? '1px solid rgba(255, 0, 70, 0.3)'
                            : '1px solid rgba(229, 231, 235, 0.3)',
                        }}
                      >
                        <Heart 
                          className={`size-5 ${likedPosts.has(post.id) ? 'fill-[#ff0046] text-[#ff0046]' : 'text-gray-600'}`}
                        />
                      </div>
                      <span className="text-sm font-black text-gray-700">
                        {post.likes + (likedPosts.has(post.id) ? 1 : 0)}
                      </span>
                    </button>

                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedPost(post);
                      }}
                      className="flex items-center gap-2 transition-all duration-200 hover:scale-110 active:scale-95"
                    >
                      <div 
                        className="p-2 rounded-full"
                        style={{
                          background: 'rgba(0, 161, 232, 0.25)',
                          backdropFilter: 'blur(10px)',
                          WebkitBackdropFilter: 'blur(10px)',
                          border: '1px solid rgba(0, 161, 232, 0.3)',
                        }}
                      >
                        <MessageCircle className="size-5 text-[#00a1e8]" />
                      </div>
                      <span className="text-sm font-black text-gray-700">{post.comments}</span>
                    </button>

                    <button 
                      onClick={(e) => handleSharePost(post.id, e)}
                      className="flex items-center gap-2 transition-all duration-200 hover:scale-110 active:scale-95 ml-auto"
                    >
                      <div 
                        className="p-2 rounded-full"
                        style={{
                          background: 'rgba(229, 231, 235, 0.35)',
                          backdropFilter: 'blur(10px) saturate(180%)',
                          WebkitBackdropFilter: 'blur(10px) saturate(180%)',
                          border: '1px solid rgba(229, 231, 235, 0.4)',
                        }}
                      >
                        <Share2 className="size-5 text-gray-600" />
                      </div>
                    </button>
                  </div>
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="voting"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-3 gap-8"
            >
              {votingCandidates.length === 0 ? (
                <div className="col-span-3">
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
                    <Vote className="size-24 text-gray-400 mx-auto mb-4" />
                    <p className="text-3xl font-black text-gray-600">
                      No hi ha votacions actives ara mateix
                    </p>
                    <p className="text-xl text-gray-500 font-semibold mt-4">
                      Aviat podràs votar les millors figures mensuals! 🎨
                    </p>
                  </div>
                </div>
              ) : (
                votingCandidates.map((candidate) => (
                  <VotingCard
                    key={candidate.id}
                    candidate={candidate}
                    onVote={(id, score) => voteForCandidate(id, score)}
                    availableScores={availableScores}
                    currentVote={userVotes[candidate.id]}
                  />
                ))
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Controles de paginación con liquid glass */}
      <div className="max-w-7xl mx-auto mt-10 flex items-center justify-center gap-6 relative z-10">
        <button
          onClick={prevPage}
          disabled={currentPage === 0}
          className="p-4 rounded-full transition-all duration-200 hover:translate-y-[-4px] active:translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            background: currentPage === 0 
              ? 'rgba(229, 231, 235, 0.3)' 
              : 'rgba(0, 161, 232, 0.3)',
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            boxShadow: currentPage === 0 
              ? '0 4px 16px rgba(0, 0, 0, 0.1)' 
              : '0 8px 32px rgba(0, 161, 232, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.5)',
            border: currentPage === 0 
              ? '1px solid rgba(229, 231, 235, 0.4)' 
              : '1px solid rgba(0, 161, 232, 0.4)',
          }}
        >
          <ChevronLeft className="size-10 text-white" />
        </button>

        <div className="flex gap-3">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index)}
              className="w-4 h-4 rounded-full transition-all"
              style={{
                background: currentPage === index 
                  ? 'linear-gradient(145deg, #ff8000, #ffa347)' 
                  : 'linear-gradient(145deg, #E5E7EB, #D1D5DB)',
                boxShadow: currentPage === index 
                  ? '0 3px 0 #d96b00, 0 5px 10px rgba(255, 128, 0, 0.3)' 
                  : '0 2px 0 #9CA3AF',
              }}
            />
          ))}
        </div>

        <button
          onClick={nextPage}
          disabled={currentPage === totalPages - 1}
          className="p-4 rounded-full transition-all duration-200 hover:translate-y-[-4px] active:translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            background: currentPage === totalPages - 1 
              ? 'rgba(229, 231, 235, 0.3)' 
              : 'rgba(0, 161, 232, 0.3)',
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            boxShadow: currentPage === totalPages - 1 
              ? '0 4px 16px rgba(0, 0, 0, 0.1)' 
              : '0 8px 32px rgba(0, 161, 232, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.5)',
            border: currentPage === totalPages - 1 
              ? '1px solid rgba(229, 231, 235, 0.4)' 
              : '1px solid rgba(0, 161, 232, 0.4)',
          }}
        >
          <ChevronRight className="size-10 text-white" />
        </button>
      </div>

      {/* Input hidden para subir fotos */}
      <input
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleImageUpload}
        className="hidden"
      />

      {/* Botón para compartir con liquid glass */}
      <div className="mt-16 flex justify-center relative z-10">
        <button 
          onClick={handleShareMyIdeas}
          className="flex items-center gap-4 px-12 py-6 rounded-full text-3xl font-black transition-all duration-200 hover:translate-y-[-6px] active:translate-y-1"
          style={{
            background: 'rgba(255, 0, 70, 0.3)',
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            color: 'white',
            boxShadow: '0 8px 32px rgba(255, 0, 70, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.5), 0 1px 0 rgba(255, 255, 255, 0.3)',
            border: '1px solid rgba(255, 0, 70, 0.4)',
            textShadow: '3px 3px 6px rgba(0,0,0,0.3)',
          }}
        >
          <span className="text-5xl">📸</span>
          Compartir les meves Idees
        </button>
      </div>

      {/* Modal de detalle de post */}
      <AnimatePresence>
        {selectedPost && (
          <PostDetail
            post={selectedPost}
            isLiked={likedPosts.has(selectedPost.id)}
            onClose={() => setSelectedPost(null)}
            onToggleLike={() => toggleLike(selectedPost.id)}
          />
        )}
      </AnimatePresence>

      {/* Modal de formulario de post */}
      <AnimatePresence>
        {showPostForm && (
          <PostForm
            onClose={() => setShowPostForm(false)}
            onSubmit={handlePostSubmit}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}