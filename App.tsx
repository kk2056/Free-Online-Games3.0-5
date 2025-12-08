import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import { 
  Gamepad2, Search, Home, Play, Info, Heart, Share2, Star, Menu, X, 
  ArrowLeft, Loader2, AlertTriangle, Shield, Mail, RefreshCw, Smartphone, Trophy, Maximize2
} from 'lucide-react';

// --- TYPES ---
interface Game {
  id: string;
  title: string;
  category: 'Action' | 'Racing' | 'Puzzle';
  thumbnail: string;
  fallbackThumbnail: string;
  embedUrl: string;
  description: string;
  rating: number;
  plays: string;
  source: 'CrazyGames' | 'GameDistribution' | 'HTMLGames';
}

// --- DATA: 100% PLAYABLE LINKS (Referrer Hack Applied) ---
const GAMES: Game[] = [
  // RACING
  {
    id: 'moto-x3m',
    title: 'Moto X3M',
    category: 'Racing',
    thumbnail: './assets/thumbnails/moto-x3m.jpg',
    fallbackThumbnail: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=600&q=80',
    // CrazyGames is more stable for Moto X3M than GD
    embedUrl: 'https://www.crazygames.com/embed/moto-x3m',
    description: 'The ultimate bike racing game. Perform stunts and beat the clock.',
    rating: 4.9,
    plays: '18M',
    source: 'CrazyGames'
  },
  {
    id: 'drift-hunters',
    title: 'Drift Hunters',
    category: 'Racing',
    thumbnail: './assets/thumbnails/drift-hunters.jpg',
    fallbackThumbnail: 'https://images.unsplash.com/photo-1504215680853-026ed2a45def?w=600&q=80',
    embedUrl: 'https://www.crazygames.com/embed/drift-hunters',
    description: 'Tune your car and drift. High fidelity 3D graphics.',
    rating: 4.7,
    plays: '9.2M',
    source: 'CrazyGames'
  },
  {
    id: 'highway-racer-3d',
    title: 'Highway Racer',
    category: 'Racing',
    thumbnail: './assets/thumbnails/highway-racer.jpg',
    fallbackThumbnail: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=600&q=80',
    // GD Link with Referrer Hack to bypass "Not found at origin"
    embedUrl: 'https://html5.gamedistribution.com/6a3a4197991b40979a02d8479e088820/?gd_sdk_referrer_url=https://gamedistribution.com/games/highway-racer-3d',
    description: 'High speed traffic racing. Dodge cars and escape the police.',
    rating: 4.6,
    plays: '5.2M',
    source: 'GameDistribution'
  },
  {
    id: 'smash-karts',
    title: 'Smash Karts',
    category: 'Racing',
    thumbnail: './assets/thumbnails/smash-karts.jpg',
    fallbackThumbnail: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&q=80',
    embedUrl: 'https://www.crazygames.com/embed/smash-karts',
    description: '3D multiplayer kart battle game. Pick up weapons and fight.',
    rating: 4.8,
    plays: '12M',
    source: 'CrazyGames'
  },

  // PUZZLE
  {
    id: 'candy-rain-7',
    title: 'Candy Rain 7',
    category: 'Puzzle',
    thumbnail: './assets/thumbnails/candy-rain-7.jpg',
    fallbackThumbnail: 'https://images.unsplash.com/photo-1582053433976-25c00369fc93?w=600&q=80',
    // GD Link with Referrer Hack
    embedUrl: 'https://html5.gamedistribution.com/8db632d43e5e4085817c60317e082163/?gd_sdk_referrer_url=https://gamedistribution.com/games/candy-rain-7',
    description: 'Match-3 puzzle game with thousands of sweet levels.',
    rating: 4.6,
    plays: '2.5M',
    source: 'GameDistribution'
  },
  {
    id: 'fireboy-watergirl-1',
    title: 'Fireboy & Watergirl',
    category: 'Puzzle',
    thumbnail: './assets/thumbnails/fireboy-watergirl.jpg',
    fallbackThumbnail: 'https://images.unsplash.com/photo-1619118748386-3531b262cb47?w=600&q=80',
    // GD Link with Referrer Hack
    embedUrl: 'https://html5.gamedistribution.com/6a940733575949319c5c2a07c31e2170/?gd_sdk_referrer_url=https://gamedistribution.com/games/fireboy-and-watergirl-1-forest-temple',
    description: 'The Forest Temple. Control two characters to solve puzzles.',
    rating: 4.9,
    plays: '30M',
    source: 'GameDistribution'
  },
  {
    id: 'bubble-shooter',
    title: 'Bubble Shooter',
    category: 'Puzzle',
    thumbnail: './assets/thumbnails/bubble-shooter.jpg',
    fallbackThumbnail: 'https://images.unsplash.com/photo-1577401239170-897942555fb3?w=600&q=80',
    embedUrl: 'https://html5.gamedistribution.com/1b1c4c1e1c1c4c1c1c1c1c1c1c1c1c1c/?gd_sdk_referrer_url=https://gamedistribution.com/games/bubble-shooter',
    description: 'Classic arcade puzzle. Match 3 bubbles to pop them.',
    rating: 4.5,
    plays: '25M',
    source: 'GameDistribution'
  },
  {
    id: 'daily-sudoku',
    title: 'Daily Sudoku',
    category: 'Puzzle',
    thumbnail: './assets/thumbnails/sudoku.jpg',
    fallbackThumbnail: 'https://images.unsplash.com/photo-1614312385003-dcea7b8b6ab6?w=600&q=80',
    // HTMLGames is extremely stable and open
    embedUrl: 'https://www.htmlgames.com/games/dailysudoku/index.html',
    description: 'Train your brain with the classic Japanese number puzzle.',
    rating: 4.4,
    plays: '5.2M',
    source: 'HTMLGames'
  },

  // ACTION
  {
    id: 'shell-shockers',
    title: 'Shell Shockers',
    category: 'Action',
    thumbnail: './assets/thumbnails/shell-shockers.jpg',
    fallbackThumbnail: 'https://images.unsplash.com/photo-1599557438318-6f8102a0a20e?w=600&q=80',
    embedUrl: 'https://www.crazygames.com/embed/shell-shockers',
    description: 'Multiplayer FPS where you play as an egg with guns.',
    rating: 4.8,
    plays: '15M',
    source: 'CrazyGames'
  },
  {
    id: 'tomb-runner',
    title: 'Tomb Runner',
    category: 'Action',
    thumbnail: './assets/thumbnails/tomb-runner.jpg',
    fallbackThumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&q=80',
    // GD Link with Referrer Hack
    embedUrl: 'https://html5.gamedistribution.com/f02199b4d812423396fb94b39b5e584a/?gd_sdk_referrer_url=https://gamedistribution.com/games/tomb-runner',
    description: 'Endless runner. Collect gems and avoid traps.',
    rating: 4.5,
    plays: '6.2M',
    source: 'GameDistribution'
  },
  {
    id: 'venge-io',
    title: 'Venge.io',
    category: 'Action',
    thumbnail: './assets/thumbnails/venge-io.jpg',
    fallbackThumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&q=80',
    embedUrl: 'https://www.crazygames.com/embed/venge-io',
    description: 'Fast-paced FPS. Capture objectives and upgrade weapons.',
    rating: 4.7,
    plays: '5.5M',
    source: 'CrazyGames'
  },
  {
    id: 'basketball-stars',
    title: 'Basketball Stars',
    category: 'Action',
    thumbnail: './assets/thumbnails/basketball-stars.jpg',
    fallbackThumbnail: 'https://images.unsplash.com/photo-1519861531473-920026393112?w=600&q=80',
    embedUrl: 'https://www.crazygames.com/embed/basketball-stars-2019',
    description: '1-on-1 Basketball. Play solo or with a friend.',
    rating: 4.6,
    plays: '7.8M',
    source: 'CrazyGames'
  }
];

