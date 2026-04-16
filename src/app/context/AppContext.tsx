import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Figure {
  id: string;
  name: string;
  imageUrl?: string;
  completedDate: Date;
  stars: number;
}

export interface Collection {
  id: string;
  name: string;
  theme: 'savana' | 'mar' | 'jungla';
  cost: number;
  figures: {
    id: string;
    name: string;
    completed: boolean;
    imageUrl?: string;
  }[];
  unlocked: boolean;
}

export interface Challenge {
  id: string;
  type: 'daily' | 'monthly';
  title: string;
  description: string;
  date: Date;
  completed: boolean;
  stars: number;
  submitted?: boolean;
  imageUrl?: string;
  catalogIndex?: number; // Índice en el catálogo
}

// Catàleg de figures diàries (10 models que roten)
export const dailyFigureCatalog = [
  { title: 'Elefant', description: 'Fes un elefant amb la seva trompa!' },
  { title: 'Dofí', description: 'Crea un dofí saltant!' },
  { title: 'Papallona', description: 'Fes una papallona amb ales acolorides!' },
  { title: 'Cargol', description: 'Crea un cargol amb la seva closca!' },
  { title: 'Granota', description: 'Fes una granota verda!' },
  { title: 'Cranc', description: 'Crea un cranc amb les seves pinces!' },
  { title: 'Estrella de Mar', description: 'Fes una estrella de mar!' },
  { title: 'Ocell', description: 'Crea un ocell volant!' },
  { title: 'Peix', description: 'Fes un peix tropical!' },
  { title: 'Tortuga', description: 'Crea una tortuga marina!' }
];

// Catàleg de figures mensuals (12 models PRO d'alta dificultat)
export const monthlyFigureCatalog = [
  { title: 'Torre de Pisa (Gener)', description: 'Recrea la torre inclinada amb tots els seus pisos i detalls arquitectònics!' },
  { title: 'Avió amb Passatgers (Febrer)', description: 'Construeix un avió complet amb animals passatgers a les finestres!' },
  { title: 'Sagrada Família (Març)', description: 'Crea la basílica de Gaudí amb les seves torres característiques!' },
  { title: 'Castell Medieval (Abril)', description: 'Fes un castell amb torres, muralles, pont llevadís i bandera!' },
  { title: 'Vaixell Pirata (Maig)', description: 'Construeix un galeó pirata amb veles, canons i bandera de calavera!' },
  { title: 'Parc d\'Atraccions (Juny)', description: 'Crea una muntanya russa amb vagons i estructura completa!' },
  { title: 'Casa amb Jardí (Juliol)', description: 'Fes una casa amb finestres, porta, teulada i jardí amb flors!' },
  { title: 'Robot Gegant (Agost)', description: 'Construeix un robot articulat amb braços, cames i antenes!' },
  { title: 'Estació Espacial (Setembre)', description: 'Crea una estació espacial amb panells solars i mòduls!' },
  { title: 'Drac Mitològic (Octubre)', description: 'Fes un drac de 3 caps amb ales, cua i flames!' },
  { title: 'Ciutat en Miniatura (Novembre)', description: 'Construeix un conjunt de 5 edificis amb carretera i semàfors!' },
  { title: 'Nadal Màgic (Desembre)', description: 'Crea un paisatge nadalenc amb arbres, ninots de neu i trineu!' }
];

export interface UserPhoto {
  id: string;
  imageUrl: string;
  type: 'daily' | 'monthly' | 'collection';
  title: string;
  date: Date;
  collectionId?: string;
  figureId?: string;
}

export interface PendingPost {
  id: string;
  username: string;
  userAvatar: string;
  avatarColor: string;
  title: string;
  description: string;
  imageUrl: string;
  date: Date;
  status: 'pending' | 'approved' | 'rejected';
}

export interface ApprovedPost {
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
  createdDate: Date;
}

export interface UserProfile {
  username: string;
  avatar: string;
  avatarColor: string;
}

export interface MonthlySubmission {
  id: string;
  userId: string;
  username: string;
  userAvatar: string;
  avatarColor: string;
  imageUrl: string;
  title: string;
  date: Date;
  status: 'pending' | 'approved' | 'rejected';
}

export interface VotingCandidate {
  id: string;
  imageUrl: string;
  username: string;
  userAvatar: string;
  avatarColor: string;
  title: string;
  date: Date;
  votes: { [userId: string]: number }; // userId -> voto (1-5)
  totalVotes: number;
  averageScore: number;
}

