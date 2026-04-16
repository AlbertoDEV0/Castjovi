import { useState, useEffect } from 'react';
import { X, Heart, MessageCircle, Share2, Shield, Send } from 'lucide-react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';

interface Comment {
  id: string;
  username: string;
  userAvatar: string;
  avatarColor: string;
  text: string;
  timeAgo: string;
}

interface PostDetailProps {
  post: {
    id: string;
    username: string;
    userAvatar: string;
    avatarColor: string;
    figure: string;
    image: string;
    likes: number;
    comments: number;
    timeAgo: string;
    verified: boolean;
  };
  isLiked: boolean;
  onClose: () => void;
  onToggleLike: () => void;
}

const defaultComments: Comment[] = [
  {
    id: '1',
    username: 'Joan_art',
    userAvatar: '👦',
    avatarColor: '#00a1e8',
    text: 'Molt maco! M\'encanta! 😍',
    timeAgo: 'Fa 1 hora',
  },
  {
    id: '2',
    username: 'Sofia_crea',
    userAvatar: '👧',
    avatarColor: '#ff0046',
    text: 'Quins colors més bonics! 🎨',
    timeAgo: 'Fa 30 min',
  },
];

export default function PostDetail({ post, isLiked, onClose, onToggleLike }: PostDetailProps) {
  const { userProfile } = useApp();
  
  // Cargar comentarios desde localStorage
  const [comments, setComments] = useState<Comment[]>(() => {
    try {
      if (typeof window === 'undefined' || !window.localStorage) {
        return defaultComments;
      }
      const stored = localStorage.getItem(`comments_${post.id}`);
      return stored ? JSON.parse(stored) : defaultComments;
    } catch {
      return defaultComments;
    }
  });
  
  const [newComment, setNewComment] = useState('');

  // Persistir comentarios en localStorage
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(`comments_${post.id}`, JSON.stringify(comments));
      }
    } catch (error) {
      console.error('Error saving comments:', error);
    }
  }, [comments, post.id]);

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: Date.now().toString(),
        username: userProfile.username || 'Usuari',
        userAvatar: userProfile.avatar || '😊',
        avatarColor: userProfile.avatarColor || '#ffdd00',
        text: newComment,
        timeAgo: 'Ara mateix',
      };
      setComments([...comments, comment]);
      setNewComment('');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
      style={{ background: 'rgba(0,0,0,0.6)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="rounded-[2.5rem] overflow-hidden max-w-4xl w-full my-8 relative"
        style={{
          background: 'linear-gradient(145deg, #ffffff, #f5f5f5)',
          boxShadow: '0 10px 0 #d0d0d0, 0 15px 50px rgba(0, 0, 0, 0.3)',
        }}
      >
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-10 p-3 rounded-full transition-all hover:scale-110"
          style={{
            background: 'linear-gradient(145deg, #ff0046, #ff4570)',
            boxShadow: '0 4px 0 #d12456, 0 6px 15px rgba(255, 0, 70, 0.3)',
          }}
        >
          <X className="size-8 text-white" />
        </button>

        {/* Header del post */}
        <div className="p-8 flex items-center gap-4">
          <div 
            className="w-20 h-20 rounded-full flex items-center justify-center text-4xl"
            style={{
              background: `linear-gradient(145deg, ${post.avatarColor}, ${post.avatarColor}dd)`,
              boxShadow: `0 4px 0 ${post.avatarColor}cc, 0 6px 15px ${post.avatarColor}66`,
            }}
          >
            {post.userAvatar}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="text-3xl font-black text-gray-800">{post.username}</h3>
              {post.verified && (
                <div 
                  className="p-1 rounded-full"
                  style={{
                    background: 'linear-gradient(145deg, #84cc16, #65a30d)',
                  }}
                >
                  <Shield className="size-6 text-white" />
                </div>
              )}
            </div>
            <p className="text-lg text-gray-500 font-semibold">{post.timeAgo}</p>
          </div>
        </div>

        {/* Texto del post */}
        <div className="px-8 pb-6">
          <p className="text-3xl text-gray-800 font-bold">{post.figure}</p>
        </div>

        {/* Imagen grande */}
        <div className="w-full aspect-square overflow-hidden bg-gray-100">
          <img
            src={post.image}
            alt={post.figure}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Acciones */}
        <div className="p-8 flex items-center gap-8">
          <button 
            onClick={onToggleLike}
            className="flex items-center gap-3 transition-all duration-200 hover:scale-110 active:scale-95"
          >
            <div 
              className="p-4 rounded-full"
              style={{
                background: isLiked 
                  ? 'linear-gradient(145deg, #ff0046, #ff4570)' 
                  : 'linear-gradient(145deg, #E5E7EB, #D1D5DB)',
                boxShadow: isLiked
                  ? '0 4px 0 #d12456, 0 6px 15px rgba(255, 0, 70, 0.3)'
                  : '0 3px 0 #9CA3AF',
              }}
            >
              <Heart 
                className={`size-8 ${isLiked ? 'fill-white text-white' : 'text-gray-600'}`}
              />
            </div>
            <span className="text-2xl font-black text-gray-700">
              {post.likes + (isLiked ? 1 : 0)}
            </span>
          </button>

          <div className="flex items-center gap-3">
            <div 
              className="p-4 rounded-full"
              style={{
                background: 'linear-gradient(145deg, #00a1e8, #4ab8f0)',
                boxShadow: '0 4px 0 #0086c3, 0 6px 15px rgba(0, 161, 232, 0.3)',
              }}
            >
              <MessageCircle className="size-8 text-white" />
            </div>
            <span className="text-2xl font-black text-gray-700">{comments.length}</span>
          </div>

          <button className="flex items-center gap-3 transition-all duration-200 hover:scale-110 active:scale-95 ml-auto">
            <div 
              className="p-4 rounded-full"
              style={{
                background: 'linear-gradient(145deg, #E5E7EB, #D1D5DB)',
                boxShadow: '0 3px 0 #9CA3AF',
              }}
            >
              <Share2 className="size-8 text-gray-600" />
            </div>
          </button>
        </div>

        {/* Sección de comentarios */}
        <div 
          className="px-8 pb-8"
          style={{
            maxHeight: '400px',
            overflowY: 'auto',
          }}
        >
          <h3 className="text-2xl font-black text-gray-800 mb-6">Comentaris</h3>
          
          {/* Lista de comentarios */}
          <div className="space-y-4 mb-6">
            {comments.map((comment) => (
              <div 
                key={comment.id}
                className="flex gap-4 p-4 rounded-2xl"
                style={{
                  background: 'linear-gradient(145deg, #f9fafb, #f3f4f6)',
                }}
              >
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center text-xl flex-shrink-0"
                  style={{
                    background: `linear-gradient(145deg, ${comment.avatarColor}, ${comment.avatarColor}dd)`,
                    boxShadow: `0 2px 0 ${comment.avatarColor}cc`,
                  }}
                >
                  {comment.userAvatar}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg font-black text-gray-800">{comment.username}</span>
                    <span className="text-sm text-gray-500 font-semibold">{comment.timeAgo}</span>
                  </div>
                  <p className="text-lg text-gray-700 font-semibold">{comment.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Input para nuevo comentario */}
          <div className="flex gap-4">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddComment()}
              placeholder="Escriu un comentari..."
              className="flex-1 px-6 py-4 rounded-full text-xl font-semibold focus:outline-none"
              style={{
                background: 'linear-gradient(145deg, #ffffff, #f5f5f5)',
                boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.1)',
              }}
            />
            <button
              onClick={handleAddComment}
              className="p-4 rounded-full transition-all hover:scale-110 active:scale-95"
              style={{
                background: 'linear-gradient(145deg, #84cc16, #a3e635)',
                boxShadow: '0 4px 0 #65a30d, 0 6px 15px rgba(132, 204, 22, 0.3)',
              }}
            >
              <Send className="size-8 text-white" />
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}