import { useState } from 'react';
import { X, User, Check } from 'lucide-react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';
import { toast } from 'sonner';

interface UserProfileProps {
  onClose: () => void;
}

export function UserProfile({ onClose }: UserProfileProps) {
  const { userProfile, updateUserProfile } = useApp();
  const [username, setUsername] = useState(userProfile.username || 'Usuari');
  const [selectedAvatar, setSelectedAvatar] = useState(userProfile.avatar || '😊');
  const [selectedColor, setSelectedColor] = useState(userProfile.avatarColor || '#ffdd00');

  const avatarOptions = ['😊', '😄', '😎', '🤗', '🥳', '👧', '👦', '🧒', '👶', '🎨', '🌟', '⭐', '🎯', '🚀', '🦁', '🐶', '🐱', '🐼'];
  const colorOptions = ['#ffdd00', '#00a1e8', '#84cc16', '#ff8000', '#ff0046', '#9333ea'];

  const handleSave = () => {
    if (!username.trim()) {
      toast.error('El nom d\'usuari no pot estar buit!');
      return;
    }

    updateUserProfile({
      username: username.trim(),
      avatar: selectedAvatar,
      avatarColor: selectedColor,
    });

    toast.success('Perfil actualitzat correctament! ✨');
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.5)' }}
      onClick={onClose}
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
          onClick={onClose}
          className="absolute top-6 right-6 p-3 rounded-full transition-all hover:scale-110"
          style={{
            background: 'linear-gradient(145deg, #ff0046, #ff4570)',
            boxShadow: '0 4px 0 #d12456, 0 6px 15px rgba(255, 0, 70, 0.3)',
          }}
        >
          <X className="size-8 text-white" />
        </button>

        <div className="text-center mb-8">
          <div 
            className="w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center text-5xl"
            style={{
              background: `linear-gradient(145deg, ${selectedColor}, ${selectedColor}dd)`,
              boxShadow: `0 6px 0 ${selectedColor}cc`,
            }}
          >
            {selectedAvatar}
          </div>
          <h2 className="text-5xl font-black mb-2" style={{ color: '#ff8000' }}>
            El Teu Perfil
          </h2>
          <p className="text-xl text-gray-600 font-semibold">
            Personalitza el teu compte
          </p>
        </div>

        {/* Campo de nombre de usuario */}
        <div className="mb-8">
          <label className="text-2xl font-black text-gray-800 mb-3 block">
            Nom d'Usuari
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Escriu el teu nom..."
            maxLength={20}
            className="w-full px-6 py-4 rounded-2xl text-xl font-bold border-4 border-gray-300 focus:border-[#00a1e8] focus:outline-none transition-all"
            style={{
              background: 'linear-gradient(145deg, #ffffff, #f9f9f9)',
            }}
          />
        </div>

        {/* Selector de avatar */}
        <div className="mb-8">
          <label className="text-2xl font-black text-gray-800 mb-3 block">
            Tria el Teu Avatar
          </label>
          <div className="grid grid-cols-6 gap-3">
            {avatarOptions.map((avatar) => (
              <button
                key={avatar}
                onClick={() => setSelectedAvatar(avatar)}
                className="aspect-square rounded-2xl flex items-center justify-center text-4xl transition-all duration-200 hover:scale-110"
                style={{
                  background: selectedAvatar === avatar 
                    ? `linear-gradient(145deg, ${selectedColor}, ${selectedColor}dd)`
                    : 'linear-gradient(145deg, #f3f4f6, #e5e7eb)',
                  boxShadow: selectedAvatar === avatar 
                    ? `0 4px 0 ${selectedColor}cc, 0 6px 15px ${selectedColor}66`
                    : '0 3px 0 #d1d5db',
                  border: selectedAvatar === avatar ? `3px solid ${selectedColor}` : '2px solid #e5e7eb',
                }}
              >
                {avatar}
              </button>
            ))}
          </div>
        </div>

        {/* Selector de color */}
        <div className="mb-8">
          <label className="text-2xl font-black text-gray-800 mb-3 block">
            Color del Perfil
          </label>
          <div className="grid grid-cols-6 gap-4">
            {colorOptions.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className="aspect-square rounded-full transition-all duration-200 hover:scale-110 relative"
                style={{
                  background: `linear-gradient(145deg, ${color}, ${color}dd)`,
                  boxShadow: selectedColor === color 
                    ? `0 4px 0 ${color}cc, 0 6px 15px ${color}99`
                    : `0 3px 0 ${color}cc`,
                  border: selectedColor === color ? '4px solid #000' : '2px solid #fff',
                }}
              >
                {selectedColor === color && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Check className="size-8 text-white drop-shadow-lg" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Botón de guardar */}
        <button
          onClick={handleSave}
          className="w-full py-5 px-6 rounded-full text-2xl font-black transition-all duration-200 hover:translate-y-[-4px] active:translate-y-1"
          style={{
            background: 'linear-gradient(145deg, #84cc16, #a3e635)',
            color: 'white',
            boxShadow: '0 6px 0 #65a30d, 0 8px 20px rgba(132, 204, 22, 0.3)',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
          }}
        >
          Guardar Canvis
        </button>
      </motion.div>
    </motion.div>
  );
}
