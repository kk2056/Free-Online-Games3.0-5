
import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import { 
  Gamepad2, Search, Home, Play, Info, Heart, Share2, Star, Menu, X, 
  ArrowLeft, Loader2, AlertTriangle, Shield, Mail, RefreshCw, Smartphone, Trophy, Maximize2,
  BookOpen, Brain, CheckCircle, Zap
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
  longContent: {
    intro: string;
    gameplay: string;
    strategy: string;
    why2025: string;
  };
  rating: number;
  plays: string;
  source: 'CrazyGames' | 'GameDistribution' | 'HTMLGames';
}

// --- DATA: UNTOUCHED TO PRESERVE CONTENT ---
const GAMES: Game[] = [
  {
    id: 'moto-x3m',
    title: 'Moto X3M',
    category: 'Racing',
    thumbnail: './assets/thumbnails/moto-x3m.jpg',
    fallbackThumbnail: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=600&q=80',
    embedUrl: 'https://www.crazygames.com/embed/moto-x3m',
    description: 'The ultimate bike racing game. Perform stunts and beat the clock in this physics-based challenge.',
    rating: 4.9,
    plays: '18M',
    source: 'CrazyGames',
    longContent: {
      intro: "Moto X3M isn't just a racing game; it's a physics-based puzzle wrapped in high-octane motocross action. Released initially as a flash classic and now fully optimized for HTML5 in 2025, it challenges players to navigate 22 complex levels filled with deadly traps, loops, and obstacles.",
      gameplay: "The core mechanic revolves around balance and acceleration. You use the arrow keys to accelerate, brake, and tilt your bike. The goal is simple: reach the finish line as fast as possible. However, the terrain is treacherous. You must perform front flips and back flips to shave seconds off your time, which is crucial for earning that elusive 3-star rating on every level.",
      strategy: "Speed isn't everything. In Moto X3M, controlling your center of gravity is key. When hitting a ramp, ensure your wheels align with the landing surface to avoid crashing. Use the 'brake' feature mid-air to adjust your rotation. Memorize the level layout; knowing when a giant saw blade is approaching allows you to time your jumps perfectly.",
      why2025: "In 2025, Moto X3M remains a staple for unblocked school gaming because it requires no plugins and loads instantly. It perfectly balances frustration and reward, helping players develop fine motor skills and quick reaction times while providing short bursts of intense entertainment."
    }
  },
  {
    id: 'drift-hunters',
    title: 'Drift Hunters',
    category: 'Racing',
    thumbnail: './assets/thumbnails/drift-hunters.jpg',
    fallbackThumbnail: 'https://images.unsplash.com/photo-1504215680853-026ed2a45def?w=600&q=80',
    embedUrl: 'https://www.crazygames.com/embed/drift-hunters',
    description: 'Tune your car and drift. High fidelity 3D graphics meet realistic physics.',
    rating: 4.7,
    plays: '9.2M',
    source: 'CrazyGames',
    longContent: {
      intro: "Drift Hunters is the definitive 3D car drifting simulator that brings console-quality graphics to the browser. Unlike traditional racing games where the goal is to finish first, Drift Hunters focuses on style, control, and maintaining momentum through corners.",
      gameplay: "Players choose from a garage of legendary JDM and muscle cars, including the iconic Toyota Supra and Nissan Skyline. The game uses a sophisticated physics engine where throttle control and steering angle determine your drift score. The longer and faster you drift without hitting a wall, the more points multiplier you earn.",
      strategy: "The secret to success in Drift Hunters lies in the tuning menu. You can adjust brake balance, turbo pressure, and camber. For beginners, try lowering the rear tire pressure for more grip, or increasing the front camber for sharper turn-ins. Use the money earned from drifts to upgrade your engine and weight reduction.",
      why2025: "Browser technologies like WebGL have advanced significantly by 2025, allowing Drift Hunters to run smoothly on Chromebooks without lag. It's an excellent playground for understanding automotive physics and tuning mechanics in a risk-free virtual environment."
    }
  },
  {
    id: 'highway-racer-3d',
    title: 'Highway Racer',
    category: 'Racing',
    thumbnail: './assets/thumbnails/highway-racer.jpg',
    fallbackThumbnail: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=600&q=80',
    embedUrl: 'https://html5.gamedistribution.com/6a3a4197991b40979a02d8479e088820/?gd_sdk_referrer_url=https://gamedistribution.com/games/highway-racer-3d',
    description: 'High speed traffic racing. Dodge cars and escape the police in this endless driver.',
    rating: 4.6,
    plays: '5.2M',
    source: 'GameDistribution',
    longContent: {
      intro: "Highway Racer 3D takes the thrill of illegal street racing and condenses it into an intense browser experience. It captures the essence of classic arcade cabinets, challenging players to weave through dense highway traffic at breakneck speeds.",
      gameplay: "The objective is to drive as far as possible without crashing. You earn extra points for 'Close Calls'—overtaking other vehicles with only millimeters to spare. The game features multiple modes, including One-Way, Two-Way, and a high-stakes Police Pursuit mode where you must outrun the law while dodging civilian cars.",
      strategy: "Risk management is crucial. Driving in the opposite lane yields double points but significantly increases the danger. Keep an eye on the blinkers of cars ahead of you; they will change lanes unexpectedly. In Police mode, use the traffic to your advantage by weaving between trucks to block the police cruisers chasing you.",
      why2025: "Endless runners are timeless, but Highway Racer 3D adds a layer of competitive driving skill. It's a favorite in 2025 for quick gaming sessions, offering high replay value as players compete to top the global leaderboards."
    }
  },
  {
    id: 'smash-karts',
    title: 'Smash Karts',
    category: 'Racing',
    thumbnail: './assets/thumbnails/smash-karts.jpg',
    fallbackThumbnail: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&q=80',
    embedUrl: 'https://www.crazygames.com/embed/smash-karts',
    description: '3D multiplayer kart battle game. Pick up weapons and fight in real-time arenas.',
    rating: 4.8,
    plays: '12M',
    source: 'CrazyGames',
    longContent: {
      intro: "Smash Karts is a chaotic, multiplayer online battle arena (MOBA) on wheels. It combines the driving mechanics of kart racers with the combat intensity of a shooter. It's fully 3D and allows you to battle real players from around the world instantly.",
      gameplay: "You drive a customizable kart across various themed arenas. The ground is littered with mystery boxes containing weapons like machine guns, rockets, and mines. The goal is to destroy as many opponents as possible within the time limit. Each kill levels you up, unlocking new characters and kart skins.",
      strategy: "Constant movement is life. Never stop driving, as a stationary target is easy prey. Learn the map layouts to find health packs and power-ups. Drifting helps you take tight corners and evade incoming missiles. Try to predict your enemy's path and fire rockets where they are going to be, not where they are.",
      why2025: "Smash Karts represents the peak of .io gaming in 2025. It requires no download, supports cross-platform play, and offers a social experience where friends can create private rooms to settle scores during break time."
    }
  },
  {
    id: 'candy-rain-7',
    title: 'Candy Rain 7',
    category: 'Puzzle',
    thumbnail: './assets/thumbnails/candy-rain-7.jpg',
    fallbackThumbnail: 'https://images.unsplash.com/photo-1582053433976-25c00369fc93?w=600&q=80',
    embedUrl: 'https://html5.gamedistribution.com/8db632d43e5e4085817c60317e082163/?gd_sdk_referrer_url=https://gamedistribution.com/games/candy-rain-7',
    description: 'Match-3 puzzle game with thousands of sweet levels and colorful graphics.',
    rating: 4.6,
    plays: '2.5M',
    source: 'GameDistribution',
    longContent: {
      intro: "Candy Rain 7 is the latest installment in one of the most popular Match-3 puzzle series on the web.",
      gameplay: "The rules are simple but deep: swap adjacent candies to form rows or columns of three or more matching items.",
      strategy: "Don't just make the first match you see. Look for opportunities to create 'Super Candies' by matching 5 items.",
      why2025: "In a world of complex games, Candy Rain 7 offers a relaxing, Zen-like experience."
    }
  },
  {
    id: 'fireboy-watergirl-1',
    title: 'Fireboy & Watergirl',
    category: 'Puzzle',
    thumbnail: './assets/thumbnails/fireboy-watergirl.jpg',
    fallbackThumbnail: 'https://images.unsplash.com/photo-1619118748386-3531b262cb47?w=600&q=80',
    embedUrl: 'https://html5.gamedistribution.com/6a940733575949319c5c2a07c31e2170/?gd_sdk_referrer_url=https://gamedistribution.com/games/fireboy-and-watergirl-1-forest-temple',
    description: 'The Forest Temple. Control two characters to solve puzzles cooperatively.',
    rating: 4.9,
    plays: '30M',
    source: 'GameDistribution',
    longContent: {
      intro: "Fireboy and Watergirl: The Forest Temple is a legendary cooperative puzzle platformer.",
      gameplay: "Fireboy can walk through lava but dies in water. Watergirl can wade through water but evaporates in lava.",
      strategy: "Communication is key. You often need to keep one character standing on a button to hold a door open for the other.",
      why2025: "Even in 2025, few games match the cooperative brilliance of this title. It teaches teamwork and problem-solving."
    }
  },
  {
    id: 'bubble-shooter',
    title: 'Bubble Shooter',
    category: 'Puzzle',
    thumbnail: './assets/thumbnails/bubble-shooter.jpg',
    fallbackThumbnail: 'https://images.unsplash.com/photo-1577401239170-897942555fb3?w=600&q=80',
    embedUrl: 'https://html5.gamedistribution.com/1b1c4c1e1c1c4c1c1c1c1c1c1c1c1c1c/?gd_sdk_referrer_url=https://gamedistribution.com/games/bubble-shooter',
    description: 'Classic arcade puzzle. Match 3 bubbles to pop them and clear the board.',
    rating: 4.5,
    plays: '25M',
    source: 'GameDistribution',
    longContent: {
      intro: "Bubble Shooter is the definition of a timeless classic.",
      gameplay: "You control an arrow launcher at the bottom of the screen. Your goal is to fire colored bubbles into the field above.",
      strategy: "Use the walls! The key to becoming a Bubble Shooter master is using bank shots.",
      why2025: "Simple to learn, impossible to master. Bubble Shooter remains a top choice in 2025 for stress relief."
    }
  },
  {
    id: 'daily-sudoku',
    title: 'Daily Sudoku',
    category: 'Puzzle',
    thumbnail: './assets/thumbnails/sudoku.jpg',
    fallbackThumbnail: 'https://images.unsplash.com/photo-1614312385003-dcea7b8b6ab6?w=600&q=80',
    embedUrl: 'https://www.htmlgames.com/games/dailysudoku/index.html',
    description: 'Train your brain with the classic Japanese number puzzle. New levels daily.',
    rating: 4.4,
    plays: '5.2M',
    source: 'HTMLGames',
    longContent: {
      intro: "Daily Sudoku brings the classic newspaper logic puzzle to the digital age.",
      gameplay: "The grid is a 9x9 square, divided into nine 3x3 subgrids.",
      strategy: "Start with the 'low hanging fruit'—rows or blocks that are nearly full. Use the process of elimination.",
      why2025: "In an era of short attention spans, Sudoku stands out as a tool for focus."
    }
  },
  {
    id: 'shell-shockers',
    title: 'Shell Shockers',
    category: 'Action',
    thumbnail: './assets/thumbnails/shell-shockers.jpg',
    fallbackThumbnail: 'https://images.unsplash.com/photo-1599557438318-6f8102a0a20e?w=600&q=80',
    embedUrl: 'https://www.crazygames.com/embed/shell-shockers',
    description: 'The world\'s top egg-based multiplayer shooter. FPS action with a scramble.',
    rating: 4.8,
    plays: '15M',
    source: 'CrazyGames',
    longContent: {
      intro: "Shell Shockers is a unique First Person Shooter (FPS) where you play as a fully armed egg.",
      gameplay: "Players enter arenas equipped with egg-themed weapons like the 'EggK-47', 'Scrambler', and 'Crackshot'.",
      strategy: "Jumping makes you harder to hit. In Shell Shockers, accuracy is vital, but movement is king.",
      why2025: "It's the definitive unblocked FPS of 2025. With its non-violent premise and high skill ceiling."
    }
  },
  {
    id: 'tomb-runner',
    title: 'Tomb Runner',
    category: 'Action',
    thumbnail: './assets/thumbnails/tomb-runner.jpg',
    fallbackThumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&q=80',
    embedUrl: 'https://html5.gamedistribution.com/f02199b4d812423396fb94b39b5e584a/?gd_sdk_referrer_url=https://gamedistribution.com/games/tomb-runner',
    description: 'Endless runner. Collect gems, jump gaps, and avoid traps in an ancient temple.',
    rating: 4.5,
    plays: '6.2M',
    source: 'GameDistribution',
    longContent: {
      intro: "Tomb Runner creates an exhilarating endless runner experience reminiscent of classics like Temple Run.",
      gameplay: "The character runs automatically. Your job is to swipe (or use arrow keys) to jump over gaps.",
      strategy: "Focus on the path ahead, not your character. Anticipation is crucial as the game speed increases.",
      why2025: "Tomb Runner is the perfect 'flow state' game. It engages your reflexes and shuts out distractions."
    }
  },
  {
    id: 'venge-io',
    title: 'Venge.io',
    category: 'Action',
    thumbnail: './assets/thumbnails/venge-io.jpg',
    fallbackThumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&q=80',
    embedUrl: 'https://www.crazygames.com/embed/venge-io',
    description: 'Fast-paced FPS. Capture objectives, collect cards, and upgrade your hero.',
    rating: 4.7,
    plays: '5.5M',
    source: 'CrazyGames',
    longContent: {
      intro: "Venge.io revolutionizes browser FPS gaming by introducing card-based mechanics and character abilities.",
      gameplay: "It's an objective-based shooter. You must stand in the green circles (capture points) to earn points.",
      strategy: "Don't just hunt for kills; play the objective. Capturing points unlocks your potential.",
      why2025: "Venge.io runs smoothly on low-end hardware, making it accessible to everyone."
    }
  },
  {
    id: 'basketball-stars',
    title: 'Basketball Stars',
    category: 'Action',
    thumbnail: './assets/thumbnails/basketball-stars.jpg',
    fallbackThumbnail: 'https://images.unsplash.com/photo-1519861531473-920026393112?w=600&q=80',
    embedUrl: 'https://www.crazygames.com/embed/basketball-stars-2019',
    description: '1-on-1 Basketball. Play solo or with a friend in this bobblehead sports game.',
    rating: 4.6,
    plays: '7.8M',
    source: 'CrazyGames',
    longContent: {
      intro: "Basketball Stars is the premier 1-on-1 arcade basketball game.",
      gameplay: "The controls are simple: move, jump, shoot, and steal. However, the timing is everything.",
      strategy: "Defense wins championships. Don't spam the steal button, or you'll be left open.",
      why2025: "Sports games bring people together. Basketball Stars is a local multiplayer favorite in 2025."
    }
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
  }, [slot]);

  return (
    <div className={`w-full flex justify-center items-center overflow-hidden ${className}`}>
      <ins
        className="adsbygoogle block"
        style={{ display: 'block', width: '100%', minHeight: '90px' }}
        data-ad-client="ca-pub-9774042341049510"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
};

