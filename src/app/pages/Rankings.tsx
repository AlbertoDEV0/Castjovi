import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Trophy, Heart, Star, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import PostDetail from '../components/PostDetail';
import logo from 'figma:asset/0081a052804ec7847481a069748cce6d1f99d5ed.png';
import { useApp, globalMockPosts } from '../context/AppContext';

// Mock data de rankings
const topUsersByCollections = [
  { id: '1', username: 'Maria_collectora', collections: 3, avatar: '👧' },
  { id: '2', username: 'Joan_master', collections: 3, avatar: '👦' },
  { id: '3', username: 'Sofia_pro', collections: 2, avatar: '👧' },
  { id: '4', username: 'Pere_expert', collections: 2, avatar: '👦' },
  { id: '5', username: 'Lucia_star', collections: 1, avatar: '👧' },
];

// Mock data de usuarios con más estrellas
const topUsersByStars = [
  { id: '1', username: 'Joan_master', stars: 450, avatar: '👦', avatarColor: '#00a1e8' },
  { id: '2', username: 'Maria_collectora', stars: 380, avatar: '👧', avatarColor: '#ff0046' },
  { id: '3', username: 'Sofia_pro', stars: 320, avatar: '👧', avatarColor: '#84cc16' },
  { id: '4', username: 'Carles_jovi', stars: 290, avatar: '👦', avatarColor: '#ffdd00' },
  { id: '5', username: 'Anna_plastilina', stars: 250, avatar: '👧', avatarColor: '#ff8000' },
];