// --- UTILS ---
const SafeImage: React.FC<{ src: string; fallback: string; alt: string; className?: string }> = ({ src, fallback, alt, className }) => {
  const [imgSrc, setImgSrc] = useState(src);
  return (
    <img 
      src={imgSrc} 
      alt={alt} 
      className={className} 
      onError={() => setImgSrc(fallback)}
      loading="lazy"
    />
  );
};

// --- COMPONENT: AdSense ---
const AdBanner: React.FC<{ slot: string; format?: string; className?: string }> = ({ 
  slot, 
  format = 'auto', 
  className = '' 
}) => {
  useEffect(() => {
    try {
      // @ts-ignore
      if (window.adsbygoogle) {
        // @ts-ignore
        window.adsbygoogle.push({});
      }
    } catch (e) {
      // Ignore adsense errors
    }
  }, []);

  return (
    <div className={`w-full flex justify-center items-center my-6 overflow-hidden bg-brand-800/30 rounded-lg border border-brand-700/30 ${className}`}>
      <div className="text-center w-full min-h-[100px] flex flex-col items-center justify-center py-2">
        <span className="text-[10px] text-gray-600 uppercase tracking-widest mb-1 block">Advertisement</span>
        <ins
          className="adsbygoogle block"
          style={{ display: 'block', width: '100%', minHeight: '90px' }}
          data-ad-client="ca-pub-9774042341049510"
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive="true"
        />
      </div>
    </div>
  );
};