// --- COMPONENT: Cookie Consent ---
const CookieConsent: React.FC = () => {
  const [accepted, setAccepted] = useState(localStorage.getItem('cookie_consent'));
  if (accepted) return null;
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-brand-900/95 backdrop-blur border-t border-brand-700 p-4 z-50 flex flex-col md:flex-row items-center justify-between gap-4 animate-fade-in shadow-2xl">
      <div className="text-sm text-gray-300">
        <p>We use cookies and Google AdSense to personalize content and ads. By continuing to use our site, you agree to our policies.</p>
      </div>
      <button 
        onClick={() => { localStorage.setItem('cookie_consent', 'true'); setAccepted('true'); }}
        className="bg-brand-500 hover:bg-brand-600 text-white px-6 py-2 rounded-full font-bold text-sm transition-colors"
      >
        Accept
      </button>
    </div>
  );
};

// --- COMPONENT: Header ---
const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 bg-brand-900/95 backdrop-blur-md border-b border-brand-800 shadow-lg">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 group">
          <div className="bg-brand-500 p-2 rounded-lg group-hover:rotate-12 transition-all">
            <Gamepad2 className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-bold text-white tracking-tight">PlayZero<span className="text-brand-500">2025</span></span>
        </Link>
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-gray-300 hover:text-white transition-colors text-sm font-medium flex items-center space-x-1"><Home className="w-4 h-4"/><span>Home</span></Link>
          <Link to="/popular" className="text-gray-300 hover:text-white transition-colors text-sm font-medium flex items-center space-x-1"><Trophy className="w-4 h-4"/><span>Popular</span></Link>
          <Link to="/about.html" className="text-gray-300 hover:text-white transition-colors text-sm font-medium flex items-center space-x-1"><Info className="w-4 h-4"/><span>About</span></Link>
        </nav>
        <button className="md:hidden p-2 text-gray-300" onClick={() => setIsMenuOpen(!isMenuOpen)}>{isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}</button>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-brand-800 border-b border-brand-700 p-4 absolute w-full shadow-2xl z-50">
          <Link to="/" className="block text-gray-300 py-2" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link to="/popular" className="block text-gray-300 py-2" onClick={() => setIsMenuOpen(false)}>Popular</Link>
          <Link to="/privacy.html" className="block text-gray-300 py-2" onClick={() => setIsMenuOpen(false)}>Privacy Policy</Link>
        </div>
      )}
    </header>
  );
};

