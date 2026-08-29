import { motion, AnimatePresence } from "motion/react";
import { 
  Instagram, 
  Video, 
  Palette, 
  FileText, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft,
  ChevronLeft,
  Phone, 
  Mail, 
  MapPin, 
  MessageSquare,
  Menu,
  X,
  ExternalLink,
  ChevronRight,
  Facebook,
  Youtube,
  Layout,
  Figma,
  Scissors,
  Image,
  Camera,
  Layers,
  Globe,
  TrendingUp,
  Film,
  Sparkles,
  Smartphone,
  Play,
  Pause,
  Maximize,
  Maximize2,
  Minimize2,
  RotateCcw,
  RotateCw,
  Volume2,
  VolumeX,
  Check,
  Briefcase,
  Calendar,
  Copy,
  Send
} from "lucide-react";
import React, { useState, useEffect, useRef } from "react";

// --- Animated Smooth Rotating Counter Component ---
const AnimatedCounter = ({ value, suffix = "", delay = 0, decimals = 0, colorClass = "text-primary" }: { value: number; suffix?: string; delay?: number; decimals?: number; colorClass?: string }) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    let timeoutId: any;
    let animFrameId: any;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;

          const startCount = () => {
            let startTimestamp: number | null = null;
            const duration = 1600; // 1.6s of gorgeous logarithmic deceleration

            const step = (timestamp: number) => {
              if (!startTimestamp) startTimestamp = timestamp;
              const elapsed = timestamp - startTimestamp;
              const progress = Math.min(elapsed / duration, 1);
              
              // Cubic Ease-Out curve (starts blazing fast, finishes silky smooth)
              const easeOutProgress = 1 - Math.pow(1 - progress, 3);
              const currentVal = easeOutProgress * value;
              
              setCount(currentVal);

              if (progress < 1) {
                animFrameId = window.requestAnimationFrame(step);
              } else {
                setCount(value);
              }
            };

            animFrameId = window.requestAnimationFrame(step);
          };

          timeoutId = setTimeout(startCount, delay);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      observer.disconnect();
      if (timeoutId) clearTimeout(timeoutId);
      if (animFrameId) window.cancelAnimationFrame(animFrameId);
    };
  }, [value, delay]);

  const displayVal = decimals > 0 ? count.toFixed(decimals) : Math.floor(count);
  const isWordSuffix = suffix.trim().toLowerCase() === "years";

  return (
    <span ref={elementRef} className="block transition-all duration-300 text-right">
      {isWordSuffix ? (
        <>
          <span className={`block text-3xl md:text-5xl font-extrabold ${colorClass} font-mono tracking-tight leading-none`}>
            {displayVal}
          </span>
          <span className="block text-[10px] md:text-xs font-black text-slate-400 mt-1 uppercase tracking-widest leading-none text-right font-sans">
            {suffix.trim()}
          </span>
        </>
      ) : (
        <span className={`block text-3xl md:text-5xl font-extrabold ${colorClass} font-mono tracking-tight`}>
          {displayVal}{suffix}
        </span>
      )}
    </span>
  );
};