export interface Streak {
  currentStreak: number;
  lastCompletedDate: number | null;
}

interface AppContextType {
  stars: number;
  addStars: (amount: number) => void;
  spendStars: (amount: number) => boolean;
  userFigures: Figure[];
  addFigure: (figure: Figure) => void;
  collections: Collection[];
  unlockCollection: (collectionId: string) => boolean;
  completeFigureInCollection: (collectionId: string, figureId: string, imageUrl?: string) => void;
  dailyChallenge: Challenge;
  monthlyChallenge: Challenge;
  completeChallenge: (challengeId: string, imageUrl?: string) => void;
  lastDailySubmissionTime: number | null;
  userPhotos: UserPhoto[];
  addUserPhoto: (photo: UserPhoto) => void;
  updatePhotoInAlbum: (photoId: string, newImageUrl: string) => void;
  pendingPosts: PendingPost[];
  addPendingPost: (post: Omit<PendingPost, 'id' | 'date' | 'status'>) => void;
  approvePost: (postId: string) => void;
  rejectPost: (postId: string) => void;
  approvedPosts: ApprovedPost[];
  monthlySubmissions: MonthlySubmission[];
  approveMonthlySubmission: (submissionId: string) => void;
  rejectMonthlySubmission: (submissionId: string) => void;
  userProfile: UserProfile;
  updateUserProfile: (profile: Partial<UserProfile>) => void;
  likedPosts: Set<string>;
  toggleLike: (postId: string) => void;
  getPostLikes: (postId: string, baseLikes: number) => number;
  streak: Streak;
  checkAndUpdateStreak: () => void;
  votingCandidates: VotingCandidate[];
  addVotingCandidate: (candidate: Omit<VotingCandidate, 'votes' | 'totalVotes' | 'averageScore'>) => void;
  voteForCandidate: (candidateId: string, score: number) => boolean;
  userVotes: { [candidateId: string]: number };
  availableScores: number[];
  rotateDailyChallenge: () => void;
  rotateMonthlyChallenge: () => void;
  getTopFiveWinners: () => VotingCandidate[];
  isVotingClosed: boolean;
}

