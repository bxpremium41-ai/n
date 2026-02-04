import React, { useState, useEffect, useRef } from 'react';
import { PaymentModal } from './components/PaymentModal';
import { AdminModal } from './components/AdminModal';
import { LoginModal } from './components/LoginModal';
import { CourseRow } from './components/CourseRow';
import { TestimonialSlider } from './components/TestimonialSlider';
import { TESTIMONIALS, FAQ_ITEMS, ROWS, COURSES } from './constants';
import { GlassCard } from './components/ui/GlassCard';
import { ChevronDown, ArrowRight, Star, LogIn, Zap, Wallet, AlertCircle, BookOpen, Sparkles, XCircle, CheckCircle, CheckCircle2, Layers, Image as ImageIcon, Check, Map, Bed, Bath, ChefHat, Sofa, MoveRight, ListChecks, X, Check as CheckIcon, Info, HelpCircle, ChevronRight, ChevronLeft, Touchpad, ShieldCheck, Quote, GraduationCap, Award, Play, Book, Clock } from 'lucide-react';
import { NetflixCard } from './components/NetflixCard';
import { Course } from './types';

const RAW_JOINERS = [
  { name: "Liam O.", city: "London", time: "2 mins ago" },
  { name: "Emma W.", city: "New York", time: "5 mins ago" },
  { name: "Noah J.", city: "Toronto", time: "12 mins ago" },
  { name: "Olivia M.", city: "Sydney", time: "15 mins ago" },
  { name: "William B.", city: "Berlin", time: "18 mins ago" },
  { name: "Ava C.", city: "Chicago", time: "22 mins ago" }
];

const Counter = ({ target, duration = 1500 }: { target: number; duration?: number }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [target, duration]);
  return <>{count}</>;
};

const Logo = () => (
  <div className="flex items-center gap-3 cursor-pointer group" onClick={() => window.scrollTo(0,0)}>
    <div className="relative w-10 h-10 border-2 border-gray-900 flex items-center justify-center bg-white transition-all duration-300 group-hover:bg-gray-900 group-hover:text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] group-hover:translate-x-[2px] group-hover:translate-y-[2px]">
      <span className="font-display font-black text-xl tracking-tighter relative z-10">AV</span>
    </div>
    <div className="flex flex-col text-left">
       <span className="font-display font-bold text-xl tracking-[0.25em] leading-none text-gray-900">AVADA</span>
       <div className="w-full h-[1px] bg-gray-300 my-0.5"></div>
       <span className="text-[7px] font-bold uppercase tracking-widest text-gray-500 flex justify-between w-full leading-none">
          <span>DESIGN</span>
          <span>•</span>
          <span className="text-brand-primary animate-pulse font-black">BOOKS</span>
       </span>
    </div>
  </div>
);

const getDriveUrl = (id: string) => `https://drive.google.com/thumbnail?id=${id}&sz=w1600`;