// --- Navbar Component ---
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("Home");

  const navLinks = [
    { name: "Home", href: "#hero" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "My Experience", href: "#experience" },
    { name: "Work Samples", href: "#work" },
    { name: "Contact", href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const scrollPosition = window.scrollY + 250;

      // Special case: near top of page -> Home is active
      if (window.scrollY < 120) {
        setActiveSection("Home");
        return;
      }

      // Check sections
      for (const link of navLinks) {
        const id = link.href.substring(1);
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(link.name);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-white/80 backdrop-blur-md py-2.5 shadow-sm border-b border-slate-100" : "bg-transparent py-5"}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 flex justify-between items-center">
        {/* Desktop Nav Links on Left with Glass Styling */}
        <div className="hidden md:flex items-center gap-1 bg-slate-100/50 hover:bg-slate-100/80 backdrop-blur-md p-1 rounded-full border border-slate-200/40 transition-colors duration-300">
          {navLinks.map((link) => {
            const isActive = activeSection === link.name;
            return (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={() => setActiveSection(link.name)}
                className={`relative px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all duration-300 select-none ${
                  isActive 
                    ? "text-primary shadow-sm" 
                    : "text-slate-600 hover:text-navy"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeNavBackground"
                    className="absolute inset-0 bg-white shadow-sm border border-slate-200/20 rounded-full -z-10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {link.name}
              </a>
            );
          })}
        </div>

        {/* Desktop CTAs on Right / Mobile Menu Toggle */}
        <div className="flex items-center gap-3 ml-auto md:ml-0">
          <div className="hidden md:flex items-center gap-3">
            <a 
              href="https://drive.google.com/file/d/1WDRO1gBi7c5ap7K8Zse0qcteeXM7R1sC/view?usp=sharing" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-slate-50 border border-slate-200/80 hover:bg-slate-100 text-navy px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-sm"
            >
              <FileText size={14} /> Resume
            </a>

            <a 
              href="#contact" 
              className="bg-navy hover:bg-primary text-white px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-md shadow-navy/10 hover:shadow-primary/20 hover:-translate-y-0.5 active:translate-y-0"
            >
              Let's Talk
            </a>
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden text-navy p-1" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 w-full bg-white shadow-xl py-6 px-6 flex flex-col gap-2 md:hidden border-t border-slate-100"
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.name;
            return (
              <a 
                key={link.name} 
                href={link.href} 
                className={`text-xs font-bold uppercase tracking-wider py-2.5 px-3 rounded-lg transition-colors flex justify-between items-center ${
                  isActive 
                    ? "bg-blue-50/70 text-primary border-l-4 border-primary" 
                    : "text-navy hover:bg-slate-50"
                }`}
                onClick={() => {
                  setActiveSection(link.name);
                  setIsMenuOpen(false);
                }}
              >
                <span>{link.name}</span>
                {isActive && <span className="w-1.5 h-1.5 bg-primary rounded-full" />}
              </a>
            );
          })}
          <div className="flex flex-col gap-2.5 pt-4 border-t border-slate-100 mt-2">
            <a 
              href="https://drive.google.com/file/d/1WDRO1gBi7c5ap7K8Zse0qcteeXM7R1sC/view?usp=sharing" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center justify-center gap-2 bg-slate-50 border border-slate-200 text-navy px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all"
              onClick={() => setIsMenuOpen(false)}
            >
              <FileText size={15} /> View Resume
            </a>
            <a 
              href="#contact" 
              className="bg-navy text-white text-center px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-primary transition-all shadow-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Let's Talk
            </a>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

// --- Hero Section ---
const Hero = () => {
  return (
    <section id="hero" className="relative pt-[100px] pb-16 md:pt-[130px] md:pb-24 overflow-hidden px-6 md:px-12 lg:px-24 bg-white">
      {/* Grid Hero Container */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column (Content) - Left-aligned */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 flex flex-col items-start text-left"
          >
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2.5 bg-slate-50 hover:bg-blue-50/50 border border-slate-200/60 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider text-slate-600 transition-all duration-300 shadow-sm select-none mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Available for Full-Time Opportunities</span>
            </div>
 
            {/* Headline */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-display font-black leading-tight mb-4 tracking-tight text-navy text-left max-w-4xl">
              Growing Brands Through <span className="text-primary font-black bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">Strategic Social Media.</span>
            </h1>
 
            {/* Subtitle */}
            <p className="text-xs md:text-sm font-bold uppercase tracking-wider text-primary mb-3 text-left">
              Social Media Manager • Content Strategist • Graphic Designer • Video Editor
            </p>
 
            {/* Description */}
            <p className="text-sm md:text-base text-slate-500 mb-8 text-left leading-relaxed max-w-xl">
              With over 1.7 years of expertise, I help businesses grow through strategic content planning, engaging social media campaigns, creative design, and short-form video content that builds audience engagement and strengthens brand presence.
            </p>
 
            {/* CTA buttons with modern animations and styles */}
            <div className="flex flex-wrap gap-4 w-full sm:w-auto justify-start">
              <motion.a 
                href="#work" 
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                className="relative bg-gradient-to-r from-primary via-blue-600 to-indigo-600 text-white px-8 py-4 rounded-full font-bold flex items-center gap-2.5 text-base shadow-lg shadow-primary/25 overflow-hidden group cursor-pointer z-10"
              >
                {/* Micro-interactive radial glare overlay */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer pointer-events-none" />
                View Portfolio 
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                >
                  <ArrowRight size={20} />
                </motion.span>
              </motion.a>
              <motion.a 
                href="https://drive.google.com/file/d/1WDRO1gBi7c5ap7K8Zse0qcteeXM7R1sC/view?usp=sharing" 
                target="_blank" 
                rel="noreferrer"
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                className="relative bg-white/80 backdrop-blur-md border border-slate-200/80 hover:border-navy hover:bg-slate-50 text-navy px-8 py-4 rounded-full font-bold flex items-center gap-2.5 text-base shadow-sm hover:shadow-md transition-all group overflow-hidden cursor-pointer z-10"
              >
                <div className="absolute left-0 top-0 w-[4px] h-full bg-primary/0 group-hover:bg-primary transition-all duration-300" />
                <FileText size={20} className="text-slate-400 group-hover:text-primary transition-colors" /> 
                Download Resume
              </motion.a>
            </div>
          </motion.div>

          {/* Right Column (Metrics stats stacked with dynamic motion graphics overlay) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 relative w-full p-6 md:p-8 rounded-3xl border border-slate-100 bg-gradient-to-br from-slate-50/70 via-white/80 to-slate-50/70 backdrop-blur-xl shadow-2xl flex flex-col gap-4 overflow-hidden min-h-[360px] justify-center"
          >
            {/* Ambient Backlight Glows */}
            <div className="absolute top-0 right-0 w-60 h-60 bg-primary/10 rounded-full blur-3xl -z-10 animate-pulse pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-60 h-60 bg-blue-300/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>

            {/* Modern Tech Dot Grid background */}
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(#e2e8f0_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-70 pointer-events-none" />

            {/* Slow Spinning Tech Concentric Rings */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] -z-10 pointer-events-none opacity-25">
              <motion.svg
                className="w-full h-full"
                viewBox="0 0 100 100"
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              >
                <circle cx="50" cy="50" r="46" stroke="#4f8cff" strokeWidth="0.5" strokeDasharray="3 3" fill="none" />
                <circle cx="50" cy="50" r="38" stroke="#0f172a" strokeWidth="0.25" fill="none" />
                <circle cx="50" cy="50" r="28" stroke="#4f8cff" strokeWidth="1" strokeDasharray="1 8" fill="none" />
              </motion.svg>
            </div>

            {/* Floating Subtle Sparks/Particles */}
            <motion.div
              animate={{ 
                x: [0, 30, -15, 0],
                y: [0, -25, 15, 0],
              }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-12 left-12 w-3.5 h-3.5 rounded-full bg-primary/30 blur-[2px] -z-10"
            />
            <motion.div
              animate={{ 
                x: [0, -25, 25, 0],
                y: [0, 30, -15, 0],
              }}
              transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-16 right-16 w-5 h-5 rounded-full bg-primary/20 blur-[3px] -z-10"
            />

            {/* Moving Wave-Line Vectors */}
            <div className="absolute -bottom-8 -left-8 w-44 h-44 -z-10 opacity-30 pointer-events-none">
              <motion.svg
                className="w-full h-full text-primary"
                viewBox="0 0 100 100"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
              >
                <motion.path 
                  d="M0 50 Q 25 30, 50 50 T 100 50" 
                  animate={{ d: ["M0 50 Q 25 30, 50 50 T 100 50", "M0 50 Q 25 70, 50 50 T 100 50", "M0 50 Q 25 30, 50 50 T 100 50"] }}
                  transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.path 
                  d="M0 60 Q 25 40, 50 60 T 100 60" 
                  animate={{ d: ["M0 60 Q 25 40, 50 60 T 100 60", "M0 60 Q 25 80, 50 60 T 100 60", "M0 60 Q 25 40, 50 60 T 100 60"] }}
                  transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                />
              </motion.svg>
            </div>

            {/* Actual Stats Cards with Glass Styling & Micro-Scale Effects */}
            {[
              {
                value: 1.7,
                suffix: " YEARS",
                title: "Healthcare Marketing Experience",
                colorClass: "text-primary",
                desc: "Creating content for dental and healthcare brands.",
                badge: "Proven Record"
              },
              {
                value: 50,
                suffix: "+",
                title: "Social Media Creatives",
                colorClass: "text-navy",
                desc: "Posts, Carousels & Reels Delivered.",
                badge: "Delivered Assets"
              },
              {
                value: 250,
                suffix: "K+",
                title: "Content Views",
                colorClass: "text-primary",
                desc: "Building audience reach through engaging content.",
                badge: "Audience Reach"
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * idx }}
                whileHover={{ y: -4, x: 4, scale: 1.02, borderColor: "#4f8cff" }}
                className="relative bg-white/70 backdrop-blur-md py-4 px-5 rounded-2xl border border-slate-100 shadow-sm transition-all duration-300 flex items-center justify-between group hover:shadow-lg cursor-default text-left overflow-hidden"
              >
                {/* Visual Glass Reflection Hover Effect */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />

                <div className="flex-1 pr-4 z-10">
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-slate-100 text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    {item.badge}
                  </div>
                  <h4 className="text-base font-bold text-navy mb-1 font-display tracking-tight group-hover:text-primary transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-400 font-medium leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                <div className="text-right shrink-0 z-10">
                  <AnimatedCounter 
                    value={item.value} 
                    suffix={item.suffix} 
                    decimals={item.value % 1 !== 0 ? 1 : 0} 
                    delay={150 * idx} 
                    colorClass={item.colorClass} 
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>

      {/* Subtle Background grids or decorative items */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-primary/5 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
      <div className="absolute bottom-0 -right-20 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
    </section>
  );
};

// --- Working Animation Component ---
const WorkingAnimation = () => {
  const [activeTab, setActiveTab] = useState<"visual" | "metrics" | "tools">("visual");
  const [likesCount, setLikesCount] = useState(1240);
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Simulated live waveform heights representing video edit track levels
  const bars = [16, 28, 44, 24, 36, 48, 52, 40, 32, 20, 28, 44, 36, 12, 16, 24, 38, 48, 20, 32];

  const handleLike = () => {
    if (!isLiked) {
      setLikesCount(prev => prev + 1);
      setIsLiked(true);
    } else {
      setLikesCount(prev => prev - 1);
      setIsLiked(false);
    }
  };

  return (
    <div 
      className="relative w-full min-h-[460px] md:min-h-[500px] max-w-lg mx-auto flex items-center justify-center p-4 rounded-3xl overflow-visible"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Dynamic Background Mesh Gradients */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-blue-100/40 via-indigo-50/30 to-purple-100/40 rounded-3xl blur-xl" />
      
      {/* Glowing Moving Blobs */}
      <motion.div 
        animate={{ 
          scale: [1, 1.15, 0.95, 1],
          x: [0, 20, -15, 0],
          y: [0, -25, 20, 0]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-72 h-72 bg-gradient-to-tr from-primary/20 to-purple-400/20 rounded-full blur-3xl -z-10"
      />
      
      {/* Ultimate Creative Frame (Smartphone / Tablet Mockup with Glassmorphic Overlay) */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
        className="relative z-10 w-full bg-white/60 backdrop-blur-xl border border-white/50 rounded-3xl p-6 shadow-2xl shadow-indigo-100/50 flex flex-col gap-5 overflow-visible"
      >
        {/* Top Header of the Creative Module */}
        <div className="flex items-center justify-between border-b border-white pb-4">
          <div className="flex items-center gap-3">
            {/* Live Indicator Avatar */}
            <div className="relative">
              <span className="absolute -bottom-0.5 -right-0.5 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border border-white"></span>
              </span>
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-indigo-600 flex items-center justify-center text-white font-display font-black text-sm shadow-inner">
                N
              </div>
            </div>
            
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-bold text-navy font-display">@naveen.creatives</span>
                <span className="px-1.5 py-0.5 rounded bg-blue-50 text-[10px] font-bold text-primary uppercase">Pro</span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium font-sans">Digital Designer & SMM</p>
            </div>
          </div>

          {/* Micro Tabs */}
          <div className="flex bg-slate-100/80 p-0.5 rounded-full text-xs">
            {(["visual", "metrics", "tools"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 rounded-full font-bold transition-all capitalize ${activeTab === tab ? "bg-white text-primary shadow-sm scale-105" : "text-slate-500 hover:text-navy"}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area Based on Active Tab */}
        <div className="relative flex-1 min-h-[260px] flex flex-col justify-between">
          {activeTab === "visual" && (
            <motion.div 
              key="visual"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex-grow flex flex-col items-center justify-center gap-4 py-2"
            >
              {/* Animated Cinematic Instagram/Reel Style viewport */}
              <div className="relative w-44 h-44 rounded-full bg-gradient-to-tr from-pink-500 via-purple-600 to-indigo-600 p-[3px] shadow-xl group/avatar cursor-pointer">
                {/* Spinning holographic outer frame */}
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-[1px] rounded-full border-2 border-dashed border-white/60"
                />
                
                {/* Inside Image Frame */}
                <div className="relative w-full h-full rounded-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center">
                  {/* Subtle Grid Backdrop */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
                  
                  {/* Neon stylized avatar silhouette with customizable vector features */}
                  <svg className="w-10/12 h-10/12 text-white/95 drop-shadow-[0_0_12px_rgba(79,140,255,0.5)]" viewBox="0 0 100 100" fill="none">
                    <defs>
                      <linearGradient id="avatarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#4f8cff" />
                        <stop offset="100%" stopColor="#c084fc" />
                      </linearGradient>
                    </defs>
                    {/* Futuristic Headset lines */}
                    <circle cx="50" cy="50" r="30" stroke="url(#avatarGrad)" strokeWidth="1.5" className="animate-pulse" />
                    {/* Geometric face representation */}
                    <path d="M50 25C40 25 35 32 35 42C35 55 45 61 50 63C55 61 65 55 65 42C65 32 60 25 50 25Z" fill="url(#avatarGrad)" opacity="0.85" />
                    {/* Modern geometric glasses */}
                    <rect x="38" y="38" width="10" height="6" rx="2" fill="#ffffff" />
                    <rect x="52" y="38" width="10" height="6" rx="2" fill="#ffffff" />
                    <line x1="48" y1="41" x2="52" y2="41" stroke="#ffffff" strokeWidth="2" />
                    {/* Smiling line */}
                    <path d="M45 52 Q 50 55, 55 52" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
                    {/* Sparkles */}
                    <path d="M22 25 L 25 22 M25 25 L 22 22" stroke="#4f8cff" strokeWidth="1.5" />
                    <path d="M78 65 L 81 62 M81 65 L 78 62" stroke="#c084fc" strokeWidth="1.5" />
                  </svg>

                  {/* Glassmorphic Overlay bar showing "Naveen's Space" */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md py-1 px-3.5 rounded-full border border-white/20">
                    <p className="text-[10px] font-bold text-white tracking-widest uppercase font-mono">Creator Mode</p>
                  </div>
                </div>
              </div>

              {/* Dynamic Action Bar (Tap to cheer / Like) */}
              <div className="flex items-center gap-6 mt-1 bg-slate-50 border border-slate-100 py-2 px-5 rounded-full text-slate-700">
                <button 
                  onClick={handleLike}
                  className="flex items-center gap-2 group/btn cursor-pointer transition-transform active:scale-90"
                >
                  <motion.span
                    animate={isLiked ? { scale: [1, 1.4, 1] } : {}}
                    transition={{ duration: 0.3 }}
                  >
                    <svg className={`w-5 h-5 transition-colors ${isLiked ? "fill-rose-500 text-rose-500 animate-bounce" : "text-slate-400 group-hover/btn:text-rose-500 fill-transparent"}`} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </motion.span>
                  <span className={`text-xs font-bold ${isLiked ? "text-rose-500" : "text-slate-500"}`}>{likesCount} Claps</span>
                </button>
                <div className="h-4 w-[1px] bg-slate-200" />
                <div className="flex gap-1.5 items-center">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-xs font-bold text-navy font-mono">2026 Ready</span>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "metrics" && (
            <motion.div 
              key="metrics"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex-grow flex flex-col gap-4 py-3 justify-center"
            >
              {/* Interactive Performance Sparkline */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white p-5 rounded-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-2xl pointer-events-none" />
                
                <div className="flex justify-between items-start mb-3 z-10 relative">
                  <div>
                    <span className="text-[10px] font-bold text-primary uppercase tracking-widest font-mono">Organic Traction</span>
                    <h5 className="text-2xl font-black font-mono tracking-tight text-white mt-0.5">+482%</h5>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold flex items-center gap-1 border border-emerald-500/20">
                    <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" /> LIVE
                  </span>
                </div>

                {/* Animated Wave Sparkline using heights */}
                <div className="h-16 flex items-end gap-1 px-1 mt-4">
                  {[20, 35, 55, 45, 60, 40, 75, 90, 80, 95, 110, 85, 100, 115, 130, 120, 140, 150].map((h, i) => (
                    <motion.div
                      key={i}
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      transition={{ delay: i * 0.02, duration: 0.5 }}
                      style={{ height: `${(h / 150) * 100}%` }}
                      className="flex-1 bg-gradient-to-t from-primary/80 to-cyan-400 rounded-t-sm origin-bottom"
                    />
                  ))}
                </div>
                
                <p className="text-[10px] text-slate-400 font-medium mt-3 text-right">Updated just seconds ago</p>
              </div>

              {/* Audience Demographics pill */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl flex flex-col justify-between">
                  <span className="text-[10px] font-bold text-slate-400 uppercase font-mono">Retention Rate</span>
                  <span className="text-sm font-black text-navy font-mono">87.4% 🔥</span>
                </div>
                <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl flex flex-col justify-between">
                  <span className="text-[10px] font-bold text-slate-400 uppercase font-mono">Avg. CTR</span>
                  <span className="text-sm font-black text-navy font-mono">14.2% 📈</span>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "tools" && (
            <motion.div 
              key="tools"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex-grow flex flex-col gap-3 justify-center py-2"
            >
              <h5 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1 font-mono">Stack & Tech Suite</h5>
              
              <div className="grid grid-cols-2 gap-3.5">
                {[
                  { name: "Figma", level: "UI/UX & Graphics", color: "from-orange-500 to-pink-500", progress: 95 },
                  { name: "Premiere", level: "Video Reel Magic", color: "from-purple-600 to-indigo-600", progress: 90 },
                  { name: "CapCut Pro", level: "Hooks & Transitions", color: "from-teal-500 to-emerald-500", progress: 85 },
                  { name: "Framer", level: "Live Interactive Web", color: "from-blue-600 to-cyan-500", progress: 80 }
                ].map((tool, idx) => (
                  <div key={idx} className="bg-slate-50/70 border border-slate-100 p-3 rounded-xl transition-all hover:bg-slate-50/90 hover:scale-[1.03]">
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-xs font-bold text-navy">{tool.name}</span>
                      <span className="text-[9px] font-mono font-bold text-primary bg-blue-50 px-1 py-0.5 rounded">{tool.progress}%</span>
                    </div>
                    <div className="w-full h-1 bg-slate-200 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${tool.progress}%` }}
                        transition={{ delay: idx * 0.1, duration: 1 }}
                        className={`h-full bg-gradient-to-r ${tool.color}`}
                      />
                    </div>
                    <span className="text-[9px] font-semibold text-slate-400 block mt-1">{tool.level}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Animated Waveform footer (Mimicking audio/reels content editing) */}
          <div className="mt-4 border-t border-slate-100 pt-4 flex flex-col gap-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-400">Reel Edit Timeline: Active</span>
              <span className="font-mono text-[10px] text-primary font-bold">0:24s / 1:00s</span>
            </div>
            
            <div className="h-10 flex items-center justify-between gap-[3px] bg-slate-50/80 rounded-xl px-3 border border-slate-100 overflow-hidden">
              {/* Play symbol */}
              <button className="text-primary hover:scale-105 active:scale-95 transition-transform mr-1 shrink-0 cursor-pointer">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </button>
              
              <div className="flex-1 h-8 flex items-center gap-[2px] overflow-hidden">
                {bars.map((bar, idx) => (
                  <motion.div
                    key={idx}
                    animate={{ 
                      height: isHovered 
                        ? [bar, bar * (0.4 + Math.random() * 0.8), bar] 
                        : [bar, bar] 
                    }}
                    transition={{ duration: 1.2, repeat: Infinity, delay: idx * 0.04 }}
                    style={{ height: `${bar}%` }}
                    className="flex-grow rounded-full bg-primary/20 group-hover:bg-primary/40 transition-colors"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Floating Modern badges & interactive items outside smartphone boundaries to look ultra custom */}
      {/* 1. Reels Created floating badge */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-6 -left-6 z-20 bg-white border border-slate-100 p-3.5 rounded-2xl shadow-xl flex items-center gap-3 hover:scale-105 cursor-default transition-transform"
      >
        <div className="w-10 h-10 bg-pink-50 rounded-xl flex items-center justify-center text-pink-500">
          <Instagram size={20} />
        </div>
        <div>
          <span className="text-[10px] font-bold text-slate-400 uppercase font-mono">Engage</span>
          <p className="text-xs font-black text-navy leading-none mt-0.5">Viral Copy</p>
        </div>
      </motion.div>

      {/* 2. Custom 3D-effect dynamic design token badge on the right boundary */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-6 -right-6 z-20 bg-navy text-white p-3.5 rounded-2xl shadow-xl border border-slate-800 flex items-center gap-3 hover:scale-105 cursor-default transition-transform"
      >
        <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-[#ffda44]">
          <span className="text-base font-black">⚡</span>
        </div>
        <div>
          <span className="text-[10px] font-bold text-slate-400 uppercase font-mono">Live Web</span>
          <p className="text-xs font-black text-white leading-none mt-0.5">8+ Live Sites</p>
        </div>
      </motion.div>
    </div>
  );
};

// --- About Section ---
const About = () => {
  const words = [
    "Social Media Manager",
    "Digital Marketing",
    "Website Designer",
    "Digital Designer"
  ];
  
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [words.length]);

  const cards = [
    {
      title: "Content Strategy",
      desc: "Planning content that drives engagement.",
      icon: <Layers size={24} />,
      bg: "bg-blue-500/10 text-primary border-blue-500/10",
      glow: "rgba(79, 140, 255, 0.15)"
    },
    {
      title: "Reels Production",
      desc: "Editing short-form videos for social growth.",
      icon: <Video size={24} />,
      bg: "bg-pink-500/10 text-pink-500 border-pink-500/10",
      glow: "rgba(244, 63, 94, 0.15)"
    },
    {
      title: "Creative Branding",
      desc: "Building consistent visual brand experiences.",
      icon: <Palette size={24} />,
      bg: "bg-violet-500/10 text-violet-500 border-violet-500/10",
      glow: "rgba(139, 92, 246, 0.15)"
    },
    {
      title: "Digital Presence",
      desc: "Helping brands grow across digital platforms.",
      icon: <ExternalLink size={24} />,
      bg: "bg-emerald-500/10 text-emerald-500 border-emerald-500/10",
      glow: "rgba(16, 185, 129, 0.15)"
    }
  ];

  return (
    <section id="about" className="py-20 md:py-28 px-6 md:px-12 lg:px-24 bg-slate-50 relative overflow-hidden">
      {/* Subtle designer background mesh grids and accents */}
      <div className="absolute top-0 left-1/4 w-[1px] h-full bg-slate-200/50 -z-10" />
      <div className="absolute top-0 left-2/4 w-[1px] h-full bg-slate-200/50 -z-10" />
      <div className="absolute top-0 left-3/4 w-[1px] h-full bg-slate-200/50 -z-10" />
      <div className="absolute right-12 top-24 w-40 h-40 rounded-full border border-slate-200/60 -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="w-full"
        >
          {/* Fully Centered Designer Header Layout */}
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 relative z-10">
            <span className="text-xs uppercase tracking-[0.25em] text-primary font-bold mb-4 bg-blue-50/80 px-4 py-1.5 rounded-full border border-blue-100 inline-block select-none shadow-sm/50">
              Who I Am
            </span>
            
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-navy tracking-tight leading-tight">
              I’m Naveen Raja, a
            </h3>
            
            {/* Premium Standalone Centered Dynamic Word Box */}
            <div className="mt-4 w-full max-w-xl bg-gradient-to-r from-blue-50/80 to-indigo-50/30 border border-blue-100/60 p-4 md:p-5 rounded-2xl shadow-sm relative overflow-hidden flex items-center justify-center gap-4 group hover:border-primary/20 transition-all duration-300">
              <div className="absolute top-0 right-0 p-2 opacity-20 group-hover:opacity-40 transition-opacity">
                <Sparkles size={16} className="text-primary animate-pulse" />
              </div>
              <div className="w-2 md:w-2.5 h-10 md:h-12 bg-primary rounded-full shrink-0 shadow-sm" />
              
              {/* Width balanced container with centered alignment */}
              <div className="relative h-10 md:h-12 flex items-center justify-center min-w-[240px] sm:min-w-[300px] md:min-w-[380px] w-full text-center">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentWordIndex}
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 10, opacity: 0 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="absolute text-primary font-black text-xl sm:text-2xl md:text-3xl tracking-tight select-none text-center leading-none"
                  >
                    {words[currentWordIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Premium Glass UI Cards in Single Row (4 columns on desktop) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-7xl mx-auto">
            {cards.map((card, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.08 * idx }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="relative overflow-hidden rounded-2xl bg-white/50 backdrop-blur-md border border-slate-100 p-6 md:p-8 shadow-sm transition-all duration-300 flex flex-col items-center text-center group hover:bg-white hover:border-primary/20 hover:shadow-xl cursor-default"
              >
                {/* Advanced Micro Glow Backlit Light */}
                <div 
                  className="absolute -top-12 -right-12 w-24 h-24 rounded-full blur-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
                  style={{ backgroundColor: card.glow }}
                />

                {/* Subtle Dots Pattern on the inner background */}
                <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none group-hover:opacity-20 transition-opacity" />

                {/* Corner Crosshair/Alignment Marks for UI designer look */}
                <span className="absolute top-3 left-3 text-[10px] text-slate-300 group-hover:text-primary transition-colors font-mono font-bold select-none">[</span>
                <span className="absolute top-3 right-3 text-[10px] text-slate-300 group-hover:text-primary transition-colors font-mono font-bold select-none">]</span>
                <span className="absolute bottom-3 left-3 text-[10px] text-slate-300 group-hover:text-primary transition-colors font-mono font-bold select-none">+</span>
                <span className="absolute bottom-3 right-3 text-[10px] text-slate-300 group-hover:text-primary transition-colors font-mono font-bold select-none">+</span>

                {/* Infinite Floating Icon with background container */}
                <motion.div
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: idx * 0.2 }}
                  className={`p-4 rounded-xl ${card.bg} border mb-5 flex items-center justify-center shrink-0 shadow-sm`}
                >
                  {card.icon}
                </motion.div>

                {/* Glass Card Title */}
                <h4 className="text-base font-bold text-navy font-display mb-2 group-hover:text-primary transition-colors leading-tight">
                  {card.title}
                </h4>

                {/* Card Description */}
                <p className="text-xs text-slate-400 font-medium leading-relaxed">
                  {card.desc}
                </p>

                {/* Tech Line Bar Slider that fills on hover */}
                <div className="w-full h-[2px] bg-slate-100 rounded-full mt-6 overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: idx * 0.1 }}
                    className="h-full bg-gradient-to-r from-primary to-blue-400 origin-left"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// --- Services Section ---
const Services = () => {
  const [openModalId, setOpenModalId] = useState<string | null>(null);

  const checkMark = (
    <motion.span 
      initial={{ scale: 0.8 }}
      whileInView={{ scale: 1 }}
      className="text-emerald-500 font-bold bg-emerald-50 rounded-full w-5 h-5 flex items-center justify-center text-[10px] shrink-0 border border-emerald-100"
    >
      ✓
    </motion.span>
  );

  return (
    <section id="services" className="py-20 md:py-28 bg-slate-50 px-6 md:px-12 lg:px-24 relative overflow-hidden">
      {/* Subtle modern alignment grids for UI designer motif */}
      <div className="absolute top-0 left-1/4 w-[1px] h-full bg-slate-200/40 -z-10 pointer-events-none" />
      <div className="absolute top-0 left-3/4 w-[1px] h-full bg-slate-200/40 -z-10 pointer-events-none" />
      <div className="absolute top-1/4 left-0 right-0 h-[1px] bg-slate-200/40 -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* Left Side: Sticky Texts Column */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-6">
            <span className="text-xs uppercase tracking-[0.2em] text-primary font-bold mb-3 inline-block bg-blue-50 px-3.5 py-1 rounded-full border border-blue-100 shadow-sm/30 select-none">
              What I Do
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-navy tracking-tight leading-tight">
              Helping Brands Build Their Digital Presence
            </h2>
            <div className="h-1 w-16 bg-primary rounded-full" />
            <p className="text-slate-500 text-sm md:text-base font-semibold leading-relaxed">
              From dynamic content strategy and creative design to trend-focused reels editing and robust social media management, I help businesses craft highly engaging content that grows their reach and builds a consistent, trustworthy online identity.
            </p>
            <div className="hidden lg:block pt-6">
              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block mb-2">Explore details below</span>
              <div className="flex gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-400/40 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-400/40 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-purple-400/40 inline-block" />
              </div>
            </div>
          </div>

          {/* Right Side: 2x2 Grid Layout of engaging cards */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-stretch">
              {[
                {
                  id: 1,
                  badge: "📈 SOCIAL GROWTH",
                  title: "Social Media Management",
                  desc: "Plan, publish, and manage content that builds brand awareness and consistent audience growth.",
                  services: ["Content Strategy", "Content Calendar", "Community Mgmt", "Caption Writing"],
                  statValue: 50,
                  statSuffix: "+",
                  statLabel: "Campaigns & Content",
                  statIcon: "📊",
                  icon: <Smartphone size={20} />,
                  badgeBg: "bg-blue-50 text-blue-600 border-blue-100",
                  modalId: "Social Media Management"
                },
                {
                  id: 2,
                  badge: "🎥 SHORT-FORM CONTENT",
                  title: "Reels & Video Editing",
                  desc: "Create engaging short-form videos and Reels designed to capture attention and boost reach.",
                  services: ["Reels Editing", "Video Storytelling", "Trend Content", "Mobile Video"],
                  statValue: 60,
                  statSuffix: "+",
                  statLabel: "Videos Edited",
                  statIcon: "🎬",
                  icon: <Film size={20} />,
                  badgeBg: "bg-rose-50 text-rose-600 border-rose-100",
                  modalId: "Video Editing"
                },
                {
                  id: 3,
                  badge: "🎨 VISUAL BRANDING",
                  title: "Creative Design",
                  desc: "Design professional social media posts, promotional art, and consistent branded assets.",
                  services: ["Social Creatives", "Posters & Brochures", "Brand Visuals", "Carousel Design"],
                  statValue: 90,
                  statSuffix: "+",
                  statLabel: "Designs Created",
                  statIcon: "🎨",
                  icon: <Palette size={20} />,
                  badgeBg: "bg-emerald-50 text-emerald-600 border-emerald-100",
                  modalId: "Digital & Creative Design"
                },
                {
                  id: 4,
                  badge: "🌐 DIGITAL EXPERIENCE",
                  title: "Landing Pages & Sites",
                  desc: "Design responsive landing pages and portfolios that improve online presence and campaigns.",
                  services: ["Responsive Design", "Portfolio Sites", "Landing Pages", "UI Prototypes"],
                  statValue: 8,
                  statSuffix: "+",
                  statLabel: "Projects Delivered",
                  statIcon: "🌐",
                  icon: <Globe size={20} />,
                  badgeBg: "bg-purple-50 text-purple-600 border-purple-100",
                  modalId: "Website Design"
                }
              ].map((card) => (
                <motion.div 
                  key={card.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: card.id * 0.05 }}
                  whileHover={{ y: -8, transition: { duration: 0.2, ease: "easeOut" } }}
                  className="bg-white hover:bg-white/95 border border-slate-100 hover:border-primary/40 p-6 rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden flex flex-col justify-between group cursor-default"
                >
                  <div className="absolute top-3 left-3 text-[8px] text-slate-300 group-hover:text-primary transition-colors font-mono select-none font-bold">[{String(card.id).padStart(2, '0')}]</div>
                  <div className="absolute -top-10 -right-10 w-24 h-24 bg-primary/5 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div>
                    {/* Header Action Row */}
                    <div className="flex justify-between items-center mb-4 mt-2">
                      <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-600 border border-slate-100 group-hover:scale-110 group-hover:text-primary group-hover:bg-primary/5 group-hover:border-primary/20 transition-all duration-300">
                        {card.icon}
                      </div>
                      
                      <button 
                        onClick={() => setOpenModalId(card.modalId)}
                        className="text-[10px] font-bold text-slate-400 hover:text-primary hover:bg-primary/5 hover:border-primary/20 transition-all py-1 px-3 bg-slate-50/60 border border-slate-100 rounded-full cursor-pointer shadow-sm select-none"
                      >
                        Details
                      </button>
                    </div>

                    {/* Badge Tag */}
                    <div className="mb-3">
                      <span className={`text-[9px] font-bold uppercase tracking-wider px-2.5 py-0.75 rounded-full border ${card.badgeBg} inline-block`}>
                        {card.badge}
                      </span>
                    </div>

                    {/* Title & Desc */}
                    <h3 className="text-base font-display font-black text-navy mb-1 tracking-tight">
                      {card.title}
                    </h3>
                    <p className="text-slate-500 text-[11px] mb-4 font-semibold leading-relaxed min-h-[44px]">
                      {card.desc}
                    </p>

                    {/* Rounded pills/tags instead of checklist */}
                    <div className="flex flex-wrap gap-1 mb-6">
                      {card.services.map((svc, idx) => (
                        <span 
                          key={idx} 
                          className="text-[9px] font-bold text-slate-500 bg-slate-100/60 border border-slate-200/40 px-2 py-0.5 rounded-full hover:bg-primary/5 hover:text-primary hover:border-primary/20 transition-all duration-200 select-none"
                        >
                          {svc}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Metric Footer */}
                  <div className="border-t border-slate-100 pt-4 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 group-hover:scale-110 group-hover:bg-primary/5 group-hover:text-primary transition-all duration-300 shrink-0">
                      <span className="text-xs">{card.statIcon}</span>
                    </div>
                    <div>
                      <h4 className="text-base font-black font-mono tracking-tight text-navy leading-none">
                        <AnimatedCounter value={card.statValue} suffix={card.statSuffix} colorClass="text-navy group-hover:text-primary transition-colors" />
                      </h4>
                      <p className="text-[9px] font-bold text-slate-400 mt-0.5">{card.statLabel}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>

        {/* Tools Section - Auto Scrolling Marquee */}
        <div className="mt-20 md:mt-24">
          <div className="text-center mb-10">
            <h4 className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em] mb-2 font-mono">My Creative Toolkit</h4>
            <div className="h-0.5 w-12 bg-primary mx-auto"></div>
          </div>
          
          <div className="relative overflow-hidden w-full py-4">
            {/* Gradient Overlays for smooth edges */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10"></div>
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10"></div>
            
            <motion.div 
              className="flex whitespace-nowrap gap-8 md:gap-12 w-fit"
              animate={{ x: [0, -1000] }}
              transition={{ 
                duration: 25, 
                repeat: Infinity, 
                ease: "linear" 
              }}
            >
              {[
                { name: "Figma", img: "https://artificial-amber-gp5uouqxoc.edgeone.app/figma%20icon.png" },
                { name: "Canva", img: "https://expensive-rose-l0ddo0le1o.edgeone.app/canva%20icon.png" },
                { name: "Inshot", img: "https://shocked-gold-hpsfu1svv3.edgeone.app/Inshot%20icon.png" },
                { name: "Videography", icon: <Video size={20} />, color: "text-red-500", bg: "bg-red-50" },
                { name: "Photography", icon: <Camera size={20} />, color: "text-sky-500", bg: "bg-sky-50" },
                { name: "Video Shoot", icon: <Film size={20} />, color: "text-purple-500", bg: "bg-purple-50" },
                { name: "Lightroom", img: "https://relevant-fuchsia-ztsw7kvcyc.edgeone.app/lightroom%20icon.png" },
                { name: "Notion", icon: <FileText size={20} />, color: "text-slate-700", bg: "bg-slate-100" },
                { name: "CapCut", img: "https://abstract-plum-kls1whh7.edgeone.app/Capcut-icon.png" },
                { name: "Facebook Meta", img: "https://separate-beige-6ponwx2u.edgeone.app/meta-social-network-emblem-blue-stylish-letter-m-or-mobius-band-vector.jpg" },
                // Double for seamless loop
                { name: "Figma", img: "https://artificial-amber-gp5uouqxoc.edgeone.app/figma%20icon.png" },
                { name: "Canva", img: "https://expensive-rose-l0ddo0le1o.edgeone.app/canva%20icon.png" },
                { name: "Inshot", img: "https://shocked-gold-hpsfu1svv3.edgeone.app/Inshot%20icon.png" },
                { name: "Videography", icon: <Video size={20} />, color: "text-red-500", bg: "bg-red-50" },
                { name: "Photography", icon: <Camera size={20} />, color: "text-sky-500", bg: "bg-sky-50" },
                { name: "Video Shoot", icon: <Film size={20} />, color: "text-purple-500", bg: "bg-purple-50" },
                { name: "Lightroom", img: "https://relevant-fuchsia-ztsw7kvcyc.edgeone.app/lightroom%20icon.png" },
                { name: "Notion", icon: <FileText size={20} />, color: "text-slate-700", bg: "bg-slate-100" },
                { name: "CapCut", img: "https://abstract-plum-kls1whh7.edgeone.app/Capcut-icon.png" },
                { name: "Facebook Meta", img: "https://separate-beige-6ponwx2u.edgeone.app/meta-social-network-emblem-blue-stylish-letter-m-or-mobius-band-vector.jpg" },
                // Triple for extra safety on wide screens
                { name: "Figma", img: "https://artificial-amber-gp5uouqxoc.edgeone.app/figma%20icon.png" },
                { name: "Canva", img: "https://expensive-rose-l0ddo0le1o.edgeone.app/canva%20icon.png" },
                { name: "Inshot", img: "https://shocked-gold-hpsfu1svv3.edgeone.app/Inshot%20icon.png" },
                { name: "Videography", icon: <Video size={20} />, color: "text-red-500", bg: "bg-red-50" },
                { name: "Photography", icon: <Camera size={20} />, color: "text-sky-500", bg: "bg-sky-50" },
                { name: "Video Shoot", icon: <Film size={20} />, color: "text-purple-500", bg: "bg-purple-50" },
                { name: "Lightroom", img: "https://relevant-fuchsia-ztsw7kvcyc.edgeone.app/lightroom%20icon.png" },
                { name: "Notion", icon: <FileText size={20} />, color: "text-slate-700", bg: "bg-slate-100" },
                { name: "CapCut", img: "https://abstract-plum-kls1whh7.edgeone.app/Capcut-icon.png" },
                { name: "Facebook Meta", img: "https://separate-beige-6ponwx2u.edgeone.app/meta-social-network-emblem-blue-stylish-letter-m-or-mobius-band-vector.jpg" },
              ].map((tool: any, index) => (
                <div 
                  key={index} 
                  className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-white border border-slate-100 shadow-sm hover:border-primary/30 transition-colors group cursor-default"
                >
                  <div className={`w-10 h-10 rounded-lg ${tool.bg || 'bg-slate-50'} ${tool.color || 'text-navy'} flex items-center justify-center group-hover:scale-110 transition-transform overflow-hidden`}>
                    {tool.img ? (
                      <img src={tool.img} alt={tool.name} className="w-full h-full object-contain p-1.5" referrerPolicy="no-referrer" />
                    ) : (
                      tool.icon
                    )}
                  </div>
                  <span className="text-sm font-bold text-navy uppercase tracking-wider">{tool.name}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

      {/* Modals */}
      {openModalId === "Social Media Management" && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpenModalId(null)}
            className="absolute inset-0 bg-navy/60 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
          >
            <div className="p-6 md:p-10 overflow-y-auto custom-scrollbar">
              <button 
                onClick={() => setOpenModalId(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors text-slate-500 hover:text-navy"
              >
                <X size={20} />
              </button>

              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-2xl bg-pink-50 flex items-center justify-center text-pink-500">
                  <Instagram size={32} />
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-navy">Social Media Management</h3>
                  <p className="text-primary font-bold text-sm uppercase tracking-widest">Instagram Growth & Strategy</p>
                </div>
              </div>

              <div className="space-y-8">
                <div className="space-y-4 text-slate-600 leading-relaxed">
                  <p>I help brands build a strong and consistent presence across Facebook and Instagram through strategic content, creative design, and data-driven growth techniques.</p>
                  <p>From planning content calendars to creating engaging reels, page handling, and growing your audience, I manage everything needed. I also handle the full Facebook Meta Suite, run targeted ad campaigns, and generate high-quality leads for your business.</p>
                </div>

                <div>
                  <h4 className="text-lg font-bold text-navy mb-4 flex items-center gap-2">🚀 What I Do</h4>
                  <ul className="grid sm:grid-cols-2 gap-3">
                    {[
                      "Content Planning & Strategy",
                      "Daily Post & Stories Scheduling",
                      "Instagram Reels & Facebook Videos",
                      "Facebook Meta Suite Management",
                      "Meta Ad Campaigns Setup & Run",
                      "Business Lead Generation"
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100">
                        <CheckCircle2 size={16} className="text-green-500 shrink-0" />
                        <span className="text-sm font-medium text-slate-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid sm:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-bold text-navy mb-4 flex items-center gap-2">📈 Expected Results</h4>
                    <ul className="space-y-2">
                      {[
                        "Increased engagement & reach",
                        "Consistent brand presence",
                        "Better audience connection",
                        "Growth in followers & visibility",
                        "Professional & attractive feed"
                      ].map((item) => (
                        <li key={item} className="flex items-center gap-2 text-sm text-slate-600">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-navy mb-4 flex items-center gap-2">🎯 Who This Is For</h4>
                    <ul className="space-y-2">
                      {[
                        "Clinics & healthcare brands",
                        "Real estate businesses",
                        "Personal brands",
                        "Small businesses & startups"
                      ].map((item) => (
                        <li key={item} className="flex items-center gap-2 text-sm text-slate-600">
                          <div className="w-1.5 h-1.5 rounded-full bg-navy shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="bg-navy p-6 rounded-2xl text-white">
                  <h4 className="font-bold mb-2 flex items-center gap-2">💼 My Approach</h4>
                  <p className="text-sm text-white/80 leading-relaxed">I focus on creating content that is not just visually appealing, but also strategic and result-driven — helping your brand stand out and grow consistently.</p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div>
                    <p className="text-slate-500 text-sm font-medium">👉 Let's grow your brand together</p>
                    <p className="text-navy font-bold">Contact me or DM me today!</p>
                  </div>
                  <div className="flex gap-3 w-full sm:w-auto">
                    <a 
                      href="#contact" 
                      onClick={() => setOpenModalId(null)}
                      className="flex-1 sm:flex-initial bg-primary text-white px-6 py-3 rounded-xl font-bold text-center hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                    >
                      Contact Me
                    </a>
                    <a 
                      href="https://wa.me/6385941180"
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 sm:flex-initial bg-[#25D366] text-white px-6 py-3 rounded-xl font-bold text-center hover:opacity-90 transition-all shadow-lg"
                    >
                      WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {openModalId === "Website Design" && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpenModalId(null)}
            className="absolute inset-0 bg-navy/60 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
          >
            <div className="p-6 md:p-10 overflow-y-auto custom-scrollbar">
              <button 
                onClick={() => setOpenModalId(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors text-slate-500 hover:text-navy"
              >
                <X size={20} />
              </button>

              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-2xl bg-cyan-50 flex items-center justify-center text-cyan-500">
                  <Layout size={32} />
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-navy">Website Design</h3>
                  <p className="text-primary font-bold text-sm uppercase tracking-widest">UI/UX & Custom Development</p>
                </div>
              </div>

              <div className="space-y-8">
                <div className="space-y-4 text-slate-600 leading-relaxed">
                  <p>I design and develop modern, user-focused websites that help your business stand out online. From UI/UX design to live deployment, I handle the complete process to deliver a clean, responsive, and professional website experience.</p>
                </div>

                <div>
                  <h4 className="text-lg font-bold text-navy mb-4 flex items-center gap-2">🚀 What I Do</h4>
                  <ul className="grid sm:grid-cols-2 gap-3">
                    {[
                      "UI/UX Design",
                      "Custom Website Development",
                      "Landing Page Design",
                      "Website Optimization",
                      "Hosting & Deployment Setup",
                      "Design Consistency"
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100">
                        <CheckCircle2 size={16} className="text-green-500 shrink-0" />
                        <span className="text-sm font-medium text-slate-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid sm:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-bold text-navy mb-4 flex items-center gap-2">📈 Expected Results</h4>
                    <ul className="space-y-2">
                      {[
                        "Professional online presence",
                        "Better user experience & navigation",
                        "Increased credibility and trust",
                        "Mobile-friendly and responsive design",
                        "Improved conversions and engagement"
                      ].map((item) => (
                        <li key={item} className="flex items-center gap-2 text-sm text-slate-600">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-navy mb-4 flex items-center gap-2">🎯 Who This Is For</h4>
                    <ul className="space-y-2">
                      {[
                        "Clinics & healthcare websites",
                        "Real estate businesses",
                        "Personal brands & portfolios",
                        "Startups & small businesses"
                      ].map((item) => (
                        <li key={item} className="flex items-center gap-2 text-sm text-slate-600">
                          <div className="w-1.5 h-1.5 rounded-full bg-navy shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="bg-navy p-6 rounded-2xl text-white">
                  <h4 className="font-bold mb-2 flex items-center gap-2">💼 My Approach</h4>
                  <p className="text-sm text-white/80 leading-relaxed">I focus on creating websites that are not just visually appealing but also functional, fast, and conversion-driven, ensuring your visitors turn into customers.</p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div>
                    <p className="text-slate-500 text-sm font-medium">👉 Let's build your website</p>
                    <p className="text-navy font-bold">Contact me or DM me today!</p>
                  </div>
                  <div className="flex gap-3 w-full sm:w-auto">
                    <a 
                      href="#contact" 
                      onClick={() => setOpenModalId(null)}
                      className="flex-1 sm:flex-initial bg-primary text-white px-6 py-3 rounded-xl font-bold text-center hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                    >
                      Contact Me
                    </a>
                    <a 
                      href="https://wa.me/6385941180"
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 sm:flex-initial bg-[#25D366] text-white px-6 py-3 rounded-xl font-bold text-center hover:opacity-90 transition-all shadow-lg"
                    >
                      WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
      {openModalId === "Video Editing" && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpenModalId(null)}
            className="absolute inset-0 bg-navy/60 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
          >
            <div className="p-6 md:p-10 overflow-y-auto custom-scrollbar">
              <button 
                onClick={() => setOpenModalId(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors text-slate-500 hover:text-navy"
              >
                <X size={20} />
              </button>

              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center text-red-500">
                  <Video size={32} />
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-navy">Videography & Video Editing</h3>
                  <p className="text-primary font-bold text-sm uppercase tracking-widest">Complete Video Production</p>
                </div>
              </div>

              <div className="space-y-8">
                <div className="space-y-4 text-slate-600 leading-relaxed">
                  <p>I produce and edit high-impact video content tailored for social media, corporate branding, and promotional campaigns. In addition to high-end post-editing, I handle independent on-site camera shoots, professional videography, and staging photography to bring projects to life from ground up.</p>
                </div>

                <div>
                  <h4 className="text-lg font-bold text-navy mb-4 flex items-center gap-2">🚀 What I Do</h4>
                  <ul className="grid sm:grid-cols-2 gap-3">
                    {[
                      "Independent Video Shoots",
                      "Professional Videography",
                      "Creative Photography",
                      "Reels & Shorts Editing",
                      "Promotional Videos",
                      "Real Estate Video Production",
                      "Business & Brand Videos",
                      "Sound Design & Trends"
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100">
                        <CheckCircle2 size={16} className="text-green-500 shrink-0" />
                        <span className="text-sm font-medium text-slate-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid sm:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-bold text-navy mb-4 flex items-center gap-2">📈 Expected Results</h4>
                    <ul className="space-y-2">
                      {[
                        "Higher engagement and reach",
                        "Better audience retention",
                        "More shares and saves",
                        "Strong visual storytelling",
                        "Professional brand presence"
                      ].map((item) => (
                        <li key={item} className="flex items-center gap-2 text-sm text-slate-600">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-navy mb-4 flex items-center gap-2">🎯 Who This Is For</h4>
                    <ul className="space-y-2">
                      {[
                        "Social media brands & creators",
                        "Real estate businesses",
                        "Clinics & service-based brands",
                        "Startups & small businesses"
                      ].map((item) => (
                        <li key={item} className="flex items-center gap-2 text-sm text-slate-600">
                          <div className="w-1.5 h-1.5 rounded-full bg-navy shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="bg-navy p-6 rounded-2xl text-white">
                  <h4 className="font-bold mb-2 flex items-center gap-2">💼 My Approach</h4>
                  <p className="text-sm text-white/80 leading-relaxed">I focus on creating videos that are not just visually appealing but also optimized for attention, engagement, and performance — helping your content stand out in a crowded feed.</p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div>
                    <p className="text-slate-500 text-sm font-medium">👉 Let's create impactful videos</p>
                    <p className="text-navy font-bold">Contact me or DM me today!</p>
                  </div>
                  <div className="flex gap-3 w-full sm:w-auto">
                    <a 
                      href="#contact" 
                      onClick={() => setOpenModalId(null)}
                      className="flex-1 sm:flex-initial bg-primary text-white px-6 py-3 rounded-xl font-bold text-center hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                    >
                      Contact Me
                    </a>
                    <a 
                      href="https://wa.me/6385941180"
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 sm:flex-initial bg-[#25D366] text-white px-6 py-3 rounded-xl font-bold text-center hover:opacity-90 transition-all shadow-lg"
                    >
                      WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
      {openModalId === "Digital & Creative Design" && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpenModalId(null)}
            className="absolute inset-0 bg-navy/60 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
          >
            <div className="p-6 md:p-10 overflow-y-auto custom-scrollbar">
              <button 
                onClick={() => setOpenModalId(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors text-slate-500 hover:text-navy"
              >
                <X size={20} />
              </button>

              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-500">
                  <Palette size={32} />
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-navy">Digital & Creative Design</h3>
                  <p className="text-primary font-bold text-sm uppercase tracking-widest">Brand Identity & Visuals</p>
                </div>
              </div>

              <div className="space-y-8">
                <div className="space-y-4 text-slate-600 leading-relaxed">
                  <p>I create visually compelling designs that elevate your brand identity across digital and print platforms. From social media creatives to complete branding materials, every design is crafted to be clean, modern, and aligned with your brand vision.</p>
                </div>

                <div>
                  <h4 className="text-lg font-bold text-navy mb-4 flex items-center gap-2">🚀 What I Do</h4>
                  <ul className="grid sm:grid-cols-2 gap-3">
                    {[
                      "Social Media Creatives",
                      "Posters & Marketing Materials",
                      "Branding Visuals",
                      "Business & Corporate Designs",
                      "PDF & Presentation Design",
                      "Custom Design Solutions"
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100">
                        <CheckCircle2 size={16} className="text-green-500 shrink-0" />
                        <span className="text-sm font-medium text-slate-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid sm:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-bold text-navy mb-4 flex items-center gap-2">📈 Expected Results</h4>
                    <ul className="space-y-2">
                      {[
                        "Strong and consistent brand identity",
                        "Professional and premium visual appeal",
                        "Better audience engagement",
                        "Improved brand recognition",
                        "Clean and modern design presence"
                      ].map((item) => (
                        <li key={item} className="flex items-center gap-2 text-sm text-slate-600">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-navy mb-4 flex items-center gap-2">🎯 Who This Is For</h4>
                    <ul className="space-y-2">
                      {[
                        "Businesses & startups",
                        "Clinics & healthcare brands",
                        "Real estate companies",
                        "Personal brands & professionals"
                      ].map((item) => (
                        <li key={item} className="flex items-center gap-2 text-sm text-slate-600">
                          <div className="w-1.5 h-1.5 rounded-full bg-navy shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="bg-navy p-6 rounded-2xl text-white">
                  <h4 className="font-bold mb-2 flex items-center gap-2">💼 My Approach</h4>
                  <p className="text-sm text-white/80 leading-relaxed">I focus on creating designs that are not just visually attractive but also purpose-driven, ensuring every element supports your brand communication and marketing goals.</p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div>
                    <p className="text-slate-500 text-sm font-medium">👉 Let's design your brand identity</p>
                    <p className="text-navy font-bold">Contact me or DM me today!</p>
                  </div>
                  <div className="flex gap-3 w-full sm:w-auto">
                    <a 
                      href="#contact" 
                      onClick={() => setOpenModalId(null)}
                      className="flex-1 sm:flex-initial bg-primary text-white px-6 py-3 rounded-xl font-bold text-center hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                    >
                      Contact Me
                    </a>
                    <a 
                      href="https://wa.me/6385941180"
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 sm:flex-initial bg-[#25D366] text-white px-6 py-3 rounded-xl font-bold text-center hover:opacity-90 transition-all shadow-lg"
                    >
                      WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      </div>
    </section>
  );
};

// --- Experience Section ---
const Experience = () => {
  const tools = [
    "Canva",
    "Meta Business Suite",
    "CapCut",
    "ChatGPT",
    "Instagram",
    "Facebook",
    "Google Workspace"
  ];

  const responsibilities = [
    "Planned and managed monthly content calendars aligned with marketing campaigns and business goals.",
    "Created social media posts, promotional creatives, brochures, carousels, and branded marketing materials while maintaining visual consistency.",
    "Developed content ideas, wrote engaging captions, and managed Instagram and Facebook through consistent publishing and audience engagement.",
    "Created and edited Instagram Reels and short-form videos to improve engagement and strengthen brand presence.",
    "Supported digital marketing by monitoring Meta Business Suite insights, reviewing content performance, and assisting campaign execution.",
    "Collaborated on promotional campaigns, seasonal content, and awareness initiatives across social media platforms."
  ];

  return (
    <section id="experience" className="py-16 md:py-20 px-6 md:px-12 lg:px-24 bg-white text-slate-800 overflow-hidden relative border-t border-slate-100">
      {/* Subtle blue radial gradients for modern high-end look */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-100/30 rounded-full blur-[130px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-10 w-[500px] h-[500px] bg-indigo-50/40 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-3.5"
          >
            <span className="text-xs uppercase tracking-[0.25em] text-primary font-bold bg-blue-50 px-4 py-1.5 rounded-full border border-blue-100 inline-block shadow-sm/50">
              MY EXPERIENCE
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-black text-navy tracking-tight leading-tight md:whitespace-nowrap">
              Real Client Experience & Brand Growth
            </h2>
            <p className="text-slate-500 text-sm md:text-base font-semibold max-w-2xl mx-auto leading-relaxed">
              Helping healthcare brands strengthen their digital presence through strategic content planning, creative design, and consistent social media management.
            </p>
          </motion.div>
        </div>

        {/* Case Study Container */}
        <div className="space-y-6">
          
          {/* Main Case Study Bento Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white/80 backdrop-blur-md border border-slate-200/60 p-5 md:p-6 lg:p-8 rounded-[2rem] shadow-xl hover:shadow-2xl transition-all duration-300 group hover:-translate-y-1"
          >
            {/* Header Area of the Case Study */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-slate-100">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center overflow-hidden p-2 shadow-sm">
                  <img 
                    src="https://image2url.com/r2/default/images/1775567270735-9f31738c-e14f-443e-bc63-25dc45697c09.png" 
                    alt="Apollo Dental Clinic" 
                    className="w-full h-full object-contain" 
                    referrerPolicy="no-referrer" 
                  />
                </div>
                <div>
                  <span className="text-[9px] font-mono font-bold text-primary uppercase tracking-wider bg-blue-50 border border-blue-100/50 px-2.5 py-0.5 rounded-full">
                    Active Client Partner
                  </span>
                  <h3 className="text-xl md:text-2xl font-display font-black text-navy mt-0.5 tracking-tight">
                    Apollo Dental Clinic
                  </h3>
                </div>
              </div>

              {/* Recruitment Meta Information */}
              <div className="flex flex-wrap items-center gap-3 text-[11px]">
                <div className="bg-slate-50 border border-slate-100 rounded-xl px-3 py-1.5 flex items-center gap-2">
                  <Briefcase size={12} className="text-primary" />
                  <div>
                    <p className="text-[8px] text-slate-400 font-bold uppercase leading-none">Role</p>
                    <p className="font-bold text-navy mt-0.5">Social Media Manager & Content Creator</p>
                  </div>
                </div>
                
                <div className="bg-slate-50 border border-slate-100 rounded-xl px-3 py-1.5 flex items-center gap-2">
                  <Globe size={12} className="text-emerald-500" />
                  <div>
                    <p className="text-[8px] text-slate-400 font-bold uppercase leading-none">Type</p>
                    <p className="font-bold text-navy mt-0.5">Remote</p>
                  </div>
                </div>

                <div className="bg-slate-50 border border-slate-100 rounded-xl px-3 py-1.5 flex items-center gap-2">
                  <Calendar size={12} className="text-purple-500" />
                  <div>
                    <p className="text-[8px] text-slate-400 font-bold uppercase leading-none">Duration</p>
                    <p className="font-bold text-navy mt-0.5">Nov 2024 – Jun 2026</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Grid for Storytelling: Overview, Platforms, Responsibilities, Impact */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 pt-5">
              
              {/* Left Column (Meta & Overview & Tools) */}
              <div className="lg:col-span-5 space-y-5">
                
                {/* Overview Section */}
                <div className="space-y-1.5">
                  <h4 className="text-[11px] font-bold uppercase tracking-[0.15em] text-primary flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block" />
                    Overview
                  </h4>
                  <p className="text-slate-600 text-xs md:text-[13px] font-semibold leading-relaxed">
                    Apollo Dental Clinic is a premium dental care provider. In my role as Social Media Manager and Content Creator, I present their clinical expertise through professional visual designs, educational reels, and interactive digital campaigns on social media.
                  </p>
                </div>

                {/* Platforms Managed */}
                <div className="space-y-1.5">
                  <h4 className="text-[11px] font-bold uppercase tracking-[0.15em] text-primary flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block" />
                    Platforms Managed
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    <a
                      href="https://www.instagram.com/apollodental_cosmetologyclinic/"
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1.5 bg-pink-50 hover:bg-pink-100/60 border border-pink-100 hover:border-pink-200 rounded-lg px-2.5 py-1 text-[11px] font-bold text-pink-600 transition-all duration-300"
                    >
                      <Instagram size={12} className="shrink-0 text-pink-600" />
                      <span>Instagram</span>
                      <ExternalLink size={8} className="opacity-60" />
                    </a>
                    
                    <a
                      href="https://www.facebook.com/profile.php?id=61589839547578&sk=reels_tab"
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1.5 bg-blue-50 hover:bg-blue-100/60 border border-blue-100 hover:border-blue-200 rounded-lg px-2.5 py-1 text-[11px] font-bold text-blue-600 transition-all duration-300"
                    >
                      <Facebook size={12} className="shrink-0 text-blue-600" />
                      <span>Facebook</span>
                      <ExternalLink size={8} className="opacity-60" />
                    </a>
                  </div>
                </div>

                {/* Tools Used Section */}
                <div className="space-y-1.5">
                  <h4 className="text-[11px] font-bold uppercase tracking-[0.15em] text-primary flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block" />
                    Tools Used
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {tools.map((tool) => (
                      <span
                        key={tool}
                        className="text-slate-600 bg-slate-50 border border-slate-200/50 px-2.5 py-0.5 rounded-full text-[11px] font-bold hover:bg-slate-100/80 hover:border-slate-300 hover:text-slate-900 transition-all cursor-default select-none"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

              {/* Right Column (Responsibilities) */}
              <div className="lg:col-span-7">
                
                {/* Responsibilities Section */}
                <div className="space-y-2.5">
                  <h4 className="text-[11px] font-bold uppercase tracking-[0.15em] text-primary flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block" />
                    Responsibilities
                  </h4>
                  <ul className="space-y-1.5">
                    {responsibilities.map((resp, i) => (
                      <li key={i} className="flex items-start gap-2 text-slate-600 text-xs md:text-[13px] leading-relaxed font-semibold">
                        <div className="w-4 h-4 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0 mt-0.5 text-emerald-600">
                          <Check size={9} strokeWidth={3} />
                        </div>
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

            </div>

            {/* Project Impact full-width highlighted quote block */}
            <div className="mt-6 bg-gradient-to-br from-blue-50 to-indigo-50/60 border border-blue-100/60 p-5 rounded-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-3 opacity-10">
                <Sparkles size={20} className="text-primary animate-pulse" />
              </div>
              
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-1 h-5 bg-primary rounded-full" />
                <h5 className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.15em] text-primary">
                  Project Impact
                </h5>
              </div>
              
              <p className="text-slate-700 text-xs sm:text-[13px] md:text-sm font-semibold leading-relaxed">
                Contributed to strengthening Apollo Dental Clinic's digital presence through strategic content planning, creative design, engaging social media campaigns, and consistent brand communication across Instagram and Facebook.
              </p>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};

// --- Video Player Component with True Browser Fullscreen & 9:16 Aspect Preservation ---
interface VideoPlayerModalProps {
  project: {
    name: string;
    img: string;
    link?: string;
    type?: string;
    videoUrl?: string;
    category?: string;
  };
  onClose?: () => void;
  autoFullscreen?: boolean;
}

const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({ 
  project, 
  onClose,
  autoFullscreen = false 
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [duration, setDuration] = useState("0:30");
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const idleTimerRef = useRef<any>(null);

  // Sync state when project changes
  useEffect(() => {
    setIsPlaying(true);
    setProgress(0);
    setCurrentTime("0:00");
    setIsMuted(false);
    if (videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.currentTime = 0;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    }
  }, [project.videoUrl, project.name]);

  // Video playback management
  useEffect(() => {
    if (project.videoUrl) {
      const video = videoRef.current;
      if (video) {
        if (isPlaying) {
          const promise = video.play();
          if (promise !== undefined) {
            promise.catch((err) => console.log("Video playback handled:", err));
          }
        } else {
          video.pause();
        }
      }
    } else {
      let timer: any;
      if (isPlaying) {
        timer = setInterval(() => {
          setProgress((prev) => {
            const next = (prev + 1) % 100;
            const seconds = Math.floor((next / 100) * 30);
            setCurrentTime(`0:${seconds < 10 ? "0" : ""}${seconds}`);
            return next;
          });
        }, 300);
      }
      return () => clearInterval(timer);
    }
  }, [isPlaying, project.videoUrl]);

  // Auto-hide controls when playing and idle
  const handleUserActivity = () => {
    setShowControls(true);
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    if (isPlaying) {
      idleTimerRef.current = setTimeout(() => {
        setShowControls(false);
      }, 2500);
    }
  };

  useEffect(() => {
    if (!isPlaying) {
      setShowControls(true);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    } else {
      handleUserActivity();
    }
    return () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, [isPlaying]);

  // Synchronize fullscreen state across all standard and vendor-prefixed browser APIs
  useEffect(() => {
    const handleFullscreenChange = () => {
      const container = playerContainerRef.current;
      const doc = document as any;
      const fsElement = 
        doc.fullscreenElement || 
        doc.webkitFullscreenElement || 
        doc.mozFullScreenElement || 
        doc.msFullscreenElement;
      
      const isFs = !!(container && (fsElement === container || container.contains(fsElement)));
      setIsFullscreen(isFs);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("MSFullscreenChange", handleFullscreenChange);

    const video = videoRef.current;
    const handleWebkitBegin = () => setIsFullscreen(true);
    const handleWebkitEnd = () => setIsFullscreen(false);

    if (video) {
      video.addEventListener("webkitbeginfullscreen", handleWebkitBegin);
      video.addEventListener("webkitendfullscreen", handleWebkitEnd);
    }

    if (autoFullscreen && playerContainerRef.current) {
      toggleFullscreen();
    }

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
      document.removeEventListener("mozfullscreenchange", handleFullscreenChange);
      document.removeEventListener("MSFullscreenChange", handleFullscreenChange);

      if (video) {
        video.removeEventListener("webkitbeginfullscreen", handleWebkitBegin);
        video.removeEventListener("webkitendfullscreen", handleWebkitEnd);
      }
    };
  }, [autoFullscreen]);

  // Cross-browser Fullscreen toggling
  const toggleFullscreen = async (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const container = playerContainerRef.current;
    const video = videoRef.current;
    if (!container) return;

    const doc = document as any;
    const isFs = !!(
      doc.fullscreenElement || 
      doc.webkitFullscreenElement || 
      doc.mozFullScreenElement || 
      doc.msFullscreenElement
    );

    if (!isFs) {
      try {
        const c = container as any;
        if (c.requestFullscreen) {
          await c.requestFullscreen();
        } else if (c.webkitRequestFullscreen) {
          await c.webkitRequestFullscreen();
        } else if (c.mozRequestFullScreen) {
          await c.mozRequestFullScreen();
        } else if (c.msRequestFullscreen) {
          await c.msRequestFullscreen();
        } else if (video && (video as any).webkitEnterFullscreen) {
          (video as any).webkitEnterFullscreen();
        }
      } catch (err) {
        console.error("Error attempting to enable fullscreen:", err);
      }
    } else {
      try {
        if (doc.exitFullscreen) {
          await doc.exitFullscreen();
        } else if (doc.webkitExitFullscreen) {
          await doc.webkitExitFullscreen();
        } else if (doc.mozCancelFullScreen) {
          await doc.mozCancelFullScreen();
        } else if (doc.msExitFullscreen) {
          await doc.msExitFullscreen();
        }
      } catch (err) {
        console.error("Error attempting to exit fullscreen:", err);
      }
    }
  };

  // Keyboard controls (Space: Play/Pause, F: Fullscreen, M: Mute, Arrows: Seek)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (["INPUT", "TEXTAREA"].includes((e.target as HTMLElement)?.tagName)) return;

      if (e.key === " " || e.key === "k" || e.key === "K") {
        e.preventDefault();
        setIsPlaying((prev) => !prev);
      } else if (e.key === "f" || e.key === "F") {
        e.preventDefault();
        toggleFullscreen();
      } else if (e.key === "m" || e.key === "M") {
        e.preventDefault();
        setIsMuted((prev) => {
          const next = !prev;
          if (videoRef.current) videoRef.current.muted = next;
          return next;
        });
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        seekByAmount(-5);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        seekByAmount(5);
      } else if (e.key === "Escape" && isFullscreen) {
        e.preventDefault();
        toggleFullscreen();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFullscreen]);

  const seekByAmount = (seconds: number) => {
    if (videoRef.current) {
      const dur = videoRef.current.duration || 30;
      const target = Math.max(0, Math.min(dur, videoRef.current.currentTime + seconds));
      videoRef.current.currentTime = target;
      setProgress((target / dur) * 100);
      handleUserActivity();
    }
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (video) {
      const current = video.currentTime;
      const dur = video.duration || 30;
      const currentMin = Math.floor(current / 60);
      const currentSec = Math.floor(current % 60);
      const totalMin = Math.floor(dur / 60);
      const totalSec = Math.floor(dur % 60);
      
      setCurrentTime(`${currentMin}:${currentSec < 10 ? "0" : ""}${currentSec}`);
      setDuration(`${totalMin}:${totalSec < 10 ? "0" : ""}${totalSec}`);
      setProgress((current / dur) * 100);
    }
  };

  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (video) {
      const dur = video.duration || 30;
      const totalMin = Math.floor(dur / 60);
      const totalSec = Math.floor(dur % 60);
      setDuration(`${totalMin}:${totalSec < 10 ? "0" : ""}${totalSec}`);
    }
  };

  const handleSoundToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (project.videoUrl) {
      const video = videoRef.current;
      if (video) {
        video.muted = !video.muted;
        setIsMuted(video.muted);
      }
    } else {
      setIsMuted(!isMuted);
    }
    handleUserActivity();
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const newPercent = Math.max(0, Math.min(100, (clickX / width) * 100));
    
    if (project.videoUrl && videoRef.current) {
      const dur = videoRef.current.duration || 30;
      videoRef.current.currentTime = (newPercent / 100) * dur;
    } else {
      setProgress(newPercent);
      const seconds = Math.floor((newPercent / 100) * 30);
      setCurrentTime(`0:${seconds < 10 ? "0" : ""}${seconds}`);
    }
    handleUserActivity();
  };

  return (
    <div
      ref={playerContainerRef}
      onMouseMove={handleUserActivity}
      onTouchStart={handleUserActivity}
      className={`relative select-none flex flex-col items-center justify-center transition-all duration-300 ${
        isFullscreen
          ? "fixed inset-0 w-screen h-screen max-w-none max-h-none z-[999999] bg-black p-0 m-0"
          : "bg-[#0B0F19]/95 border border-white/10 p-3 sm:p-4 rounded-[2rem] max-w-[340px] sm:max-w-[360px] w-full max-h-[70vh] shadow-2xl backdrop-blur-2xl overflow-hidden"
      }`}
    >
      {/* Cinematic Blur Accent Background Glow */}
      <div 
        className="absolute inset-0 bg-cover bg-center filter blur-3xl opacity-20 scale-125 pointer-events-none -z-10"
        style={{ backgroundImage: `url(${project.img})` }}
      />

      {/* Top Header Bar (when not fullscreen) */}
      {!isFullscreen && (
        <div className="w-full flex items-center justify-between mb-2.5 pb-2 border-b border-white/10 select-none px-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <h4 className="text-[11px] font-semibold tracking-wider text-slate-300 uppercase font-mono truncate max-w-[170px]">
              {project.type || "Reel"} • Video Player
            </h4>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={toggleFullscreen}
              aria-label="Enter fullscreen"
              className="px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold bg-white/10 hover:bg-primary text-white transition-colors cursor-pointer border border-white/10 flex items-center gap-1"
            >
              <Maximize2 size={10} />
              <span>Fullscreen</span>
            </button>
          </div>
        </div>
      )}

      {/* Fullscreen Floating Top Navigation */}
      {isFullscreen && (
        <div 
          className={`absolute top-0 inset-x-0 z-40 p-4 sm:p-6 bg-gradient-to-b from-black/90 via-black/50 to-transparent flex items-center justify-between transition-opacity duration-300 ${
            showControls ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        >
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 text-xs font-mono font-bold text-white bg-white/10 backdrop-blur-md rounded-full border border-white/20">
              {project.type || "9:16 Vertical Reel"}
            </span>
            <h3 className="text-white font-bold text-sm sm:text-base font-display drop-shadow-md truncate max-w-[240px] sm:max-w-md">
              {project.name}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleFullscreen}
              aria-label="Exit fullscreen"
              className="flex items-center gap-1.5 bg-white/15 hover:bg-white/30 text-white px-3.5 py-1.5 rounded-full text-xs font-bold backdrop-blur-md transition-all cursor-pointer border border-white/20 shadow-lg"
            >
              <Minimize2 size={14} />
              <span className="hidden sm:inline">Exit Fullscreen</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Video Stage - STRICT 9:16 PRESERVATION IN BOTH FULLSCREEN & MODAL VIEW */}
      <div 
        className={`relative overflow-hidden flex items-center justify-center ${
          isFullscreen 
            ? "w-full h-full max-h-screen flex-1 my-auto" 
            : "w-full aspect-[9/16] max-h-[58vh] bg-black rounded-2xl border border-white/10 shadow-2xl"
        }`}
      >
        {/* Aspect-Ratio Centered Canvas Frame (Never stretches on 16:9 / ultrawide displays) */}
        <div 
          className={`relative flex items-center justify-center bg-black cursor-pointer overflow-hidden ${
            isFullscreen 
              ? "h-full max-h-screen aspect-[9/16] w-auto max-w-full mx-auto my-auto shadow-2xl" 
              : "w-full h-full"
          }`}
          onClick={() => setIsPlaying(!isPlaying)}
        >
          {project.videoUrl ? (
            <video
              ref={videoRef}
              src={project.videoUrl}
              poster={project.img}
              loop
              playsInline
              muted={isMuted}
              preload="metadata"
              className="w-full h-full object-contain bg-black select-none"
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
            />
          ) : (
            <motion.img 
              animate={isPlaying ? { scale: [1, 1.05, 1] } : { scale: 1 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              src={project.img} 
              alt={project.name} 
              className="w-full h-full object-contain bg-black filter brightness-[0.75] select-none"
              referrerPolicy="no-referrer"
            />
          )}

          {/* Ambient Video Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

          {/* Centered Large Play/Pause Action Indicator */}
          <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none">
            <button 
              type="button"
              aria-label={isPlaying ? "Pause video" : "Play video"}
              onClick={(e) => {
                e.stopPropagation();
                setIsPlaying(!isPlaying);
                handleUserActivity();
              }}
              className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-primary/95 hover:bg-primary text-white flex items-center justify-center shadow-2xl shadow-primary/40 transition-all cursor-pointer pointer-events-auto ${
                isPlaying 
                  ? `${showControls ? "opacity-0 hover:opacity-90" : "opacity-0"} scale-95` 
                  : "opacity-100 scale-100"
              }`}
            >
              {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} className="translate-x-0.5" fill="currentColor" />}
            </button>
          </div>
        </div>
      </div>

      {/* Floating Bottom Controls Overlay */}
      <div 
        className={`w-full select-none transition-opacity duration-300 z-40 ${
          isFullscreen 
            ? `absolute bottom-0 inset-x-0 p-4 sm:p-6 bg-gradient-to-t from-black/95 via-black/70 to-transparent ${
                showControls ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
              }`
            : "mt-2 pt-2 border-t border-white/10 w-full flex flex-col gap-2"
        }`}
      >
        <div className={`${isFullscreen ? "max-w-xl mx-auto w-full flex flex-col gap-2.5" : "w-full flex flex-col gap-2"}`}>
          
          {/* Interactive duration timeline progress scrubber */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] sm:text-xs font-mono font-medium text-slate-300 w-9 text-right shrink-0">
              {currentTime}
            </span>
            <div 
              onClick={handleProgressClick}
              className="flex-1 h-1.5 sm:h-2 bg-white/20 hover:bg-white/30 rounded-full relative cursor-pointer group/bar transition-all"
            >
              <div className="h-full bg-primary rounded-full relative" style={{ width: `${progress}%` }}>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full border-2 border-primary shadow-md opacity-90 group-hover/bar:scale-125 transition-transform" />
              </div>
            </div>
            <span className="text-[10px] sm:text-xs font-mono font-medium text-slate-400 w-9 text-left shrink-0">
              {duration}
            </span>
          </div>

          {/* Control Buttons Row */}
          <div className="flex items-center justify-between">
            {/* Play/Pause, Rewind, Fast-Forward */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button 
                type="button"
                onClick={() => {
                  setIsPlaying(!isPlaying);
                  handleUserActivity();
                }}
                aria-label={isPlaying ? "Pause video" : "Play video"}
                className="text-white hover:text-primary transition-colors cursor-pointer p-1 focus:outline-none"
              >
                {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
              </button>

              <button
                type="button"
                onClick={() => seekByAmount(-5)}
                aria-label="Rewind 5 seconds"
                title="Rewind 5s"
                className="text-slate-300 hover:text-white transition-colors cursor-pointer p-1"
              >
                <RotateCcw size={15} />
              </button>

              <button
                type="button"
                onClick={() => seekByAmount(5)}
                aria-label="Forward 5 seconds"
                title="Forward 5s"
                className="text-slate-300 hover:text-white transition-colors cursor-pointer p-1"
              >
                <RotateCw size={15} />
              </button>

              <p className="text-xs font-semibold text-slate-200 font-display truncate max-w-[140px] sm:max-w-[200px] hidden sm:inline ml-1">
                {project.name}
              </p>
            </div>

            {/* Mute and Fullscreen Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                type="button"
                onClick={handleSoundToggle}
                aria-label={isMuted ? "Unmute audio" : "Mute audio"}
                className="text-white hover:text-primary transition-colors cursor-pointer p-1 focus:outline-none"
                title={isMuted ? "Unmute (M)" : "Mute (M)"}
              >
                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>

              <button
                type="button"
                onClick={toggleFullscreen}
                aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                className="text-white hover:text-primary transition-colors cursor-pointer p-1 focus:outline-none"
                title={isFullscreen ? "Exit Fullscreen (F / Esc)" : "Fullscreen (F)"}
              >
                {isFullscreen ? <Minimize2 size={18} /> : <Maximize size={18} />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Interactive Compact Reel Player Card Component ---
interface InteractiveReelCardProps {
  key?: React.Key;
  project: {
    name: string;
    type?: string;
    img: string;
    videoUrl?: string;
    link?: string;
    category?: string;
  };
  isActive: boolean;
  onPlayToggle: () => void;
  isMuted: boolean;
  onMuteToggle: () => void;
  onExpandFullscreen?: () => void;
}

const InteractiveReelCard: React.FC<InteractiveReelCardProps> = ({
  project,
  isActive,
  onPlayToggle,
  isMuted,
  onMuteToggle,
  onExpandFullscreen
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [duration, setDuration] = useState("0:30");

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isActive) {
      video.muted = isMuted;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.log("Video playback handled:", err);
        });
      }
    } else {
      video.pause();
    }
  }, [isActive, isMuted]);

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (video) {
      const cur = video.currentTime;
      const dur = video.duration || 30;
      const curMin = Math.floor(cur / 60);
      const curSec = Math.floor(cur % 60);
      const durMin = Math.floor(dur / 60);
      const durSec = Math.floor(dur % 60);

      setCurrentTime(`${curMin}:${curSec < 10 ? "0" : ""}${curSec}`);
      setDuration(`${durMin}:${durSec < 10 ? "0" : ""}${durSec}`);
      setProgress((cur / dur) * 100);
    }
  };

  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (video) {
      const dur = video.duration || 30;
      const durMin = Math.floor(dur / 60);
      const durSec = Math.floor(dur % 60);
      setDuration(`${durMin}:${durSec < 10 ? "0" : ""}${durSec}`);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const newPercent = Math.max(0, Math.min(100, (clickX / width) * 100));

    if (videoRef.current) {
      const dur = videoRef.current.duration || 30;
      videoRef.current.currentTime = (newPercent / 100) * dur;
    }
    setProgress(newPercent);
  };

  const handleFullscreenClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onExpandFullscreen) {
      onExpandFullscreen();
    }
  };

  return (
    <div
      className={`group relative w-[210px] sm:w-[230px] md:w-[240px] h-[360px] sm:h-[380px] bg-slate-950 rounded-2xl overflow-hidden border ${
        isActive
          ? "border-primary shadow-2xl shadow-primary/30 ring-2 ring-primary/40"
          : "border-slate-800 hover:border-primary/50 shadow-xl"
      } transition-all duration-300 flex flex-col justify-between select-none shrink-0`}
    >
      {/* Video Canvas Container */}
      <div 
        className="absolute inset-0 bg-black flex items-center justify-center cursor-pointer overflow-hidden"
        onClick={onPlayToggle}
      >
        {project.videoUrl ? (
          <video
            ref={videoRef}
            src={project.videoUrl}
            poster={project.img}
            loop
            playsInline
            preload="metadata"
            muted={isMuted}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            className="w-full h-full object-cover select-none"
          />
        ) : (
          <img
            src={project.img}
            alt={project.name}
            className="w-full h-full object-cover select-none"
            referrerPolicy="no-referrer"
          />
        )}

        {/* Ambient Dark Gradient Layer */}
        <div className={`absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-black/40 transition-opacity duration-300 ${
          isActive ? "opacity-30 group-hover:opacity-50" : "opacity-70 group-hover:opacity-85"
        }`} />
      </div>

      {/* Top Header Tag */}
      <div className="relative z-10 p-3 flex items-center justify-between w-full pointer-events-none">
        <span className="px-2.5 py-0.5 text-[9px] font-black uppercase tracking-wider text-white bg-black/60 backdrop-blur-md rounded-full border border-white/10 shadow-sm truncate max-w-[150px]">
          {project.type || "Reel"}
        </span>
        {isActive && (
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-md shadow-primary" />
        )}
      </div>

      {/* Centered Play Button (when not playing or on hover) */}
      <div 
        className={`absolute inset-0 z-20 flex items-center justify-center pointer-events-none transition-opacity duration-200 ${
          isActive ? "opacity-0 group-hover:opacity-100" : "opacity-100"
        }`}
      >
        <button
          type="button"
          aria-label={isActive ? "Pause video" : "Play video"}
          onClick={(e) => {
            e.stopPropagation();
            onPlayToggle();
          }}
          className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-primary text-white flex items-center justify-center shadow-xl shadow-primary/40 group-hover:scale-110 group-hover:bg-primary/95 transition-all duration-300 cursor-pointer pointer-events-auto"
        >
          {isActive ? (
            <Pause size={22} fill="currentColor" />
          ) : (
            <Play size={22} className="translate-x-0.5" fill="currentColor" />
          )}
        </button>
      </div>

      {/* Bottom Info & Controls Bar */}
      <div className="relative z-20 p-3 bg-gradient-to-t from-slate-950 via-slate-950/95 to-transparent flex flex-col gap-1.5 w-full">
        {/* Title */}
        <div className="text-left pointer-events-none">
          <p className="text-[9px] font-mono font-bold uppercase tracking-wider text-primary truncate">
            {isActive ? "NOW PLAYING 🎬" : "VERTICAL REEL"}
          </p>
          <h4 className="text-xs font-bold text-white font-display leading-tight truncate">
            {project.name}
          </h4>
        </div>

        {/* Progress Bar (Clickable) */}
        <div 
          onClick={handleProgressClick}
          className="w-full h-1 bg-white/20 hover:bg-white/30 rounded-full relative cursor-pointer group/bar transition-all"
        >
          <div 
            className="h-full bg-primary rounded-full relative transition-all duration-100" 
            style={{ width: `${progress}%` }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full border border-primary shadow-sm" />
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-between pt-0.5">
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label={isActive ? "Pause video" : "Play video"}
              onClick={(e) => {
                e.stopPropagation();
                onPlayToggle();
              }}
              className="text-white hover:text-primary transition-colors cursor-pointer p-0.5"
              title={isActive ? "Pause" : "Play"}
            >
              {isActive ? <Pause size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" />}
            </button>
            <span className="text-[10px] font-mono text-slate-300">
              {currentTime} / {duration}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              aria-label={isMuted ? "Unmute audio" : "Mute audio"}
              onClick={(e) => {
                e.stopPropagation();
                onMuteToggle();
              }}
              className="text-white hover:text-primary transition-colors cursor-pointer p-0.5"
              title={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
            </button>

            <button
              type="button"
              aria-label="Enter fullscreen"
              onClick={handleFullscreenClick}
              className="text-white hover:text-primary transition-colors cursor-pointer p-0.5"
              title="Watch in Fullscreen"
            >
              <Maximize size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Horizontal Reel Carousel Component for multi-item categories ---
const ReelCarousel = ({
  projects,
  activePlayingVideo,
  onPlayToggle,
  isMuted,
  onMuteToggle,
  onExpandFullscreen
}: {
  projects: any[];
  activePlayingVideo: string | null;
  onPlayToggle: (name: string) => void;
  isMuted: boolean;
  onMuteToggle: () => void;
  onExpandFullscreen: (p: any) => void;
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollByAmount = (amount: number) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: amount, behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full flex flex-col items-center">
      {/* Scroll navigation arrows */}
      <div className="w-full flex items-center justify-between gap-3 mb-3 px-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
            {projects.length} Total Reels
          </span>
          <span className="text-xs text-slate-400 font-medium hidden sm:inline">
            Use arrows or swipe horizontally to browse
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Previous reel"
            onClick={() => scrollByAmount(-280)}
            className="w-8 h-8 rounded-full bg-white hover:bg-slate-100 text-slate-700 hover:text-navy flex items-center justify-center border border-slate-200 transition-all cursor-pointer shadow-sm"
            title="Previous"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            type="button"
            aria-label="Next reel"
            onClick={() => scrollByAmount(280)}
            className="w-8 h-8 rounded-full bg-white hover:bg-slate-100 text-slate-700 hover:text-navy flex items-center justify-center border border-slate-200 transition-all cursor-pointer shadow-sm"
            title="Next"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Horizontal Scroll Track */}
      <div
        ref={scrollContainerRef}
        className="w-full flex items-center gap-5 overflow-x-auto py-2 px-1 scroll-smooth snap-x"
        style={{ scrollbarWidth: "thin" }}
      >
        {projects.map((project) => (
          <div key={project.name} className="snap-start shrink-0">
            <InteractiveReelCard
              project={project}
              isActive={activePlayingVideo === project.name}
              onPlayToggle={() => onPlayToggle(project.name)}
              isMuted={isMuted}
              onMuteToggle={onMuteToggle}
              onExpandFullscreen={() => onExpandFullscreen(project)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Portfolio Section ---
const Portfolio = () => {
  const [filter, setFilter] = useState("Creatives");
  const [selectedVideoCategory, setSelectedVideoCategory] = useState<string | null>(null);
  const [activePlayingVideo, setActivePlayingVideo] = useState<string | null>(null);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const [lightboxProject, setLightboxProject] = useState<{ img: string; name: string; category: string; link?: string; type?: string; videoUrl?: string } | null>(null);
  
  const categories = ["Creatives", "Videos"];

  const videoShowcaseCategories = [
    {
      id: "healthcare",
      title: "Healthcare & Dental",
      label: "Healthcare • Dental • Cosmetology",
      cta: "View Work →",
      videoNames: [
        "Apollo Dental Video",
        "Cosmetology Video"
      ]
    },
    {
      id: "industry",
      title: "Industry & Real Estate",
      label: "Industry • Real Estate • Brand Content",
      cta: "View Work →",
      videoNames: [
        "RK Homes and Developers",
        "ARK Homes and Developers Reel",
        "RK Homes Showcase Reel",
        "ARK Homes Showcase Reel",
        "RK Homes Premium Tour Reel",
        "ARK Homes Premium Tour Reel",
        "RK Homes Luxury Property Reel",
        "ARK Homes Luxury Property Reel",
        "RK Homes Development Reel",
        "ARK Homes Development Reel",
        "Manufacturing Industry Intro Video"
      ]
    },
    {
      id: "ai",
      title: "AI Video Creation",
      label: "AI • Product Visuals • Creative Experiments",
      cta: "View Work →",
      videoNames: [
        "Consult Doctor for the Right Treatment!",
        "Take Action Early",
        "Coffee Affects Your Sleep Cycle"
      ]
    }
  ];
  
  const projects = [
    // Creatives
    { 
      name: "Creative Brand Graphic Design", 
      category: "Creatives", 
      type: "Creative Graphics", 
      img: "https://yearling-red-qqyifvdg.edgeone.dev/file.png",
      link: "#"
    },
    { 
      name: "Brand Carousel Slide Design", 
      category: "Creatives", 
      type: "Branding", 
      img: "https://querulous-green-l3kivch9.edgeone.dev/SLIDE%203%20(1).png",
      link: "#"
    },
    { 
      name: "Free Mental Health Counseling", 
      category: "Creatives", 
      type: "Healthcare", 
      img: "https://scary-azure-ggewvsbdlm.edgeone.app/Free%20Mental%20Health%20Counseling.png",
      link: "#"
    },
    { 
      name: "Summer Vacation Special Offer", 
      category: "Creatives", 
      type: "Promotion", 
      img: "https://compact-tomato-mi8bghykch.edgeone.app/Summer%20vacation%20special%20offer%20(2).png",
      link: "#"
    },
    { 
      name: "Chettinad Hospital & Research Institute", 
      category: "Creatives", 
      type: "Healthcare", 
      img: "https://equivalent-magenta-7znxjkz6qb.edgeone.app/Chettinad%20Hospital%20&%20Research%20Institute%20(3).png",
      link: "#"
    },
    { 
      name: "Professional Course Poster", 
      category: "Creatives", 
      type: "Education", 
      img: "https://image2url.com/r2/default/images/1775567911170-fce693e5-c9d3-4847-af80-aab5fac4ae7b.png",
      link: "#"
    },
    { 
      name: "Creative Academy Poster", 
      category: "Creatives", 
      type: "Education", 
      img: "https://image2url.com/r2/default/images/1775568052451-413ab29b-d318-4f66-8487-7c156222c620.png",
      link: "#"
    },
    { 
      name: "Healthy Smile Poster", 
      category: "Creatives", 
      type: "Healthcare", 
      img: "https://near-olive-5hzpqymsvu.edgeone.app/Give%20your%20child%20a%20healthy%20and%20confident%20smile%20this%20summer!%20(2).png",
      link: "#"
    },
    { 
      name: "Summer Smile Makeover", 
      category: "Creatives", 
      type: "Healthcare", 
      img: "https://junior-lime-2fqyiqv0.edgeone.app/Summer%20Smile%20Makeover%20(1).png",
      link: "#"
    },
    { 
      name: "Modern Design Poster", 
      category: "Creatives", 
      type: "Design", 
      img: "https://lively-lavender-zw35hvf4nf.edgeone.app/Untitled%20design%20(32).png",
      link: "#"
    },
    { 
      name: "Manufacturing Industry Flyer Design", 
      category: "Creatives", 
      type: "Industrial & Manufacturing", 
      img: "https://www.image2url.com/r2/default/images/1786200102636-0b10912a-af4a-43b7-989f-9734c9294975.png",
      link: "#"
    },
    // Videos
    {
      name: "Apollo Dental Video",
      category: "Videos",
      videoCategory: "healthcare",
      type: "Healthcare & Dental Care",
      img: "https://accessible-pink-edubkiwn.edgeone.app/cover%20image%20for%20dental.png",
      videoUrl: "https://www.image2url.com/r2/default/videos/1781273468032-6c46b89d-a4fc-4e98-9ca7-8243d76a43a8.mp4",
      link: "https://www.instagram.com/reel/DWg_e8Jk1Zp/?igsh=YWxlcWZ0cnV0cnM3"
    },
    {
      name: "Cosmetology Video",
      category: "Videos",
      videoCategory: "healthcare",
      type: "Cosmetology & Skin Care",
      img: "https://eldest-black-4imrurbg.edgeone.app/ChatGPT%20Image%20Jun%2015,%202026,%2002_07_47%20PM.png",
      videoUrl: "https://www.image2url.com/r2/default/videos/1781512624578-c4b49d69-8701-4ad1-a753-c74a33a057ac.mp4",
      link: "#"
    },
    {
      name: "RK Homes and Developers",
      category: "Videos",
      videoCategory: "industry",
      type: "Real Estate Reel",
      img: "https://comprehensive-copper-zawlr23e.edgeone.app/ChatGPT%20Image%20Jun%2015,%202026,%2001_40_27%20PM.png",
      videoUrl: "https://www.image2url.com/r2/default/videos/1781510907183-6e7ce03e-0e46-4f48-b62f-417a8be07f7e.mp4",
      link: "#"
    },
    {
      name: "Consult Doctor for the Right Treatment!",
      category: "Videos",
      videoCategory: "ai",
      type: "Healthcare & Clinic Care",
      img: "https://social-violet-ljileecn.edgeone.app/ChatGPT%20Image%20Jun%2027,%202026,%2010_35_54%20AM.png",
      videoUrl: "https://www.image2url.com/r2/default/videos/1782536688730-678f3b4f-a1f3-47ea-acb8-76d7f757f47c.mp4",
      link: "#"
    },
    {
      name: "RK Homes Showcase Reel",
      category: "Videos",
      videoCategory: "industry",
      type: "Property Showcase",
      img: "https://miserable-jade-qzzur4dk.edgeone.app/ChatGPT%20Image%20Jun%2015,%202026,%2001_44_41%20PM.png",
      videoUrl: "https://www.image2url.com/r2/default/videos/1781511215436-0ca5ae6c-2706-46ab-a094-53a6b7b28cb4.mp4",
      link: "#"
    },
    {
      name: "Take Action Early",
      category: "Videos",
      videoCategory: "ai",
      type: "Healthcare & Cosmetology",
      img: "https://quintessential-olive-w0wvsa9h.edgeone.app/ChatGPT%20Image%20Jun%2027,%202026,%2010_30_05%20AM.png",
      videoUrl: "https://www.image2url.com/r2/default/videos/1782536121021-d82286a5-0acf-4393-bdc5-45ffa15b4e13.mp4",
      link: "#"
    },
    {
      name: "RK Homes Premium Tour Reel",
      category: "Videos",
      videoCategory: "industry",
      type: "Luxury Real Estate",
      img: "https://husky-jade-vvnr9v9p.edgeone.app/ChatGPT%20Image%20Jun%2015,%202026,%2001_52_27%20PM.png",
      videoUrl: "https://www.image2url.com/r2/default/videos/1781511533457-cba80d0d-1f7b-4cf7-b922-30440c494aea.mp4",
      link: "#"
    },
    {
      name: "Coffee Affects Your Sleep Cycle",
      category: "Videos",
      videoCategory: "ai",
      type: "Wellness & Health Tips",
      img: "https://inquisitive-emerald-zetoehzk.edgeone.app/ChatGPT%20Image%20Jun%2027,%202026,%2010_43_04%20AM.png",
      videoUrl: "https://www.image2url.com/r2/default/videos/1782537016091-df0acf48-6cbf-4bff-80e1-41917347a33b.mp4",
      link: "#"
    },
    {
      name: "RK Homes Luxury Property Reel",
      category: "Videos",
      videoCategory: "industry",
      type: "Brand Campaign",
      img: "https://uneven-fuchsia-vjub3klc.edgeone.app/ChatGPT%20Image%20Jun%2015,%202026,%2001_56_44%20PM.png",
      videoUrl: "https://www.image2url.com/r2/default/videos/1781511855846-5d9b1daa-c202-4f4a-be64-86a94182eb8d.mp4",
      link: "#"
    },
    {
      name: "RK Homes Development Reel",
      category: "Videos",
      videoCategory: "industry",
      type: "Project Showcase Reel",
      img: "https://wily-pink-ex1hhhkf.edgeone.app/ChatGPT%20Image%20Jun%2015,%202026,%2002_01_04%20PM.png",
      videoUrl: "https://www.image2url.com/r2/default/videos/1781512197463-27a6e05c-128f-44ff-a001-13aed2799e99.mp4",
      link: "#"
    },
    {
      name: "Manufacturing Industry Intro Video",
      category: "Videos",
      videoCategory: "industry",
      type: "Manufacturing & Industrial",
      img: "https://www.image2url.com/r2/default/images/1786199319027-b9fa5aa1-0f34-43fb-bc71-2cb2a9a4d08d.png",
      videoUrl: "https://www.image2url.com/r2/default/videos/1786199099580-ba3c91fa-be42-4f64-9e7c-5981889f3d8e.mp4",
      link: "#"
    }
  ];

  const filteredNonVideoProjects = projects.filter(p => p.category === filter && p.category !== "Videos");

  const isVideoMode = filter === "Videos";

  return (
    <section id="work" className="py-16 md:py-24 px-6 md:px-12 lg:px-24 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-[0.25em] text-primary font-bold mb-4 inline-block bg-blue-50 border border-blue-100 px-4 py-1.5 rounded-full select-none">
            {isVideoMode ? "VIDEO & REEL WORK" : "EXPLORE PORTFOLIO"}
          </span>
          <h3 className="text-3xl md:text-5xl font-display font-black text-navy mb-4 tracking-tight">
            {isVideoMode ? "Video & Reel Work" : "Work Samples"}
          </h3>
          
          {isVideoMode && (
            <p className="text-slate-500 text-sm md:text-base font-medium max-w-2xl mx-auto mb-6 leading-relaxed">
              Selected work across healthcare, industry, real estate and AI-powered content creation.
            </p>
          )}

          {/* Segmented Pill Navigation Bar */}
          <div className="flex flex-wrap justify-center gap-1.5 md:gap-2 bg-slate-50 p-1.5 rounded-2xl md:rounded-full max-w-4xl mx-auto border border-slate-100 shadow-inner select-none mb-6">
            {categories.map(cat => (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  setFilter(cat);
                  setSelectedVideoCategory(null);
                }}
                className={`px-4 md:px-6 py-2 rounded-xl md:rounded-full text-xs md:text-sm font-bold transition-all duration-300 cursor-pointer ${
                  filter === cat 
                    ? "bg-navy text-white shadow-md shadow-navy/20 scale-[1.03]" 
                    : "text-slate-500 hover:text-primary hover:bg-white transition-all duration-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 3-CATEGORY VISUAL SHOWCASE / COMPACT REEL STUDIO (Only shown on Videos tab) */}
        {isVideoMode && (
          <div className="mb-12">
            {!selectedVideoCategory ? (
              /* 3-CATEGORY VISUAL SHOWCASE IN USUAL CLEAN BACKGROUND */
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
                {videoShowcaseCategories.map((showcase) => {
                  const categoryProjects = projects.filter(
                    p => p.category === "Videos" && showcase.videoNames.includes(p.name)
                  );

                  return (
                    <motion.div
                      key={showcase.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      onClick={() => {
                        setSelectedVideoCategory(showcase.id);
                        setActivePlayingVideo(null);
                      }}
                      className="group relative h-[360px] md:h-[380px] w-full bg-slate-50 hover:bg-white rounded-[2rem] overflow-hidden border border-slate-200/80 shadow-md hover:shadow-xl hover:border-primary/50 transition-all duration-400 cursor-pointer flex flex-col justify-between select-none"
                    >
                      {/* Top / Background Collage Showcase */}
                      <div className="relative h-[240px] md:h-[250px] w-full overflow-hidden flex items-center justify-center p-4 bg-gradient-to-b from-slate-100/90 to-slate-200/50">
                        {/* Collage Layout based on category */}
                        {showcase.id === "healthcare" && (
                          <div className="relative w-full h-full flex items-center justify-center">
                            {categoryProjects[0] && (
                              <div className="absolute w-[100px] sm:w-[115px] aspect-[9/16] -rotate-6 translate-x-3 translate-y-1 scale-95 opacity-90 rounded-xl overflow-hidden border-2 border-white shadow-xl transition-all duration-500 group-hover:-rotate-12 group-hover:scale-100 group-hover:translate-x-0">
                                <img src={categoryProjects[0].img} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                                <div className="absolute inset-0 bg-black/10" />
                              </div>
                            )}
                            {categoryProjects[1] && (
                              <div className="absolute w-[100px] sm:w-[115px] aspect-[9/16] rotate-6 -translate-x-3 -translate-y-1 z-10 scale-100 rounded-xl overflow-hidden border-2 border-primary shadow-xl transition-all duration-500 group-hover:rotate-12 group-hover:scale-105 group-hover:-translate-x-0">
                                <img src={categoryProjects[1].img} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
                              </div>
                            )}
                          </div>
                        )}

                        {showcase.id === "industry" && (
                          <div className="relative w-full h-full flex items-center justify-center">
                            {categoryProjects[0] && (
                              <div className="absolute w-[90px] sm:w-[105px] aspect-[9/16] -rotate-12 -translate-x-9 translate-y-2 scale-90 opacity-80 rounded-xl overflow-hidden border-2 border-white shadow-lg transition-all duration-500 group-hover:-rotate-16 group-hover:-translate-x-11">
                                <img src={categoryProjects[0].img} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                              </div>
                            )}
                            {categoryProjects[5] && (
                              <div className="absolute w-[90px] sm:w-[105px] aspect-[9/16] rotate-12 translate-x-9 translate-y-2 scale-90 opacity-80 rounded-xl overflow-hidden border-2 border-white shadow-lg transition-all duration-500 group-hover:rotate-16 group-hover:translate-x-11">
                                <img src={categoryProjects[5].img} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                              </div>
                            )}
                            {categoryProjects[1] && (
                              <div className="absolute w-[98px] sm:w-[112px] aspect-[9/16] rotate-0 z-10 translate-y-0 scale-100 rounded-xl overflow-hidden border-2 border-primary shadow-xl transition-all duration-500 group-hover:scale-105">
                                <img src={categoryProjects[1].img} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                              </div>
                            )}
                          </div>
                        )}

                        {showcase.id === "ai" && (
                          <div className="relative w-full h-full flex items-center justify-center">
                            {categoryProjects[0] && (
                              <div className="absolute w-[90px] sm:w-[105px] aspect-[9/16] -rotate-10 -translate-x-7 translate-y-2 scale-90 opacity-80 rounded-xl overflow-hidden border-2 border-white shadow-lg transition-all duration-500 group-hover:-rotate-14 group-hover:-translate-x-9">
                                <img src={categoryProjects[0].img} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                              </div>
                            )}
                            {categoryProjects[2] && (
                              <div className="absolute w-[90px] sm:w-[105px] aspect-[9/16] rotate-10 translate-x-7 translate-y-2 scale-90 opacity-80 rounded-xl overflow-hidden border-2 border-white shadow-lg transition-all duration-500 group-hover:rotate-14 group-hover:translate-x-9">
                                <img src={categoryProjects[2].img} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                              </div>
                            )}
                            {categoryProjects[1] && (
                              <div className="absolute w-[98px] sm:w-[112px] aspect-[9/16] rotate-0 z-10 translate-y-0 scale-100 rounded-xl overflow-hidden border-2 border-primary shadow-xl transition-all duration-500 group-hover:scale-105">
                                <img src={categoryProjects[1].img} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                              </div>
                            )}
                          </div>
                        )}

                        {/* Prominent Play Icon Badge */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-4 z-20 w-11 h-11 rounded-full bg-primary text-white flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-primary/95 transition-all duration-300 pointer-events-none">
                          <Play size={18} className="fill-white ml-0.5" />
                        </div>
                      </div>

                      {/* Bottom Overlay Content */}
                      <div className="absolute inset-x-0 bottom-0 pt-12 pb-5 px-5 bg-gradient-to-t from-white via-white/95 to-transparent z-20 flex flex-col justify-end text-left pointer-events-none">
                        <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-1 font-mono">
                          {showcase.label}
                        </p>
                        <h4 className="text-lg md:text-xl font-black text-navy font-display leading-tight mb-2 group-hover:text-primary transition-colors">
                          {showcase.title}
                        </h4>
                        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-navy bg-slate-100 group-hover:bg-primary group-hover:text-white border border-slate-200 group-hover:border-primary px-3 py-1 rounded-full transition-all duration-300 w-fit pointer-events-auto shadow-sm">
                          <span>{showcase.cta}</span>
                          <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              /* COMPACT SINGLE-VIEW CATEGORY STUDIO IN USUAL CLEAN BACKGROUND */
              <motion.div
                key={selectedVideoCategory}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-7xl mx-auto bg-slate-50/80 rounded-[2.5rem] border border-slate-200 p-6 md:p-8 shadow-xl"
              >
                {/* Studio Navigation & Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-200">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedVideoCategory(null);
                      setActivePlayingVideo(null);
                    }}
                    className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-700 hover:text-navy bg-white hover:bg-slate-100 px-4 py-2.5 rounded-full border border-slate-200 hover:border-primary/40 transition-all cursor-pointer w-fit shadow-sm group"
                  >
                    <ArrowLeft size={15} className="group-hover:-translate-x-1 transition-transform" />
                    <span>Back to Categories</span>
                  </button>

                  <div className="text-left sm:text-center">
                    <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-primary">
                      {videoShowcaseCategories.find(c => c.id === selectedVideoCategory)?.label}
                    </p>
                    <h3 className="text-xl md:text-2xl font-black text-navy font-display">
                      {videoShowcaseCategories.find(c => c.id === selectedVideoCategory)?.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-primary bg-primary/10 px-3.5 py-1.5 rounded-full border border-primary/20">
                      {projects.filter(p => p.category === "Videos" && (p as any).videoCategory === selectedVideoCategory).length} Reels Total
                    </span>
                  </div>
                </div>

                {/* Video Player Display Container */}
                <div className="w-full flex items-center justify-center">
                  {selectedVideoCategory === "healthcare" && (
                    <div className="flex justify-center items-center gap-6 sm:gap-8 flex-wrap py-2">
                      {projects
                        .filter(p => p.category === "Videos" && (p as any).videoCategory === "healthcare")
                        .map((project) => (
                          <InteractiveReelCard
                            key={project.name}
                            project={project}
                            isActive={activePlayingVideo === project.name}
                            onPlayToggle={() => setActivePlayingVideo(activePlayingVideo === project.name ? null : project.name)}
                            isMuted={isVideoMuted}
                            onMuteToggle={() => setIsVideoMuted(!isVideoMuted)}
                            onExpandFullscreen={() => {
                              setActivePlayingVideo(null);
                              setLightboxProject({
                                img: project.img,
                                name: project.name,
                                category: project.category,
                                link: project.link,
                                type: project.type,
                                videoUrl: (project as any).videoUrl
                              });
                            }}
                          />
                        ))}
                    </div>
                  )}

                  {selectedVideoCategory === "ai" && (
                    <div className="flex justify-center items-center gap-4 sm:gap-6 flex-wrap py-2">
                      {projects
                        .filter(p => p.category === "Videos" && (p as any).videoCategory === "ai")
                        .map((project) => (
                          <InteractiveReelCard
                            key={project.name}
                            project={project}
                            isActive={activePlayingVideo === project.name}
                            onPlayToggle={() => setActivePlayingVideo(activePlayingVideo === project.name ? null : project.name)}
                            isMuted={isVideoMuted}
                            onMuteToggle={() => setIsVideoMuted(!isVideoMuted)}
                            onExpandFullscreen={() => {
                              setActivePlayingVideo(null);
                              setLightboxProject({
                                img: project.img,
                                name: project.name,
                                category: project.category,
                                link: project.link,
                                type: project.type,
                                videoUrl: (project as any).videoUrl
                              });
                            }}
                          />
                        ))}
                    </div>
                  )}

                  {selectedVideoCategory === "industry" && (
                    <ReelCarousel
                      projects={projects.filter(p => p.category === "Videos" && (p as any).videoCategory === "industry")}
                      activePlayingVideo={activePlayingVideo}
                      onPlayToggle={(name) => setActivePlayingVideo(activePlayingVideo === name ? null : name)}
                      isMuted={isVideoMuted}
                      onMuteToggle={() => setIsVideoMuted(!isVideoMuted)}
                      onExpandFullscreen={(project) => {
                        setActivePlayingVideo(null);
                        setLightboxProject({
                          img: project.img,
                          name: project.name,
                          category: project.category,
                          link: project.link,
                          type: project.type,
                          videoUrl: (project as any).videoUrl
                        });
                      }}
                    />
                  )}
                </div>
              </motion.div>
            )}
          </div>
        )}

        {/* NON-VIDEO PROJECTS GRID */}
        {!isVideoMode && filteredNonVideoProjects.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredNonVideoProjects.map((project, idx) => (
              <motion.div
                key={project.name}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="group"
              >
                <div className="relative aspect-[3/4] rounded-[2rem] overflow-hidden mb-4 card-shadow border border-slate-100 bg-[#f8fafc] flex items-center justify-center p-3">
                  <img 
                    src={project.img} 
                    alt={project.name} 
                    className="max-w-full max-h-full object-contain rounded-xl group-hover:scale-105 transition-transform duration-500 shadow-sm"
                    referrerPolicy="no-referrer"
                  />
                  
                  {project.link === "#" ? (
                    <button 
                      type="button"
                      aria-label={`Expand ${project.name}`}
                      onClick={() => setLightboxProject({ 
                        img: project.img, 
                        name: project.name, 
                        category: project.category,
                        link: project.link,
                        type: project.type,
                        videoUrl: (project as any).videoUrl
                      })}
                      className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-6 text-left w-full h-full cursor-pointer focus:outline-none"
                    >
                      <p className="text-[10px] uppercase font-bold tracking-widest text-primary/80 mb-1">{project.category}</p>
                      <h4 className="text-lg font-bold text-white leading-tight">{project.name}</h4>
                      <span className="text-[11px] text-primary font-bold mt-2.5 flex items-center gap-1 border-t border-white/15 pt-2 w-full">
                        Expand Fullscreen Display 🔍
                      </span>
                    </button>
                  ) : (
                    <a 
                      href={project.link}
                      target="_blank"
                      rel="noreferrer"
                      className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-6 text-left w-full h-full"
                    >
                      <p className="text-[10px] uppercase font-bold tracking-widest text-primary/80 mb-1">{project.category}</p>
                      <h4 className="text-lg font-bold text-white leading-tight">{project.name}</h4>
                      <span className="text-[11px] text-primary font-bold mt-2.5 flex items-center gap-1 border-t border-white/15 pt-2 w-full">
                        Visit Live Link <ExternalLink size={12} className="inline ml-1" />
                      </span>
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Lightbox / Full-Image Preview Modal */}
        {lightboxProject && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={() => setLightboxProject(null)}
              className="absolute inset-0 bg-navy/95 backdrop-blur-md cursor-pointer"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative max-w-4xl max-h-[70vh] bg-transparent rounded-2xl overflow-visible flex flex-col items-center justify-center z-10 w-full"
            >
              <button 
                type="button"
                aria-label="Close modal"
                onClick={() => setLightboxProject(null)}
                className="absolute -top-3 -right-3 md:top-4 md:right-4 bg-white/20 hover:bg-white/30 text-white rounded-full p-2.5 backdrop-blur-md transition-colors z-[120] focus:outline-none cursor-pointer"
              >
                <X size={22} />
              </button>

              {lightboxProject.category === "Videos" ? (
                /* Cinematic simulated player */
                <VideoPlayerModal 
                  project={lightboxProject} 
                  onClose={() => setLightboxProject(null)} 
                />
              ) : (
                /* Poster high end display */
                <div className="flex flex-col items-center">
                  <img 
                    src={lightboxProject.img} 
                    alt={lightboxProject.name} 
                    className="max-h-[65vh] w-auto max-w-full object-contain rounded-[2rem] shadow-2xl border border-white/5 bg-[#172554]/20 p-2"
                    referrerPolicy="no-referrer"
                  />
                  <div className="mt-4 text-center px-6 py-2.5 bg-navy/80 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl max-w-sm">
                    <span className="text-[9px] font-mono font-bold text-primary uppercase tracking-[0.2em]">{lightboxProject.category}</span>
                    <h4 className="text-white text-base font-black tracking-tight mt-0.5">{lightboxProject.name}</h4>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
};

// --- Why Choose Me Section ---
const WhyChooseMe = () => {
  const points = [
    { 
      title: "Real Client Experience", 
      desc: "1.7 years of proven results with healthcare and real estate brands.",
      icon: <CheckCircle2 className="text-primary" size={24} />,
      color: "bg-blue-50"
    },
    { 
      title: "Consistent & Reliable", 
      desc: "I ensure your brand stays active and professional every single day.",
      icon: <Layout className="text-emerald-500" size={24} />,
      color: "bg-emerald-50"
    },
    { 
      title: "Business Focused", 
      desc: "I focus on your business goals, not just pretty designs.",
      icon: <Palette className="text-purple-500" size={24} />,
      color: "bg-purple-50"
    },
    { 
      title: "Quick Support", 
      desc: "Fast communication and transparent updates throughout the project.",
      icon: <MessageSquare className="text-orange-500" size={24} />,
      color: "bg-orange-50"
    }
  ];

  return (
    <section className="py-20 md:py-28 px-6 md:px-12 lg:px-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-sm uppercase tracking-widest text-primary font-bold mb-4">Why Choose Me</h2>
            <h3 className="text-4xl md:text-5xl mb-8 leading-tight">Design that builds trust & authority for your brand</h3>
            <p className="text-lg text-slate-600 mb-10 leading-relaxed">
              I combine creative expertise with a deep understanding of business needs to deliver results that actually matter.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6">
            {points.map((point, idx) => (
              <motion.div 
                key={point.title} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`${point.color} p-8 rounded-[2.5rem] border border-transparent md:hover:border-slate-200 transition-all group`}
              >
                <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center mb-6 shadow-sm md:group-hover:scale-110 transition-transform">
                  {point.icon}
                </div>
                <h4 className="font-bold text-navy mb-3 text-lg">{point.title}</h4>
                <p className="text-slate-600 text-sm leading-relaxed">{point.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Process Section ---
const Process = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    { 
      title: "Understand", 
      desc: "Deep dive into your brand goals.", 
      icon: <MessageSquare size={20} />, 
      color: "bg-blue-500", 
      borderColor: "border-blue-200", 
      textColor: "text-blue-600",
      lightBg: "bg-blue-50/50",
      details: "Understanding your current baseline, target audience, and business goals to outline your brand message.",
      actions: ["Brand Audit & Assessment", "Competitor & Trend Analysis", "1-on-1 Discovery Sync Session"],
      deliverable: "Strategic Brand Positioning Map"
    },
    { 
      title: "Strategy", 
      desc: "Planning for maximum impact.", 
      icon: <Layout size={20} />, 
      color: "bg-indigo-500", 
      borderColor: "border-indigo-200", 
      textColor: "text-indigo-600",
      lightBg: "bg-indigo-50/50",
      details: "Translating discovery findings into a robust content strategy with clear timelines and messaging pillars.",
      actions: ["Monthly Content Calendar Setup", "Creative Moodboard Selection", "Vibe & Style Direction Guidelines"],
      deliverable: "Aesthetic Direction & Content Plan"
    },
    { 
      title: "Drafting", 
      desc: "Creating the first set of visuals.", 
      icon: <Palette size={20} />, 
      color: "bg-purple-500", 
      borderColor: "border-purple-200", 
      textColor: "text-purple-600",
      lightBg: "bg-purple-50/50",
      details: "Bringing concepts to life using Canva, CapCut, and advanced design principles. High-fidelity first drafts.",
      actions: ["High-End Social Media Creatives", "Reels & Shorts Video Editing", "Engaging Captions & Hook Writing"],
      deliverable: "First Batch of Video & Graphic Drafts"
    },
    { 
      title: "Refining", 
      desc: "Perfecting based on your feedback.", 
      icon: <CheckCircle2 size={20} />, 
      color: "bg-pink-500", 
      borderColor: "border-pink-200", 
      textColor: "text-pink-600",
      lightBg: "bg-pink-50/50",
      details: "Reviewing the drafts together, adjusting tone, captions, visual pacing, and formatting.",
      actions: ["Structured Revision Rounds", "Micro-adjusting Typography & Sound", "Visual Alignment Checks"],
      deliverable: "Final Approved & Polished Assets"
    },
    { 
      title: "Delivery", 
      desc: "High-quality final files ready to post.", 
      icon: <ExternalLink size={20} />, 
      color: "bg-emerald-500", 
      borderColor: "border-emerald-200", 
      textColor: "text-emerald-600",
      lightBg: "bg-emerald-50/50",
      details: "Exporting high-resolution final content and publishing seamlessly via Meta Business Suite scheduler.",
      actions: ["Seamless Meta Business Suite Scheduling", "Optimized Hashtags & SEO Tags", "Delivery of High-Res Google Drive files"],
      deliverable: "Publish-Ready Scheduled Content"
    }
  ];

  return (
    <section className="py-20 md:py-28 px-6 md:px-12 lg:px-24 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-sm uppercase tracking-widest text-primary font-bold mb-4">How I Work</h2>
            <h3 className="text-4xl md:text-5xl mb-0 font-display font-black text-navy leading-tight">A simple, transparent process to elevate your brand</h3>
          </div>
          <div className="hidden md:block">
            <div className="w-24 h-24 rounded-full border-2 border-dashed border-slate-300 flex items-center justify-center text-slate-400 animate-spin-slow">
              <ArrowRight size={32} className="rotate-45" />
            </div>
          </div>
        </div>

        {/* Process Flow Chart Interactive UI */}
        <div className="space-y-12">
          
          {/* Connector Flow Line & Stepper Nodes */}
          <div className="relative pb-4">
            
            {/* Horizontal Line for Desktop */}
            <div className="absolute top-10 left-[10%] right-[10%] h-[3px] bg-slate-200/60 rounded-full hidden md:block">
              <motion.div 
                className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-500 rounded-full shadow-lg"
                animate={{ width: `${(activeStep / 4) * 100}%` }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />
            </div>

            {/* Stepper Grid */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-4 relative z-10">
              {steps.map((step, idx) => {
                const isActive = activeStep === idx;
                const isCompleted = activeStep > idx;
                
                return (
                  <button
                    key={step.title}
                    onClick={() => setActiveStep(idx)}
                    className="flex md:flex-col items-start md:items-center text-left md:text-center p-4 rounded-2xl md:bg-transparent bg-white border md:border-transparent border-slate-200/50 hover:border-slate-300 md:hover:border-transparent transition-all duration-300 group focus:outline-none w-full cursor-pointer"
                  >
                    {/* Circle Node */}
                    <div className="relative mb-0 md:mb-5 mr-4 md:mr-0 shrink-0">
                      <motion.div
                        className={`w-12 h-12 rounded-full flex items-center justify-center border-4 ${
                          isActive 
                            ? "bg-white shadow-xl scale-110 z-20" 
                            : isCompleted 
                              ? `${step.color} text-white border-white shadow-md z-10` 
                              : "bg-slate-100 text-slate-400 border-slate-200 z-0"
                        } transition-all duration-300`}
                        animate={{
                          borderColor: isActive ? "rgba(59, 130, 246, 1)" : isCompleted ? "#ffffff" : "rgba(226, 232, 240, 1)",
                          boxShadow: isActive ? "0px 10px 25px -5px rgba(59, 130, 246, 0.3)" : "none"
                        }}
                      >
                        <span className={isActive ? step.textColor : isCompleted ? "text-white" : "text-slate-400"}>
                          {step.icon}
                        </span>
                      </motion.div>
                      
                      {/* Floating Step Tag */}
                      <span className="absolute -top-3 -right-3 bg-slate-900 text-white font-mono font-black text-[9px] rounded-full w-5 h-5 flex items-center justify-center border border-white">
                        0{idx + 1}
                      </span>
                    </div>

                    {/* Step Texts */}
                    <div>
                      <h4 className={`text-base font-bold transition-colors duration-300 ${isActive ? "text-primary font-black" : "text-navy"}`}>
                        {step.title}
                      </h4>
                      <p className="text-slate-500 text-xs mt-0.5 font-semibold leading-relaxed hidden md:block max-w-[150px] mx-auto">
                        {step.desc}
                      </p>
                      <p className="text-slate-500 text-[11px] mt-0.5 font-semibold leading-relaxed md:hidden">
                        {step.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Step Panel / Dashboard */}
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="bg-white border border-slate-200/60 rounded-[2.5rem] p-6 md:p-10 shadow-xl relative overflow-hidden"
          >
            {/* Diagonal Vibe Accent */}
            <div className={`absolute top-0 left-0 w-3 h-full ${steps[activeStep].color}`} />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Column: Stage Detail & Deliverables */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <span className={`text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full ${steps[activeStep].textColor} ${steps[activeStep].lightBg} border ${steps[activeStep].borderColor}`}>
                    STAGE 0{activeStep + 1} • {steps[activeStep].title.toUpperCase()}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-display font-black text-navy mt-3 tracking-tight">
                    {steps[activeStep].title} Phase
                  </h3>
                  <p className="text-slate-600 text-sm md:text-base font-semibold mt-2 leading-relaxed">
                    {steps[activeStep].details}
                  </p>
                </div>

                {/* Key Action items checklist */}
                <div className="space-y-3">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Key Activities & Workflows
                  </h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {steps[activeStep].actions.map((action, i) => (
                      <div key={i} className="flex items-center gap-3 bg-slate-50/60 border border-slate-100 p-3 rounded-xl">
                        <div className={`w-5 h-5 rounded-full ${steps[activeStep].textColor} ${steps[activeStep].lightBg} flex items-center justify-center shrink-0`}>
                          <Check size={11} strokeWidth={3} />
                        </div>
                        <span className="text-slate-700 text-xs font-semibold">{action}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Major Deliverable Pin */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Primary Deliverable:
                  </span>
                  <span className={`text-xs font-bold px-3.5 py-1.5 rounded-xl border ${steps[activeStep].textColor} ${steps[activeStep].lightBg} ${steps[activeStep].borderColor} flex items-center gap-2`}>
                    <Sparkles size={12} />
                    {steps[activeStep].deliverable}
                  </span>
                </div>
              </div>

              {/* Right Column: Visual Flowchart Simulator Card */}
              <div className="lg:col-span-5 bg-slate-50 border border-slate-100 rounded-3xl p-6 relative overflow-hidden self-stretch flex flex-col justify-between group">
                <div className="absolute top-3 right-3 text-[10px] font-mono font-bold text-slate-300">
                  FLOW DIAGRAM
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-400 uppercase">Process Progress</span>
                    <span className={`text-xs font-black font-mono ${steps[activeStep].textColor}`}>
                      {Math.round(((activeStep + 1) / 5) * 100)}% Complete
                    </span>
                  </div>
                  
                  {/* Progress bar inside panel */}
                  <div className="w-full h-2.5 bg-slate-200/60 rounded-full overflow-hidden">
                    <motion.div 
                      className={`h-full ${steps[activeStep].color}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${((activeStep + 1) / 5) * 100}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>

                {/* Simulated visual flow nodes */}
                <div className="my-8 flex justify-center items-center gap-3">
                  {[0, 1, 2, 3, 4].map((nodeIdx) => {
                    const isNodeActive = nodeIdx === activeStep;
                    const isNodePast = nodeIdx < activeStep;
                    return (
                      <React.Fragment key={nodeIdx}>
                        <div 
                          className={`w-7 h-7 rounded-full flex items-center justify-center font-mono text-xs font-black transition-all duration-300 ${
                            isNodeActive 
                              ? `${steps[activeStep].color} text-white ring-4 ring-offset-2 ring-primary/40 scale-110` 
                              : isNodePast 
                                ? "bg-slate-300 text-slate-600" 
                                : "bg-slate-200 text-slate-400"
                          }`}
                        >
                          {nodeIdx + 1}
                        </div>
                        {nodeIdx < 4 && (
                          <div className={`h-0.5 w-6 transition-all duration-300 ${nodeIdx < activeStep ? "bg-slate-300" : "bg-slate-200"}`} />
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>

                {/* Interactive controller button */}
                <div className="flex justify-between items-center gap-4 pt-4 border-t border-slate-200/40">
                  <span className="text-[11px] font-medium text-slate-400">
                    Click steps above or use navigation:
                  </span>
                  <button
                    onClick={() => setActiveStep((prev) => (prev + 1) % 5)}
                    className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-bold py-1.5 px-3 rounded-full shadow-sm hover:shadow transition-all cursor-pointer select-none"
                  >
                    Next Stage <ArrowRight size={12} />
                  </button>
                </div>

              </div>

            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// --- Contact Section ---
const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState("Social Media");
  const [message, setMessage] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("naveenraja3663@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      return;
    }

    const text = `Hello Naveen,\n\nI just viewed your Portfolio and would like to get in touch!\n\n*Name:* ${name}\n*Email:* ${email}\n*Category:* ${category}\n*Message:* ${message}`;
    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/6385941180?text=${encodedText}`;

    // Show the nice popup modal and redirect to WhatsApp
    setShowSuccessModal(true);
    window.open(whatsappUrl, "_blank");
  };

  return (
    <section id="contact" className="py-16 md:py-20 bg-slate-50 px-4 sm:px-6 md:px-12 lg:px-24 relative overflow-hidden">
      {/* Background soft styling details */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-50/50 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white border border-slate-200/60 p-6 md:p-8 lg:p-10 rounded-[2rem] shadow-xl hover:shadow-2xl transition-all duration-500 relative"
        >
          {/* Subtle design gradient accent */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-50 to-transparent rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
            
            {/* Left Column: Heading, Subtitle, Direct Buttons */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-6 md:space-y-8">
              <div>
                <span className="text-xs uppercase tracking-[0.25em] text-primary font-bold mb-3.5 inline-block bg-blue-50 border border-blue-100 px-4 py-1.5 rounded-full select-none">
                  GET IN TOUCH
                </span>
                <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-black leading-tight text-navy mb-4 tracking-tight">
                  Let’s Build Something Great Together
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-semibold">
                  Looking for someone reliable to handle your design, social page growth, or video edit plans? Send a message and let's discuss details directly on WhatsApp!
                </p>
              </div>

              {/* Minimal Contact Pills with Copy Email Feature */}
              <div className="grid grid-cols-1 gap-3.5">
                {/* Direct Call Card */}
                <a 
                  href="tel:6385941180"
                  className="flex items-center gap-4 bg-slate-50 hover:bg-slate-100/60 p-4 rounded-xl border border-slate-200/40 hover:border-primary/20 transition-all group shadow-sm"
                >
                  <div className="w-10 h-10 bg-primary/5 rounded-lg flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-white transition-all">
                    <Phone size={16} />
                  </div>
                  <div>
                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider leading-none">Call Me</p>
                    <p className="text-sm sm:text-base font-bold text-navy mt-1.5">6385941180</p>
                  </div>
                </a>

                {/* Email Card with Quick Click-to-Copy */}
                <div 
                  onClick={handleCopyEmail}
                  className="flex items-center justify-between gap-4 bg-slate-50 hover:bg-slate-100/60 p-4 rounded-xl border border-slate-200/40 hover:border-primary/20 transition-all group shadow-sm cursor-pointer relative"
                  title="Click to copy email address"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-10 h-10 bg-primary/5 rounded-lg flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-white transition-all">
                      <Mail size={16} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider leading-none">Email Me</p>
                      <p className="text-sm sm:text-base font-bold text-navy mt-1.5 select-all leading-none font-sans block">
                        naveenraja3663@gmail.com
                      </p>
                    </div>
                  </div>

                  <button 
                    type="button"
                    className="p-1.5 rounded-md hover:bg-slate-200/50 text-slate-400 hover:text-slate-600 transition-all shrink-0"
                    aria-label="Copy email address"
                  >
                    {copied ? (
                      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded border border-emerald-100 flex items-center gap-1">
                        <Check size={11} strokeWidth={3} /> Copied!
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold text-slate-400 group-hover:text-primary flex items-center gap-1.5 bg-white border border-slate-200 px-2 py-1 rounded-lg transition-colors">
                        <Copy size={11} /> Copy
                      </span>
                    )}
                  </button>
                </div>
              </div>

              {/* Enhanced Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a 
                  href={`https://wa.me/6385941180?text=${encodeURIComponent("Hello Naveen, I'm reaching out from your Portfolio. Let's collaborate!")}`} 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white px-6 py-3.5 rounded-xl font-bold hover:shadow-lg hover:shadow-green-100 transition-all text-xs sm:text-sm select-none"
                >
                  <MessageSquare size={16} /> Chat on WhatsApp
                </a>
                <a 
                  href="https://drive.google.com/file/d/1WDRO1gBi7c5ap7K8Zse0qcteeXM7R1sC/view?usp=sharing" 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-navy hover:bg-navy/95 text-white px-6 py-3.5 rounded-xl font-bold hover:shadow-lg hover:shadow-navy/10 transition-all text-xs sm:text-sm select-none"
                >
                  <FileText size={16} /> View Resume
                </a>
              </div>
            </div>

            {/* Right Column: Premium Form Card with all details visible */}
            <div className="lg:col-span-6 bg-slate-50/50 border border-slate-100/80 p-5 md:p-6 rounded-2xl flex flex-col justify-center">
              <form className="space-y-3.5 w-full" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-[9px] uppercase font-bold tracking-wider text-slate-400 mb-1 ml-0.5">Your Name</label>
                    <input 
                      type="text" 
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. John Doe" 
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200/50 focus:border-primary focus:ring-1 focus:ring-primary transition-all text-xs outline-none font-semibold text-navy shadow-sm" 
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] uppercase font-bold tracking-wider text-slate-400 mb-1 ml-0.5">Your Email</label>
                    <input 
                      type="email" 
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. email@address.com" 
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200/50 focus:border-primary focus:ring-1 focus:ring-primary transition-all text-xs outline-none font-semibold text-navy shadow-sm" 
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[9px] uppercase font-bold tracking-wider text-slate-400 mb-1 ml-0.5">Interested Category</label>
                  <div className="relative">
                    <select 
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200/50 focus:border-primary focus:ring-1 focus:ring-primary transition-all text-xs outline-none font-semibold text-navy cursor-pointer appearance-none shadow-sm pr-10"
                    >
                      <option value="Social Media">Social Media (Growth, Reels, Strategy)</option>
                      <option value="Poster Editing">Poster Editing (Creative Graphics, Branding)</option>
                      <option value="Video Editing">Video Editing (Reels, Shorts, Video Ads)</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
                      <ChevronRight size={14} className="rotate-90" />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[9px] uppercase font-bold tracking-wider text-slate-400 mb-1 ml-0.5">Message Detail</label>
                  <textarea 
                    rows={2.5} 
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell me briefly about your business goals and project needs..." 
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200/50 focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none text-xs outline-none font-semibold text-navy shadow-sm"
                  />
                </div>

                {/* Ultimate CTA Button */}
                <button 
                  type="submit"
                  className="w-full bg-navy hover:bg-navy/95 text-white py-3.5 rounded-xl font-bold text-xs sm:text-sm shadow-md hover:shadow-lg hover:shadow-navy/10 active:scale-[0.99] transition-all cursor-pointer select-none flex items-center justify-center gap-2"
                >
                  <Send size={14} /> Send Inquiry & Start Chat
                </button>
              </form>
            </div>

          </div>
        </motion.div>
      </div>

      {/* Elegant Successful Confirmation Pop-up Modal */}
      <AnimatePresence>
        {showSuccessModal && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSuccessModal(false)}
              className="absolute inset-0 bg-navy/80 backdrop-blur-sm cursor-pointer"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white rounded-[2.5rem] p-8 max-w-md w-full shadow-2xl relative z-10 text-center border border-slate-100"
            >
              <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-100 shadow-inner">
                <CheckCircle2 size={32} />
              </div>
              <h4 className="text-2xl font-display font-black text-navy mb-2">Message Sent!</h4>
              <p className="text-slate-500 text-sm mb-6 leading-relaxed font-normal">
                Your message has been sent successfully. Click the green button below to start chat session directly on WhatsApp!
              </p>
              <div className="flex flex-col gap-2">
                <a 
                  href={`https://wa.me/6385941180?text=${encodeURIComponent(`Hello Naveen,\n\nI just viewed your Portfolio and would like to get in touch!\n\n*Name:* ${name}\n*Email:* ${email}\n*Category:* ${category}\n*Message:* ${message}`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] text-white py-3.5 rounded-xl font-bold hover:bg-[#20ba5a] hover:shadow-md transition-all text-sm select-none"
                >
                  <MessageSquare size={15} /> Continue to WhatsApp Chat
                </a>
                <button 
                  onClick={() => {
                    setShowSuccessModal(false);
                    setName("");
                    setEmail("");
                    setMessage("");
                  }}
                  className="w-full text-slate-400 hover:text-slate-600 font-bold text-xs py-2 cursor-pointer transition-colors mt-1"
                >
                  Close Window
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

// --- Footer Component ---
const Footer = () => {
  const [showPrivacy, setShowPrivacy] = useState(false);

  return (
    <footer className="bg-[#0B0F19] text-white pt-20 pb-10 border-t border-white/5 relative overflow-hidden">
      {/* Abstract Grid Background overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 relative z-10">
        <div className="grid md:grid-cols-12 gap-12 mb-16">
          <div className="md:col-span-5">
            <h5 className="font-bold font-display text-xs uppercase tracking-widest text-[#4F8CFF] mb-6">About Me</h5>
            <p className="text-slate-400 max-w-md leading-relaxed text-xs md:text-sm">
              Expert Social Media Manager & Creative Designer helping healthcare, real estate, and digital brands build massive credibility, grow community engagement, and drive high-yield lead generation campaigns through refined aesthetic assets.
            </p>
          </div>

          <div className="md:col-span-3">
            <h5 className="font-bold font-display text-xs uppercase tracking-widest text-[#4F8CFF] mb-6">Quick Links</h5>
            <ul className="space-y-3.5 text-slate-400 font-semibold text-xs md:text-sm">
              <li><a href="#about" className="hover:text-primary transition-colors">About Who I Am</a></li>
              <li><a href="#services" className="hover:text-primary transition-colors">Services Offered</a></li>
              <li><a href="#experience" className="hover:text-primary transition-colors">Work Experience</a></li>
              <li><a href="#work" className="hover:text-primary transition-colors">Creative Showcase</a></li>
              <li><a href="#contact" className="hover:text-primary transition-colors">Get In Touch</a></li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <h5 className="font-bold font-display text-xs uppercase tracking-widest text-[#4F8CFF] mb-6">For Hiring Managers</h5>
            <div className="border-l-2 border-primary/40 pl-4 py-1">
              <p className="text-xs md:text-sm text-slate-300 italic font-medium leading-relaxed">
                "Great design and high-converting content are deliberately engineered. If you need a partner who takes absolute ownership of visual branding and social growth to deliver actual, measurable outcomes, let me deliver excellence for your team."
              </p>
              <p className="text-[10px] text-primary font-bold uppercase tracking-wider mt-3">
                ✦ Available for Contracts, Retainers, & Roles
              </p>
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-slate-500 font-semibold">
          <p className="font-medium">
            © {new Date().getFullYear()} Naveen Raja. All rights reserved. Built with pride.
          </p>
          <div className="flex gap-8">
            <button 
              onClick={() => setShowPrivacy(true)}
              className="hover:text-slate-300 transition-colors cursor-pointer text-xs font-semibold focus:outline-none"
            >
              Privacy Statement
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Privacy Policy Modal */}
      <AnimatePresence>
        {showPrivacy && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPrivacy(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-[#0B0F19] text-white rounded-[2.5rem] p-6 md:p-8 max-w-xl w-full border border-white/10 shadow-2xl relative z-10 max-h-[80vh] overflow-y-auto text-left"
            >
              <button 
                onClick={() => setShowPrivacy(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-full p-2.5 transition-all cursor-pointer focus:outline-none"
              >
                <X size={18} />
              </button>
              <div className="flex items-center gap-2.5 mb-6 border-b border-white/10 pb-4">
                <CheckCircle2 className="text-primary" size={24} />
                <h4 className="text-xl md:text-2xl font-display font-black tracking-tight">Privacy Policy</h4>
              </div>
              <div className="space-y-4 text-xs md:text-sm text-slate-300 leading-relaxed font-normal">
                <p>
                  Welcome to the digital portfolio of <strong>Naveen Raja</strong>. Your privacy is protected with professional standards.
                </p>
                <div>
                  <h5 className="font-bold text-white mb-1 uppercase font-mono tracking-wider text-xs text-primary">1. Information Collection</h5>
                  <p>
                    When using the "Get In Touch" message system, personal parameters including your <strong>Name, Email, Category Focus Selection, and Custom Text body</strong> are safely collected strictly for forming communications.
                  </p>
                </div>
                <div>
                  <h5 className="font-bold text-white mb-1 uppercase font-mono tracking-wider text-xs text-primary">2. Direct Transfer Channels (WhatsApp)</h5>
                  <p>
                    The dynamic message form converts user variables directly into a standard formatted redirection query delivered straight to secure WhatsApp servers. <strong>Your private credentials are not logged, cached, or saved on databases or tracking cookies.</strong>
                  </p>
                </div>
                <div>
                  <h5 className="font-bold text-white mb-1 uppercase font-mono tracking-wider text-xs text-primary">3. Tracking and Analytics</h5>
                  <p>
                    No invasive analytics tracking scripts run on this platform. We remain fully committed to browser integrity without tracking user geographical logs.
                  </p>
                </div>
              </div>
              <div className="mt-8 pt-4 border-t border-white/10 text-center">
                <button 
                  onClick={() => setShowPrivacy(false)}
                  className="px-6 py-2.5 bg-primary hover:bg-primary/95 text-white font-bold rounded-xl text-xs transition-all cursor-pointer focus:outline-none"
                >
                  I Acknowledge & Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </footer>
  );
};

export default function PortfolioApp() {
  return (
    <div className="antialiased">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Experience />
        <Portfolio />
        <WhyChooseMe />
        <Process />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
