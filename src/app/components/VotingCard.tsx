import { useState } from 'react';
import { X, TrendingUp, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';

interface VotingCardProps {
  candidate: {
    id: string;
    username: string;
    userAvatar: string;
    avatarColor: string;
    imageUrl: string;
    title: string;
    averageScore: number;
    totalVotes: number;
  };
  onVote: (candidateId: string, score: number) => void;
  availableScores: number[]; // Números disponibles para votar (1-5)
  currentVote?: number; // Voto actual del usuario para este candidato
}

export default function VotingCard({ candidate, onVote, availableScores, currentVote }: VotingCardProps) {
  const [showVoteMenu, setShowVoteMenu] = useState(false);
  const [selectedScore, setSelectedScore] = useState<number | null>(null);

  const handleVoteClick = (score: number) => {
    // Verificar si este número ya está siendo usado (a menos que sea el voto actual)
    const scoreIsAvailable = availableScores.includes(score) || currentVote === score;
    
    if (!scoreIsAvailable) {
      toast.error(`Ja has usat el número ${score} en una altra figura! 🗳️`);
      return;
    }

    setSelectedScore(score);
    onVote(candidate.id, score);
    setShowVoteMenu(false);
    toast.success(`Has votat ${score}/5! Gràcies per participar 🌟`);
  };

  return (
    <div
      className="rounded-[2rem] overflow-hidden transition-all duration-200 hover:translate-y-[-4px]"
      style={{
        background: 'rgba(255, 255, 255, 0.15)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.3), 0 1px 0 rgba(255, 255, 255, 0.2)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
      }}
    >
      {/* Header del candidato */}
      <div className="p-4 flex items-center gap-3">
        <div 
          className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
          style={{
            background: `linear-gradient(145deg, ${candidate.avatarColor}, ${candidate.avatarColor}dd)`,
            boxShadow: `0 4px 0 ${candidate.avatarColor}cc, 0 6px 15px ${candidate.avatarColor}66`,
          }}
        >
          {candidate.userAvatar}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-black text-gray-800 truncate">{candidate.username}</h3>
          <div className="flex items-center gap-2">
            <Star className="size-4 text-[#ffdd00] fill-[#ffdd00]" />
            <span className="text-sm font-black text-gray-700">
              {candidate.averageScore > 0 ? candidate.averageScore.toFixed(1) : '—'}/5
            </span>
            <span className="text-xs text-gray-500 font-semibold">
              ({candidate.totalVotes} vot{candidate.totalVotes !== 1 ? 's' : ''})
            </span>
          </div>
        </div>
      </div>

      {/* Título */}
      <div className="px-4 pb-3">
        <p className="text-base text-gray-800 font-bold line-clamp-2">{candidate.title}</p>
      </div>

      {/* Imagen */}
      <div className="w-full aspect-square overflow-hidden bg-gray-100">
        <img
          src={candidate.imageUrl}
          alt={candidate.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Botón de votar */}
      <div className="p-4">
        <button
          onClick={() => setShowVoteMenu(!showVoteMenu)}
          disabled={currentVote}
          className="w-full py-3 px-6 rounded-full text-xl font-black transition-all duration-200 hover:translate-y-[-2px] active:translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            background: currentVote 
              ? 'rgba(132, 204, 22, 0.3)' 
              : 'rgba(255, 128, 0, 0.3)',
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            color: 'white',
            boxShadow: currentVote
              ? '0 4px 16px rgba(132, 204, 22, 0.4)'
              : '0 4px 16px rgba(255, 128, 0, 0.4)',
            border: currentVote
              ? '1px solid rgba(132, 204, 22, 0.4)'
              : '1px solid rgba(255, 128, 0, 0.4)',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
          }}
        >
          <TrendingUp className="inline size-6 mr-2" />
          {currentVote ? '✅ Ja has votat' : '🗳️ Votar'}
        </button>

        {/* Menú de votación */}
        <AnimatePresence>
          {showVoteMenu && !currentVote && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 overflow-hidden"
            >
              <p className="text-center text-sm font-black text-gray-700 mb-3">
                Selecciona la teva puntuació (1-5):
              </p>
              <div className="grid grid-cols-5 gap-2">
                {[1, 2, 3, 4, 5].map((score) => {
                  const scoreIsAvailable = availableScores.includes(score) || currentVote === score;
                  
                  return (
                    <button
                      key={score}
                      onClick={() => handleVoteClick(score)}
                      disabled={!scoreIsAvailable}
                      className="aspect-square rounded-xl text-2xl font-black transition-all duration-200 hover:scale-110 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
                      style={{
                        background: !scoreIsAvailable
                          ? 'linear-gradient(145deg, #999, #bbb)'
                          : score === 5
                          ? 'linear-gradient(145deg, #84cc16, #a3e635)' 
                          : score === 4
                          ? 'linear-gradient(145deg, #ffdd00, #ffe747)' 
                          : score === 3
                          ? 'linear-gradient(145deg, #00a1e8, #4ab8f0)'
                          : score === 2
                          ? 'linear-gradient(145deg, #ff8000, #ffa347)'
                          : 'linear-gradient(145deg, #ff0046, #ff4570)',
                        boxShadow: !scoreIsAvailable
                          ? '0 3px 0 #777, 0 5px 10px rgba(0, 0, 0, 0.2)'
                          : score === 5
                          ? '0 3px 0 #65a30d, 0 5px 10px rgba(132, 204, 22, 0.3)'
                          : score === 4
                          ? '0 3px 0 #d4b800, 0 5px 10px rgba(255, 221, 0, 0.3)'
                          : score === 3
                          ? '0 3px 0 #0086c3, 0 5px 10px rgba(0, 161, 232, 0.3)'
                          : score === 2
                          ? '0 3px 0 #d96b00, 0 5px 10px rgba(255, 128, 0, 0.3)'
                          : '0 3px 0 #d12456, 0 5px 10px rgba(255, 0, 70, 0.3)',
                        color: 'white',
                        textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                      }}
                    >
                      {score}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}