export const globalMockPosts: ApprovedPost[] = [
  {
    id: '1',
    username: 'Maria_123',
    userAvatar: '👧',
    avatarColor: '#ff0046',
    figure: 'El meu lleó de la sabana! 🦁',
    image: 'https://images.unsplash.com/photo-1760679673931-fb3d7459887b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGF5JTIwbGlvbiUyMHNjdWxwdHVyZXxlbnwxfHx8fDE3NzA2MjQ4NTd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    likes: 42,
    comments: 2,
    timeAgo: 'Fa 2 hores',
    verified: true,
    createdDate: new Date(Date.now() - 2 * 3600000),
  },
  {
    id: '2',
    username: 'Pere_art',
    userAvatar: '👦',
    avatarColor: '#00a1e8',
    figure: 'Mireu el meu polp del mar! 🐙',
    image: 'https://images.unsplash.com/photo-1758092320693-4fc366d898ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGF5JTIwb2N0b3B1cyUyMHNjdWxwdHVyZXxlbnwxfHx8fDE3NzA2MjQ4NTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    likes: 38,
    comments: 2,
    timeAgo: 'Fa 5 hores',
    verified: true,
    createdDate: new Date(Date.now() - 5 * 3600000),
  },
  {
    id: '3',
    username: 'Lucia_crea',
    userAvatar: '👧',
    avatarColor: '#84cc16',
    figure: 'Mona de la jungla acabada! 🐵',
    image: 'https://images.unsplash.com/photo-1636057120404-fc1b0a20c0bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGF5JTIwbW9ua2V5JTIwc2N1bHB0dXJlfGVufDF8fHx8MTc3MDYyNDg1OHww&ixlib=rb-4.1.0&q=80&w=1080',
    likes: 35,
    comments: 2,
    timeAgo: 'Fa 1 dia',
    verified: true,
    createdDate: new Date(Date.now() - 24 * 3600000),
  },
  {
    id: '4',
    username: 'Carles_jovi',
    userAvatar: '👦',
    avatarColor: '#ffdd00',
    figure: 'Elefant gegant! Què en penseu? 🐘',
    image: 'https://images.unsplash.com/photo-1718128016695-b31d0c0edc7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGF5JTIwZWxlcGhhbnQlMjBzY3VscHR1cmV8ZW58MXx8fHwxNzcwNjI0ODU4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    likes: 33,
    comments: 2,
    timeAgo: 'Fa 1 dia',
    verified: true,
    createdDate: new Date(Date.now() - 25 * 3600000),
  },
  {
    id: '5',
    username: 'Anna_plastilina',
    userAvatar: '👧',
    avatarColor: '#ff8000',
    figure: 'Estrella de mar multicolor ⭐',
    image: 'https://images.unsplash.com/photo-1605135694851-4f617cb22691?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGF5JTIwc3RhcmZpc2glMjBzY3VscHR1cmV8ZW58MXx8fHwxNzcwNjI0ODU5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    likes: 31,
    comments: 2,
    timeAgo: 'Fa 2 dies',
    verified: true,
    createdDate: new Date(Date.now() - 48 * 3600000),
  },
  {
    id: '6',
    username: 'Javi_colors',
    userAvatar: '👦',
    avatarColor: '#00a1e8',
    figure: 'Tucà de la jungla! 🦜',
    image: 'https://images.unsplash.com/photo-1718611951630-86218bebecfa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGF5JTIwcGFycm90JTIwc2N1bHB0dXJlfGVufDF8fHx8MTc3MDYyNDg1OXww&ixlib=rb-4.1.0&q=80&w=1080',
    likes: 29,
    comments: 2,
    timeAgo: 'Fa 3 dies',
    verified: true,
    createdDate: new Date(Date.now() - 72 * 3600000),
  },
  {
    id: '7',
    username: 'Sofia_art',
    userAvatar: '👧',
    avatarColor: '#ff0046',
    figure: 'Girafa de la sabana 🦒',
    image: 'https://images.unsplash.com/photo-1744266537466-42dd386c73d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGF5JTIwZ2lyYWZmZSUyMHNjdWxwdHVyZXxlbnwxfHx8fDE3NzA2Mjk3NjZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    likes: 27,
    comments: 2,
    timeAgo: 'Fa 4 dies',
    verified: true,
    createdDate: new Date(Date.now() - 96 * 3600000),
  },
  {
    id: '8',
    username: 'Marc_creator',
    userAvatar: '👦',
    avatarColor: '#84cc16',
    figure: 'Dofí saltant 🐬',
    image: 'https://images.unsplash.com/photo-1741183716273-a29de07b2628?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGF5JTIwZG9scGhpbiUyMHNjdWxwdHVyZXxlbnwxfHx8fDE3NzA2Mjk3Njd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    likes: 25,
    comments: 2,
    timeAgo: 'Fa 5 dies',
    verified: true,
    createdDate: new Date(Date.now() - 120 * 3600000),
  },
  {
    id: '9',
    username: 'Laura_jovi',
    userAvatar: '👧',
    avatarColor: '#ffdd00',
    figure: 'Tigre de colors! 🐯',
    image: 'https://images.unsplash.com/photo-1632573707030-aece326ec226?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGF5JTIwdGlnZXIlMjBzY3VscHR1cmV8ZW58MXx8fHwxNzcwNjI5NzY3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    likes: 23,
    comments: 2,
    timeAgo: 'Fa 6 dies',
    verified: true,
    createdDate: new Date(Date.now() - 144 * 3600000),
  },
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

const initialCollections: Collection[] = [
  {
    id: 'savana',
    name: 'Savana',
    theme: 'savana',
    cost: 50,
    unlocked: false,
    figures: [
      { id: 'leon', name: 'Lleó', completed: false },
      { id: 'elefante', name: 'Elefant', completed: false },
      { id: 'jirafa', name: 'Girafa', completed: false },
      { id: 'cebra', name: 'Zebra', completed: false },
    ],
  },
  {
    id: 'mar',
    name: 'Mar',
    theme: 'mar',
    cost: 50,
    unlocked: false,
    figures: [
      { id: 'pez', name: 'Peix', completed: false },
      { id: 'pulpo', name: 'Pop', completed: false },
      { id: 'ballena', name: 'Balena', completed: false },
      { id: 'estrella', name: 'Estrella de Mar', completed: false },
    ],
  },
  {
    id: 'jungla',
    name: 'Jungla',
    theme: 'jungla',
    cost: 50,
    unlocked: false,
    figures: [
      { id: 'mono', name: 'Mico', completed: false },
      { id: 'tucan', name: 'Tucà', completed: false },
      { id: 'serpiente', name: 'Serp', completed: false },
      { id: 'tigre', name: 'Tigre', completed: false },
    ],
  },
];

const initialDailyChallenge: Challenge = {
  id: 'daily-1',
  type: 'daily',
  title: 'Crea un cargol!',
  description: 'Fes servir plastilina per crear un cargol amb la seva closca en espiral',
  date: new Date(),
  completed: false,
  stars: 10,
};

const initialMonthlyChallenge: Challenge = {
  id: 'monthly-1',
  type: 'monthly',
  title: 'Crea un drac fantàstic!',
  description: 'Crea un drac amb ales, cua i que faci foc. Competeix per premis Jovi!',
  date: new Date(),
  completed: false,
  submitted: false,
  stars: 50,
};

export const AppProvider = ({ children }: { children: ReactNode }) => {
  // Función helper para cargar datos desde localStorage
  const loadFromStorage = <T,>(key: string, defaultValue: T): T => {
    try {
      if (typeof window === 'undefined' || !window.localStorage) {
        return defaultValue;
      }
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Error loading ${key} from localStorage:`, error);
      return defaultValue;
    }
  };

  // Función helper para guardar datos en localStorage
  const saveToStorage = (key: string, value: any) => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      if (error instanceof Error && error.name === 'QuotaExceededError') {
        console.warn(`localStorage quota exceeded for ${key}. Attempting cleanup...`);
        
        // Limpiar datos antiguos para hacer espacio
        try {
          // Limpiar posts aprobados antiguos (mantener solo los últimos 20)
          if (key !== 'approvedPosts') {
            const stored = localStorage.getItem('approvedPosts');
            if (stored) {
              const posts = JSON.parse(stored);
              if (Array.isArray(posts) && posts.length > 20) {
                localStorage.setItem('approvedPosts', JSON.stringify(posts.slice(0, 20)));
              }
            }
          }
          
          // Limpiar posts pendientes resueltos
          if (key !== 'pendingPosts') {
            const stored = localStorage.getItem('pendingPosts');
            if (stored) {
              const posts = JSON.parse(stored);
              if (Array.isArray(posts)) {
                const activePosts = posts.filter(p => p.status === 'pending');
                localStorage.setItem('pendingPosts', JSON.stringify(activePosts));
              }
            }
          }
          
          // Limpiar submissions mensuales resueltas
          if (key !== 'monthlySubmissions') {
            const stored = localStorage.getItem('monthlySubmissions');
            if (stored) {
              const subs = JSON.parse(stored);
              if (Array.isArray(subs)) {
                const activeSubs = subs.filter(s => s.status === 'pending');
                localStorage.setItem('monthlySubmissions', JSON.stringify(activeSubs));
              }
            }
          }
          
          // Intentar guardar nuevamente después de la limpieza
          localStorage.setItem(key, JSON.stringify(value));
        } catch (retryError) {
          console.error(`Failed to save ${key} even after cleanup:`, retryError);
        }
      } else {
        console.error(`Error saving ${key} to localStorage:`, error);
      }
    }
  };

  // Estados con valores iniciales desde localStorage
  const [stars, setStars] = useState(() => loadFromStorage('stars', 100));
  const [userFigures, setUserFigures] = useState<Figure[]>(() => loadFromStorage('userFigures', []));
  const [collections, setCollections] = useState<Collection[]>(() => loadFromStorage('collections', initialCollections));
  const [dailyChallenge, setDailyChallenge] = useState<Challenge>(() => loadFromStorage('dailyChallenge', initialDailyChallenge));
  const [monthlyChallenge, setMonthlyChallenge] = useState<Challenge>(() => loadFromStorage('monthlyChallenge', initialMonthlyChallenge));
  const [lastDailySubmissionTime, setLastDailySubmissionTime] = useState<number | null>(() => loadFromStorage('lastDailySubmissionTime', null));
  const [userPhotos, setUserPhotos] = useState<UserPhoto[]>(() => loadFromStorage('userPhotos', []));
  const [pendingPosts, setPendingPosts] = useState<PendingPost[]>(() => loadFromStorage('pendingPosts', []));
  const [approvedPosts, setApprovedPosts] = useState<ApprovedPost[]>(() => loadFromStorage('approvedPosts', []));
  const [monthlySubmissions, setMonthlySubmissions] = useState<MonthlySubmission[]>(() => loadFromStorage('monthlySubmissions', []));
  const [userProfile, setUserProfile] = useState<UserProfile>(() => loadFromStorage('userProfile', { username: '', avatar: '', avatarColor: '' }));
  const [likedPosts, setLikedPosts] = useState<Set<string>>(() => new Set(loadFromStorage('likedPosts', [])));
  const [streak, setStreak] = useState<Streak>(() => loadFromStorage('streak', { currentStreak: 0, lastCompletedDate: null }));
  const [votingCandidates, setVotingCandidates] = useState<VotingCandidate[]>(() => loadFromStorage('votingCandidates', []));
  const [userVotes, setUserVotes] = useState<{ [candidateId: string]: number }>(() => loadFromStorage('userVotes', {}));
  
  // Calcular qué números ya están usados
  const usedScores = Object.values(userVotes);
  const availableScores = [1, 2, 3, 4, 5].filter(score => !usedScores.includes(score));
  const maxVotesAllowed = 5; // Ahora es el máximo de candidatos
  const maxCandidates = 5; // Solo 5 candidatos máximo

  // Persistir stars en localStorage
  useEffect(() => {
    saveToStorage('stars', stars);
  }, [stars]);

  // Persistir userFigures en localStorage
  useEffect(() => {
    saveToStorage('userFigures', userFigures);
  }, [userFigures]);

  // Persistir collections en localStorage
  useEffect(() => {
    saveToStorage('collections', collections);
  }, [collections]);

  // Persistir dailyChallenge en localStorage
  useEffect(() => {
    saveToStorage('dailyChallenge', dailyChallenge);
  }, [dailyChallenge]);

  // Persistir monthlyChallenge en localStorage
  useEffect(() => {
    saveToStorage('monthlyChallenge', monthlyChallenge);
  }, [monthlyChallenge]);

  // Persistir lastDailySubmissionTime en localStorage
  useEffect(() => {
    saveToStorage('lastDailySubmissionTime', lastDailySubmissionTime);
  }, [lastDailySubmissionTime]);

  // Persistir userPhotos en localStorage
  useEffect(() => {
    saveToStorage('userPhotos', userPhotos);
  }, [userPhotos]);

  // Persistir pendingPosts en localStorage
  useEffect(() => {
    saveToStorage('pendingPosts', pendingPosts);
  }, [pendingPosts]);

  // Persistir approvedPosts en localStorage
  useEffect(() => {
    saveToStorage('approvedPosts', approvedPosts);
  }, [approvedPosts]);

  // Persistir monthlySubmissions en localStorage
  useEffect(() => {
    saveToStorage('monthlySubmissions', monthlySubmissions);
  }, [monthlySubmissions]);

  // Persistir userProfile en localStorage
  useEffect(() => {
    saveToStorage('userProfile', userProfile);
  }, [userProfile]);

  // Persistir likedPosts en localStorage
  useEffect(() => {
    saveToStorage('likedPosts', Array.from(likedPosts));
  }, [likedPosts]);

  // Persistir streak en localStorage
  useEffect(() => {
    saveToStorage('streak', streak);
  }, [streak]);

  // Persistir votingCandidates en localStorage
  useEffect(() => {
    saveToStorage('votingCandidates', votingCandidates);
  }, [votingCandidates]);

  // Persistir userVotes en localStorage
  useEffect(() => {
    saveToStorage('userVotes', userVotes);
  }, [userVotes]);

  const addStars = (amount: number) => {
    setStars((prev) => prev + amount);
  };

  const spendStars = (amount: number): boolean => {
    if (stars >= amount) {
      setStars((prev) => prev - amount);
      return true;
    }
    return false;
  };

  const addFigure = (figure: Figure) => {
    setUserFigures((prev) => [...prev, figure]);
  };

  const unlockCollection = (collectionId: string): boolean => {
    const collection = collections.find((c) => c.id === collectionId);
    if (!collection || collection.unlocked) return false;

    if (spendStars(collection.cost)) {
      setCollections((prev) =>
        prev.map((c) =>
          c.id === collectionId ? { ...c, unlocked: true } : c
        )
      );
      return true;
    }
    return false;
  };

  const completeFigureInCollection = (
    collectionId: string,
    figureId: string,
    imageUrl?: string
  ) => {
    setCollections((prev) =>
      prev.map((c) => {
        if (c.id === collectionId) {
          const updatedFigures = c.figures.map((f) =>
            f.id === figureId ? { ...f, completed: true, imageUrl } : f
          );
          
          // Si todas las figuras están completadas, dar bonus de estrellas
          const allCompleted = updatedFigures.every((f) => f.completed);
          if (allCompleted && !c.figures.every((f) => f.completed)) {
            addStars(30); // Bonus por completar colección
          }
          
          return { ...c, figures: updatedFigures };
        }
        return c;
      })
    );
    
    // Dar estrellas por completar figura individual
    addStars(5);
  };

  const completeChallenge = (challengeId: string, imageUrl?: string) => {
    if (challengeId === dailyChallenge.id && !dailyChallenge.completed) {
      setDailyChallenge((prev) => ({
        ...prev,
        completed: true,
        imageUrl,
      }));
      setLastDailySubmissionTime(Date.now());
      addStars(dailyChallenge.stars);
      
      // 🎯 GUARDADO AUTOMÁTICO EN EL ÁLBUM
      if (imageUrl) {
        addUserPhoto({
          id: `daily-${Date.now()}`,
          imageUrl: imageUrl,
          type: 'daily',
          title: dailyChallenge.title,
          date: new Date(),
        });
      }
      
      // Actualizar racha al completar reto diario
      checkAndUpdateStreak();
    } else if (challengeId === monthlyChallenge.id && !monthlyChallenge.submitted) {
      setMonthlyChallenge((prev) => ({
        ...prev,
        submitted: true,
        imageUrl,
      }));
      
      // 🎯 GUARDADO AUTOMÁTICO EN EL ÁLBUM
      if (imageUrl) {
        addUserPhoto({
          id: `monthly-${Date.now()}`,
          imageUrl: imageUrl,
          type: 'monthly',
          title: monthlyChallenge.title,
          date: new Date(),
        });
        
        // Añadir a la lista de administración de figuras mensuales
        setMonthlySubmissions(prev => [
          ...prev,
          {
            id: `monthly-${Date.now()}`,
            userId: 'user-1',
            username: userProfile.username || 'Usuari',
            userAvatar: userProfile.avatar || '😊',
            avatarColor: userProfile.avatarColor || '#ffdd00',
            imageUrl: imageUrl,
            title: monthlyChallenge.title,
            date: new Date(),
            status: 'pending'
          }
        ]);
      }
    }
  };

  const approveMonthlySubmission = (submissionId: string) => {
    setMonthlySubmissions(prev => prev.map(s => s.id === submissionId ? { ...s, status: 'approved' } : s));
    addStars(50); // Dar estrellas del reto mensual al aprobar
  };

  const rejectMonthlySubmission = (submissionId: string) => {
    setMonthlySubmissions(prev => prev.map(s => s.id === submissionId ? { ...s, status: 'rejected' } : s));
  };

  const addUserPhoto = (photo: UserPhoto) => {
    setUserPhotos((prev) => [...prev, photo]);
  };

  const updatePhotoInAlbum = (photoId: string, newImageUrl: string) => {
    // Actualizar en retos diarios
    if (photoId === dailyChallenge.id) {
      setDailyChallenge((prev) => ({ ...prev, imageUrl: newImageUrl }));
      return;
    }
    
    // Actualizar en retos mensuales
    if (photoId === monthlyChallenge.id) {
      setMonthlyChallenge((prev) => ({ ...prev, imageUrl: newImageUrl }));
      return;
    }
    
    // Actualizar en colecciones
    const collectionMatch = photoId.match(/^(.+)-(.+)$/);
    if (collectionMatch) {
      const [, collectionId, figureId] = collectionMatch;
      setCollections((prev) =>
        prev.map((c) => {
          if (c.id === collectionId) {
            return {
              ...c,
              figures: c.figures.map((f) =>
                f.id === figureId ? { ...f, imageUrl: newImageUrl } : f
              ),
            };
          }
          return c;
        })
      );
      return;
    }
    
    // Actualizar en userPhotos
    setUserPhotos((prev) =>
      prev.map((photo) =>
        photo.id === photoId ? { ...photo, imageUrl: newImageUrl } : photo
      )
    );
  };

  const addPendingPost = (post: Omit<PendingPost, 'id' | 'date' | 'status'>) => {
    setPendingPosts((prev) => {
      // Mantener solo posts pendientes (eliminar aprobados/rechazados antiguos)
      const activePosts = prev.filter(p => p.status === 'pending');
      // Limitar a 50 posts pendientes máximo
      const limitedPosts = activePosts.slice(0, 49);
      
      return [
        ...limitedPosts,
        {
          ...post,
          id: `post-${Date.now()}`,
          date: new Date(),
          status: 'pending',
        },
      ];
    });
  };

  const approvePost = (postId: string) => {
    const post = pendingPosts.find(p => p.id === postId);
    if (!post) return;

    // Actualizar estado del post pendiente
    setPendingPosts((prev) =>
      prev.map((p) =>
        p.id === postId ? { ...p, status: 'approved' } : p
      )
    );

    // Crear post aprobado para el feed social
    const approvedPost: ApprovedPost = {
      id: post.id,
      username: post.username,
      userAvatar: post.userAvatar,
      avatarColor: post.avatarColor,
      figure: post.title,
      image: post.imageUrl,
      likes: 0,
      comments: 0,
      timeAgo: 'Ara mateix',
      verified: true,
      createdDate: new Date(),
    };

    setApprovedPosts((prev) => {
      // Limitar a 20 posts aprobados máximo
      const limitedPosts = prev.slice(0, 19);
      return [approvedPost, ...limitedPosts];
    });
  };

  const rejectPost = (postId: string) => {
    setPendingPosts((prev) =>
      prev.map((post) =>
        post.id === postId ? { ...post, status: 'rejected' } : post
      )
    );
  };

  const updateUserProfile = (profile: Partial<UserProfile>) => {
    setUserProfile((prev) => ({ ...prev, ...profile }));
  };

  const toggleLike = (postId: string) => {
    setLikedPosts((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  const getPostLikes = (postId: string, baseLikes: number) => {
    return likedPosts.has(postId) ? baseLikes + 1 : baseLikes;
  };

  const checkAndUpdateStreak = () => {
    const now = Date.now();
    const lastCompletedDate = streak.lastCompletedDate;

    if (lastCompletedDate) {
      const lastCompleted = new Date(lastCompletedDate);
      const today = new Date(now);
      const yesterday = new Date(now - 24 * 60 * 60 * 1000);

      // Resetear fechas a medianoche para comparación correcta
      lastCompleted.setHours(0, 0, 0, 0);
      today.setHours(0, 0, 0, 0);
      yesterday.setHours(0, 0, 0, 0);

      if (lastCompleted.getTime() === today.getTime()) {
        // Ya completaste hoy, no hacer nada
        return;
      } else if (lastCompleted.getTime() === yesterday.getTime()) {
        // Completaste ayer, incrementar racha
        setStreak((prev) => ({ 
          currentStreak: prev.currentStreak + 1, 
          lastCompletedDate: now 
        }));
      } else {
        // Más de un día sin completar, resetear racha
        setStreak({ currentStreak: 1, lastCompletedDate: now });
      }
    } else {
      // Primera vez completando, iniciar racha
      setStreak({ currentStreak: 1, lastCompletedDate: now });
    }
  };

  // Verificar y resetear la racha si han pasado más de 24h sin completar
  useEffect(() => {
    const checkStreakExpiry = () => {
      const now = Date.now();
      const lastCompletedDate = streak.lastCompletedDate;

      if (lastCompletedDate) {
        const lastCompleted = new Date(lastCompletedDate);
        const today = new Date(now);
        const yesterday = new Date(now - 24 * 60 * 60 * 1000);

        // Resetear fechas a medianoche
        lastCompleted.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);
        yesterday.setHours(0, 0, 0, 0);

        // Si la última completación no fue hoy ni ayer, resetear
        if (lastCompleted.getTime() !== today.getTime() && 
            lastCompleted.getTime() !== yesterday.getTime()) {
          setStreak({ currentStreak: 0, lastCompletedDate: null });
        }
      }
    };

    // Verificar al montar el componente
    checkStreakExpiry();

    // Verificar cada hora
    const interval = setInterval(checkStreakExpiry, 60 * 60 * 1000);

    return () => clearInterval(interval);
  }, [streak.lastCompletedDate]);

  const addVotingCandidate = (candidate: Omit<VotingCandidate, 'votes' | 'totalVotes' | 'averageScore'>) => {
    if (votingCandidates.length >= maxCandidates) {
      return; // No se pueden añadir más candidatos
    }

    setVotingCandidates(prev => [
      ...prev,
      {
        ...candidate,
        votes: {},
        totalVotes: 0,
        averageScore: 0
      }
    ]);
  };

  const voteForCandidate = (candidateId: string, score: number): boolean => {
    // Verificar si el número ya está siendo usado por otro candidato
    const currentVote = userVotes[candidateId];
    
    // Si ya votaste este candidato con el mismo número, no hacer nada
    if (currentVote === score) {
      return false;
    }
    
    // Si el número ya está siendo usado en otro candidato, no permitir
    if (!currentVote && Object.values(userVotes).includes(score)) {
      return false;
    }
    
    // Actualizar el voto del usuario
    setUserVotes(prev => ({
      ...prev,
      [candidateId]: score
    }));
    
    // Actualizar los votos del candidato
    setVotingCandidates(prev => prev.map(c => {
      if (c.id === candidateId) {
        const newVotes = { ...c.votes, [userProfile.username || 'user']: score };
        const newTotalVotes = Object.values(newVotes).reduce((acc, val) => acc + val, 0);
        const newAverageScore = newTotalVotes / Object.keys(newVotes).length;

        return {
          ...c,
          votes: newVotes,
          totalVotes: newTotalVotes,
          averageScore: newAverageScore
        };
      }
      return c;
    }));

    return true;
  };

  const rotateDailyChallenge = () => {
    const currentIndex = dailyChallenge.catalogIndex || 0;
    const nextIndex = (currentIndex + 1) % dailyFigureCatalog.length;
    const nextChallenge = {
      ...dailyChallenge,
      title: dailyFigureCatalog[nextIndex].title,
      description: dailyFigureCatalog[nextIndex].description,
      catalogIndex: nextIndex,
      completed: false,
      submitted: false, // Reset submitted status
      imageUrl: undefined,
    };
    setDailyChallenge(nextChallenge);
    
    // RESET DEL CANDADO: Eliminar el tiempo de última entrega
    setLastDailySubmissionTime(null);
    
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('dailyChallenge', JSON.stringify(nextChallenge));
      localStorage.removeItem('lastDailySubmissionTime'); // Eliminar el candado del localStorage
    }
  };

  const rotateMonthlyChallenge = () => {
    const currentIndex = monthlyChallenge.catalogIndex || 0;
    const nextIndex = (currentIndex + 1) % monthlyFigureCatalog.length;
    const nextChallenge = {
      ...monthlyChallenge,
      title: monthlyFigureCatalog[nextIndex].title,
      description: monthlyFigureCatalog[nextIndex].description,
      catalogIndex: nextIndex,
      completed: false,
      submitted: false,
      imageUrl: undefined,
    };
    setMonthlyChallenge(nextChallenge);
  };

  const getTopFiveWinners = () => {
    return votingCandidates
      .slice()
      .sort((a, b) => b.averageScore - a.averageScore)
      .slice(0, 5);
  };

  const isVotingClosed = votingCandidates.length >= maxCandidates;

  return (
    <AppContext.Provider
      value={{
        stars,
        addStars,
        spendStars,
        userFigures,
        addFigure,
        collections,
        unlockCollection,
        completeFigureInCollection,
        dailyChallenge,
        monthlyChallenge,
        completeChallenge,
        lastDailySubmissionTime,
        userPhotos,
        addUserPhoto,
        updatePhotoInAlbum,
        pendingPosts,
        addPendingPost,
        approvePost,
        rejectPost,
        approvedPosts,
        monthlySubmissions,
        approveMonthlySubmission,
        rejectMonthlySubmission,
        userProfile,
        updateUserProfile,
        likedPosts,
        toggleLike,
        getPostLikes,
        streak,
        checkAndUpdateStreak,
        votingCandidates,
        addVotingCandidate,
        voteForCandidate,
        userVotes,
        availableScores,
        rotateDailyChallenge,
        rotateMonthlyChallenge,
        getTopFiveWinners,
        isVotingClosed
      }}
    >
      {children}
    </AppContext.Provider>
  );
};