// --- COMPONENT: Footer ---
const Footer: React.FC = () => (
  <footer className="bg-brand-950 border-t border-brand-800 mt-auto py-12">
    <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
      <div className="space-y-4">
        <div className="flex items-center space-x-2"><Gamepad2 className="text-brand-500 w-6 h-6"/><span className="text-xl font-bold text-white">PlayZero</span></div>
        <p className="text-gray-400 text-sm">Instant free games for school and home. No downloads, no blocks. Optimized for 2025.</p>
      </div>
      <div>
        <h3 className="font-semibold text-white mb-4">Games</h3>
        <ul className="space-y-2 text-sm text-gray-400">
          <li><Link to="/?category=Action" className="hover:text-brand-500">Action Games</Link></li>
          <li><Link to="/?category=Racing" className="hover:text-brand-500">Racing Games</Link></li>
          <li><Link to="/?category=Puzzle" className="hover:text-brand-500">Puzzle Games</Link></li>
        </ul>
      </div>
      <div>
        <h3 className="font-semibold text-white mb-4">Links</h3>
        <ul className="space-y-2 text-sm text-gray-400">
          <li><Link to="/privacy.html" className="hover:text-brand-500">Privacy Policy</Link></li>
          <li><Link to="/contact.html" className="hover:text-brand-500">Contact Us</Link></li>
          <li><Link to="/about.html" className="hover:text-brand-500">About Us</Link></li>
        </ul>
      </div>
    </div>
    <div className="container mx-auto px-4 mt-8 pt-8 border-t border-brand-800 text-center text-xs text-gray-600">
      © 2025 PlayZero2025. All rights reserved.
    </div>
  </footer>
);