const CURRICULUM_DATA = [
  {
    id: 'living',
    title: 'Living Room Design Book',
    bookNum: 'Book 1',
    icon: <Sofa size={20} />,
    color: 'border-orange-500',
    imageUrl: getDriveUrl('1US-_Ih6QufWcP1DcQCnlgrZmDJjrCSk4'),
    sections: [
      { name: 'Clearances', items: ['Porch clearances', 'Furniture arrangements', 'Minimum recommended spaces', 'Utilizing space under staircase'] },
      { name: 'Interior Style', items: ['Manipulate interiors with perception', 'Rugs and curtains placement', 'Creating visual interest', 'Decoding interior styles'] },
      { name: 'Layout Logic', items: ['Conversation circle dimensions', 'TV viewing distances', 'Traffic flow optimization', 'Focal point selection'] },
      { name: 'Storage Hacks', items: ['Built-in cabinetry', 'Multi-functional furniture', 'Display vs hidden storage', 'Vertical space utilization'] }
    ]
  },
  {
    id: 'kitchens',
    title: 'Kitchen Design Book',
    bookNum: 'Book 2',
    icon: <ChefHat size={20} />,
    color: 'border-orange-500',
    imageUrl: getDriveUrl('1kC6xTO6r7YqpC3bu-RWp-4MDaHSUfBvH'),
    sections: [
      { name: 'Layouts and Zones', items: ['Kitchen triangle and zoning', 'Future of kitchen design', 'Kitchen layouts with examples', 'Advantages and limitations'] },
      { name: 'Components', items: ['Stove placement clearances', 'Refrigerator types and mistakes', 'Sink types and placement', 'Pantry types and planning'] },
      { name: 'Storage', items: ['Kitchen top & bottom cabinets', 'Corner and hidden storage', 'Kitchen dimensions', 'Breakfast counter'] },
      { name: 'Services', items: ['Electrical points placement', 'Lighting types and zones'] }
    ]
  },
  {
    id: 'bedrooms',
    title: 'Bedroom Design Book',
    bookNum: 'Book 3',
    icon: <Bed size={20} />,
    color: 'border-blue-500',
    imageUrl: getDriveUrl('173EljDFnpecv_WKA50ELkZpQcACA0Oc-'),
    sections: [
      { name: 'Bed', items: ['Bed sizes by room types', 'Principles of Vastu and Feng Shui', 'Common mistakes placing the bed', 'Examples of Dos and Donts'] },
      { name: 'Furniture', items: ['Closets and compartments', 'Walk-in closet designs', 'Television placement', 'Chester drawers & clearances'] },
      { name: 'Circulation', items: ['Circulation inside layouts', 'Furniture placements for APT', 'Bedroom circulation zones', 'Mistakes to avoid'] },
      { name: 'Services', items: ['Electrical points placements', 'HVAC types and best zones', 'Types of Lighting', 'Bedroom placement'] }
    ]
  },
  {
    id: 'toilets',
    title: 'Washroom Design Book',
    bookNum: 'Book 4',
    icon: <Bath size={20} />,
    color: 'border-teal-500',
    imageUrl: getDriveUrl('1t68JTpV_GkEVnWnhKbO4I697cqIKMc7i'),
    sections: [
      { name: 'Components', items: ['Water closet types', 'Vastu & Fen Shui of wares', 'Basin types and placements', 'Bathtubs and showers'] },
      { name: 'Clearances', items: ['Wheelchair accessibility', 'Handicap toilet designs', 'Dimensions and clearances', 'Zoning in a toilet'] },
      { name: 'Services', items: ['Drainage & water supply', 'Electrical zones in a toilet', 'Lighting recommendations', 'Exhaust and ventilation'] },
      { name: 'Tips & Tricks', items: ['Design for small bathrooms', 'Creating visually interesting toilets', 'Creating focal points', 'Color coding in a toilet'] }
    ]
  },
  {
    id: 'study',
    title: 'Study Design Book',
    bookNum: 'Book 5',
    icon: <Layers size={20} />,
    color: 'border-purple-500',
    imageUrl: getDriveUrl('1uaRDczoWH9LP9-uaxqlmfakzJkq0ojH5'),
    sections: [
      { name: 'Ergonomics', items: ['Desk heights and chair types', 'Monitor positioning', 'Cable management hacks', 'Lighting for focus'] },
      { name: 'Video Calls', items: ['Background styling', 'Lighting angles', 'Acoustics for home office', 'Professional aesthetics'] },
      { name: 'Planning', items: ['Zoning for productivity', 'Privacy solutions', 'Built-in library designs', 'Space-saving desks'] },
      { name: 'Services', items: ['Electrical outlet mapping', 'HVAC for closed rooms', 'High-speed internet wiring'] }
    ]
  },
  {
    id: 'exteriors',
    title: 'Elevations Design Book',
    bookNum: 'Book 6',
    icon: <Map size={20} />,
    color: 'border-green-500',
    imageUrl: getDriveUrl('1uVmMUAX2_iPJtaF4Qt6UcdozHWQPFHYV'),
    sections: [
      { name: 'Sunpath', items: ['What is Sunpath', 'How to read Sunpath', 'How to avoid glare', 'Window treatments'] },
      { name: 'Winds', items: ['Windrose diagram', 'Effects of wind on house', 'Promote good ventilation', 'Mistakes in windy areas'] },
      { name: 'Exterior Design', items: ['Slopes and contours', 'Site selection in hilly regions', 'Common construction mistakes', 'Rules and Guidelines'] },
      { name: 'Elevations', items: ['Psychrometric chart', 'Climate responsive architecture', 'Arid/Cold/Temperate design'] }
    ]
  }
];

const ThisIsForYouPoints = [
  "You want to stay 10 steps ahead of your contractor",
  "You're designing for a client and want to deliver flawlessly",
  "You love designs that function beautifully and look amazing",
  "You believe in smart, intuitive design with purpose"
];

