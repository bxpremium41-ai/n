import React, { useState, useEffect } from 'react';
import { PaymentModal } from './components/PaymentModal';
import { AdminModal } from './components/AdminModal';
import { LoginModal } from './components/LoginModal';
import { CourseRow } from './components/CourseRow';
import { Features } from './components/Features';
import { StackedCarousel } from './components/StackedCarousel';
import { TESTIMONIALS, FAQ_ITEMS, ROWS, COURSES } from './constants';
import { GlassCard } from './components/ui/GlassCard';
import { ChevronDown, ChevronUp, Instagram, Linkedin, Twitter, Play, Info, Bell, Menu, Sparkles, Database, CheckCircle2, Download, ShieldCheck, Lightbulb, Star, Globe, Lamp, Armchair, Sofa, ArrowRight, Timer, Quote, MapPin, Users, TrendingUp, Infinity, Award, LogIn, ExternalLink, Clock } from 'lucide-react';
import { Course } from './types';

// Expanded International Joiners Data (30 entries)
const RAW_JOINERS = [
  { name: "Liam O.", city: "London", time: "2 mins ago" },
  { name: "Emma W.", city: "New York", time: "5 mins ago" },
  { name: "Noah J.", city: "Toronto", time: "12 mins ago" },
  { name: "Olivia M.", city: "Sydney", time: "15 mins ago" },
  { name: "William B.", city: "Berlin", time: "18 mins ago" },
  { name: "Ava C.", city: "Chicago", time: "22 mins ago" },
  { name: "James P.", city: "Paris", time: "25 mins ago" },
  { name: "Sophia S.", city: "Madrid", time: "28 mins ago" },
  { name: "Oliver R.", city: "Rome", time: "32 mins ago" },
  { name: "Isabella A.", city: "Amsterdam", time: "35 mins ago" },
  { name: "Benjamin H.", city: "Oslo", time: "38 mins ago" },
  { name: "Mia D.", city: "Dublin", time: "41 mins ago" },
  { name: "Lucas K.", city: "Stockholm", time: "44 mins ago" },
  { name: "Charlotte V.", city: "Vienna", time: "47 mins ago" },
  { name: "Henry G.", city: "Copenhagen", time: "50 mins ago" },
  { name: "Amelia Z.", city: "Zurich", time: "52 mins ago" },
  { name: "Alexander L.", city: "Los Angeles", time: "55 mins ago" },
  { name: "Evelyn F.", city: "San Francisco", time: "58 mins ago" },
  { name: "Sebastian M.", city: "Melbourne", time: "1 hour ago" },
  { name: "Abigail V.", city: "Vancouver", time: "1 hour ago" },
  { name: "Jack E.", city: "Edinburgh", time: "1 hour ago" },
  { name: "Harper T.", city: "Seattle", time: "1 hour ago" },
  { name: "Daniel A.", city: "Austin", time: "1 hour ago" },
  { name: "Emily B.", city: "Boston", time: "1 hour ago" },
  { name: "Matthew D.", city: "Denver", time: "2 hours ago" },
  { name: "Elizabeth G.", city: "Atlanta", time: "2 hours ago" },
  { name: "Samuel P.", city: "Portland", time: "2 hours ago" },
  { name: "Avery M.", city: "Montreal", time: "2 hours ago" },
  { name: "Joseph K.", city: "Manchester", time: "2 hours ago" },
  { name: "Sofia B.", city: "Barcelona", time: "3 hours ago" }
];

