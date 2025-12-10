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
  description: string; // Short meta description
  longContent: {       // AdSense Rich Content
    intro: string;
    gameplay: string;
    strategy: string;
    why2025: string;
  };
  rating: number;
  plays: string;
  source: 'CrazyGames' | 'GameDistribution' | 'HTMLGames';
}

// --- DATA: ORIGINAL CONTENT FOR ADSENSE (SEO OPTIMIZED) ---
const GAMES: Game[] = [
  // RACING
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

  // PUZZLE
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
      intro: "Candy Rain 7 is the latest installment in one of the most popular Match-3 puzzle series on the web. It continues the legacy of colorful graphics and addictive gameplay, offering thousands of levels that challenge your pattern recognition skills.",
      gameplay: "The rules are simple but deep: swap adjacent candies to form rows or columns of three or more matching items. Matching four or five candies creates special power-ups that can clear entire rows or explode in a blast radius. You must complete specific objectives, such as collecting a certain number of cookies or clearing jelly, within a limited number of moves.",
      strategy: "Don't just make the first match you see. Look for opportunities to create 'Super Candies' by matching 5 items. Combine two special candies for massive board-clearing effects. Save your moves; finishing a level with leftover moves triggers a 'Sugar Crush' bonus that skyrockets your score.",
      why2025: "In a world of complex games, Candy Rain 7 offers a relaxing, Zen-like experience. It's perfect for 2025's casual gamers who want to engage their brain with light logic puzzles without the stress of time limits or combat."
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
      intro: "Fireboy and Watergirl: The Forest Temple is a legendary cooperative puzzle platformer. It challenges players to control two elemental characters simultaneously, making it a supreme test of coordination and logic.",
      gameplay: "Fireboy can walk through lava but dies in water. Watergirl can wade through water but evaporates in lava. Both perish in green goo. Players must flip switches, push stone blocks, and manage elevators to guide both characters to their respective exit doors. While it can be played solo, it shines as a two-player experience on the same keyboard.",
      strategy: "Communication is key. You often need to keep one character standing on a button to hold a door open for the other. Plan your route ahead of time. In speed-run levels, efficiency is everything—don't backtrack unless absolutely necessary. Remember, if one character dies, the level restarts.",
      why2025: "Even in 2025, few games match the cooperative brilliance of this title. It teaches teamwork and problem-solving. It's a staple in computer labs and homes, fostering social interaction through gameplay."
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
      intro: "Bubble Shooter is the definition of a timeless classic. Originating from arcade mechanics of the 90s, this HTML5 version brings the addictive aim-and-shoot gameplay to modern browsers. It's a game of geometry and planning.",
      gameplay: "You control an arrow launcher at the bottom of the screen. Your goal is to fire colored bubbles into the field above. Connecting three or more bubbles of the same color causes them to pop. If you detach a cluster of bubbles from the main group, they all fall, awarding massive points.",
      strategy: "Use the walls! The key to becoming a Bubble Shooter master is using bank shots. Bouncing bubbles off the side walls allows you to reach difficult spots and snipe the supporting bubbles of a large cluster. Always check the 'next bubble' indicator to plan your moves ahead.",
      why2025: "Simple to learn, impossible to master. Bubble Shooter remains a top choice in 2025 for stress relief. The satisfying 'pop' sound and the visual feedback of clearing the board provide a dopamine hit that keeps players coming back."
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
      intro: "Daily Sudoku brings the classic newspaper logic puzzle to the digital age. It's a game of pure deduction, requiring no math skills but demanding sharp logical thinking and patience. It's widely recognized for its cognitive benefits.",
      gameplay: "The grid is a 9x9 square, divided into nine 3x3 subgrids. The goal is to fill the empty cells with digits from 1 to 9 so that each column, each row, and each 3x3 subgrid contains all of the digits from 1 to 9 without repetition. There is only one valid solution for every puzzle.",
      strategy: "Start with the 'low hanging fruit'—rows or blocks that are nearly full. Use the process of elimination. If a number must be in a specific row in a subgrid, it cannot be elsewhere in that row. Use 'pencil marks' to note potential candidates for a cell before committing.",
      why2025: "In an era of short attention spans, Sudoku stands out as a tool for focus. Playing daily in 2025 is a popular way to keep the mind sharp, improve memory, and develop concentration skills. It's the ultimate 'brain gym' exercise."
    }
  },

  // ACTION
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
      intro: "Shell Shockers is a unique First Person Shooter (FPS) where you play as a fully armed egg. Yes, an egg. It breaks the mold of violent military shooters by offering a colorful, hilarious, yet deeply competitive experience that is suitable for all ages.",
      gameplay: "Players enter arenas equipped with egg-themed weapons like the 'EggK-47', 'Scrambler', and 'Crackshot'. The movement is fast and fluid. As you take damage, your egg shell begins to crack. You must scramble for cover and health packs to survive. Game modes include Free For All, Teams, and Captula the Spatula.",
      strategy: "Jumping makes you harder to hit. In Shell Shockers, accuracy is vital, but movement is king. Master the art of strafing and shooting. different guns suit different playstyles; the shotgun is devastating close-range, while the sniper rifle requires patience. Don't forget to reload before engaging a new enemy!",
      why2025: "It's the definitive unblocked FPS of 2025. With its non-violent premise (you're just breaking eggs) and high skill ceiling, it's allowed in many schools and workplaces where other shooters are banned. It proves that browser games can rival downloadable titles in quality."
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
      intro: "Tomb Runner creates an exhilarating endless runner experience reminiscent of classics like Temple Run. You take on the role of an adventurer sprinting along the top of an ancient wall, desperate to escape with the treasure.",
      gameplay: "The character runs automatically. Your job is to swipe (or use arrow keys) to jump over gaps, slide under flame traps, and turn corners at the last second. Along the way, you collect colored gems which add to your score and unlock new characters, including a mummy and a disco dancer.",
      strategy: "Focus on the path ahead, not your character. Anticipation is crucial as the game speed increases the further you run. Prioritize survival over collecting every single coin. Sometimes, it's safer to stay in the middle lane than to risk a dangerous jump for a few extra points.",
      why2025: "Tomb Runner is the perfect 'flow state' game. It engages your reflexes and shuts out distractions. In 2025, it remains popular for its pure simplicity and the 'just one more try' addictiveness that challenges you to beat your high score."
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
      intro: "Venge.io revolutionizes browser FPS gaming by introducing card-based mechanics and character abilities. It's a tactical shooter where capturing objectives allows you to upgrade your weapon and skills in real-time during the match.",
      gameplay: "It's an objective-based shooter. You must stand in the green circles (capture points) to earn points and unlock cards. These cards grant abilities like shock grenades, muscle regeneration, or faster reload speeds. The maps are tight and designed for close-quarters combat (CQC).",
      strategy: "Don't just hunt for kills; play the objective. Capturing points unlocks your potential. Learn the 'movement tech'—sliding and jumping makes you a difficult target. Knowing the spawn points of the maps gives you a massive tactical advantage. Each character has a unique weapon (Scar, Shotgun, Sniper, Tec-9); master one to dominate.",
      why2025: "Venge.io runs smoothly on low-end hardware, making it accessible to everyone. Its unique blend of card-building and shooting offers a depth of strategy rarely seen in browser games, keeping the 2025 community active and competitive."
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
      intro: "Basketball Stars is the premier 1-on-1 arcade basketball game. Featuring stylized 'bobblehead' versions of famous players, it focuses on fun, exaggerated physics, and intense duels. It supports both single-player tournaments and local two-player versus modes.",
      gameplay: "The controls are simple: move, jump, shoot, and steal. However, the timing is everything. You can perform slam dunks for guaranteed points or shoot 3-pointers for a higher risk-reward. Defense involves stealing the ball or blocking shots mid-air. Each character has a 'super shot' bar that, when filled, guarantees a basket.",
      strategy: "Defense wins championships. Don't spam the steal button, or you'll be left open. Time your jump to block the opponent's shot at the apex. On offense, use fakes to trick your opponent into jumping, then drive to the hoop for an easy dunk. Manage your special meter wisely.",
      why2025: "Sports games bring people together. Basketball Stars is a local multiplayer favorite in 2025, allowing two friends to share a keyboard and compete. It captures the spirit of street basketball with an arcade twist that is instantly fun for anyone."
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
  }, []);

  return (
    <div className={`w-full flex justify-center items-center my-8 overflow-hidden bg-brand-800/20 rounded-lg border border-brand-700/30 ${className}`}>
      <div className="text-center w-full min-h-[100px] flex flex-col items-center justify-center py-4">
        <span className="text-[10px] text-gray-600 uppercase tracking-widest mb-2 block">Advertisement</span>
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

// --- COMPONENT: Cookie Consent (GDPR) ---
const CookieConsent: React.FC = () => {
  const [accepted, setAccepted] = useState(localStorage.getItem('cookie_consent'));

  if (accepted) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-brand-900/95 backdrop-blur border-t border-brand-700 p-4 z-50 flex flex-col md:flex-row items-center justify-between gap-4 animate-fade-in shadow-[0_-4px_20px_rgba(0,0,0,0.5)]">
      <div className="text-sm text-gray-300 max-w-3xl">
        <p><strong>We value your privacy.</strong> We use cookies and Google AdSense to personalize content and ads, to provide social media features and to analyze our traffic. We also share information about your use of our site with our social media, advertising and analytics partners.</p>
      </div>
      <div className="flex gap-3">
        <button 
          onClick={() => { localStorage.setItem('cookie_consent', 'true'); setAccepted('true'); }}
          className="bg-brand-500 hover:bg-brand-600 text-white px-6 py-2 rounded-full font-bold text-sm transition-colors shadow-lg shadow-brand-500/20"
        >
          Accept
        </button>
      </div>
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
            <Link to="/privacy.html" className="block text-gray-400 text-sm hover:text-white pt-4" onClick={() => setIsMenuOpen(false)}>Privacy Policy</Link>
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
            Instant free games for school and home. No downloads, no blocks. PlayZero is your #1 source for HTML5 gaming in 2025.
          </p>
        </div>
        <div>
          <h3 className="font-semibold text-white mb-4">Games</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><Link to="/?category=Action" className="hover:text-brand-400 transition-colors">Action Games</Link></li>
            <li><Link to="/?category=Racing" className="hover:text-brand-400 transition-colors">Racing Games</Link></li>
            <li><Link to="/?category=Puzzle" className="hover:text-brand-400 transition-colors">Puzzle Games</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-white mb-4">Company</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><Link to="/privacy.html" className="hover:text-brand-400 transition-colors">Privacy Policy</Link></li>
            <li><Link to="/contact.html" className="hover:text-brand-400 transition-colors">Contact Us</Link></li>
            <li><Link to="/about.html" className="hover:text-brand-400 transition-colors">About PlayZero</Link></li>
          </ul>
        </div>
      </div>
      <div className="mt-12 pt-8 border-t border-brand-800 text-center md:text-left flex flex-col md:flex-row justify-between items-center text-xs text-gray-600">
        <div>© 2025 PlayZero2025. All rights reserved.</div>
        <div className="mt-2 md:mt-0">All games are property of their respective owners.</div>
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
      <div className="bg-brand-900 py-16 border-b border-brand-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-brand-950/80"></div>
        {/* Abstract shapes */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
            Play 100% Free <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-purple-400">Online Games</span>
          </h1>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
            Access the best browser games of 2025. No downloads, no installations, just instant fun. Optimized for Chromebooks and PC.
          </p>
          <div className="max-w-xl mx-auto relative group">
            <input
              type="text"
              placeholder="Search for games (e.g. Moto X3M)..."
              className="w-full px-6 py-4 rounded-full bg-brand-950/80 border border-brand-600 text-white focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/50 transition-all placeholder-gray-500 shadow-2xl backdrop-blur-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 flex-grow">
        <AdBanner slot="1234567890" />

        <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
          <h2 className="text-2xl font-bold text-white flex items-center">
            {categoryFilter ? `${categoryFilter} Games` : 'Featured Games'}
            <div className="h-1.5 w-8 bg-brand-500 ml-3 rounded-full"></div>
          </h2>
          <div className="flex gap-2">
            {['Action', 'Racing', 'Puzzle'].map(cat => (
              <Link 
                key={cat} 
                to={`/?category=${cat}`}
                className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${categoryFilter === cat ? 'bg-brand-500 border-brand-500 text-white' : 'bg-transparent border-brand-700 text-gray-400 hover:border-brand-500 hover:text-white'}`}
              >
                {cat}
              </Link>
            ))}
            {categoryFilter && (
               <Link to="/" className="px-4 py-1.5 rounded-full text-sm font-medium bg-gray-800 text-gray-300 hover:bg-gray-700 transition-colors">All</Link>
            )}
          </div>
        </div>

        {filteredGames.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredGames.map(game => (
              <Link 
                key={game.id} 
                to={`/game/${game.id}`}
                className="group bg-brand-800 rounded-xl overflow-hidden shadow-lg border border-brand-700 hover:border-brand-500 hover:shadow-brand-500/20 transition-all duration-300 flex flex-col h-full"
              >
                <div className="relative aspect-video overflow-hidden bg-brand-900">
                  <SafeImage 
                    src={game.thumbnail} 
                    fallback={game.fallbackThumbnail}
                    alt={game.title} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                    <div className="bg-brand-500 text-white px-4 py-2 rounded-full font-bold text-sm flex items-center space-x-2 transform translate-y-4 group-hover:translate-y-0 transition-transform shadow-xl">
                      <Play className="w-4 h-4 fill-current" />
                      <span>Play Now</span>
                    </div>
                  </div>
                </div>
                <div className="p-4 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-gray-100 text-base mb-1 truncate group-hover:text-brand-400 transition-colors">{game.title}</h3>
                    <p className="text-gray-500 text-xs line-clamp-2 mb-3">{game.description}</p>
                  </div>
                  <div className="flex justify-between items-center text-xs text-gray-500 pt-3 border-t border-brand-700/50">
                    <span className="bg-brand-900/50 px-2 py-1 rounded text-gray-400">{game.category}</span>
                    <span className="flex items-center text-yellow-500 font-medium">
                      <Star className="w-3 h-3 mr-1 fill-current"/> {game.rating}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 text-gray-500 border-2 border-brand-800 border-dashed rounded-2xl bg-brand-900/30">
            <Search className="w-16 h-16 mx-auto mb-6 text-brand-700"/>
            <p className="text-lg font-medium">No games found matching "{searchTerm}"</p>
            <button onClick={() => setSearchTerm('')} className="mt-4 text-brand-500 hover:underline">Clear Search</button>
          </div>
        )}

        <div className="mt-16 bg-brand-800 rounded-2xl p-8 border border-brand-700">
          <h3 className="text-2xl font-bold text-white mb-4">Why Play on PlayZero?</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="w-12 h-12 bg-green-900/50 rounded-lg flex items-center justify-center mb-4">
                 <Zap className="text-green-500 w-6 h-6"/>
              </div>
              <h4 className="font-bold text-white mb-2">Zero Lag, Zero Downloads</h4>
              <p className="text-sm text-gray-400">Our games are optimized for browser performance. No huge files to download, saving your storage and data.</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-blue-900/50 rounded-lg flex items-center justify-center mb-4">
                 <Shield className="text-blue-500 w-6 h-6"/>
              </div>
              <h4 className="font-bold text-white mb-2">Safe & Secure</h4>
              <p className="text-sm text-gray-400">We curate only the safest content. No malware, no viruses, just pure gaming fun suitable for all ages.</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-purple-900/50 rounded-lg flex items-center justify-center mb-4">
                 <Smartphone className="text-purple-500 w-6 h-6"/>
              </div>
              <h4 className="font-bold text-white mb-2">Play Anywhere</h4>
              <p className="text-sm text-gray-400">Fully responsive design means you can play on your desktop, laptop, tablet, or mobile phone seamlessly.</p>
            </div>
          </div>
        </div>

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
        <button onClick={() => navigate('/')} className="mt-4 bg-brand-600 px-6 py-2 rounded-full text-white hover:bg-brand-500 transition-colors">Return Home</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="container mx-auto px-4 py-6">
        <button 
          onClick={() => navigate('/')} 
          className="flex items-center text-gray-400 hover:text-white transition-colors text-sm font-medium mb-4 group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform" />
          Back to Games
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Game Container */}
            <div className="bg-black rounded-xl overflow-hidden shadow-2xl border border-brand-700 relative aspect-video group ring-1 ring-white/10">
              {isLoading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-brand-900 z-10">
                  <Loader2 className="w-10 h-10 text-brand-500 animate-spin mb-4" />
                  <p className="text-gray-200 font-bold text-lg">Loading {game.title}...</p>
                  <p className="text-sm text-gray-500 mt-2">Connecting to secure game server...</p>
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
                referrerPolicy="no-referrer" 
                onLoad={() => setIsLoading(false)}
              ></iframe>

              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                 <button onClick={toggleFullscreen} className="p-2.5 bg-black/70 hover:bg-brand-600 text-white rounded-lg backdrop-blur-sm transition-colors border border-white/10" title="Fullscreen">
                    <Maximize2 className="w-5 h-5" />
                 </button>
                 <button onClick={handleReload} className="p-2.5 bg-black/70 hover:bg-brand-600 text-white rounded-lg backdrop-blur-sm transition-colors border border-white/10" title="Reload">
                    <RefreshCw className="w-5 h-5" />
                 </button>
              </div>
            </div>

            {/* Controls Bar */}
            <div className="mt-4 flex items-center justify-between bg-brand-800/50 p-3 rounded-lg border border-brand-700/50">
               <span className="flex items-center text-sm font-medium text-gray-300">
                 <div className={`w-2.5 h-2.5 rounded-full mr-3 ${isLoading ? 'bg-yellow-500 animate-pulse' : 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]'}`}></div>
                 {isLoading ? 'Establishing Connection...' : 'Ready to Play'}
               </span>
               <div className="flex items-center gap-3">
                  <button className="flex items-center space-x-1.5 text-xs font-medium text-gray-400 hover:text-white transition-colors bg-brand-900 px-3 py-1.5 rounded border border-brand-700 hover:border-brand-500">
                    <Heart className="w-3.5 h-3.5" /> <span>Like</span>
                  </button>
                  <button className="flex items-center space-x-1.5 text-xs font-medium text-gray-400 hover:text-white transition-colors bg-brand-900 px-3 py-1.5 rounded border border-brand-700 hover:border-brand-500">
                    <Share2 className="w-3.5 h-3.5" /> <span>Share</span>
                  </button>
               </div>
            </div>

            {/* SEO RICH CONTENT SECTION - CRITICAL FOR ADSENSE */}
            <div className="mt-8">
              <div className="bg-brand-800 rounded-xl p-8 border border-brand-700 shadow-xl">
                <h1 className="text-3xl font-extrabold text-white mb-6 border-b border-brand-700 pb-4 flex items-center">
                  <Gamepad2 className="w-8 h-8 mr-3 text-brand-500" />
                  About {game.title}
                </h1>
                
                <div className="prose prose-invert prose-brand max-w-none text-gray-300">
                  <p className="text-lg leading-relaxed mb-6 font-light">{game.longContent.intro}</p>
                  
                  <div className="grid md:grid-cols-2 gap-8 my-8">
                    <div className="bg-brand-900/50 p-6 rounded-lg border border-brand-700/50">
                      <h3 className="text-xl font-bold text-white mb-3 flex items-center">
                        <BookOpen className="w-5 h-5 mr-2 text-blue-400" /> How to Play
                      </h3>
                      <p className="text-sm leading-relaxed">{game.longContent.gameplay}</p>
                    </div>
                    <div className="bg-brand-900/50 p-6 rounded-lg border border-brand-700/50">
                      <h3 className="text-xl font-bold text-white mb-3 flex items-center">
                        <Brain className="w-5 h-5 mr-2 text-purple-400" /> Pro Strategies
                      </h3>
                      <p className="text-sm leading-relaxed">{game.longContent.strategy}</p>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2 text-green-400" /> Why Play {game.title} in 2025?
                  </h3>
                  <p className="leading-relaxed">{game.longContent.why2025}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <AdBanner slot="1122334455" format="rectangle" />
            
            <div className="bg-brand-800 rounded-xl p-5 border border-brand-700 shadow-lg sticky top-24">
              <h3 className="font-bold text-white mb-4 text-sm uppercase tracking-wider flex items-center">
                <Star className="w-4 h-4 mr-2 text-yellow-500" /> Similar Games
              </h3>
              <div className="space-y-4">
                {GAMES.filter(g => g.category === game.category && g.id !== game.id).slice(0, 5).map(similar => (
                  <Link key={similar.id} to={`/game/${similar.id}`} className="flex space-x-3 group p-2 rounded-lg hover:bg-brand-700/50 transition-colors">
                    <SafeImage 
                      src={similar.thumbnail} 
                      fallback={similar.fallbackThumbnail}
                      alt={similar.title} 
                      className="w-20 h-14 object-cover rounded-md bg-brand-900 shadow-sm group-hover:shadow-md transition-shadow" 
                    />
                    <div className="flex flex-col justify-center">
                      <h4 className="font-bold text-gray-200 text-sm group-hover:text-brand-400 transition-colors line-clamp-1">{similar.title}</h4>
                      <span className="text-[10px] text-gray-500 bg-brand-900 px-1.5 py-0.5 rounded w-fit mt-1">{similar.category}</span>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t border-brand-700 text-center">
                <Link to="/" className="text-xs font-bold text-brand-500 hover:text-brand-400 uppercase tracking-wide">View All Games</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- STATIC PAGES (ENHANCED FOR ADSENSE) ---

const PrivacyPage: React.FC = () => (
  <div className="container mx-auto px-4 py-12 max-w-4xl">
    <div className="bg-brand-800 rounded-xl p-8 md:p-12 border border-brand-700 shadow-xl">
      <h1 className="text-3xl font-bold mb-8 border-b border-brand-700 pb-4 text-white">Privacy Policy & Terms of Service</h1>
      
      <div className="prose prose-invert max-w-none text-sm text-gray-300 space-y-6">
        <section>
          <h2 className="text-xl font-bold text-white mb-2">1. Introduction</h2>
          <p>Welcome to PlayZero2025 ("we," "our," or "us"). We are committed to protecting your privacy. This Privacy Policy explains how your personal information is collected, used, and disclosed by PlayZero2025.</p>
          <p>This Privacy Policy applies to our website, and its associated subdomains (collectively, our "Service") alongside our application, PlayZero2025. By accessing or using our Service, you signify that you have read, understood, and agree to our collection, storage, use, and disclosure of your personal information as described in this Privacy Policy and our Terms of Service.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-2">2. Information We Collect</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Log Data:</strong> When you visit our website, our servers may automatically log the standard data provided by your web browser. This data is considered "non-identifying information," as it does not personally identify you on its own.</li>
            <li><strong>Device Data:</strong> We may also collect data about the device you're using to access our website. This data may include the device type, operating system, unique device identifiers, settings, and geo-location data.</li>
            <li><strong>Cookies:</strong> We use "cookies" to collect information about you and your activity across our site. A cookie is a small piece of data that our website stores on your computer, and accesses each time you visit, so we can understand how you use our site.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-2">3. Google AdSense & DoubleClick Cookie</h2>
          <p>Google, as a third-party vendor, uses cookies to serve ads on our Service.</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Google's use of the DART cookie enables it to serve ads to our users based on their visit to our site and other sites on the Internet.</li>
            <li>Users may opt-out of the use of the DART cookie by visiting the Google ad and content network privacy policy at the following URL: <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-brand-500 hover:underline">https://policies.google.com/technologies/ads</a></li>
            <li>We have implemented the following: Remarketing with Google AdSense, Google Display Network Impression Reporting, Demographics and Interests Reporting.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-2">4. CCPA Privacy Rights (Do Not Sell My Personal Information)</h2>
          <p>Under the CCPA, among other rights, California consumers have the right to:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Request that a business that collects a consumer's personal data disclose the categories and specific pieces of personal data that a business has collected about consumers.</li>
            <li>Request that a business delete any personal data about the consumer that a business has collected.</li>
            <li>Request that a business that sells a consumer's personal data, not sell the consumer's personal data.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-2">5. GDPR Data Protection Rights</h2>
          <p>We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>The right to access – You have the right to request copies of your personal data.</li>
            <li>The right to rectification – You have the right to request that we correct any information you believe is inaccurate.</li>
            <li>The right to erasure – You have the right to request that we erase your personal data, under certain conditions.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-2">6. Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us via our Contact Page.</p>
        </section>
      </div>
    </div>
  </div>
);

const AboutPage: React.FC = () => (
  <div className="container mx-auto px-4 py-12 max-w-4xl">
    <div className="bg-brand-800 rounded-xl p-10 border border-brand-700 shadow-xl text-center">
      <div className="w-20 h-20 bg-brand-900 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
        <Gamepad2 className="w-10 h-10 text-brand-500" />
      </div>
      <h1 className="text-4xl font-bold mb-6 text-white">About PlayZero</h1>
      <p className="text-xl text-gray-300 mb-10 leading-relaxed max-w-2xl mx-auto">
        We are a dedicated team of gamers and developers with a simple mission: 
        <strong className="text-brand-400"> to democratize gaming.</strong>
      </p>
      
      <div className="grid md:grid-cols-3 gap-8 text-left">
        <div className="bg-brand-900/50 p-6 rounded-xl border border-brand-700/50">
          <Shield className="w-8 h-8 text-green-500 mb-4" />
          <h3 className="text-lg font-bold text-white mb-2">Safety First</h3>
          <p className="text-sm text-gray-400">Every game on our platform is vetted for safety. We ensure a secure environment free from malicious software.</p>
        </div>
        <div className="bg-brand-900/50 p-6 rounded-xl border border-brand-700/50">
          <RefreshCw className="w-8 h-8 text-blue-500 mb-4" />
          <h3 className="text-lg font-bold text-white mb-2">Always Updated</h3>
          <p className="text-sm text-gray-400">We constantly update our library with the latest HTML5 titles, ensuring compatibility with modern browsers.</p>
        </div>
        <div className="bg-brand-900/50 p-6 rounded-xl border border-brand-700/50">
          <Smartphone className="w-8 h-8 text-purple-500 mb-4" />
          <h3 className="text-lg font-bold text-white mb-2">Mobile Ready</h3>
          <p className="text-sm text-gray-400">Play anywhere. Our responsive design ensures a seamless experience on phones, tablets, and desktops.</p>
        </div>
      </div>
    </div>
  </div>
);

const ContactPage: React.FC = () => (
  <div className="container mx-auto px-4 py-12 max-w-xl">
    <h1 className="text-3xl font-bold mb-8 text-center text-white">Contact Us</h1>
    <div className="bg-brand-800 rounded-xl p-8 border border-brand-700 shadow-xl">
      <div className="space-y-6">
        <div>
          <label className="block text-xs font-bold text-brand-400 uppercase tracking-wider mb-2">Subject</label>
          <input type="text" className="w-full bg-brand-900 border border-brand-600 rounded-lg p-3 text-white focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all outline-none" placeholder="How can we help?" />
        </div>
        <div>
          <label className="block text-xs font-bold text-brand-400 uppercase tracking-wider mb-2">Message</label>
          <textarea rows={5} className="w-full bg-brand-900 border border-brand-600 rounded-lg p-3 text-white focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all outline-none" placeholder="Tell us more..."></textarea>
        </div>
        <button className="w-full bg-brand-500 hover:bg-brand-600 text-white font-bold py-3 rounded-lg transition-colors flex justify-center items-center shadow-lg shadow-brand-500/20">
          <Mail className="w-5 h-5 mr-2" /> Send Message
        </button>
        <p className="text-xs text-center text-gray-500 mt-4">We typically respond within 24-48 business hours.</p>
      </div>
    </div>
  </div>
);

// --- MAIN APP ---
function App() {
  return (
    <div className="bg-brand-950 text-gray-100 font-sans min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow relative">
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