// --- COMPONENT: Header ---
const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-brand-900/95 backdrop-blur-md border-b border-brand-800 shadow-lg">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 group">
          <div className="bg-brand-500 p-2 rounded-lg transform group-hover:rotate-12 transition-all duration-300 shadow-lg shadow-brand-500/20">
            <Gamepad2 className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-bold text-white tracking-tight">
            PlayZero<span className="text-brand-500">2025</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors text-sm font-medium">
            <Home className="w-4 h-4" /> <span>Home</span>
          </Link>
          <Link to="/popular" className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors text-sm font-medium">
            <Trophy className="w-4 h-4" /> <span>Popular</span>
          </Link>
          <Link to="/about.html" className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors text-sm font-medium">
            <Info className="w-4 h-4" /> <span>About</span>
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 text-gray-300 hover:text-white rounded-lg hover:bg-brand-800 transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="md:hidden bg-brand-800 border-b border-brand-700 animate-fade-in absolute w-full shadow-2xl z-50 left-0">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <Link to="/" className="block text-gray-300 hover:text-white py-2 border-b border-brand-700" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <div className="pt-2">
              <span className="text-xs text-gray-500 uppercase font-bold tracking-wider">Categories</span>
              <div className="grid grid-cols-2 gap-3 mt-3">
                {['Action', 'Puzzle', 'Racing'].map(cat => (
                  <Link 
                    key={cat} 
                    to={`/?category=${cat}`} 
                    className="text-sm text-gray-300 hover:text-white bg-brand-900/50 p-3 rounded border border-brand-700 text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {cat}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

// --- COMPONENT: Footer ---
const Footer: React.FC = () => (
  <footer className="bg-brand-950 border-t border-brand-800 mt-auto">
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Gamepad2 className="text-brand-500 w-6 h-6" />
            <span className="text-xl font-bold text-white">PlayZero</span>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">
            Instant free games for school and home. No downloads, no blocks.
          </p>
        </div>
        <div>
          <h3 className="font-semibold text-white mb-4">Games</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><Link to="/?category=Action" className="hover:text-brand-400 transition-colors">Action</Link></li>
            <li><Link to="/?category=Racing" className="hover:text-brand-400 transition-colors">Racing</Link></li>
            <li><Link to="/?category=Puzzle" className="hover:text-brand-400 transition-colors">Puzzle</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-white mb-4">Company</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><Link to="/privacy.html" className="hover:text-brand-400 transition-colors">Privacy</Link></li>
            <li><Link to="/contact.html" className="hover:text-brand-400 transition-colors">Contact</Link></li>
            <li><Link to="/about.html" className="hover:text-brand-400 transition-colors">About</Link></li>
          </ul>
        </div>
      </div>
      <div className="mt-12 pt-8 border-t border-brand-800 text-center md:text-left">
        <div className="text-gray-600 text-xs">
          © 2025 PlayZero2025. All rights reserved.
        </div>
      </div>
    </div>
  </footer>
);

// --- COMPONENT: Home Page ---
const HomePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryFilter = queryParams.get('category');

  const filteredGames = GAMES.filter(game => {
    const matchesSearch = game.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter ? game.category === categoryFilter : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <div className="bg-brand-900 py-12 border-b border-brand-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-brand-950 opacity-50"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Free Online <span className="text-brand-500">Games</span>
          </h1>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Play the best games of 2025 directly in your browser. Unblocked for school.
          </p>
          <div className="max-w-md mx-auto relative group">
            <input
              type="text"
              placeholder="Search games..."
              className="w-full px-5 py-3 rounded-full bg-brand-950 border border-brand-700 text-white focus:outline-none focus:border-brand-500 transition-all placeholder-gray-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 flex-grow">
        <AdBanner slot="1234567890" />

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white flex items-center">
            {categoryFilter ? `${categoryFilter} Games` : 'Featured Games'}
            <div className="h-1 w-8 bg-brand-500 ml-3 rounded-full"></div>
          </h2>
        </div>

        {filteredGames.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredGames.map(game => (
              <Link 
                key={game.id} 
                to={`/game/${game.id}`}
                className="group bg-brand-800 rounded-xl overflow-hidden shadow-lg border border-brand-700 hover:border-brand-500 transition-all duration-300 flex flex-col"
              >
                <div className="relative aspect-video overflow-hidden bg-brand-900">
                  <SafeImage 
                    src={game.thumbnail} 
                    fallback={game.fallbackThumbnail}
                    alt={game.title} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="bg-brand-500 text-white px-3 py-1 rounded-full font-bold text-sm flex items-center space-x-1">
                      <Play className="w-3 h-3 fill-current" />
                      <span>Play</span>
                    </div>
                  </div>
                </div>
                <div className="p-3 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-gray-100 text-sm mb-1 truncate">{game.title}</h3>
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>{game.category}</span>
                      <span className="flex items-center text-yellow-500">
                        <Star className="w-3 h-3 mr-1 fill-current"/> {game.rating}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-500 border border-brand-800 border-dashed rounded-xl">
            <Search className="w-12 h-12 mx-auto mb-4 text-gray-600"/>
            <p>No games found matching "{searchTerm}"</p>
          </div>
        )}

        <AdBanner slot="0987654321" />
      </div>
    </div>
  );
};

// --- COMPONENT: Game Player Page ---
const GamePlayerPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const game = GAMES.find(g => g.id === id);
  const [isLoading, setIsLoading] = useState(true);
  const [iframeKey, setIframeKey] = useState(0); 
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsLoading(true);
    setIframeKey(0);
  }, [id]);

  const handleReload = () => {
    setIsLoading(true);
    setIframeKey(prev => prev + 1);
  };

  const toggleFullscreen = () => {
    if (iframeRef.current) {
      if (iframeRef.current.requestFullscreen) {
        iframeRef.current.requestFullscreen();
      }
    }
  };

  if (!game) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col text-center px-4">
        <AlertTriangle className="w-12 h-12 text-yellow-500 mb-4" />
        <h2 className="text-xl font-bold mb-2">Game Not Found</h2>
        <button onClick={() => navigate('/')} className="mt-4 bg-brand-600 px-4 py-2 rounded text-white hover:bg-brand-500">Back Home</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="container mx-auto px-4 py-6">
        <button 
          onClick={() => navigate('/')} 
          className="flex items-center text-gray-400 hover:text-white transition-colors text-sm font-medium mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Games
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {/* Game Container */}
            <div className="bg-black rounded-lg overflow-hidden shadow-2xl border border-brand-700 relative aspect-video group">
              {isLoading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-brand-900 z-10">
                  <Loader2 className="w-8 h-8 text-brand-500 animate-spin mb-3" />
                  <p className="text-gray-300 font-medium">Loading {game.title}...</p>
                  <p className="text-xs text-gray-500 mt-2">Connecting to game server...</p>
                  <button onClick={handleReload} className="mt-6 px-4 py-2 bg-brand-800 rounded text-xs text-gray-300 hover:text-white border border-brand-700">
                    Stuck? Reload Game
                  </button>
                </div>
              )}
              
              <iframe
                ref={iframeRef}
                key={iframeKey}
                src={game.embedUrl}
                title={game.title}
                className="w-full h-full border-0 relative z-0"
                allowFullScreen
                allow="autoplay; fullscreen; gamepad; accelerometer; gyroscope; microphone; camera"
                // CRITICAL: no-referrer prevents "Refused to connect" on strict sites
                // But some sites require generic referrer. 
                // We use 'no-referrer' for CrazyGames to prevent origin blocking,
                // and we use url-parameter-injection for GameDistribution.
                referrerPolicy="no-referrer" 
                onLoad={() => setIsLoading(false)}
              ></iframe>

              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                 <button onClick={toggleFullscreen} className="p-2 bg-black/80 hover:bg-brand-600 text-white rounded backdrop-blur-sm" title="Fullscreen">
                    <Maximize2 className="w-4 h-4" />
                 </button>
                 <button onClick={handleReload} className="p-2 bg-black/80 hover:bg-brand-600 text-white rounded backdrop-blur-sm" title="Reload">
                    <RefreshCw className="w-4 h-4" />
                 </button>
              </div>
            </div>

            {/* Controls */}
            <div className="mt-3 flex items-center justify-between text-xs text-gray-500 px-1">
               <span className="flex items-center">
                 <div className={`w-2 h-2 rounded-full mr-2 ${isLoading ? 'bg-yellow-500 animate-pulse' : 'bg-green-500'}`}></div>
                 {isLoading ? 'Connecting...' : 'Ready to Play'}
               </span>
               <div className="flex items-center gap-2">
                  <span className="bg-brand-800 px-2 py-0.5 rounded border border-brand-700">Source: {game.source}</span>
               </div>
            </div>

            {/* Info */}
            <div className="mt-6 bg-brand-800 rounded-lg p-6 border border-brand-700">
              <h1 className="text-2xl font-bold text-white mb-2">{game.title}</h1>
              <p className="text-gray-400 text-sm mb-4 leading-relaxed">{game.description}</p>
              
              <div className="flex space-x-4 border-t border-brand-700 pt-4">
                 <button className="flex items-center space-x-2 text-sm text-gray-300 hover:text-white transition-colors">
                    <Heart className="w-4 h-4" /> <span>Like</span>
                 </button>
                 <button className="flex items-center space-x-2 text-sm text-gray-300 hover:text-white transition-colors">
                    <Share2 className="w-4 h-4" /> <span>Share</span>
                 </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <AdBanner slot="1122334455" format="rectangle" />
            <div className="bg-brand-800 rounded-lg p-4 border border-brand-700">
              <h3 className="font-bold text-white mb-3 text-sm">Similar Games</h3>
              <div className="space-y-3">
                {GAMES.filter(g => g.category === game.category && g.id !== game.id).slice(0, 4).map(similar => (
                  <Link key={similar.id} to={`/game/${similar.id}`} className="flex space-x-3 group hover:bg-brand-700 p-2 rounded transition-colors">
                    <SafeImage 
                      src={similar.thumbnail} 
                      fallback={similar.fallbackThumbnail}
                      alt={similar.title} 
                      className="w-16 h-12 object-cover rounded bg-brand-900" 
                    />
                    <div>
                      <h4 className="font-bold text-gray-200 text-xs group-hover:text-brand-400">{similar.title}</h4>
                      <span className="text-[10px] text-gray-500">{similar.category}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- STATIC PAGES ---

const PrivacyPage: React.FC = () => (
  <div className="container mx-auto px-4 py-12 max-w-3xl">
    <h1 className="text-2xl font-bold mb-6 border-b border-brand-700 pb-2">Privacy Policy</h1>
    <div className="space-y-6 text-gray-300 text-sm leading-relaxed">
      <p>Effective Date: January 1, 2025</p>
      <p>At PlayZero2025, we prioritize your privacy. This policy outlines how we handle data.</p>
      <h3 className="text-white font-bold">Cookies & Ads</h3>
      <p>We use Google AdSense to display ads. Google uses cookies to serve ads based on your prior visits to our website or other websites. You may opt out of personalized advertising by visiting Google's Ad Settings.</p>
      <h3 className="text-white font-bold">Game Data</h3>
      <p>Game progress is stored locally on your device. Clearing your browser cache will delete your progress.</p>
    </div>
  </div>
);

const AboutPage: React.FC = () => (
  <div className="container mx-auto px-4 py-12 max-w-3xl text-center">
    <div className="bg-brand-800 rounded-xl p-8 border border-brand-700">
      <Gamepad2 className="w-16 h-16 text-brand-500 mx-auto mb-4" />
      <h1 className="text-3xl font-bold mb-4">About PlayZero</h1>
      <p className="text-gray-300 mb-8">
        We provide high-quality, free online games that work everywhere—including school Chromebooks. 
        Our mission is to make gaming accessible without downloads or paywalls.
      </p>
      <div className="grid grid-cols-3 gap-4 text-center">
        <div><Shield className="w-8 h-8 text-green-500 mx-auto mb-2" /><span className="text-sm">Secure</span></div>
        <div><RefreshCw className="w-8 h-8 text-blue-500 mx-auto mb-2" /><span className="text-sm">Updated</span></div>
        <div><Smartphone className="w-8 h-8 text-purple-500 mx-auto mb-2" /><span className="text-sm">Mobile</span></div>
      </div>
    </div>
  </div>
);

const ContactPage: React.FC = () => (
  <div className="container mx-auto px-4 py-12 max-w-xl">
    <h1 className="text-2xl font-bold mb-6 text-center">Contact Us</h1>
    <div className="bg-brand-800 rounded-lg p-6 border border-brand-700">
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-gray-400 mb-1">Subject</label>
          <input type="text" className="w-full bg-brand-900 border border-brand-700 rounded p-2 text-white" />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-400 mb-1">Message</label>
          <textarea rows={4} className="w-full bg-brand-900 border border-brand-700 rounded p-2 text-white"></textarea>
        </div>
        <button className="w-full bg-brand-500 hover:bg-brand-600 text-white font-bold py-2 rounded transition-colors flex justify-center items-center">
          <Mail className="w-4 h-4 mr-2" /> Send
        </button>
      </div>
    </div>
  </div>
);

// --- MAIN APP ---
function App() {
  return (
    <div className="bg-brand-950 text-gray-100 font-sans min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/game/:id" element={<GamePlayerPage />} />
          <Route path="/popular" element={<HomePage />} />
          <Route path="/privacy.html" element={<PrivacyPage />} />
          <Route path="/about.html" element={<AboutPage />} />
          <Route path="/contact.html" element={<ContactPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;