// Architectural Logo Component
const Logo = () => (
  <div className="flex items-center gap-3 cursor-pointer group" onClick={() => window.scrollTo(0,0)}>
    <div className="relative w-10 h-10 border-2 border-gray-900 flex items-center justify-center bg-white transition-all duration-300 group-hover:bg-gray-900 group-hover:text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] group-hover:translate-x-[2px] group-hover:translate-y-[2px]">
      <span className="font-display font-black text-xl tracking-tighter relative z-10">AV</span>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-1.5 bg-gray-900 group-hover:bg-white/50"></div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1px] h-1.5 bg-gray-900 group-hover:bg-white/50"></div>
      <div className="absolute left-0 top-1/2 -translate-y-1/2 h-[1px] w-1.5 bg-gray-900 group-hover:bg-white/50"></div>
      <div className="absolute right-0 top-1/2 -translate-y-1/2 h-[1px] w-1.5 bg-gray-900 group-hover:bg-white/50"></div>
    </div>
    <div className="flex flex-col">
       <span className="font-display font-bold text-xl tracking-[0.25em] leading-none text-gray-900">AVADA</span>
       <div className="w-full h-[1px] bg-gray-300 my-0.5"></div>
       <span className="text-[7px] font-bold uppercase tracking-widest text-gray-500 flex justify-between w-full leading-none">
          <span>ARCH</span>
          <span>•</span>
          <span className="text-brand-primary animate-pulse font-black">AI+</span>
       </span>
    </div>
  </div>
);

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ h: 2, m: 23, s: 49 });
  
  // Urgency States
  const [viewingCount, setViewingCount] = useState(14);
  const [joiners, setJoiners] = useState(RAW_JOINERS);
  const [currentJoinerIndex, setCurrentJoinerIndex] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [spotsRemaining, setSpotsRemaining] = useState(14);

  // Initialize joiners with a shuffle so users see different people
  useEffect(() => {
    setJoiners([...RAW_JOINERS].sort(() => Math.random() - 0.5));
  }, []);

  // Timer & Urgency Logic
  useEffect(() => {
    const calculateTime = () => {
      const DURATION = (2 * 60 * 60 * 1000) + (23 * 60 * 1000) + (49 * 1000);
      const now = Date.now();
      const remaining = DURATION - (now % DURATION);
      const h = Math.floor((remaining / (1000 * 60 * 60)) % 24);
      const m = Math.floor((remaining / (1000 * 60)) % 60);
      const s = Math.floor((remaining / 1000) % 60);
      setTimeLeft({ h, m, s });
    };

    const timerInterval = setInterval(calculateTime, 1000);
    calculateTime();

    // Randomize live viewing count
    const viewInterval = setInterval(() => {
        setViewingCount(prev => Math.max(8, Math.min(24, prev + (Math.random() > 0.5 ? 1 : -1))));
    }, 5000);

    // Social Proof Toast Cycle - Limit to 2 per person
    const toastCycle = setInterval(() => {
        const countStr = sessionStorage.getItem('avada_toast_count') || '0';
        const count = parseInt(countStr, 10);
        
        if (count < 2) {
            setShowToast(true);
            sessionStorage.setItem('avada_toast_count', (count + 1).toString());
            
            setTimeout(() => setShowToast(false), 5000);
            setTimeout(() => {
                setCurrentJoinerIndex(prev => (prev + 1) % joiners.length);
            }, 6000);
        } else {
            // Stop the interval once we've shown 2
            clearInterval(toastCycle);
        }
    }, 15000); // Show every 15 seconds until limit reached

    // Slowly reduce spots
    const spotInterval = setInterval(() => {
        setSpotsRemaining(prev => prev > 3 ? prev - (Math.random() > 0.9 ? 1 : 0) : prev);
    }, 30000);

    return () => {
        clearInterval(timerInterval);
        clearInterval(viewInterval);
        clearInterval(toastCycle);
        clearInterval(spotInterval);
    };
  }, [joiners.length]);

  const openGeneralModal = () => {
    setSelectedCourse(null);
    setIsModalOpen(true);
  };

  const openCourseModal = (course: Course) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  const formatTime = (val: number) => val.toString().padStart(2, '0');

  const heroAvatars = [
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80",
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&h=100&q=80",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&h=100&q=80"
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans overflow-x-hidden selection:bg-red-100">
      <style>{`
        @keyframes slide-up-reveal {
          0% { transform: translateY(100%); opacity: 0; filter: blur(10px); }
          100% { transform: translateY(0); opacity: 1; filter: blur(0); }
        }
        @keyframes width-grow {
          0% { width: 0; }
          100% { width: 100%; }
        }
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-in-toast {
          0% { transform: translateX(-120%); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
        @keyframes slide-out-toast {
          0% { transform: translateX(0); opacity: 1; }
          100% { transform: translateX(-120%); opacity: 0; }
        }
        .reveal-line {
          overflow: hidden;
          display: block;
          margin-bottom: 0.1em;
        }
        .reveal-text {
          animation: slide-up-reveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
          display: block;
          transform: translateY(100%);
        }
        .delay-1 { animation-delay: 0.1s; }
        .delay-2 { animation-delay: 0.4s; }
        .delay-3 { animation-delay: 0.7s; }
        .delay-4 { animation-delay: 1.0s; }
        
        .bg-grid-pattern {
          background-size: 40px 40px;
          background-image: linear-gradient(to right, rgba(0,0,0,0.03) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(0,0,0,0.03) 1px, transparent 1px);
        }
        .toast-active { animation: slide-in-toast 0.5s ease-out forwards; }
        .toast-exit { animation: slide-out-toast 0.5s ease-in forwards; }
      `}</style>

      {/* SOCIAL PROOF FLOATING TOAST */}
      <div className={`fixed bottom-8 left-4 md:left-8 z-[100] transition-all duration-500 ${showToast ? 'toast-active' : 'toast-exit'}`}>
          <div className="bg-white border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.12)] p-4 rounded-2xl flex items-center gap-4 max-w-[280px]">
              <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary shrink-0">
                  <CheckCircle2 size={20} />
              </div>
              <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Recent Activity</span>
                  <p className="text-xs text-gray-800 leading-snug">
                    <strong className="font-bold">{joiners[currentJoinerIndex]?.name}</strong> from {joiners[currentJoinerIndex]?.city} just unlocked the course access.
                  </p>
                  <span className="text-[9px] text-brand-primary font-medium mt-0.5">{joiners[currentJoinerIndex]?.time}</span>
              </div>
          </div>
      </div>

      {/* Header Stack */}
      <div className="w-full z-50 flex flex-col font-sans relative bg-white">
        
        {/* Sleek Countdown Banner */}
        <div className="bg-gray-900 text-white py-2.5 px-4 shadow-md relative overflow-hidden z-50 border-b border-white/5">
          <div className="container mx-auto flex flex-row items-center justify-center gap-4 sm:gap-8 text-sm">
            
            <div className="flex items-center gap-3 shrink-0">
               <span className="text-gray-400 font-bold line-through text-[10px] sm:text-xs">$99</span>
               <div className="bg-white text-gray-900 font-black px-2 py-0.5 rounded text-sm leading-none">$49</div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 hidden sm:inline-block">Special Offer Ends in</span>
              <div className="flex items-center gap-1 font-display font-bold text-sm sm:text-base tabular-nums tracking-wider text-brand-primary bg-gray-800 px-2 sm:px-3 py-1 rounded-md border border-gray-700">
                 <span>{formatTime(timeLeft.h)}</span>
                 <span className="animate-pulse text-gray-500">:</span>
                 <span>{formatTime(timeLeft.m)}</span>
                 <span className="animate-pulse text-gray-500">:</span>
                 <span>{formatTime(timeLeft.s)}</span>
              </div>
            </div>

            <div className="hidden lg:flex items-center gap-2 text-[10px] font-bold text-orange-400 uppercase tracking-widest">
                <span className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-ping"></span>
                Next price hike soon
            </div>
          </div>
        </div>

        {/* Navbar */}
        <nav className="w-full transition-all duration-300 px-4 md:px-12 py-4 flex items-center justify-between bg-white border-b border-gray-100">
          <div className="flex items-center gap-4 md:gap-8">
            <Logo />
            <div className="hidden md:flex items-center">
              <button 
                onClick={openGeneralModal}
                className="bg-brand-primary text-white text-xs md:text-sm font-bold px-6 py-2.5 rounded-full shadow-glow hover:shadow-glow-lg transition-all hover:scale-105 flex items-center gap-2"
              >
                <Sparkles size={14} className="fill-white" />
                <span>Unlock All Courses</span>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4 md:gap-8 text-gray-600 font-medium">
             <div className="hidden lg:flex flex-col items-end -space-y-1">
                <div className="flex items-center gap-1.5 text-green-600 text-[10px] font-bold uppercase tracking-tighter">
                   <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                   Online Activity
                </div>
                <div className="text-[11px] font-bold text-gray-900">{viewingCount} architects browsing</div>
             </div>
             <button onClick={() => setIsLoginOpen(true)} className="hidden md:flex items-center gap-2 text-sm font-bold text-gray-900 hover:text-brand-primary transition-colors bg-gray-50 px-4 py-2 rounded-full border border-gray-200">
                <LogIn size={16} /> Login
             </button>
             <Menu size={20} className="md:hidden cursor-pointer" />
          </div>
        </nav>
      </div>

      <main>
        {/* Modern Hero Section */}
        <section className="relative min-h-[90vh] w-full flex items-center bg-white pt-12 pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern z-0 pointer-events-none"></div>
          
          <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
            <div className="max-w-2xl z-10 flex flex-col items-center lg:items-start text-center lg:text-left">
               <div className="inline-flex items-center gap-3 mb-8 px-4 py-1.5 rounded-full bg-white border border-gray-100 shadow-sm animate-[fadeIn_0.5s_ease-out]">
                  <div className="relative flex h-2 w-2">
                     <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                     <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </div>
                  <span className="text-brand-primary text-[10px] font-bold uppercase tracking-widest">Learn Complete Interior/Exterior Design</span>
               </div>
               
               <h1 className="text-5xl md:text-7xl font-display font-bold leading-[1.05] mb-8 text-gray-900 tracking-tight">
                 <div className="reveal-line"><span className="reveal-text delay-1 bg-gradient-to-r from-brand-primary to-orange-500 bg-clip-text text-transparent pb-1">12 Courses + AI :</span></div>
                 <div className="reveal-line"><span className="reveal-text delay-2">Build Beautiful Spaces.</span></div>
                 <div className="reveal-line"><span className="reveal-text delay-3">Render Like a Pro.</span></div>
                 <div className="reveal-line relative"><span className="reveal-text delay-4 text-gray-900 relative z-10">Charge What You Deserve.</span><div className="absolute bottom-2 left-0 h-3 bg-brand-primary/20 z-0 animate-[width-grow_0.8s_ease-out_1.2s_forwards] rounded-full"></div></div>
               </h1>
               
               <div className="flex flex-col gap-2 mb-10 lg:border-l-4 lg:border-brand-primary lg:pl-6 bg-gradient-to-r from-white/80 to-transparent py-2 animate-[fadeIn_0.8s_ease-out_1.2s_forwards] opacity-0">
                 <p className="text-lg text-gray-600 font-light max-w-lg leading-relaxed">
                   Stop letting technical limitations hold your creativity hostage. Master the elite workflows that turn simple sketches into high-ticket reality, allowing you to <strong>command premium fees</strong> and leave the competition in the dust.
                 </p>
               </div>

               <div className="flex flex-col sm:flex-row items-center gap-4 mb-8 w-full justify-center lg:justify-start animate-[fadeIn_0.8s_ease-out_1.4s_forwards] opacity-0">
                 <button onClick={openGeneralModal} className="px-8 py-4 bg-brand-primary text-white rounded-xl font-bold text-lg shadow-glow hover:bg-red-700 transition-all flex items-center gap-2 group">
                   Start Learning Now <Sparkles size={18} />
                 </button>
                 <div className="flex -space-x-3 items-center">
                    {heroAvatars.map((url, i) => (
                      <img key={i} className="w-10 h-10 rounded-full border-2 border-white object-cover" src={url} alt="Student" />
                    ))}
                    <div className="w-10 h-10 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600">2k+</div>
                 </div>
               </div>
            </div>

            <div className="relative w-full mt-8 lg:mt-0 aspect-video lg:aspect-auto lg:h-[500px]">
               <div className="absolute top-0 left-1/2 -translate-x-1/2 lg:translate-x-0 lg:left-auto lg:right-0 w-full lg:w-[90%] h-full z-10 group">
                  <div className="absolute -top-3 left-6 z-20 bg-brand-primary text-white text-[10px] font-bold px-4 py-1.5 rounded-full shadow-lg flex items-center gap-2 border-2 border-white">
                      <TrendingUp size={12} /> ENROLLMENT IS 94% FULL
                  </div>
                  <div className="w-full h-full rounded-xl lg:rounded-2xl overflow-hidden shadow-2xl border-2 lg:border-4 border-white bg-black relative">
                     <iframe src="https://iframe.mediadelivery.net/embed/494628/a8b8b480-201f-4099-ac67-2a42b9a1b61c?autoplay=true&loop=true&muted=true" className="w-full h-full object-cover" allowFullScreen={true}></iframe>
                  </div>
               </div>
            </div>
          </div>
        </section>

        {/* Stacked Carousel Section */}
        <StackedCarousel onCourseClick={openCourseModal} />

        {/* Main CTA Section */}
        <div className="w-full bg-white pb-24 flex flex-col items-center justify-center px-4 -mt-12 relative z-20 gap-8">
            <div className="w-full max-w-2xl aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-black relative z-10">
                 <iframe src="https://iframe.mediadelivery.net/embed/489113/562b87e6-4ac9-40b6-b343-479ada547387?autoplay=true&loop=true&muted=true" className="w-full h-full object-cover" allowFullScreen={true}></iframe>
            </div>

            <div className="w-full max-w-2xl flex flex-col items-center gap-6">
                
                {/* Countdown Urgency Block */}
                <div className="w-full bg-red-50 border border-red-100 rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex flex-col items-center sm:items-start">
                        <div className="flex items-center gap-2 text-brand-primary font-black uppercase tracking-widest text-xs mb-1">
                            <Clock size={16} /> Discount Ending Soon
                        </div>
                        <p className="text-[11px] font-bold text-gray-500 uppercase tracking-tighter">Secure the $49 rate before price hike</p>
                    </div>
                    
                    <div className="flex items-center gap-2">
                        <div className="flex flex-col items-center bg-white border border-red-100 px-3 py-1 rounded-lg shadow-sm">
                            <span className="text-xl font-display font-black text-brand-primary tabular-nums leading-none">{formatTime(timeLeft.h)}</span>
                            <span className="text-[8px] font-bold text-gray-400 uppercase">Hours</span>
                        </div>
                        <span className="text-brand-primary font-black text-xl animate-pulse">:</span>
                        <div className="flex flex-col items-center bg-white border border-red-100 px-3 py-1 rounded-lg shadow-sm">
                            <span className="text-xl font-display font-black text-brand-primary tabular-nums leading-none">{formatTime(timeLeft.m)}</span>
                            <span className="text-[8px] font-bold text-gray-400 uppercase">Mins</span>
                        </div>
                        <span className="text-brand-primary font-black text-xl animate-pulse">:</span>
                        <div className="flex flex-col items-center bg-white border border-red-100 px-3 py-1 rounded-lg shadow-sm">
                            <span className="text-xl font-display font-black text-brand-primary tabular-nums leading-none">{formatTime(timeLeft.s)}</span>
                            <span className="text-[8px] font-bold text-gray-400 uppercase">Secs</span>
                        </div>
                    </div>
                </div>

                <button onClick={openGeneralModal} className="group relative w-full bg-gray-900 rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 hover:-translate-y-2">
                   <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 opacity-90"></div>
                   <div className="relative z-10 flex items-center justify-between px-6 py-6 sm:px-10 sm:py-8">
                      <div className="flex items-center gap-4 text-left">
                         <div className="w-12 h-12 sm:w-16 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-brand-primary transition-colors duration-300">
                            <Download className="text-white w-6 h-6" />
                         </div>
                         <div className="flex flex-col">
                            <h3 className="text-xl sm:text-3xl font-display font-bold text-white leading-tight mb-0.5 group-hover:text-brand-primary transition-colors tracking-tight">Download All Courses</h3>
                            <div className="flex items-center gap-2">
                                <span className="text-brand-primary font-black uppercase text-xs sm:text-sm tracking-[0.2em]">Lifetime Access</span>
                            </div>
                         </div>
                      </div>
                      <div className="flex flex-col items-center gap-1 group-hover:translate-x-2 transition-transform">
                          <ArrowRight className="w-8 h-8 text-white" />
                          <div className="hidden sm:flex items-center gap-1 text-[8px] font-bold text-gray-500 tracking-widest uppercase">
                             Instant Link
                          </div>
                      </div>
                   </div>
                </button>
            </div>
        </div>

        {/* Explore the Library Section */}
        <section id="courses-section" className="relative z-10 py-12 bg-white space-y-8 scroll-mt-24">
           <div className="px-6 md:px-12 mb-8 flex flex-col md:flex-row justify-between items-end gap-4">
             <div>
                <h2 className="text-3xl font-display font-bold text-gray-900 mb-2">Explore the Library</h2>
                <p className="text-gray-500">Professional workflows for modern designers.</p>
             </div>
             <div className="flex items-center gap-2 bg-red-50 px-4 py-2 rounded-full border border-red-100 shadow-sm">
                <Users size={16} className="text-brand-primary" />
                <span className="text-xs font-bold text-gray-700 uppercase tracking-widest">{viewingCount * 3 + 42} Students currently learning</span>
             </div>
           </div>
           <div className="space-y-12">
            {ROWS.map((row, idx) => (<CourseRow key={idx} title={row.title} courses={row.courses} onCourseClick={openCourseModal} />))}
           </div>
        </section>

        {/* Why Choose Us */}
        <section className="px-6 md:px-12 py-24 bg-gray-50 border-y border-gray-100">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-bold text-gray-900 mb-4">Why Architects Love Avada</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">Used by professionals at top global firms to streamline their production.</p>
          </div>
          <Features />
        </section>

        {/* Testimonials */}
        <section className="py-24 bg-white overflow-hidden">
          <div className="px-6 md:px-12 mb-12 flex flex-col md:flex-row justify-between items-end gap-6 max-w-7xl mx-auto">
             <div>
                <h2 className="text-3xl font-display font-bold mb-2 text-gray-900">Student Success</h2>
                <p className="text-gray-500">Reviews from our verified global community.</p>
             </div>
          </div>
          <div className="overflow-x-auto pb-12 px-6 md:px-12 flex gap-6 snap-x no-scrollbar">
            {TESTIMONIALS.map((t, i) => (
              <GlassCard key={i} className="min-w-[320px] md:min-w-[400px] p-8 border border-gray-100 shadow-sm snap-center flex flex-col justify-between" hoverEffect={true}>
                <div>
                    <div className="flex justify-between items-start mb-6">
                        <div className="flex text-brand-primary">{[1,2,3,4,5].map(s => <Sparkles key={s} size={14} className="fill-brand-primary" />)}</div>
                        <Quote size={32} className="text-gray-100 fill-gray-100" />
                    </div>
                    <p className="text-gray-700 italic mb-6 leading-relaxed text-lg font-medium">"{t.content}"</p>
                </div>
                <div className="flex items-center gap-4 border-t border-gray-100 pt-6">
                  <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-600 text-lg">{t.name[0]}</div>
                  <div>
                    <div className="flex items-center gap-2">
                        <div className="font-bold text-gray-900">{t.name}</div>
                        <div className="text-[10px] text-green-600 bg-green-50 px-1.5 py-0.5 rounded-full border border-green-100 font-bold">Verified</div>
                    </div>
                    <div className="text-xs text-gray-500">{t.role}</div>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="py-24 px-6 md:px-12 max-w-3xl mx-auto">
          <h2 className="text-3xl font-display font-bold text-center mb-12 text-gray-900">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {FAQ_ITEMS.map((item, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden">
                <button onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)} className="w-full flex items-center justify-between p-6 text-left">
                  <span className="text-lg font-medium text-gray-900">{item.question}</span>
                  <ChevronDown size={20} className={`text-gray-400 transition-transform ${openFaqIndex === index ? 'rotate-180' : ''}`} />
                </button>
                <div className={`px-6 text-gray-600 transition-all overflow-hidden ${openFaqIndex === index ? 'max-h-40 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}>{item.answer}</div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-white py-12 px-6 flex items-center justify-center">
        <div className="flex flex-col items-center gap-6">
           <Logo />
           <div className="flex items-center gap-8 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
              <a href="#" className="hover:text-brand-primary transition-colors">Privacy</a>
              <a href="#" className="hover:text-brand-primary transition-colors">Terms</a>
              <a href="#" className="hover:text-brand-primary transition-colors">Support</a>
              <button onClick={() => setIsAdminOpen(true)} className="hover:text-brand-primary transition-colors">Admin</button>
           </div>
           <p className="text-[10px] text-gray-400 tracking-wider">© 2025 Avada Architectural AI. Global Standards.</p>
        </div>
      </footer>

      <PaymentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} initialCourse={selectedCourse} />
      <AdminModal isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </div>
  );
};

export default App;