export default function Rankings() {
  const navigate = useNavigate();
  const { approvedPosts, collections, userProfile, likedPosts, toggleLike, getPostLikes, stars } = useApp();
  const [activeTab, setActiveTab] = useState<'posts' | 'users' | 'stars'>('posts');
  const [selectedPost, setSelectedPost] = useState<any | null>(null);
  
  // Combinar posts aprobados con mockPosts y calcular likes totales
  const allPostsWithLikes = [
    ...approvedPosts.map(post => ({
      ...post,
      totalLikes: post.likes + (likedPosts.has(post.id) ? 1 : 0),
    })),
    ...globalMockPosts.map(post => ({
      ...post,
      totalLikes: post.likes + (likedPosts.has(post.id) ? 1 : 0),
    })),
  ];

  // Ordenar por likes y tomar los top 5
  const topPostsByLikes = allPostsWithLikes
    .sort((a, b) => b.totalLikes - a.totalLikes)
    .slice(0, 5)
    .map((post, index) => ({
      id: post.id,
      username: post.username,
      title: post.figure,
      likes: post.totalLikes,
      avatar: post.userAvatar,
      fullPost: post,
    }));

  // Calcular colecciones completadas del usuario
  const userCompletedCollections = collections.filter(col => 
    col.figures.every(fig => fig.completed)
  ).length;

  // Crear ranking dinámico de usuarios con colecciones
  const topUsersByCollectionsDynamic = [
    // Si el usuario tiene colecciones, añadirlo
    ...(userProfile.username && userCompletedCollections > 0 ? [{
      id: 'user',
      username: userProfile.username || 'Tu',
      collections: userCompletedCollections,
      avatar: userProfile.avatar || '😊',
    }] : []),
    ...topUsersByCollections.slice(0, 5).map(user => ({
      ...user,
    })),
  ].sort((a, b) => b.collections - a.collections).slice(0, 5);

  const handlePostClick = (post: any) => {
    setSelectedPost(post);
  };

  const getMedalColor = (position: number) => {
    switch (position) {
      case 0:
        return '#ffdd00'; // Oro
      case 1:
        return '#C0C0C0'; // Plata
      case 2:
        return '#CD7F32'; // Bronce
      default:
        return '#e5e7eb';
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
              background: 'linear-gradient(145deg, #ffdd00, #ffe747)',
              boxShadow: '0 6px 0 #d4b800, 0 8px 20px rgba(255, 221, 0, 0.3)',
            }}
          >
            <Trophy className="size-16 text-white" />
          </div>
        </div>
        <h2 
          className="text-5xl font-black mb-2"
          style={{
            color: '#ff8000',
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
          }}
        >
          Rànquings 🏆
        </h2>
        <p className="text-xl text-gray-600 font-semibold">Els millors de CASTJOVI!</p>
      </div>

      {/* Tabs */}
      <div className="max-w-4xl mx-auto mb-10 flex gap-4 justify-center relative z-10">
        <button
          onClick={() => setActiveTab('posts')}
          className="px-10 py-4 rounded-full text-2xl font-black transition-all duration-200 hover:translate-y-[-4px] active:translate-y-1"
          style={{
            background: activeTab === 'posts' 
              ? 'rgba(255, 0, 70, 0.3)' 
              : 'rgba(255, 255, 255, 0.35)',
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            color: 'white',
            boxShadow: activeTab === 'posts'
              ? '0 8px 32px rgba(255, 0, 70, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.5)'
              : '0 4px 16px rgba(0, 0, 0, 0.1)',
            border: activeTab === 'posts'
              ? '1px solid rgba(255, 0, 70, 0.4)'
              : '1px solid rgba(255, 255, 255, 0.4)',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
          }}
        >
          <Heart className="inline size-8 mr-2" />
          Posts amb Més Likes
        </button>

        <button
          onClick={() => setActiveTab('users')}
          className="px-10 py-4 rounded-full text-2xl font-black transition-all duration-200 hover:translate-y-[-4px] active:translate-y-1"
          style={{
            background: activeTab === 'users' 
              ? 'rgba(132, 204, 22, 0.3)' 
              : 'rgba(255, 255, 255, 0.35)',
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            color: 'white',
            boxShadow: activeTab === 'users'
              ? '0 8px 32px rgba(132, 204, 22, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.5)'
              : '0 4px 16px rgba(0, 0, 0, 0.1)',
            border: activeTab === 'users'
              ? '1px solid rgba(132, 204, 22, 0.4)'
              : '1px solid rgba(255, 255, 255, 0.4)',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
          }}
        >
          <Star className="inline size-8 mr-2" />
          Usuaris amb Més Col·leccions
        </button>

        <button
          onClick={() => setActiveTab('stars')}
          className="px-10 py-4 rounded-full text-2xl font-black transition-all duration-200 hover:translate-y-[-4px] active:translate-y-1"
          style={{
            background: activeTab === 'stars' 
              ? 'rgba(255, 215, 0, 0.3)' 
              : 'rgba(255, 255, 255, 0.35)',
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            color: 'white',
            boxShadow: activeTab === 'stars'
              ? '0 8px 32px rgba(255, 215, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.5)'
              : '0 4px 16px rgba(0, 0, 0, 0.1)',
            border: activeTab === 'stars'
              ? '1px solid rgba(255, 215, 0, 0.4)'
              : '1px solid rgba(255, 255, 255, 0.4)',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
          }}
        >
          <Sparkles className="inline size-8 mr-2" />
          Usuaris amb Més Estrelles
        </button>
      </div>

      {/* Rankings */}
      <div className="max-w-4xl mx-auto relative z-10">
        {activeTab === 'posts' ? (
          <div className="space-y-4">
            {topPostsByLikes.map((post, index) => (
              <motion.button
                key={post.id}
                onClick={() => handlePostClick(post.fullPost)}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="w-full rounded-[2rem] p-6 flex items-center gap-6 transition-all duration-200 hover:translate-y-[-4px] active:translate-y-1"
                style={{
                  background: 'linear-gradient(145deg, #ffffff, #f5f5f5)',
                  boxShadow: '0 6px 0 #d0d0d0, 0 10px 25px rgba(0, 0, 0, 0.15)',
                }}
              >
                {/* Posición */}
                <div 
                  className="w-20 h-20 rounded-full flex items-center justify-center text-3xl font-black text-white flex-shrink-0"
                  style={{
                    background: `linear-gradient(145deg, ${getMedalColor(index)}, ${getMedalColor(index)}dd)`,
                    boxShadow: `0 4px 0 ${getMedalColor(index)}cc`,
                  }}
                >
                  {index + 1}
                </div>

                {/* Avatar */}
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center text-3xl flex-shrink-0"
                  style={{
                    background: 'linear-gradient(145deg, #00a1e8, #4ab8f0)',
                    boxShadow: '0 4px 0 #0086c3',
                  }}
                >
                  {post.avatar}
                </div>

                {/* Info */}
                <div className="flex-1 text-left">
                  <h3 className="text-2xl font-black text-gray-800">{post.username}</h3>
                  <p className="text-lg text-gray-600 font-semibold">{post.title}</p>
                </div>

                {/* Likes */}
                <div className="flex items-center gap-3">
                  <Heart className="size-10 fill-[#ff0046] text-[#ff0046]" />
                  <span className="text-3xl font-black text-gray-800">{post.likes}</span>
                </div>
              </motion.button>
            ))}
          </div>
        ) : activeTab === 'users' ? (
          <div className="space-y-4">
            {topUsersByCollectionsDynamic.map((user, index) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="rounded-[2rem] p-6 flex items-center gap-6"
                style={{
                  background: 'linear-gradient(145deg, #ffffff, #f5f5f5)',
                  boxShadow: '0 6px 0 #d0d0d0, 0 10px 25px rgba(0, 0, 0, 0.15)',
                }}
              >
                {/* Posición */}
                <div 
                  className="w-20 h-20 rounded-full flex items-center justify-center text-3xl font-black text-white flex-shrink-0"
                  style={{
                    background: `linear-gradient(145deg, ${getMedalColor(index)}, ${getMedalColor(index)}dd)`,
                    boxShadow: `0 4px 0 ${getMedalColor(index)}cc`,
                  }}
                >
                  {index + 1}
                </div>

                {/* Avatar */}
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center text-3xl flex-shrink-0"
                  style={{
                    background: 'linear-gradient(145deg, #84cc16, #a3e635)',
                    boxShadow: '0 4px 0 #65a30d',
                  }}
                >
                  {user.avatar}
                </div>

                {/* Info */}
                <div className="flex-1">
                  <h3 className="text-2xl font-black text-gray-800">{user.username}</h3>
                  <p className="text-lg text-gray-600 font-semibold">
                    {user.collections} col·leccion{user.collections !== 1 ? 's' : ''} completad{user.collections !== 1 ? 'es' : 'a'}
                  </p>
                </div>

                {/* Icono */}
                <Trophy className="size-12 text-[#ffdd00]" />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {topUsersByStars.map((user, index) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="rounded-[2rem] p-6 flex items-center gap-6"
                style={{
                  background: 'linear-gradient(145deg, #ffffff, #f5f5f5)',
                  boxShadow: '0 6px 0 #d0d0d0, 0 10px 25px rgba(0, 0, 0, 0.15)',
                }}
              >
                {/* Posición */}
                <div 
                  className="w-20 h-20 rounded-full flex items-center justify-center text-3xl font-black text-white flex-shrink-0"
                  style={{
                    background: `linear-gradient(145deg, ${getMedalColor(index)}, ${getMedalColor(index)}dd)`,
                    boxShadow: `0 4px 0 ${getMedalColor(index)}cc`,
                  }}
                >
                  {index + 1}
                </div>

                {/* Avatar */}
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center text-3xl flex-shrink-0"
                  style={{
                    background: `linear-gradient(145deg, ${user.avatarColor}, ${user.avatarColor}dd)`,
                    boxShadow: `0 4px 0 ${user.avatarColor}cc`,
                  }}
                >
                  {user.avatar}
                </div>

                {/* Info */}
                <div className="flex-1">
                  <h3 className="text-2xl font-black text-gray-800">{user.username}</h3>
                  <p className="text-lg text-gray-600 font-semibold">
                    {user.stars} estrel{user.stars !== 1 ? 'les' : 'la'}
                  </p>
                </div>

                {/* Icono */}
                <Sparkles className="size-12 text-[#ffdd00]" />
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Post Detail Modal */}
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
    </motion.div>
  );
}