// --- COMPONENT: Home Page ---
const HomePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();
  const categoryFilter = new URLSearchParams(location.search).get('category');
  const filteredGames = GAMES.filter(game => {
    const matchesSearch = game.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter ? game.category === categoryFilter : true;
    return matchesSearch && matchesCategory;
  });
  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-brand-900 py-16 text-center relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">Play 100% Free <span className="text-brand-500">Online Games</span></h1>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">Access the best browser games of 2025. No downloads, just instant fun for Chromebook and PC.</p>
          <div className="max-w-xl mx-auto relative">
            <input type="text" placeholder="Search for games..." className="w-full px-6 py-4 rounded-full bg-brand-950 border border-brand-700 text-white focus:outline-none focus:border-brand-500" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            <Search className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {filteredGames.map(game => (
            <Link key={game.id} to={`/game/${game.id}`} className="group bg-brand-800 rounded-xl overflow-hidden border border-brand-700 hover:border-brand-500 transition-all">
              <div className="aspect-video relative overflow-hidden bg-brand-900">
                <SafeImage src={game.thumbnail} fallback={game.fallbackThumbnail} alt={game.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-100 mb-1">{game.title}</h3>
                <div className="flex justify-between items-center text-xs text-gray-500">
                  <span className="bg-brand-900 px-2 py-1 rounded">{game.category}</span>
                  <span className="flex items-center text-yellow-500"><Star className="w-3 h-3 mr-1 fill-current"/> {game.rating}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
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
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsLoading(true);
  }, [id]);

  if (!game) return <div className="text-center py-20">Game not found</div>;

  return (
    <div className="container mx-auto px-4 py-6 flex flex-col min-h-screen">
      <button onClick={() => navigate('/')} className="flex items-center text-gray-400 hover:text-white mb-6 text-sm"><ArrowLeft className="w-4 h-4 mr-2"/>Back to Home</button>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          
          {/* AdSense SLOT 1 (ABOVE GAME) */}
          <div className="ad-top mt-4 text-center">
            <AdBanner slot="7788990011" format="auto" />
          </div>

          {/* FULL SCREEN BUTTON */}
          <button 
            onClick={() => document.documentElement.requestFullscreen()} 
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg mb-4 block mx-auto text-lg shadow-xl active:scale-95 transition-all"
          >
            Go Full Screen (Press F for best experience)
          </button>

          {/* FULL SCREEN TIP TEXT */}
          <div className="text-center text-white bg-blue-800 p-3 rounded-lg mb-6 max-w-md mx-auto border border-blue-600/30">
            Press F for fullscreen - Perfect for long play on Chromebook! No lag, full immersion.
          </div>

          {/* GAME IFRAME CONTAINER */}
          <div className="bg-black rounded-xl overflow-hidden shadow-2xl border border-brand-700 relative aspect-video ring-1 ring-white/10">
            {isLoading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-brand-900 z-10">
                <Loader2 className="w-10 h-10 text-brand-500 animate-spin mb-4" />
                <p className="text-gray-200 font-bold">Loading {game.title}...</p>
              </div>
            )}
            <iframe
              ref={iframeRef}
              src={game.embedUrl}
              title={game.title}
              className="w-full h-full border-0 relative z-0"
              allowFullScreen
              allow="autoplay; fullscreen; gamepad; accelerometer; gyroscope; microphone; camera"
              onLoad={() => setIsLoading(false)}
            ></iframe>
          </div>

          {/* AdSense SLOT 2 (BELOW GAME) */}
          <div className="ad-bottom mt-8 text-center">
            <AdBanner slot="2233445566" format="auto" />
          </div>

          {/* RICH CONTENT SECTION */}
          <div className="mt-10 bg-brand-800 rounded-xl p-8 border border-brand-700">
            <h1 className="text-3xl font-extrabold text-white mb-6 flex items-center"><Gamepad2 className="w-8 h-8 mr-3 text-brand-500"/>About {game.title}</h1>
            <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed">
              <p className="mb-6">{game.longContent.intro}</p>
              <div className="grid md:grid-cols-2 gap-6 my-8">
                <div className="bg-brand-900/50 p-6 rounded-lg border border-brand-700/50">
                  <h3 className="text-lg font-bold text-white mb-3 flex items-center"><BookOpen className="w-5 h-5 mr-2 text-blue-400"/> How to Play</h3>
                  <p className="text-sm">{game.longContent.gameplay}</p>
                </div>
                <div className="bg-brand-900/50 p-6 rounded-lg border border-brand-700/50">
                  <h3 className="text-lg font-bold text-white mb-3 flex items-center"><Brain className="w-5 h-5 mr-2 text-purple-400"/> Pro Strategies</h3>
                  <p className="text-sm">{game.longContent.strategy}</p>
                </div>
              </div>
              <p>{game.longContent.why2025}</p>
            </div>
            
            {/* Strategy Text Block (SEO Optimized) */}
            <div className="strategy mt-10 text-gray-400 p-6 bg-brand-950/50 rounded-lg border border-brand-700 italic text-sm">
              Looking for a seamless gaming experience? Play Zero Unblocked 2025 is your destination for "Zero Lag, Zero Hassle." We understand that school networks often throttle bandwidth, causing games to stutter. This site features a curated collection of lightweight HTML5 games designed to load instantly. From puzzles to quick action titles, everything here is built for speed.
              Why play here? Every game on this list has been compressed and optimized. If you are tired of loading bars getting stuck at 99%, this is your paradise. It’s perfect for those 5-minute passing periods between classes. You don't need to install any plugins or extensions; simply open your browser and enjoy smooth digital entertainment. This is the top choice for students seeking lightweight fun in 2025.
            </div>

            {/* Inner Links Section (SEO Internal Links) */}
            <div className="other-games mt-10 bg-brand-950 p-8 rounded-lg border border-brand-700">
              <h3 className="text-xl font-bold text-white mb-6 border-b border-brand-700 pb-2">More Unblocked Games 2025</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <li><a href="https://snakegame.cfd" className="text-brand-400 hover:text-white transition-colors">Play Snake Game Unblocked 2025</a></li>
                <li><a href="https://playzero2025.sbs" className="text-brand-400 hover:text-white transition-colors">Play Zero Lag Games Unblocked 2025</a></li>
                <li><a href="https://freegames2025.sbs" className="text-brand-400 hover:text-white transition-colors">Play Free Games Unblocked 2025</a></li>
                <li><a href="https://nodownload2025.online" className="text-brand-400 hover:text-white transition-colors">Play No Download Games Unblocked 2025</a></li>
                <li><a href="https://unblocked2025.cfd" className="text-brand-400 hover:text-white transition-colors">Play Unblocked Games 2025 (Main)</a></li>
                <li><a href="https://unblocked2025.sbs" className="text-brand-400 hover:text-white transition-colors">Play Best Unblocked Games 2025</a></li>
                <li><a href="https://promax.it.com" className="text-brand-400 hover:text-white transition-colors">Play ProMax Games Unblocked 2025</a></li>
                <li><a href="https://retrobowl2025.online" className="text-brand-400 hover:text-white transition-colors">Play Retro Bowl Unblocked 2025</a></li>
                <li><a href="https://1v1lol2025.online" className="text-brand-400 hover:text-white transition-colors">Play 1v1.LOL Unblocked 2025</a></li>
                <li><a href="https://drift2025.site" className="text-brand-400 hover:text-white transition-colors">Play Drift Hunters Unblocked 2025</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* SIDEBAR RECOMMENDED */}
        <div className="space-y-6">
          <div className="bg-brand-800 rounded-xl p-5 border border-brand-700 shadow-lg sticky top-24">
            <h3 className="font-bold text-white mb-4 uppercase tracking-wider flex items-center"><Star className="w-4 h-4 mr-2 text-yellow-500"/> Recommended</h3>
            <div className="space-y-4">
              {GAMES.filter(g => g.id !== game.id).slice(0, 8).map(rec => (
                <Link key={rec.id} to={`/game/${rec.id}`} className="flex space-x-3 group">
                  <div className="w-20 h-14 bg-brand-900 rounded overflow-hidden flex-shrink-0">
                    <SafeImage src={rec.thumbnail} fallback={rec.fallbackThumbnail} alt={rec.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="flex flex-col justify-center">
                    <h4 className="text-sm font-bold text-gray-200 group-hover:text-brand-500 truncate w-32">{rec.title}</h4>
                    <span className="text-[10px] text-gray-500 uppercase">{rec.category}</span>
                  </div>
                </Link>
              ))}
            </div>
            <Link to="/" className="block mt-6 text-center text-xs font-bold text-brand-500 uppercase">Explore All Games</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- STATIC PAGES (Simplified for demo) ---
const PrivacyPage: React.FC = () => (
  <div className="container mx-auto px-4 py-12 max-w-4xl text-gray-300">
    <div className="bg-brand-800 rounded-xl p-10 border border-brand-700">
      <h1 className="text-3xl font-bold mb-8 text-white">Privacy Policy</h1>
      <p className="mb-6">At PlayZero2025, your privacy is paramount. We use Google AdSense to provide high-quality free gaming content. By using our site, you agree to the use of cookies for personalized advertising.</p>
      <h2 className="text-xl font-bold mb-4 text-white">Cookies and AdSense</h2>
      <p>Google uses cookies to serve ads based on your prior visits. You may opt out by visiting the Google Ad Settings page.</p>
    </div>
  </div>
);

const AboutPage: React.FC = () => (
  <div className="container mx-auto px-4 py-12 max-w-4xl text-center">
    <div className="bg-brand-800 rounded-xl p-12 border border-brand-700">
      <Gamepad2 className="w-16 h-16 text-brand-500 mx-auto mb-6"/>
      <h1 className="text-4xl font-bold mb-6 text-white">About PlayZero</h1>
      <p className="text-xl text-gray-300 leading-relaxed">PlayZero is the world's leading destination for unblocked browser games. Since 2025, we have provided millions of students and office workers with high-performance, lag-free gaming experiences that require no downloads.</p>
    </div>
  </div>
);

const ContactPage: React.FC = () => (
  <div className="container mx-auto px-4 py-12 max-w-xl text-center">
    <h1 className="text-3xl font-bold mb-8 text-white">Contact Us</h1>
    <div className="bg-brand-800 rounded-xl p-8 border border-brand-700">
      <Mail className="w-12 h-12 text-brand-500 mx-auto mb-6"/>
      <p className="text-gray-300 mb-8">Have a game suggestion or feedback? Reach out to our developer team.</p>
      <button className="bg-brand-500 hover:bg-brand-600 text-white font-bold py-3 px-8 rounded-lg w-full transition-colors shadow-lg shadow-brand-500/20">Send Email</button>
    </div>
  </div>
);

// --- APP ROOT ---
function App() {
  return (
    <div className="bg-brand-950 text-gray-100 font-sans min-h-screen flex flex-col selection:bg-brand-500 selection:text-white">
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
      <CookieConsent />
    </div>
  );
}

export default App;
