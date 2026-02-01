import React, { useState, useEffect } from 'react';
import { PaymentModal } from './components/PaymentModal';
import { AdminModal } from './components/AdminModal';
import { CourseRow } from './components/CourseRow';
import { Features } from './components/Features';
import { StackedCarousel } from './components/StackedCarousel';
import { TESTIMONIALS, FAQ_ITEMS, ROWS, COURSES } from './constants';
import { GlassCard } from './components/ui/GlassCard';
import { ChevronDown, ChevronUp, Instagram, Linkedin, Twitter, Play, Info, Bell, Menu, Sparkles, Database, CheckCircle2, Download, ShieldCheck, Lightbulb, Star, Globe, Lamp, Armchair, Sofa, ArrowRight, Timer, Quote, MapPin } from 'lucide-react';
import { Course } from './types';

// Architectural Logo Component
const Logo = () => (
  <div className="flex items-center gap-3 cursor-pointer group" onClick={() => window.scrollTo(0,0)}>
    <div className="relative w-10 h-10 border-2 border-gray-900 flex items-center justify-center bg-white transition-all duration-300 group-hover:bg-gray-900 group-hover:text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] group-hover:translate-x-[2px] group-hover:translate-y-[2px]">
      <span className="font-display font-black text-xl tracking-tighter relative z-10">AV</span>
      {/* Architectural Crosshairs */}
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
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ h: 2, m: 23, s: 49 });

  const featuredCourse = COURSES[1]; // V-Ray

  // Timer Logic
  useEffect(() => {
    const calculateTime = () => {
      // 2 hours 23 minutes 49 seconds in milliseconds
      const DURATION = (2 * 60 * 60 * 1000) + (23 * 60 * 1000) + (49 * 1000);
      const STORAGE_KEY = 'avada_offer_timer_v1';
      
      let startTime = localStorage.getItem(STORAGE_KEY);
      
      if (!startTime) {
        startTime = Date.now().toString();
        localStorage.setItem(STORAGE_KEY, startTime);
      }
      
      const now = Date.now();
      const elapsed = now - parseInt(startTime, 10);
      let remaining = DURATION - elapsed;

      // Evergreen Logic: If timer expires, reset it to start a new cycle
      if (remaining <= 0) {
        // Calculate how many cycles have passed
        const cycles = Math.ceil(Math.abs(remaining) / DURATION);
        // Reset start time to the beginning of the current cycle
        const newStart = parseInt(startTime, 10) + (cycles * DURATION);
        // If we want a hard reset behavior:
        localStorage.setItem(STORAGE_KEY, Date.now().toString());
        remaining = DURATION;
      }

      const h = Math.floor((remaining / (1000 * 60 * 60)) % 24);
      const m = Math.floor((remaining / (1000 * 60)) % 60);
      const s = Math.floor((remaining / 1000) % 60);

      setTimeLeft({ h, m, s });
    };

    const timerInterval = setInterval(calculateTime, 1000);
    calculateTime(); // Initial execution

    return () => clearInterval(timerInterval);
  }, []);

  const openGeneralModal = () => {
    setSelectedCourse(null);
    setIsModalOpen(true);
  };

  const openCourseModal = (course: Course) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const scrollToCourses = () => {
    const element = document.getElementById('courses-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const formatTime = (val: number) => val.toString().padStart(2, '0');

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans overflow-x-hidden selection:bg-red-100">
      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(2deg); }
        }
        @keyframes float-reverse {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(15px) rotate(-2deg); }
        }
        @keyframes scan-light {
          0% { left: -100%; opacity: 0; }
          50% { opacity: 0.5; }
          100% { left: 200%; opacity: 0; }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 10px rgba(217, 4, 41, 0.2); }
          50% { box-shadow: 0 0 25px rgba(217, 4, 41, 0.6); }
        }
        .bg-grid-pattern {
          background-size: 40px 40px;
          background-image: linear-gradient(to right, rgba(0,0,0,0.03) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(0,0,0,0.03) 1px, transparent 1px);
        }
      `}</style>

      {/* Header Stack - Non Sticky (Relative) */}
      <div className="w-full z-50 flex flex-col font-sans relative bg-white">
        
        {/* Sleek Countdown Banner - Single Line on Mobile */}
        <div className="bg-gray-900 text-white py-3 px-4 shadow-md relative overflow-hidden z-50">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          
          <div className="container mx-auto flex flex-row items-center justify-center gap-4 sm:gap-8 text-sm">
            
            {/* Price Offer */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
               <span className="text-gray-400 font-bold line-through text-[10px] sm:text-xs">$99</span>
               <div className="bg-white text-gray-900 font-black px-2 py-0.5 rounded text-sm sm:text-base leading-none">$49</div>
            </div>

            {/* Timer Display */}
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 hidden sm:inline-block">Discount offer ends in</span>
              
              <div className="flex items-center gap-1 font-display font-bold text-sm sm:text-base tabular-nums tracking-wider text-brand-primary bg-gray-800 px-2 sm:px-3 py-1 rounded-md border border-gray-700 shadow-inner">
                 <span>{formatTime(timeLeft.h)}</span>
                 <span className="animate-pulse text-gray-500">:</span>
                 <span>{formatTime(timeLeft.m)}</span>
                 <span className="animate-pulse text-gray-500">:</span>
                 <span>{formatTime(timeLeft.s)}</span>
              </div>
            </div>

             {/* CTA (Hidden on mobile) */}
            <button 
              onClick={openGeneralModal}
              className="hidden md:flex items-center gap-1 text-xs font-bold text-white hover:text-brand-primary transition-colors group ml-auto sm:ml-0"
            >
              Grab Offer <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Navbar */}
        <nav 
          className={`w-full transition-all duration-300 px-4 md:px-12 py-4 flex items-center justify-between bg-white border-b border-gray-100`}
        >
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
             <div onClick={scrollToCourses} className="hidden md:block hover:text-brand-primary cursor-pointer transition-colors">Courses</div>
             <div className="w-8 h-8 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-xs font-bold text-gray-900 cursor-pointer hover:bg-gray-200 transition-colors">
               AV
             </div>
             <Menu size={20} className="md:hidden cursor-pointer" />
          </div>
        </nav>
      </div>

      <main>
        {/* Modern Clean Hero Section with Interior Motion Background */}
        <section className="relative min-h-[90vh] w-full flex items-center bg-white pt-12 overflow-hidden">
          
          {/* Animated Background Elements */}
          <div className="absolute inset-0 bg-grid-pattern z-0 pointer-events-none"></div>
          
          {/* Floating Interior Elements - Left */}
          <div className="absolute top-32 left-10 text-gray-100 z-0 animate-[float-slow_6s_ease-in-out_infinite]">
             <Lamp size={180} strokeWidth={1} />
          </div>
          <div className="absolute bottom-20 left-20 text-gray-50 z-0 animate-[float-reverse_8s_ease-in-out_infinite]">
             <Armchair size={120} strokeWidth={1} />
          </div>

          {/* Floating Interior Elements - Right (Behind Video) */}
          <div className="absolute top-20 right-20 text-gray-50 z-0 animate-[float-reverse_7s_ease-in-out_infinite]">
             <Sofa size={200} strokeWidth={1} />
          </div>
          
          <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
            
            {/* Left Content - CENTERED ON MOBILE */}
            <div className="max-w-2xl z-10 animate-[fadeIn_0.8s_ease-out] flex flex-col items-center lg:items-start text-center lg:text-left">
               <div className="inline-flex items-center gap-2 mb-6 px-3 py-1 rounded-full bg-red-50 border border-red-100 backdrop-blur-sm bg-opacity-80">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-primary"></span>
                  </span>
                  <span className="text-brand-primary text-xs font-bold uppercase tracking-widest">Architecture Masterclass Series</span>
               </div>
               
               <h1 className="text-5xl md:text-7xl font-display font-bold leading-[0.95] mb-6 text-gray-900 tracking-tight">
                 Learn Interior <span className="text-gray-400">&</span><br/>
                 Exterior Designing<br/>
                 <span className="text-brand-primary">+ AI Tools</span>
               </h1>
               
               <div className="flex flex-col gap-2 mb-8 lg:border-l-4 lg:border-brand-primary lg:pl-6 bg-gradient-to-r from-white/80 to-transparent backdrop-blur-sm py-2">
                 <p className="text-xl md:text-2xl text-gray-700 font-medium">
                   12 Premium Courses.
                 </p>
                 <p className="text-lg text-gray-500 font-light">
                   If you're an Architect, Interior Designer or Home Owner, this is for you.
                 </p>
               </div>

               <div className="flex flex-col sm:flex-row items-center gap-4 mb-8 w-full justify-center lg:justify-start">
                 <button 
                   onClick={openGeneralModal}
                   className="px-8 py-4 bg-brand-primary text-white rounded-xl font-bold text-lg shadow-glow hover:bg-red-700 transition-all flex items-center gap-2 group"
                 >
                   Start Learning Now <Sparkles size={18} className="group-hover:rotate-12 transition-transform" />
                 </button>
                 <div className="flex -space-x-3 items-center">
                    {[1,2,3,4].map(i => (
                      <img key={i} className="w-10 h-10 rounded-full border-2 border-white" src={`https://i.pravatar.cc/100?img=${i+10}`} alt="Student" />
                    ))}
                    <div className="w-10 h-10 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600">
                      2k+
                    </div>
                 </div>
               </div>

               {/* Sci-Fi Explore Button */}
               <button 
                  onClick={scrollToCourses}
                  className="relative group overflow-hidden rounded-full p-[2px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
               >
                  <div className="absolute inset-0 bg-gradient-to-r from-brand-primary via-orange-500 to-brand-primary opacity-70 animate-[spin_4s_linear_infinite]" />
                  <div className="relative px-8 py-3 bg-black rounded-full flex items-center gap-3 transition-transform group-hover:scale-[0.99]">
                    <span className="text-white font-display font-bold uppercase tracking-widest text-sm relative z-10">
                      Explore All Courses
                    </span>
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white relative z-10 group-hover:bg-brand-primary transition-colors">
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                    {/* Scanning Light Effect */}
                    <div className="absolute top-0 bottom-0 w-10 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 animate-[scan-light_2s_ease-in-out_infinite]" />
                  </div>
               </button>
            </div>

            {/* Right Image Composition */}
            <div className="relative h-[500px] hidden lg:block">
               {/* Main Hero Video */}
               <div className="absolute top-0 right-0 w-[90%] h-full rounded-2xl overflow-hidden shadow-2xl rotate-3 hover:rotate-0 transition-all duration-700 border-4 border-white group">
                 <iframe 
                    src="https://iframe.mediadelivery.net/embed/494628/a8b8b480-201f-4099-ac67-2a42b9a1b61c?autoplay=true&loop=true&muted=true&preload=true" 
                    className="w-full h-full border-none"
                    allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;" 
                    allowFullScreen={true}
                    title="Hero Video"
                 ></iframe>
                 
                 <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none"></div>
                 <div className="absolute bottom-6 left-6 text-white pointer-events-none">
                   <div className="text-xs font-bold uppercase tracking-wider mb-1 text-brand-accent">Featured Course</div>
                   <div className="text-2xl font-display font-bold">V-Ray Photorealism</div>
                 </div>
               </div>
               
               {/* Floating Card 1 */}
               <div className="absolute top-10 left-0 bg-white p-4 rounded-xl shadow-xl animate-[float-slow_5s_ease-in-out_infinite] border border-gray-100 max-w-[200px]">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded bg-red-50 flex items-center justify-center text-brand-primary">
                      <Sparkles size={16} />
                    </div>
                    <div className="text-xs font-bold text-gray-800">AI Design</div>
                  </div>
                  <p className="text-[10px] text-gray-500">Generate 100 concepts in 60 seconds.</p>
               </div>

                {/* Floating Card 2 */}
               <div className="absolute bottom-10 -left-8 bg-white p-4 rounded-xl shadow-xl animate-[float-reverse_6s_ease-in-out_infinite] border border-gray-100">
                  <div className="flex items-center gap-3">
                    <img src="https://i.pravatar.cc/100?img=32" className="w-10 h-10 rounded-full" alt="Student" />
                    <div>
                      <div className="text-xs font-bold text-gray-900">"Best investment ever."</div>
                      <div className="text-[10px] text-gray-500">Sakshi, Interior Designer</div>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </section>

        {/* Stacked Carousel Section */}
        <StackedCarousel onCourseClick={openCourseModal} />

        {/* Honest Request Section */}
        <section className="pt-12 pb-6 px-6 md:px-12 bg-white flex justify-center">
            <div className="max-w-4xl w-full bg-white border border-gray-100 rounded-3xl p-8 md:p-12 text-center shadow-lg shadow-gray-100/50 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>
                
                <div className="flex flex-col items-center gap-4 relative z-10">
                    <div className="flex items-center gap-3 text-2xl font-display font-bold text-gray-900">
                        <Lightbulb className="text-yellow-500 fill-yellow-500" size={32} />
                        A Small but Honest Request
                    </div>
                    
                    <div className="w-20 h-0.5 bg-gray-100 rounded-full my-2"></div>
                    
                    <div className="space-y-6 max-w-2xl mx-auto text-lg text-gray-600 font-light leading-relaxed">
                        <p>
                            Please join this course <strong className="text-gray-900 font-semibold">only if you are ready to dedicate 1–2 hours a day</strong> for at least 15 days.
                        </p>
                        <p>
                            Don't buy it just to let it sit unused on your hard disk. We have poured months of <strong className="text-gray-900 font-medium">effort, research, and love</strong> into creating these lessons for you.
                        </p>
                        <p className="text-base italic text-gray-400">
                            Your commitment is what will transform these resources into real skills, projects, and results.
                        </p>
                    </div>

                    <div className="mt-4 text-brand-primary font-medium text-sm flex items-center gap-2 bg-red-50 px-6 py-2 rounded-full">
                        Thank you for respecting the work — and yourself. <span className="text-lg">🙏</span>
                    </div>
                </div>
            </div>
        </section>

        {/* 10x Income & Value Prop Section */}
        <section className="py-16 px-6 md:px-12 bg-gray-50 border-y border-gray-100">
           <div className="max-w-6xl mx-auto">
              <div className="text-center max-w-3xl mx-auto mb-12">
                 <div className="inline-block bg-gray-900 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-4">
                    First Time Ever — Combo
                 </div>
                 <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">
                    10× Your Design Income <br/>
                    <span className="bg-red-50 text-brand-primary px-2 rounded-lg inline-block transform -rotate-1 mt-1">without guesswork</span>
                 </h2>
                 <p className="text-gray-600 text-lg mb-6">Zero-fluff, step-by-step lessons. Global best practices. Results you can show.</p>
                 
                 <div className="flex flex-wrap justify-center gap-3">
                    {['Beginner-friendly', 'Project-based', 'Freelance-ready', 'Portfolio templates'].map(tag => (
                        <span key={tag} className="px-4 py-1.5 bg-white border border-gray-200 rounded-full text-xs font-bold text-gray-700 shadow-sm">
                            {tag}
                        </span>
                    ))}
                 </div>
              </div>

              <div className="text-center text-xs font-bold text-gray-400 uppercase tracking-widest mb-8">
                 After completing the combo you can:
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                 {/* Card 1 */}
                 <div className="bg-white p-8 rounded-2xl shadow-xl shadow-gray-100 border border-gray-100 flex flex-col items-center text-center hover:-translate-y-1 transition-transform duration-300">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">Quote with confidence:<br/>~$600 per 1,000 sq.ft.</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">Use our pricing playbook and get clients saying "yes" faster.</p>
                 </div>
                 {/* Card 2 */}
                 <div className="bg-white p-8 rounded-2xl shadow-xl shadow-gray-100 border border-gray-100 flex flex-col items-center text-center hover:-translate-y-1 transition-transform duration-300">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">Charge $40–$120<br/>per image or clip</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">Turn quick visuals into recurring micro-payments from happy clients.</p>
                 </div>
                 {/* Card 3 */}
                 <div className="bg-white p-8 rounded-2xl shadow-xl shadow-gray-100 border border-gray-100 flex flex-col items-center text-center hover:-translate-y-1 transition-transform duration-300">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">Launch a global<br/>freelance profile</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">Steal our bio, portfolio sections, and outreach scripts that actually convert.</p>
                 </div>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border border-gray-200 bg-white rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center justify-center gap-3 border-b md:border-b-0 md:border-r border-gray-100 pb-4 md:pb-0">
                     <div className="text-[#00b67a]"><Star size={24} fill="currentColor" /></div>
                     <div className="text-left">
                        <div className="font-bold text-gray-900 text-sm">Trustpilot</div>
                        <div className="text-xs text-gray-500 flex items-center gap-1">
                            <span className="font-bold text-gray-900">4.8/5</span> 2,134 reviews
                        </div>
                     </div>
                  </div>
                  <div className="flex items-center justify-center gap-3 border-b md:border-b-0 md:border-r border-gray-100 pb-4 md:pb-0">
                     <div className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm">
                         <span className="text-blue-500 font-bold text-lg leading-none">G</span>
                     </div>
                     <div className="text-left">
                        <div className="font-bold text-gray-900 text-sm">Google Reviews</div>
                         <div className="text-xs text-gray-500 flex items-center gap-1">
                            <span className="font-bold text-gray-900">4.7/5</span> 1,980 reviews
                        </div>
                     </div>
                  </div>
                   <div className="flex items-center justify-center gap-3">
                     <div className="text-[#ff492c] font-bold text-xl">G2</div>
                     <div className="text-left">
                        <div className="font-bold text-gray-900 text-sm">G2 Leader</div>
                         <div className="text-xs text-gray-500 flex items-center gap-1">
                            <span className="font-bold text-gray-900">4.8/5</span> 540 reviews
                        </div>
                     </div>
                  </div>
              </div>
           </div>
        </section>

        {/* Content Rows */}
        <section id="courses-section" className="relative z-10 py-12 bg-white space-y-8 scroll-mt-24">
           <div className="px-6 md:px-12 mb-8">
             <h2 className="text-3xl font-display font-bold text-gray-900 mb-2">Explore the Library</h2>
             <p className="text-gray-500">Master industry-standard software from start to finish.</p>
           </div>
           
           <div className="space-y-12">
            {ROWS.map((row, idx) => (
                <CourseRow 
                key={idx} 
                title={row.title} 
                courses={row.courses} 
                onCourseClick={openCourseModal} 
                />
            ))}
           </div>
        </section>

        {/* NEW VIDEO SECTION: Cinematic Experience */}
        <section className="relative py-32 bg-gray-900 overflow-hidden">
           {/* Flowy Background Elements */}
           <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
              <div className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] bg-brand-primary/20 rounded-full blur-[120px] mix-blend-screen animate-[float-slow_10s_infinite_alternate]" />
              <div className="absolute top-[40%] -right-[10%] w-[60%] h-[60%] bg-blue-600/20 rounded-full blur-[120px] mix-blend-screen animate-[float-reverse_12s_infinite_alternate]" />
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
           </div>

           <div className="container mx-auto px-6 relative z-10">
              <div className="text-center mb-16">
                 <span className="inline-block py-1 px-3 rounded-full bg-white/10 border border-white/20 text-white text-[10px] font-bold uppercase tracking-widest backdrop-blur-md mb-4">
                    Cinematic Workflow
                 </span>
                 <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
                    See Design in <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-orange-400">Motion</span>
                 </h2>
                 <p className="text-gray-400 max-w-2xl mx-auto text-lg font-light">
                    Experience the fluidity of modern architectural visualization. From static lines to immersive realities.
                 </p>
              </div>

              {/* Glassy Video Wrapper */}
              <div className="relative max-w-5xl mx-auto">
                 {/* Glass Frame */}
                 <div className="absolute -inset-1 bg-gradient-to-r from-brand-primary via-white/50 to-blue-500 rounded-[2.5rem] opacity-30 blur-lg animate-pulse"></div>
                 <div className="relative rounded-[2rem] overflow-hidden border border-white/10 bg-gray-900/50 backdrop-blur-xl shadow-2xl">
                    
                    {/* Architectural UI Overlays */}
                    <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-20">
                       <div className="absolute top-8 left-8 flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
                          <span className="text-xs font-mono text-white/70">REC // 4K RAW</span>
                       </div>
                       <div className="absolute top-8 right-8 flex items-center gap-4">
                          <div className="text-xs font-mono text-white/50">ISO 800</div>
                          <div className="text-xs font-mono text-white/50">f/1.8</div>
                          <div className="text-xs font-mono text-white/50">1/60</div>
                       </div>
                       <div className="absolute bottom-8 left-8">
                          <div className="h-px w-24 bg-white/30 mb-2"></div>
                          <div className="text-[10px] font-mono text-white/50 uppercase tracking-widest">Viewport Shading: Rendered</div>
                       </div>
                       {/* Corner Brackets */}
                       <div className="absolute top-6 left-6 w-8 h-8 border-t-2 border-l-2 border-white/20 rounded-tl-lg"></div>
                       <div className="absolute top-6 right-6 w-8 h-8 border-t-2 border-r-2 border-white/20 rounded-tr-lg"></div>
                       <div className="absolute bottom-6 left-6 w-8 h-8 border-b-2 border-l-2 border-white/20 rounded-bl-lg"></div>
                       <div className="absolute bottom-6 right-6 w-8 h-8 border-b-2 border-r-2 border-white/20 rounded-br-lg"></div>
                    </div>

                    {/* The Video */}
                    <div className="aspect-video relative z-10">
                       <iframe 
                          src="https://iframe.mediadelivery.net/embed/489113/a214b199-e64a-4eaf-af70-edfbc586e5fd?autoplay=true&loop=true&muted=true" 
                          className="w-full h-full"
                          allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;" 
                          allowFullScreen={true}
                       ></iframe>
                    </div>
                 </div>

                 {/* Floating Glass Elements */}
                 <div className="absolute -right-12 top-1/2 -translate-y-1/2 hidden lg:block">
                    <div className="glass-card p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-xl animate-[float-slow_6s_infinite]">
                       <div className="flex flex-col gap-3">
                          <div className="w-10 h-10 rounded-full bg-brand-primary/20 flex items-center justify-center text-brand-primary">
                             <Sparkles size={20} />
                          </div>
                          <div className="text-white text-xs font-bold">AI Enhanced</div>
                       </div>
                    </div>
                 </div>
                 
                 <div className="absolute -left-12 bottom-20 hidden lg:block">
                    <div className="glass-card p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-xl animate-[float-reverse_7s_infinite]">
                       <div className="flex items-center gap-3">
                          <div className="flex -space-x-2">
                             <div className="w-8 h-8 rounded-full bg-gray-700 border border-gray-600"></div>
                             <div className="w-8 h-8 rounded-full bg-gray-600 border border-gray-600"></div>
                          </div>
                          <div className="text-white text-xs font-bold">
                             Join 15k+ <br/><span className="text-gray-400 font-normal">Designers</span>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </section>

        {/* Why Choose Us */}
        <section className="px-6 md:px-12 py-24 bg-gray-50 border-y border-gray-100">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-bold text-gray-900 mb-4">Why Architects Love Avada</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">We don't just teach tools. We teach workflows that save time and win clients.</p>
          </div>
          <Features />
        </section>

        {/* Package Inclusions Section - NEW */}
        <section className="py-24 bg-white">
          <div className="max-w-3xl mx-auto px-6">
             <div className="text-center mb-12">
                <span className="text-brand-primary font-bold tracking-widest uppercase text-xs">The Bundle</span>
                <h2 className="text-4xl font-display font-bold text-gray-900 mt-2">You will receive</h2>
             </div>

             <div className="space-y-3">
                {[
                  "All Complete Courses + AI Courses",
                  "Beginner-to-Pro Modeling",
                  "10,000+ Textures and Models Free",
                  "Software Installation Links Free",
                  "Personal Mentor Support & Portfolio Review"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 p-5 rounded-2xl bg-gray-50 border border-gray-100 hover:border-brand-primary/20 hover:bg-white hover:shadow-lg transition-all duration-300 group cursor-default">
                     <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-brand-primary shadow-sm border border-gray-100 group-hover:scale-110 transition-transform">
                        <CheckCircle2 size={16} />
                     </div>
                     <span className="text-lg font-medium text-gray-800">{item}</span>
                  </div>
                ))}

                {/* Highlighted Item */}
                <div className="flex items-center gap-4 p-5 rounded-2xl bg-black text-white shadow-xl transform hover:scale-[1.02] transition-all duration-300 cursor-default">
                     <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-brand-accent">
                        <Sparkles size={16} />
                     </div>
                     <span className="text-lg font-bold">Certificate of Completion</span>
                </div>
             </div>
          </div>
        </section>

         {/* Plans Preview Banner */}
         <section className="px-6 md:px-12 py-20 bg-white">
           <div className="max-w-6xl mx-auto bg-gray-900 rounded-3xl p-8 md:p-16 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-12 shadow-2xl">
              <div className="relative z-10 max-w-lg">
                <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">Unlock Your Career Potential</h2>
                <ul className="space-y-3 mb-8">
                   <li className="flex items-center gap-3 text-gray-300">
                     <CheckCircle2 className="text-brand-primary" size={20} /> Access to all 12 courses
                   </li>
                   <li className="flex items-center gap-3 text-gray-300">
                     <CheckCircle2 className="text-brand-primary" size={20} /> Downloadable project files
                   </li>
                   <li className="flex items-center gap-3 text-gray-300">
                     <CheckCircle2 className="text-brand-primary" size={20} /> Certificate of Completion
                   </li>
                </ul>
                <div className="flex items-baseline gap-2">
                   <span className="text-4xl font-bold text-white">$49</span>
                   <span className="text-gray-400">/quarterly</span>
                </div>
              </div>
              
              <div className="relative z-10 flex flex-col gap-4 w-full md:w-auto">
                <button 
                    onClick={openGeneralModal}
                    className="px-8 py-4 bg-white text-gray-900 font-bold text-lg rounded-xl shadow-lg hover:scale-105 transition-transform text-center"
                >
                    Get Started Now
                </button>
                <p className="text-gray-400 text-xs text-center">30-day money-back guarantee</p>
              </div>

              {/* Abstract shapes */}
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-primary rounded-full blur-[120px] opacity-20 -mr-32 -mt-32 pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-500 rounded-full blur-[100px] opacity-10 -ml-20 -mb-20 pointer-events-none"></div>
           </div>
         </section>

        {/* Testimonials - Horizontally Scrollable */}
        <section className="py-24 bg-white overflow-hidden">
          <div className="px-6 md:px-12 mb-12 flex flex-col md:flex-row justify-between items-end gap-6 max-w-7xl mx-auto">
             <div>
                <h2 className="text-3xl font-display font-bold mb-2 text-gray-900">Community Reviews</h2>
                <p className="text-gray-500">See what professionals are building with Avada.</p>
             </div>
             <div className="flex gap-2 text-gray-400 text-sm items-center">
                Scroll <ArrowRight size={14} />
             </div>
          </div>
          
          <div className="overflow-x-auto pb-12 px-6 md:px-12 flex gap-6 snap-x snap-mandatory no-scrollbar">
            {TESTIMONIALS.map((t, i) => (
              <GlassCard 
                key={i} 
                className="min-w-[320px] md:min-w-[400px] p-8 border border-gray-100 shadow-sm snap-center flex flex-col justify-between" 
                hoverEffect={true}
              >
                <div>
                    <div className="flex justify-between items-start mb-6">
                        <div className="flex text-brand-primary">
                            {[1,2,3,4,5].map(s => <Sparkles key={s} size={14} className="fill-brand-primary" />)}
                        </div>
                        <Quote size={32} className="text-gray-100 fill-gray-100" />
                    </div>
                    
                    <p className="text-gray-700 italic mb-6 leading-relaxed text-lg font-medium">"{t.content}"</p>
                </div>

                <div className="flex items-center gap-4 border-t border-gray-100 pt-6 mt-auto">
                  <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-600 text-lg">
                    {t.name[0]}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                        <div className="font-bold text-gray-900">{t.name}</div>
                        <div className="flex items-center gap-0.5 text-[10px] text-green-600 bg-green-50 px-1.5 py-0.5 rounded-full border border-green-100 font-bold">
                            <CheckCircle2 size={10} /> Verified Student
                        </div>
                    </div>
                    <div className="text-xs text-gray-500 mb-0.5">{t.role}</div>
                    <div className="flex items-center gap-1 text-[10px] text-gray-400">
                        <MapPin size={10} /> {t.location}
                    </div>
                  </div>
                </div>
              </GlassCard>
            ))}
            <div className="w-6 shrink-0"></div> {/* Right spacer */}
          </div>
        </section>

        {/* FAQ */}
        <section className="py-24 px-6 md:px-12 max-w-3xl mx-auto">
          <h2 className="text-3xl font-display font-bold text-center mb-4 text-gray-900">Frequently Asked Questions</h2>
          <p className="text-center text-gray-500 mb-12">Everything you need to know about the product and billing.</p>
          
          <div className="space-y-4">
            {FAQ_ITEMS.map((item, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden transition-all hover:border-brand-primary/20">
                <button 
                  onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="text-lg font-medium text-gray-900">{item.question}</span>
                  <div className={`transition-transform duration-300 ${openFaqIndex === index ? 'rotate-180' : ''}`}>
                    <ChevronDown size={20} className="text-gray-400" />
                  </div>
                </button>
                <div 
                  className={`px-6 text-gray-600 transition-all duration-300 overflow-hidden ${openFaqIndex === index ? 'max-h-40 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  {item.answer}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer - CLEAN & MINIMAL */}
      <footer className="border-t border-gray-100 bg-white py-12 px-6 flex items-center justify-center">
        <div className="flex flex-col items-center gap-6">
           <Logo />
           <p className="text-[10px] text-gray-400 tracking-wider">© 2025 Avada Inc. All rights reserved.</p>
           
           {/* Minimal Admin Access - Hidden */}
           <button 
                onClick={() => setIsAdminOpen(true)}
                className="opacity-0 hover:opacity-100 transition-opacity text-[10px] text-gray-300"
            >
                Admin
            </button>
        </div>
      </footer>

      <PaymentModal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        initialCourse={selectedCourse} 
      />

      <AdminModal 
        isOpen={isAdminOpen} 
        onClose={() => setIsAdminOpen(false)} 
      />
    </div>
  );
};

export default App;