const CallToActionWidget = ({ timeLeft, onClick }: { timeLeft: any, onClick: () => void }) => {
  const formatTime = (val: number) => val.toString().padStart(2, '0');
  
  return (
    <div className="relative py-12 md:py-16 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-white"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] opacity-[0.05] pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-red-200 via-orange-100 to-blue-200 animate-liquid-flow blur-[120px]"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="flex flex-col items-center text-center">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-900/5 backdrop-blur-xl border border-gray-100 rounded-full mb-8 shadow-sm">
            <span className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">
              Exclusive discount closing in: <span className="text-brand-primary tabular-nums font-mono ml-1">{formatTime(timeLeft.h)}:{formatTime(timeLeft.m)}:{formatTime(timeLeft.s)}</span>
            </span>
          </div>

          <div className="mb-8">
            <div className="flex items-center justify-center gap-4 md:gap-6">
              <span className="text-lg md:text-3xl font-display font-bold text-gray-300 uppercase tracking-tighter opacity-70">Complete Collection</span>
              <div className="flex items-center gap-3">
                <span className="text-xl md:text-4xl font-display font-black text-gray-200 line-through decoration-gray-900/10 decoration-2">$199</span>
                <span className="text-4xl md:text-7xl font-display font-black text-gray-900 tracking-tighter">$49</span>
              </div>
            </div>
          </div>

          <div className="relative p-[1.5px] overflow-hidden rounded-xl w-full max-w-md group transition-all duration-300 hover:shadow-[0_0_30px_rgba(217,4,41,0.15)]">
            <div className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,#D90429_50%,transparent_100%)] opacity-30 group-hover:opacity-100 transition-opacity" />
            
            <button 
              onClick={onClick}
              className="relative w-full bg-gray-900 group-hover:bg-black text-white px-8 py-4 md:py-5 rounded-[11px] transition-all duration-300 flex items-center justify-center gap-3 z-10 overflow-hidden"
            >
              <span className="text-lg md:text-xl font-display font-bold uppercase tracking-widest relative z-10">Download All Books</span>
              <ArrowRight size={20} className="relative z-10 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none"></div>
            </button>
          </div>

          <div className="mt-8 flex items-center justify-center gap-4 md:gap-8 text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
            <div className="flex items-center gap-1.5"><ShieldCheck size={12} className="text-brand-success/70" /> 30-Day Guarantee</div>
            <div className="w-[1px] h-3 bg-gray-200"></div>
            <div className="flex items-center gap-1.5"><ImageIcon size={12} className="text-blue-400/70" /> Instant Download</div>
            <div className="w-[1px] h-3 bg-gray-200"></div>
            <div className="flex items-center gap-1.5"><ImageIcon size={12} className="text-orange-400/70" /> High-Res PDF</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Moved Outside to prevent flickering and unnecessary re-loads
const VideoFrame = React.memo(() => (
  <div className="bg-white hand-drawn-border p-4 md:p-6 shadow-2xl relative overflow-hidden group">
    <div className="aspect-square w-full rounded-lg overflow-hidden border border-gray-100 bg-gray-50 relative">
      <iframe
          src="https://iframe.mediadelivery.net/embed/489113/b4a866e8-863e-4de2-9286-3090502c085e?autoplay=true&loop=true&muted=true"
          className="absolute inset-0 w-full h-full border-0"
          allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; clipboard-write;"
          referrerPolicy="origin"
          loading="lazy"
          allowFullScreen
      ></iframe>
    </div>
    <div className="absolute bottom-8 right-8 w-10 h-10 bg-brand-primary rounded-full flex items-center justify-center text-white shadow-glow animate-pulse pointer-events-none">
       <Play size={16} fill="white" />
    </div>
  </div>
));

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [timeLeft, setTimeLeft] = useState({ h: 2, m: 23, s: 49 });
  const [joiners] = useState(RAW_JOINERS);
  const [currentJoinerIndex, setCurrentJoinerIndex] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [activeCurriculumIndex, setActiveCurriculumIndex] = useState(0);
  const [stackIndex, setStackIndex] = useState(0);
  
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const activeCurriculum = CURRICULUM_DATA[activeCurriculumIndex];
  const AUTHORS_IMAGE_URL = "https://d1yei2z3i6k35z.cloudfront.net/13138299/68654971c890d_Your-Numbered-Points-Title-Comes-Right-Here-9-min3.png";
  const WHAT_INSIDE_IMAGE_URL = "https://d1yei2z3i6k35z.cloudfront.net/13138299/685713307fcf9_Your-Numbered-Points-Title-Comes-Right-Here-3-1.png";
  const COMPARISON_IMAGE_URL = "https://d1yei2z3i6k35z.cloudfront.net/13138299/6853213c0b0f5_asz.png";

  useEffect(() => {
    const calculateTime = () => {
      const DURATION = (2 * 60 * 60 * 1000) + (23 * 60 * 1000) + (49 * 1000);
      const now = Date.now();
      const remaining = DURATION - (now % DURATION);
      setTimeLeft({
        h: Math.floor((remaining / (1000 * 60 * 60)) % 24),
        m: Math.floor((remaining / (1000 * 60)) % 60),
        s: Math.floor((remaining / 1000) % 60)
      });
    };
    const timerInterval = setInterval(calculateTime, 1000);
    calculateTime();
    return () => clearInterval(timerInterval);
  }, []);

  useEffect(() => {
    const stackTimer = setInterval(() => {
      setStackIndex(prev => (prev + 1) % ThisIsForYouPoints.length);
    }, 3000);
    return () => clearInterval(stackTimer);
  }, []);

  useEffect(() => {
    const toastCycle = setInterval(() => {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 5000);
      setTimeout(() => setCurrentJoinerIndex(p => (p + 1) % joiners.length), 6000);
    }, 15000);
    return () => clearInterval(toastCycle);
  }, [joiners.length]);

  const openGeneralModal = () => { setSelectedCourse(null); setIsModalOpen(true); };
  const openCourseModal = (course: Course) => { setSelectedCourse(course); setIsModalOpen(true); };
  
  const scrollToBooks = () => {
    const section = document.getElementById('courses-section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const formatTime = (val: number) => val.toString().padStart(2, '0');

  const handleTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.targetTouches[0].clientX; };
  const handleTouchMove = (e: React.TouchEvent) => { touchEndX.current = e.targetTouches[0].clientX; };
  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0 && activeCurriculumIndex < CURRICULUM_DATA.length - 1) {
        setActiveCurriculumIndex(activeCurriculumIndex + 1);
      } else if (diff < 0 && activeCurriculumIndex > 0) {
        setActiveCurriculumIndex(activeCurriculumIndex - 1);
      }
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans overflow-x-hidden antialiased selection:bg-red-100">
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes wiggle {
          0%, 100% { transform: rotate(0); }
          25% { transform: rotate(-5deg); }
          75% { transform: rotate(5deg); }
        }
        @keyframes softPulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.8; }
        }
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
        @keyframes liquidFlow {
          0% { transform: translate(-50%, -50%) rotate(0deg); }
          50% { transform: translate(-45%, -48%) rotate(180deg); }
          100% { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pageTurn {
          0% { transform: perspective(2000px) rotateY(-25deg) translateX(30px) scale(0.98); opacity: 0; }
          100% { transform: perspective(2000px) rotateY(0deg) translateX(0) scale(1); opacity: 1; }
        }
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        @keyframes popScale {
          0% { transform: scale(0.5); opacity: 0; }
          70% { transform: scale(1.1); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-pop-scale {
          animation: popScale 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        .animate-marquee {
          display: inline-block;
          white-space: nowrap;
          animation: marquee 15s linear infinite;
        }
        .animate-liquid-flow { animation: liquidFlow 15s linear infinite; }
        .bg-grid-pattern { background-size: 40px 40px; background-image: linear-gradient(to right, rgba(0,0,0,0.015) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.015) 1px, transparent 1px); }
        .highlight-yellow { background: #FFD60A; padding: 0 4px; border-radius: 4px; }
        .hand-drawn-border {
          border: 3px solid #1a1a1a;
          border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;
        }
        .animate-wiggle-pulse { animation: wiggle 0.5s ease-in-out infinite, softPulse 2s infinite ease-in-out; }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-delayed { animation: float 6s ease-in-out infinite; animation-delay: 3s; }
        .animate-page-turn {
          animation: pageTurn 0.7s cubic-bezier(0.23, 1, 0.32, 1) forwards;
          transform-origin: left center;
        }
        @keyframes card-jump-back {
          0% { transform: scale(1) translateY(0); z-index: 50; opacity: 1; }
          40% { transform: scale(1.1) translateY(-120px); z-index: 50; opacity: 1; }
          60% { transform: scale(0.9) translateY(0); z-index: 0; opacity: 0.5; }
          100% { transform: scale(0.85) translateY(40px); z-index: 0; opacity: 0.3; }
        }
        .animate-jump-back { animation: card-jump-back 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
      `}</style>

      {/* STICKY HEADER SECTION */}
      <div className="sticky top-0 z-[60] w-full bg-white/40 backdrop-blur-xl border-b border-gray-100/50">
        <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
           <div className="absolute -top-[100%] -left-[50%] w-[200%] h-[300%] bg-gradient-to-r from-red-200 via-orange-100 to-blue-100 animate-liquid-flow blur-[80px]"></div>
        </div>
        
        {/* Banner 1 */}
        <div className="relative py-2 px-4 flex items-center justify-center text-gray-900 text-[9px] md:text-xs font-black uppercase tracking-[0.25em] border-b border-gray-100/30">
          The Only Design Books You Need
        </div>
        
        {/* Banner 2: Marquee */}
        <div className="relative py-1.5 bg-gray-950 text-white overflow-hidden select-none">
            <div className="animate-marquee inline-block">
                <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] mx-10">
                  Bestseller in Design segment in 23+ Countries
                </span>
                <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] mx-10">
                  Bestseller in Design segment in 23+ Countries
                </span>
                <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] mx-10">
                  Bestseller in Design segment in 23+ Countries
                </span>
            </div>
        </div>
      </div>

      <main>
        {/* HERO */}
        <section className="relative w-full flex flex-col items-center bg-white pt-10 md:pt-24 pb-12 md:pb-20 overflow-hidden border-b border-gray-100">
          <div className="absolute inset-0 bg-grid-pattern opacity-60"></div>
          <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center text-center lg:text-left">
              <div className="flex flex-col items-center lg:items-start">
                  <div className="mb-6 md:mb-10 px-8 py-3 border-[3px] border-gray-900 rounded-2xl bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] animate-pop-scale">
                      <span className="font-display font-black text-xl md:text-4xl tracking-tighter text-gray-900 uppercase">6 BOOKS</span>
                  </div>
                  <h1 className="text-3xl md:text-7xl font-display font-bold leading-[1.1] mb-6 md:mb-8 text-gray-900 tracking-tight">
                      You Refer to Design<br/>
                      <span className="relative z-10">Best Interiors & Exteriors<span className="absolute bottom-0 left-0 w-full h-1/3 bg-red-100 -z-10 opacity-60"></span></span><br/>
                      Possible.
                  </h1>
                  <p className="text-base md:text-2xl text-gray-700 font-bold mb-6 flex items-center gap-3 flex-wrap justify-center lg:justify-start">
                      Handmade diagrams. <span className="text-gray-300">•</span> Real dimensions. <span className="text-gray-300">•</span> Zero guesswork.
                  </p>

                  <div className="max-w-xl mb-8 md:mb-10 bg-gray-50/50 p-4 md:p-5 rounded-2xl border border-dashed border-gray-200 relative group transition-all hover:bg-white hover:shadow-xl">
                      <div className="flex gap-4 items-start text-left">
                          <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-brand-primary/10 flex items-center justify-center shrink-0 text-brand-primary">
                              <ShieldCheck size={18} />
                          </div>
                          <p className="text-[11px] md:text-sm text-gray-600 font-medium leading-relaxed italic">
                            If you ever feel the need to open any other books after reading these ones just write to us, and we’ll happily refund your money. 
                            <span className="text-gray-900 font-bold block mt-1">That’s how confident we are that this will be the only interior/exterior design resource you’ll ever need.</span>
                          </p>
                      </div>
                  </div>

                  {/* Video positioned above button on mobile */}
                  <div className="block lg:hidden w-full max-w-[320px] mx-auto mb-10 animate-[fadeIn_1.2s_ease-out]">
                      <VideoFrame />
                  </div>

                  <button onClick={scrollToBooks} className="w-full sm:w-auto px-10 md:px-12 py-4 md:py-5 bg-brand-primary text-white rounded-2xl font-bold text-lg md:text-xl shadow-glow hover:bg-red-700 transition-all flex items-center justify-center gap-3 group">
                    See All Books <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </button>
              </div>

              {/* Video for desktop */}
              <div className="hidden lg:block relative w-full max-w-[420px] mx-auto lg:mx-0 group mt-8 lg:mt-0 animate-[fadeIn_1.2s_ease-out]">
                  <VideoFrame />
              </div>
          </div>
        </section>

        {/* CTA PLACE 1 */}
        <CallToActionWidget timeLeft={timeLeft} onClick={openGeneralModal} />

        {/* RESTORED: LEARN EVERYTHING FROM ZERO */}
        <section className="py-12 md:py-24 bg-white border-t border-gray-50 overflow-hidden">
            <div className="container mx-auto px-6 max-w-5xl flex flex-col lg:flex-row items-start gap-8 md:gap-12 text-left">
                <div className="w-2 md:w-5 h-48 md:h-96 bg-[#FF9F1C] rounded-full hidden md:block shrink-0 shadow-[4px_0_0_0_rgba(0,0,0,0.05)]"></div>
                <div className="flex-1">
                    <h2 className="text-3xl md:text-7xl font-display font-bold text-gray-900 mb-8 md:mb-12 tracking-tighter leading-tight md:leading-[1.1]">
                        Learn Everything from zero to advance.
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 md:gap-y-12">
                        {[
                            { n: "1-", t: "Develop good taste in Architectural Interior Design." },
                            { n: "2-", t: "Get more design compliments from your clients & friends." },
                            { n: "3-", t: "Go through the entire Books, add more value to the society by developing your ideas." },
                            { n: "4-", t: "Gain confidence in generating newer and bigger leads for your firm." }
                        ].map((item, i) => (
                            <div key={i} className="flex gap-4 group">
                                <span className={`text-3xl md:text-5xl font-display font-black leading-none shrink-0 ${i % 2 === 0 ? 'text-gray-900' : 'text-[#FF9F1C]'}`}>
                                    {item.n}
                                </span>
                                <p className="text-base md:text-xl text-gray-700 font-medium leading-snug group-hover:text-gray-900 transition-colors">
                                    {item.t}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>

        {/* CURRICULUM PREVIEW */}
        <section className="py-12 md:py-24 bg-white overflow-hidden border-b border-gray-100">
            <div className="container mx-auto px-6 max-w-7xl">
                
                {/* RESTORED: Floating Library Posters & Title */}
                <div className="text-center mb-10 md:mb-16">
                    <h2 className="text-4xl md:text-8xl font-display font-black text-gray-900 tracking-tighter mb-4 flex items-center justify-center gap-4 uppercase">
                        6 BOOKS <MoveRight className="text-brand-primary hidden md:block" size={48} />
                    </h2>
                    <p className="text-gray-500 text-sm md:text-lg font-bold uppercase tracking-[0.3em]">For Interior & Exterior Design</p>
                </div>

                <div className="relative w-full max-w-6xl mx-auto mb-16 md:mb-24 mt-8 md:mt-12 px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-20 items-center">
                        <div className="relative group animate-float">
                            <div className="absolute -inset-4 bg-red-500/10 rounded-[2rem] md:rounded-[2.5rem] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                            <img 
                                src={getDriveUrl('1IuTkD-KkOz4_2VWOFyLXSwCGVzSBXKBr')} 
                                alt="Library Collection Poster 1" 
                                className="relative w-full h-auto rounded-[1.5rem] md:rounded-[3rem] shadow-[0_20px_40px_-10px_rgba(0,0,0,0.2)] md:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.3)] border border-gray-100 transform md:rotate-[-3deg] group-hover:rotate-0 transition-transform duration-700"
                            />
                        </div>
                        <div className="relative group animate-float-delayed md:mt-32">
                            <div className="absolute -inset-4 bg-blue-500/10 rounded-[2rem] md:rounded-[2.5rem] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                            <img 
                                src={getDriveUrl('1m934ZySZmSe2-9zPbL5I7yvqTLhyY_7m')} 
                                alt="Library Collection Poster 2" 
                                className="relative w-full h-auto rounded-[1.5rem] md:rounded-[3rem] shadow-[0_20px_40px_-10px_rgba(0,0,0,0.2)] md:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.3)] border border-gray-100 transform md:rotate-[3deg] group-hover:rotate-0 transition-transform duration-700"
                            />
                        </div>
                    </div>
                </div>

                {/* RESTORED: "This Is For You If..." Stack Section */}
                <div className="mb-16 md:mb-32 text-center">
                    <div className="inline-block bg-gray-100/50 px-6 py-2 md:px-8 md:py-3 rounded-2xl mb-8 md:mb-16">
                       <h2 className="text-xl md:text-5xl font-display font-black text-gray-900 uppercase tracking-tight">This Is For You If...</h2>
                    </div>
                    
                    <div className="relative h-[220px] md:h-[180px] w-full max-w-3xl mx-auto perspective-1000">
                        {ThisIsForYouPoints.map((point, i) => {
                            const isCurrent = stackIndex === i;
                            const isLast = (stackIndex - 1 + ThisIsForYouPoints.length) % ThisIsForYouPoints.length === i;
                            
                            let zIndex = 0;
                            let opacity = 0;
                            let transform = 'translateY(80px) scale(0.8)';
                            let animationClass = "";

                            if (isCurrent) {
                                zIndex = 50; opacity = 1; transform = 'translateY(0) scale(1)';
                            } else if (isLast) {
                                animationClass = "animate-jump-back";
                            } else {
                                const offset = (i - stackIndex + ThisIsForYouPoints.length) % ThisIsForYouPoints.length;
                                zIndex = 40 - offset;
                                opacity = 1 / (offset + 1);
                                transform = `translateY(${offset * 15}px) scale(${1 - offset * 0.04})`;
                            }

                            return (
                                <div 
                                    key={point}
                                    className={`absolute top-0 left-0 w-full p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] bg-white border border-gray-100 shadow-xl flex items-center gap-4 md:gap-6 transition-all duration-700 ${animationClass}`}
                                    style={{ zIndex, opacity, transform }}
                                >
                                    <div className="w-12 h-12 md:w-16 md:h-16 bg-brand-success text-white rounded-xl md:rounded-2xl flex items-center justify-center shrink-0 shadow-lg">
                                        <CheckCircle size={22} className="md:w-8 md:h-8" strokeWidth={3} />
                                    </div>
                                    <p className="text-base md:text-2xl font-bold text-gray-800 text-left leading-tight">
                                        {point}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                    
                    <div className="mt-8 md:mt-12 flex justify-center gap-2">
                        {ThisIsForYouPoints.map((_, i) => (
                            <div key={i} className={`h-1.5 rounded-full transition-all duration-500 ${stackIndex === i ? 'w-8 bg-brand-primary' : 'w-2 bg-gray-300'}`}></div>
                        ))}
                    </div>
                </div>

                {/* RESTORED: Full Book Navigation Switcher */}
                <h3 className="text-center text-xl md:text-4xl font-display font-black text-gray-900 mb-6 md:mb-10 uppercase tracking-tighter">
                    Check Topics Inside Books
                </h3>

                <div className="hidden lg:flex flex-wrap justify-center gap-3 mb-16">
                    {CURRICULUM_DATA.map((book, idx) => (
                        <button
                            key={book.id}
                            onClick={() => setActiveCurriculumIndex(idx)}
                            className={`flex flex-col items-center gap-1 px-8 py-5 rounded-2xl border-2 font-display font-bold transition-all ${
                                activeCurriculumIndex === idx 
                                ? `bg-gray-900 text-white shadow-xl ${book.color} -translate-y-1` 
                                : 'bg-gray-50 text-gray-400 border-transparent hover:bg-gray-100 hover:text-gray-600'
                            }`}
                        >
                            <span className="text-[10px] uppercase tracking-[0.2em] opacity-60">{book.bookNum}</span>
                            <span className="text-xs uppercase tracking-widest flex items-center gap-2">{book.icon} {book.title}</span>
                        </button>
                    ))}
                </div>

                <div className="lg:hidden grid grid-cols-3 grid-rows-2 gap-2 mb-8 px-4">
                    {CURRICULUM_DATA.map((book, idx) => {
                        const isActive = activeCurriculumIndex === idx;
                        return (
                            <button
                                key={book.id}
                                onClick={() => setActiveCurriculumIndex(idx)}
                                className={`flex flex-col items-center justify-center p-2 rounded-xl border-2 transition-all duration-300 ${
                                    isActive 
                                    ? `bg-gray-900 text-white shadow-xl ${book.color} scale-105 z-10` 
                                    : 'bg-gray-50 text-gray-400 border-transparent hover:bg-gray-100 hover:text-gray-600'
                                }`}
                            >
                                <div className="mb-1 shrink-0">{book.icon}</div>
                                <span className="text-[7px] font-black uppercase tracking-widest whitespace-nowrap">{book.bookNum}</span>
                            </button>
                        );
                    })}
                </div>

                <div className="flex justify-center mb-12 px-4">
                    <div className="flex items-center gap-4 px-6 md:px-10 py-3 md:py-4 rounded-2xl md:rounded-full border border-gray-100 bg-gray-50/50 shadow-sm">
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-900 text-white rounded-xl md:rounded-full flex items-center justify-center shadow-lg shrink-0">
                            {activeCurriculum.icon}
                        </div>
                        <div className="flex flex-col text-left">
                           <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-brand-primary leading-tight">{activeCurriculum.bookNum}</span>
                           <h4 className="text-base md:text-2xl font-display font-black text-gray-900 uppercase tracking-tight leading-tight">{activeCurriculum.title}</h4>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 items-start">
                    <div 
                      key={activeCurriculumIndex}
                      className="lg:col-span-8 bg-white hand-drawn-border p-6 md:p-14 shadow-xl relative overflow-hidden group animate-page-turn"
                    >
                        <div className="bg-gray-50 rounded-2xl p-3 md:p-4 border border-dashed border-gray-200 mb-8 md:mb-10 overflow-hidden relative">
                            <img src={activeCurriculum.imageUrl} alt={activeCurriculum.title} className="w-full h-auto transition-transform duration-700 group-hover:scale-[1.03]" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 md:gap-x-12 gap-y-6 md:gap-y-10 text-left">
                            {activeCurriculum.sections.map((section, idx) => (
                                <div key={idx} className="space-y-3">
                                    <h3 className="text-xs md:text-sm font-display font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
                                        <div className="w-1 h-3 md:w-1.5 md:h-4 bg-brand-primary rounded-full"></div>
                                        {section.name}
                                    </h3>
                                    <ul className="space-y-2">
                                        {section.items.map((item, i) => (
                                            <li key={i} className="flex gap-2 text-[12px] md:text-[13px] text-gray-600 font-medium group">
                                                <div className="mt-1.5 w-1 h-1 rounded-full bg-gray-300 group-hover:bg-brand-primary transition-colors shrink-0"></div>
                                                <span className="group-hover:text-gray-900 transition-colors">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="lg:col-span-4 flex flex-col gap-4 md:gap-6">
                         {/* LIQUID GLASS PAGE COUNTER */}
                         <div className="relative group overflow-hidden bg-white/40 backdrop-blur-xl border border-gray-100 rounded-[1.5rem] md:rounded-[2.5rem] p-8 shadow-xl flex flex-col justify-center min-h-[160px]">
                            <div className="absolute inset-0 opacity-[0.06] pointer-events-none">
                                <div className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-gradient-to-br from-red-400 via-orange-300 to-blue-400 animate-liquid-flow blur-[60px]"></div>
                            </div>
                            
                            <div className="relative z-10 flex flex-col items-center text-center">
                                <div className="flex items-center gap-4 mb-3">
                                    <div className="w-12 h-12 bg-gray-900 text-white rounded-2xl flex items-center justify-center shadow-xl border border-white/10 group-hover:scale-110 transition-transform">
                                        <BookOpen size={24} className="text-brand-primary" />
                                    </div>
                                    <div className="text-5xl md:text-6xl font-display font-black text-gray-900 tabular-nums tracking-tighter">
                                        <Counter target={800} />+
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[12px] md:text-[14px] font-black uppercase tracking-[0.25em] text-gray-900 leading-tight">Actionable Pages</span>
                                    <span className="text-[10px] md:text-[11px] font-bold text-gray-400 uppercase tracking-widest leading-tight mt-1">Handmade diagrams for a fun learning.</span>
                                </div>
                            </div>
                         </div>

                         <div className="bg-gray-50 border border-gray-100 p-6 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] flex flex-col items-center text-center">
                            <div className="flex items-center gap-1.5 mb-3 md:mb-4">
                                {[1,2,3,4,5].map(i => <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />)}
                            </div>
                            <p className="text-gray-900 font-bold text-sm md:text-base mb-1 italic">"The blueprints of interior design."</p>
                            <span className="text-[8px] md:text-[9px] font-black uppercase tracking-widest text-gray-400">— ARCHITECTURE WEEKLY</span>
                         </div>
                    </div>
                </div>
            </div>
        </section>

        {/* CTA PLACE 2 */}
        <CallToActionWidget timeLeft={timeLeft} onClick={openGeneralModal} />

        {/* COMPARISON SECTION */}
        <section className="py-12 md:py-24 bg-gray-50 border-b border-gray-100">
            <div className="container mx-auto px-6 max-w-6xl">
                <h2 className="text-2xl md:text-6xl font-display font-bold text-gray-900 mb-10 md:mb-16 text-center md:text-left leading-tight tracking-tight">
                    Why These Books Change Everything
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-20 items-center">
                    <div className="space-y-5 md:space-y-8 text-left">
                        {[
                            { e: "✏️", t: "You don't need an architect", d: "to understand it" },
                            { e: "📏", t: "Every detail is to scale", d: "verified by experienced designers" },
                            { e: "🧠", t: "Built with real projects in mind", d: "not showroom fantasies" },
                            { e: "👀", t: "Hand-made diagrams", d: "that skip boring theory" },
                            { e: "🔴", t: "Avoid costly mistakes", d: "before they happen" }
                        ].map((item, i) => (
                            <div key={i} className="flex items-start gap-4 md:gap-5 group">
                                <span className="text-2xl md:text-3xl shrink-0 group-hover:scale-125 transition-all grayscale group-hover:grayscale-0">{item.e}</span>
                                <div className="text-sm md:text-2xl text-gray-600 font-medium leading-tight">
                                    <strong className="text-gray-900">{item.t}</strong> {item.d}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="bg-white p-4 md:p-10 rounded-[2rem] md:rounded-[3rem] shadow-2xl overflow-hidden group">
                         <img src={COMPARISON_IMAGE_URL} alt="Visual Comparison" className="w-full h-auto transition-all duration-1000 group-hover:grayscale-0" />
                    </div>
                </div>
            </div>
        </section>

        {/* RESTORED: Reality of Pages Spread */}
        <section className="relative py-12 md:py-32 bg-gray-50 overflow-hidden border-b border-gray-100">
            <div className="container mx-auto px-6 relative z-10 text-center">
                <div className="mb-10 md:mb-16">
                    <h2 className="text-3xl md:text-6xl font-display font-bold text-gray-900 mb-4 md:mb-6 tracking-tight leading-tight">The Reality of the Pages</h2>
                    <p className="text-gray-500 font-medium max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
                        Flip through the actual manuals. Handmade diagrams that make you understand in a fun way.
                    </p>
                </div>
                <div className="relative group max-w-6xl mx-auto">
                    <div className="relative rounded-[1.5rem] md:rounded-[3rem] overflow-hidden shadow-2xl border-4 md:border-8 border-white bg-white">
                         <img 
                            src="https://d1yei2z3i6k35z.cloudfront.net/13138299/686130dc4fe9c_IMG_0998-scaled.jpeg" 
                            alt="Interior Design Guidebook Spread" 
                            className="w-full h-auto transform transition-transform duration-[3s] group-hover:scale-[1.05]"
                         />
                    </div>
                </div>
            </div>
        </section>

        {/* INSIDE PREVIEW */}
        <section className="py-12 md:py-24 bg-white overflow-hidden border-b border-gray-100">
            <div className="container mx-auto px-6 max-w-4xl text-center">
                <div className="mb-8 md:mb-12">
                    <img src={WHAT_INSIDE_IMAGE_URL} alt="Inside the Books Preview" className="w-full h-auto rounded-2xl md:rounded-3xl shadow-xl border border-gray-100" />
                </div>
                <h2 className="text-3xl md:text-6xl font-display font-bold text-gray-900 mb-8 md:mb-12 uppercase tracking-tighter">What's Inside</h2>
                <div className="space-y-4 md:space-y-6 text-left max-w-2xl mx-auto bg-gray-50/50 p-6 md:p-12 rounded-[1.5rem] md:rounded-[2.5rem] border border-gray-100">
                    {[
                        { icon: "📐", bold: "Layout rules", text: "for every interior/exterior type" },
                        { icon: "📏", bold: "Clearance guides", text: "so you don't mess up measurements" },
                        { icon: "🧊", bold: "Working Triangle logic", text: "explained simply" },
                        { icon: "📂", bold: "Planning checklists", text: "to keep your project on track" },
                        { icon: "💡", bold: "Insider tips", text: "contractors won't tell you" },
                        { icon: "🛠️", bold: "Cabinet modules", text: "and smart storage ideas" }
                    ].map((item, i) => (
                        <div key={i} className="flex items-start gap-3 md:gap-4 text-base md:text-xl">
                            <span className="text-xl md:text-2xl leading-none pt-1 shrink-0">{item.icon}</span>
                            <p className="text-gray-700 leading-tight">
                                <strong className="text-gray-900 font-bold">{item.bold}</strong> {item.text}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* EXPLORE ALL BOOKS (NETFLIX GRID) */}
        <section id="courses-section" className="relative z-10 py-12 md:py-24 bg-white space-y-10 md:space-y-20 border-t border-gray-100">
           <div className="px-6 md:px-12 text-center">
                <div className="inline-flex items-center gap-2 bg-gray-900 text-white text-[9px] md:text-[10px] font-black px-4 py-1.5 rounded-md mb-6 uppercase tracking-widest">Complete Digital Collection</div>
                <h2 className="text-3xl md:text-6xl font-display font-bold text-gray-900 mb-4 md:mb-6 tracking-tight">Explore All Books</h2>
                <p className="text-gray-500 max-w-2xl mx-auto font-medium text-sm md:text-lg">Detailed reference guides for every corner of your design project.</p>
           </div>
           
           <div className="container mx-auto px-6 md:px-12">
               <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-10 max-w-6xl mx-auto text-center">
                   {COURSES.map((course) => (
                       <NetflixCard 
                           key={course.id} 
                           course={course} 
                           onClick={openCourseModal}
                       />
                   ))}
               </div>
           </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="py-12 md:py-24 bg-gray-50 border-t border-b border-gray-100">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="text-center mb-10 md:mb-16">
               <h2 className="text-3xl md:text-6xl font-display font-bold text-gray-900 mb-3 md:mb-4 tracking-tight">What Buyers Say</h2>
               <div className="w-20 h-1 bg-brand-primary mx-auto rounded-full"></div>
            </div>
            <TestimonialSlider />
          </div>
        </section>

        {/* AUTHORS SECTION */}
        <section className="py-12 md:py-24 bg-white border-b border-gray-100 overflow-hidden">
            <div className="container mx-auto px-6 max-w-4xl text-center">
                <div className="flex flex-col items-center">
                    <div className="inline-flex items-center gap-2 px-6 py-2 bg-gray-900 text-white rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest mb-8 shadow-lg">
                       Meet The Authors
                    </div>
                    <div className="w-full max-w-3xl relative mb-12">
                        <div className="bg-white hand-drawn-border p-3 md:p-4 relative shadow-2xl overflow-hidden group">
                            <img src={AUTHORS_IMAGE_URL} alt="The Authors of Avada" className="w-full h-auto grayscale transition-all duration-700 group-hover:grayscale-0" />
                        </div>
                    </div>
                    <button onClick={openGeneralModal} className="px-12 py-5 bg-brand-primary text-white rounded-2xl font-bold text-lg md:text-xl shadow-glow hover:bg-red-700 transition-all flex items-center gap-3 group">
                        Start Your Design Journey <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
        </section>

        {/* FAQ */}
        <section className="py-12 md:py-24 px-6 md:px-12 max-w-3xl mx-auto border-t border-gray-100">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-center mb-10 md:mb-12 text-gray-900 uppercase tracking-tighter">Frequently Asked Questions</h2>
          <div className="space-y-3 md:space-y-4">
            {FAQ_ITEMS.map((item, index) => (
              <div key={index} className="bg-gray-50 rounded-xl md:rounded-2xl border border-gray-100 overflow-hidden text-left">
                <button onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)} className="w-full flex items-center justify-between p-5 md:p-6 text-left">
                  <span className="text-base md:text-lg font-medium text-gray-900 leading-tight">{item.question}</span><ChevronDown size={18} className={`text-gray-400 transition-transform shrink-0 ml-4 ${openFaqIndex === index ? 'rotate-180' : ''}`} />
                </button>
                <div className={`px-5 md:px-6 text-gray-600 transition-all overflow-hidden ${openFaqIndex === index ? 'max-h-60 pb-5 md:pb-6 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <p className="text-sm md:text-base leading-relaxed">{item.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA PLACE 3 */}
        <CallToActionWidget timeLeft={timeLeft} onClick={openGeneralModal} />

      </main>

      <footer className="border-t border-gray-100 bg-white py-10 md:py-12 px-6 text-center">
        <Logo />
        <p className="text-[9px] md:text-[10px] text-gray-400 mt-6 uppercase tracking-[0.2em]">© 2026 Avada Interior Design. Premium Guides.</p>
      </footer>

      <PaymentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} initialCourse={selectedCourse} />
      <AdminModal isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </div>
  );
};

export default App;