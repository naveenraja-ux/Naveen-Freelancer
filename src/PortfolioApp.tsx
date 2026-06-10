import { motion, AnimatePresence } from "motion/react";
import { 
  Instagram, 
  Video, 
  Palette, 
  FileText, 
  CheckCircle2, 
  ArrowRight, 
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
  Layers,
  Globe,
  TrendingUp,
  Film,
  Sparkles,
  Smartphone,
  Play,
  Pause
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

  return (
    <span ref={elementRef} className={`block text-3xl md:text-5xl font-extrabold ${colorClass} font-mono tracking-tight transition-all duration-300`}>
      {displayVal}{suffix}
    </span>
  );
};

// --- Navbar Component ---
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Experience", href: "#experience" },
    { name: "Work", href: "#work" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-white/90 backdrop-blur-md py-4 shadow-sm" : "bg-transparent py-6"}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 flex justify-between items-center">
        <div className="w-10 h-10" />

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="text-sm font-medium hover:text-primary transition-colors">
              {link.name}
            </a>
          ))}
          <a 
            href="https://drive.google.com/file/d/1-XcVYxJoQDDnD8-wLkxR3YPLB-MJEJWq/view?usp=sharing" 
            target="_blank" 
            rel="noreferrer"
            className="text-sm font-semibold text-navy hover:text-primary transition-colors flex items-center gap-2"
          >
            <FileText size={18} /> Resume
          </a>
          <a href="#contact" className="bg-navy text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-navy/90 transition-all">
            Let's Talk
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-navy" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 w-full bg-white shadow-xl py-8 px-6 flex flex-col gap-6 md:hidden"
        >
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-lg font-medium text-navy"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <a 
            href="https://drive.google.com/file/d/1-XcVYxJoQDDnD8-wLkxR3YPLB-MJEJWq/view?usp=sharing" 
            target="_blank" 
            rel="noreferrer"
            className="text-lg font-semibold text-navy flex items-center gap-3"
            onClick={() => setIsMenuOpen(false)}
          >
            <FileText size={22} /> View Resume
          </a>
          <a 
            href="#contact" 
            className="bg-navy text-white px-6 py-4 rounded-xl text-center font-semibold"
            onClick={() => setIsMenuOpen(false)}
          >
            Let's Talk
          </a>
        </motion.div>
      )}
    </nav>
  );
};

// --- Hero Section ---
const Hero = () => {
  return (
    <section className="relative pt-[60px] pb-16 md:pt-[80px] md:pb-24 overflow-hidden px-6 md:px-12 lg:px-24 bg-white">
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
            <div className="inline-flex items-center gap-2 bg-blue-50 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Available for Projects
            </div>

            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-[64px] font-display font-black leading-[1.15] mb-6 tracking-tighter text-navy text-left max-w-2xl">
              Content That Connects.<br />
              <span className="text-primary font-black">Brands That Grow.</span>
            </h1>

            {/* Supporting Description text */}
            <p className="text-base md:text-xl font-semibold text-slate-500 tracking-wider mb-8 text-left">
              Social Media Manager • Digital Designer • Video Editor
            </p>

            {/* CTA buttons with modern animations and styles */}
            <div className="flex flex-wrap gap-4 mb-10 w-full sm:w-auto justify-start">
              <motion.a 
                href="#work" 
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                className="relative bg-gradient-to-r from-primary via-blue-600 to-indigo-600 text-white px-8 py-4 rounded-full font-bold flex items-center gap-2.5 text-base shadow-lg shadow-primary/25 overflow-hidden group cursor-pointer z-10"
              >
                {/* Micro-interactive radial glare overlay */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer pointer-events-none" />
                View My Work 
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                >
                  <ArrowRight size={20} />
                </motion.span>
              </motion.a>
              <motion.a 
                href="https://drive.google.com/file/d/1-XcVYxJoQDDnD8-wLkxR3YPLB-MJEJWq/view?usp=sharing" 
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

            {/* Inline Trust Partners & Proof under CTA */}
            <div className="pt-6 border-t border-slate-100 w-full flex flex-col items-start justify-start">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 text-left">Key Impact</p>
              <div className="flex flex-wrap items-center justify-start gap-4 text-sm text-slate-600 font-medium text-left">
                <span><span className="text-primary font-bold">50+</span> Reels Created</span>
                <span className="text-slate-300">•</span>
                <span><span className="text-primary font-bold">250K+</span> Total Views</span>
              </div>
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
                value: 2,
                suffix: "+",
                title: "Years of Experience",
                colorClass: "text-primary",
                desc: "Real-world client branding expertise",
                badge: "Proven Record"
              },
              {
                value: 50,
                suffix: "+",
                title: "Reels Created",
                colorClass: "text-navy",
                desc: "Engineered from hook to copy",
                badge: "Viral Hook Setup"
              },
              {
                value: 8,
                suffix: "+",
                title: "Websites Hosted Live",
                colorClass: "text-primary",
                desc: "High-performance responsive designs",
                badge: "Web Launch"
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
                    decimals={0} 
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
          className="text-left w-full max-w-5xl"
        >
          <span className="text-xs uppercase tracking-[0.25em] text-primary font-bold mb-5 bg-blue-50/80 px-4 py-1.5 rounded-full border border-blue-100 inline-block select-none shadow-sm/50">
            Who I Am
          </span>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-10 items-start mb-12">
            <div className="lg:col-span-6">
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-navy tracking-tight leading-none">
                I’m Naveen, a
              </h3>
              
              {/* Premium Standalone, Left-Aligned Spacious Animated Box */}
              <div className="mt-4 w-full bg-gradient-to-r from-blue-50/80 to-indigo-50/30 border border-blue-100/60 p-4 md:p-5 rounded-2xl shadow-sm relative overflow-hidden flex items-center gap-4 group hover:border-primary/20 transition-all duration-300">
                <div className="absolute top-0 right-0 p-2 opacity-20 group-hover:opacity-40 transition-opacity">
                  <Sparkles size={16} className="text-primary animate-pulse" />
                </div>
                <div className="w-2 md:w-2.5 h-10 md:h-12 bg-primary rounded-full shrink-0 shadow-sm" />
                
                {/* Generous layout width to prevent any clipping/overflow of "Social Media Manager" */}
                <div className="relative h-10 md:h-12 flex items-center min-w-[280px] sm:min-w-[340px] md:min-w-[450px] w-full">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={currentWordIndex}
                      initial={{ x: -15, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: 15, opacity: 0 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      className="absolute text-primary font-black text-xl sm:text-2xl md:text-3.5xl tracking-tight select-none text-left leading-none"
                    >
                      {words[currentWordIndex]}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 lg:pt-2">
              <div className="text-sm md:text-base text-slate-500 leading-relaxed font-semibold">
                <p>
                  I help brands grow through content creation, social media management, video editing, and creative design. From planning content calendars to creating engaging reels and building digital experiences, I focus on helping businesses stand out and connect with their audience.
                </p>
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
    <section id="services" className="py-16 bg-slate-50 px-6 md:px-12 lg:px-24 relative overflow-hidden">
      {/* Subtle modern alignment grids for UI designer motif */}
      <div className="absolute top-0 left-1/4 w-[1px] h-full bg-slate-100 -z-10 pointer-events-none" />
      <div className="absolute top-0 left-3/4 w-[1px] h-full bg-slate-100 -z-10 pointer-events-none" />
      <div className="absolute top-1/4 left-0 right-0 h-[1px] bg-slate-100 -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-xs uppercase tracking-[0.2em] text-primary font-bold mb-3 inline-block bg-blue-50 px-3.5 py-1 rounded-full border border-blue-100">
              What I Do
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-black text-navy mb-4 tracking-tight leading-tight">
              Services That Help Brands Grow
            </h2>
            <p className="text-slate-500 text-sm md:text-base max-w-2xl mx-auto font-medium leading-relaxed">
              From content creation to digital experiences, helping brands build a strong and cohesive online presence.
            </p>
          </motion.div>
        </div>

        {/* Grid - Symmetrical, vertically compact, highly responsive */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">

          {/* Card 1: Social Media Management */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
            whileHover={{ y: -5 }}
            className="bg-white hover:bg-white/95 border border-slate-100 hover:border-primary/25 p-6 rounded-[2rem] shadow-sm hover:shadow-lg transition-all duration-300 relative overflow-hidden flex flex-col justify-between group cursor-default"
          >
            <div className="absolute top-3 left-3 text-[8px] text-slate-300 group-hover:text-primary transition-colors font-mono select-none font-bold">[01]</div>
            <div className="absolute -top-10 -right-10 w-24 h-24 bg-primary/5 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Hover Micro-Animation: Engagement Spike */}
            <div className="absolute right-4 bottom-16 pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 z-10">
              <motion.div
                animate={{ y: [0, -4, 0], rotate: [0, -2, 2, 0] }}
                transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
                className="bg-primary hover:bg-primary/95 text-white text-[9px] px-2 py-0.5 rounded-lg font-bold shadow-md flex items-center gap-1 font-mono tracking-wider"
              >
                <span>🔥 +148% Reach</span>
              </motion.div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-4">
                <motion.div 
                  whileHover={{ rotate: 12, scale: 1.1 }}
                  className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center text-primary shadow-sm border border-blue-100/50"
                >
                  <Smartphone size={20} />
                </motion.div>
                
                <button 
                  onClick={() => setOpenModalId("Social Media Management")}
                  className="text-[9px] font-bold text-slate-400 hover:text-primary transition-colors py-1 px-3 bg-slate-50 hover:bg-primary/5 border border-slate-100 rounded-full cursor-pointer shadow-sm select-none"
                >
                  Details
                </button>
              </div>

              <h3 className="text-lg font-display font-black text-navy mb-1 tracking-tight">
                Social Media
              </h3>
              <p className="text-slate-500 text-[12px] mb-4 font-medium leading-relaxed min-h-[36px]">
                Plan, manage and grow brand presence across Instagram and Facebook with ads and campaigns.
              </p>

              <div className="space-y-1.5 mb-6 text-[11px] font-bold text-navy">
                <div className="flex items-center gap-2">
                  {checkMark}
                  <span>Content Planning</span>
                </div>
                <div className="flex items-center gap-2">
                  {checkMark}
                  <span>Reels Management</span>
                </div>
                <div className="flex items-center gap-2">
                  {checkMark}
                  <span>Meta Ads Support</span>
                </div>
              </div>
            </div>

            {/* Metric Footer */}
            <div className="border-t border-slate-100 pt-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-primary shrink-0 animate-pulse">
                <TrendingUp size={14} />
              </div>
              <div>
                <h4 className="text-lg font-black font-mono tracking-tight text-primary leading-none">
                  <AnimatedCounter value={50} suffix="+" colorClass="text-primary" />
                </h4>
                <p className="text-[9px] font-bold text-slate-400 mt-0.5">Reels Created</p>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Video Editing */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ y: -5 }}
            className="bg-white hover:bg-white/95 border border-slate-100 hover:border-red-500/25 p-6 rounded-[2rem] shadow-sm hover:shadow-lg transition-all duration-300 relative overflow-hidden flex flex-col justify-between group cursor-default"
          >
            <div className="absolute top-3 left-3 text-[8px] text-slate-300 group-hover:text-red-500 transition-colors font-mono select-none font-bold">[02]</div>
            <div className="absolute -top-10 -right-10 w-24 h-24 bg-red-500/5 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Hover Micro-Animation: Timeline Sync */}
            <div className="absolute right-4 bottom-16 pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 z-10">
              <motion.div
                animate={{ y: [0, -3, 0], scale: [1, 1.04, 1] }}
                transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                className="bg-rose-500 text-white text-[9px] px-2 py-0.5 rounded-lg font-bold shadow-md flex items-center gap-1 font-mono tracking-wider"
              >
                <span>🎬 SYNCHRONIZED</span>
              </motion.div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-4">
                <motion.div 
                  whileHover={{ rotate: -12, scale: 1.1 }}
                  className="w-11 h-11 rounded-xl bg-red-50 flex items-center justify-center text-red-500 shadow-sm border border-red-100/50"
                >
                  <Film size={20} />
                </motion.div>
                
                <button 
                  onClick={() => setOpenModalId("Video Editing")}
                  className="text-[9px] font-bold text-slate-400 hover:text-red-500 transition-colors py-1 px-3 bg-slate-50 hover:bg-red-500/5 border border-slate-100 rounded-full cursor-pointer shadow-sm select-none"
                >
                  Details
                </button>
              </div>

              <h3 className="text-lg font-display font-black text-navy mb-1 tracking-tight">
                Video Editing
              </h3>
              <p className="text-slate-500 text-[12px] mb-4 font-medium leading-relaxed min-h-[36px]">
                High-quality engaging reels, shorts, and professional promo videos for maximum reach.
              </p>

              <div className="space-y-1.5 mb-6 text-[11px] font-bold text-navy">
                <div className="flex items-center gap-2">
                  {checkMark}
                  <span>Reels Editing</span>
                </div>
                <div className="flex items-center gap-2">
                  {checkMark}
                  <span>Shorts Editing</span>
                </div>
                <div className="flex items-center gap-2">
                  {checkMark}
                  <span>Promo Videos</span>
                </div>
              </div>
            </div>

            {/* Metric Footer */}
            <div className="border-t border-slate-100 pt-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center text-red-500 shrink-0">
                🎬
              </div>
              <div>
                <h4 className="text-lg font-black font-mono tracking-tight text-red-500 leading-none">
                  <AnimatedCounter value={60} suffix="+" colorClass="text-red-500" />
                </h4>
                <p className="text-[9px] font-bold text-slate-400 mt-0.5">Videos Edited</p>
              </div>
            </div>
          </motion.div>

          {/* Card 3: Creative Design */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            whileHover={{ y: -5 }}
            className="bg-white hover:bg-white/95 border border-slate-100 hover:border-emerald-500/25 p-6 rounded-[2rem] shadow-sm hover:shadow-lg transition-all duration-300 relative overflow-hidden flex flex-col justify-between group cursor-default"
          >
            <div className="absolute top-3 left-3 text-[8px] text-slate-300 group-hover:text-emerald-500 transition-colors font-mono select-none font-bold">[03]</div>
            <div className="absolute -top-10 -right-10 w-24 h-24 bg-emerald-500/5 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Hover Micro-Animation: Vector Splash */}
            <div className="absolute right-4 bottom-16 pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 z-10">
              <motion.div
                animate={{ y: [0, -4, 0], rotate: [0, 2, -2, 0] }}
                transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
                className="bg-emerald-500 text-white text-[9px] px-2 py-0.5 rounded-lg font-bold shadow-md flex items-center gap-1 font-mono tracking-wider"
              >
                <span>✨ BRAND ASSETS</span>
              </motion.div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-4">
                <motion.div 
                  whileHover={{ rotate: 12, scale: 1.1 }}
                  className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-500 shadow-sm border border-emerald-100/50"
                >
                  <Palette size={20} />
                </motion.div>
                
                <button 
                  onClick={() => setOpenModalId("Digital & Creative Design")}
                  className="text-[9px] font-bold text-slate-400 hover:text-emerald-500 transition-colors py-1 px-3 bg-slate-50 hover:bg-emerald-500/5 border border-slate-100 rounded-full cursor-pointer shadow-sm select-none"
                >
                  Details
                </button>
              </div>

              <h3 className="text-lg font-display font-black text-navy mb-1 tracking-tight">
                Creative Design
              </h3>
              <p className="text-slate-500 text-[12px] mb-4 font-medium leading-relaxed min-h-[36px]">
                Beautiful poster art, corporate assets, and visuals that build credibility and trust.
              </p>

              <div className="space-y-1.5 mb-6 text-[11px] font-bold text-navy">
                <div className="flex items-center gap-2">
                  {checkMark}
                  <span>Social Posts</span>
                </div>
                <div className="flex items-center gap-2">
                  {checkMark}
                  <span>Branding Assets</span>
                </div>
                <div className="flex items-center gap-2">
                  {checkMark}
                  <span>Graphics Kit</span>
                </div>
              </div>
            </div>

            {/* Metric Footer */}
            <div className="border-t border-slate-100 pt-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500 shrink-0">
                🎨
              </div>
              <div>
                <h4 className="text-lg font-black font-mono tracking-tight text-emerald-500 leading-none">
                  <AnimatedCounter value={90} suffix="+" colorClass="text-emerald-500" />
                </h4>
                <p className="text-[9px] font-bold text-slate-400 mt-0.5">Posts Designed</p>
              </div>
            </div>
          </motion.div>

          {/* Card 4: Website Design */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ y: -5 }}
            className="bg-white hover:bg-white/95 border border-slate-100 hover:border-purple-600/25 p-6 rounded-[2rem] shadow-sm hover:shadow-lg transition-all duration-300 relative overflow-hidden flex flex-col justify-between group cursor-default"
          >
            <div className="absolute top-3 left-3 text-[8px] text-slate-300 group-hover:text-purple-600 transition-colors font-mono select-none font-bold">[04]</div>
            <div className="absolute -top-10 -right-10 w-24 h-24 bg-purple-600/5 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Hover Micro-Animation: Platform Ingress */}
            <div className="absolute right-4 bottom-16 pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 z-10">
              <motion.div
                animate={{ y: [0, -3, 0], scale: [1, 1.03, 0.98, 1] }}
                transition={{ repeat: Infinity, duration: 2.8, ease: "easeInOut" }}
                className="bg-purple-600 text-white text-[9px] px-2 py-0.5 rounded-lg font-bold shadow-md flex items-center gap-1 font-mono tracking-wider"
              >
                <span>⚡ DEPLOYED 0.2s</span>
              </motion.div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-4">
                <motion.div 
                  whileHover={{ rotate: 12, scale: 1.1 }}
                  className="w-11 h-11 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 shadow-sm border border-purple-100/50"
                >
                  <Globe size={20} />
                </motion.div>
                
                <button 
                  onClick={() => setOpenModalId("Website Design")}
                  className="text-[9px] font-bold text-slate-400 hover:text-purple-600 transition-colors py-1 px-3 bg-slate-50 hover:bg-purple-5050 border border-slate-100 rounded-full cursor-pointer shadow-sm select-none"
                >
                  Details
                </button>
              </div>

              <h3 className="text-lg font-display font-black text-navy mb-1 tracking-tight">
                Website Design
              </h3>
              <p className="text-slate-500 text-[12px] mb-4 font-medium leading-relaxed min-h-[36px]">
                High-performance custom UI/UX responsive layouts fully launched with live domains.
              </p>

              <div className="space-y-1.5 mb-6 text-[11px] font-bold text-navy">
                <div className="flex items-center gap-2">
                  {checkMark}
                  <span>UI/UX Wireframes</span>
                </div>
                <div className="flex items-center gap-2">
                  {checkMark}
                  <span>Responsive Web</span>
                </div>
                <div className="flex items-center gap-2">
                  {checkMark}
                  <span>React Deployment</span>
                </div>
              </div>
            </div>

            {/* Metric Footer */}
            <div className="border-t border-slate-100 pt-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 shrink-0">
                🌐
              </div>
              <div>
                <h4 className="text-lg font-black font-mono tracking-tight text-purple-600 leading-none">
                  <AnimatedCounter value={8} suffix="+" colorClass="text-purple-600" />
                </h4>
                <p className="text-[9px] font-bold text-slate-400 mt-0.5">Websites Launched</p>
              </div>
            </div>
          </motion.div>

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
                { name: "Lightroom", img: "https://relevant-fuchsia-ztsw7kvcyc.edgeone.app/lightroom%20icon.png" },
                { name: "Notion", icon: <FileText size={20} />, color: "text-slate-700", bg: "bg-slate-100" },
                { name: "CapCut", img: "https://abstract-plum-kls1whh7.edgeone.app/Capcut-icon.png" },
                { name: "Facebook Meta", img: "https://separate-beige-6ponwx2u.edgeone.app/meta-social-network-emblem-blue-stylish-letter-m-or-mobius-band-vector.jpg" },
                // Double for seamless loop
                { name: "Figma", img: "https://artificial-amber-gp5uouqxoc.edgeone.app/figma%20icon.png" },
                { name: "Canva", img: "https://expensive-rose-l0ddo0le1o.edgeone.app/canva%20icon.png" },
                { name: "Inshot", img: "https://shocked-gold-hpsfu1svv3.edgeone.app/Inshot%20icon.png" },
                { name: "Lightroom", img: "https://relevant-fuchsia-ztsw7kvcyc.edgeone.app/lightroom%20icon.png" },
                { name: "Notion", icon: <FileText size={20} />, color: "text-slate-700", bg: "bg-slate-100" },
                { name: "CapCut", img: "https://abstract-plum-kls1whh7.edgeone.app/Capcut-icon.png" },
                { name: "Facebook Meta", img: "https://separate-beige-6ponwx2u.edgeone.app/meta-social-network-emblem-blue-stylish-letter-m-or-mobius-band-vector.jpg" },
                // Triple for extra safety on wide screens
                { name: "Figma", img: "https://artificial-amber-gp5uouqxoc.edgeone.app/figma%20icon.png" },
                { name: "Canva", img: "https://expensive-rose-l0ddo0le1o.edgeone.app/canva%20icon.png" },
                { name: "Inshot", img: "https://shocked-gold-hpsfu1svv3.edgeone.app/Inshot%20icon.png" },
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
                  <h3 className="text-2xl md:text-3xl font-bold text-navy">Video Editing</h3>
                  <p className="text-primary font-bold text-sm uppercase tracking-widest">Impactful Video Content</p>
                </div>
              </div>

              <div className="space-y-8">
                <div className="space-y-4 text-slate-600 leading-relaxed">
                  <p>I create high-impact video content tailored for social media platforms like Instagram, YouTube Shorts, and more. From reels to promotional videos, I focus on editing styles that are engaging, trend-driven, and optimized for maximum reach.</p>
                </div>

                <div>
                  <h4 className="text-lg font-bold text-navy mb-4 flex items-center gap-2">🚀 What I Do</h4>
                  <ul className="grid sm:grid-cols-2 gap-3">
                    {[
                      "Reels & Shorts Editing",
                      "Promotional Videos",
                      "Real Estate Video Editing",
                      "Business & Brand Videos",
                      "Trend-Based Editing",
                      "Sound Design & Effects"
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
  const experiences = [
    {
      company: "Apollo Dental Clinic",
      role: "Social Media Manager and Digital Designer",
      location: "RS Puram, Coimbatore, Tamil Nadu",
      duration: "Nov 2024 - Present",
      description: [
        "Managing complete social media handling including daily posts, reels, etc.",
        "Designing posters, banners, branding creatives aligned with brand identity.",
        "Created all brand works including logo and digital branding activities.",
        "Designing and managing PDFs, certificates, and internal digital documents.",
        "Ensuring regular posting content quality and professional visual standards."
      ],
      result: "Built a strong and professional digital presence from scratch, handling all creative and social media aspects.",
      color: "from-blue-600/20 to-blue-500/5",
      borderColor: "group-hover:border-blue-500/30",
      accentColor: "bg-blue-500/10 text-blue-400 border-blue-500/20",
      logo: "https://image2url.com/r2/default/images/1775567270735-9f31738c-e14f-443e-bc63-25dc45697c09.png",
      link: "https://www.instagram.com/apolloacademy_cosmetology?igsh=OGg3MGpzazF6OGVr"
    },
    {
      company: "RK Homes and Developers",
      role: "Freelance Video Editor & Designer",
      location: "Malumichampatti",
      duration: "February 2025 - December 2025",
      description: [
        "Handling complete social media management and digital branding activities.",
        "Created all brand works including company logo and marketing materials.",
        "Edited real estate promotional videos and designed posters/creatives.",
        "Ensuring visual consistency across all digital platforms.",
        "Designing invitation cards, business materials, and digital documents."
      ],
      result: "Delivered visually appealing content and established a consistent brand identity for real estate promotions.",
      color: "from-emerald-600/20 to-emerald-500/5",
      borderColor: "group-hover:border-emerald-500/30",
      accentColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
      logo: "https://image2url.com/r2/default/images/1775567375158-7f88bf1b-57de-4441-8238-8cd70decdc64.png",
      link: "https://www.instagram.com/rkhomesdevelopers?igsh=MTk2eXllb2x1MmhrNQ=="
    }
  ];

  return (
    <section id="experience" className="py-20 md:py-28 px-6 md:px-12 lg:px-24 bg-navy text-white overflow-hidden relative">
      {/* Background radial highlights */}
      <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff03_1px,transparent_1px)] [background-size:24px_24px] opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Revamped High-End Premium Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs uppercase tracking-[0.25em] text-primary font-bold mb-4 inline-block bg-white/5 border border-white/10 px-4 py-1.5 rounded-full">
              PROVEN WORK HISTORY
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-black text-white mb-6 tracking-tight leading-[1.12]">
              Real Client Collaborations
              <span className="text-primary block mt-2 text-2xl md:text-4xl font-medium tracking-normal text-slate-300">
                & Industry Impact
              </span>
            </h2>
            <p className="text-slate-400 text-sm md:text-base font-normal max-w-2xl mx-auto leading-relaxed">
              Managing end-to-end digital branding, creative assets, and social media presence to deliver measurable growth.
            </p>
          </motion.div>
        </div>

        {/* Upgraded Modern UI Cards */}
        <div className="space-y-12 md:space-y-16">
          {experiences.map((exp, idx) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="group flex flex-col lg:flex-row gap-6 md:gap-8 items-stretch"
            >
              {/* Left Brand Showcase Card */}
              <div className={`lg:w-1/3 p-6 md:p-8 rounded-[2rem] bg-gradient-to-br ${exp.color} border border-white/5 ${exp.borderColor} flex flex-col justify-between shadow-2xl transition-all duration-300 relative`}>
                <div className="absolute top-4 right-4 text-[10px] font-mono font-bold tracking-widest text-white/20">
                  PROJECT 0{idx + 1}
                </div>
                
                <div>
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6 overflow-hidden p-2.5 shadow-xl shadow-black/20"
                  >
                    <img src={exp.logo} alt={exp.company} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                  </motion.div>
                  
                  <h4 className="text-xl md:text-2xl font-display font-black text-white mb-2 leading-tight">
                    {exp.company}
                  </h4>
                  
                  <div className="flex flex-col gap-1.5 mb-6">
                    <p className="text-primary font-bold text-xs uppercase tracking-widest leading-none">
                      {exp.role}
                    </p>
                    <div className="flex items-center gap-1.5 text-slate-400 text-[11px] font-medium">
                      <MapPin size={12} className="text-slate-500" /> {exp.location}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-4 pt-4 border-t border-white/10">
                  <div className="flex justify-between items-end gap-2">
                    <div>
                      <span className="text-[9px] font-bold uppercase tracking-widest opacity-40 block mb-1">Duration</span>
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${exp.accentColor}`}>
                        {exp.duration}
                      </span>
                    </div>
                    <a 
                      href="#work" 
                      className="inline-flex items-center gap-1.5 bg-white text-navy px-3.5 py-1.5 rounded-full font-bold text-[10px] hover:bg-primary hover:text-white transition-all shadow-md select-none"
                    >
                      My Works <ArrowRight size={12} />
                    </a>
                  </div>
                  
                  <a 
                    href={exp.link} 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-white/5 border border-white/10 hover:bg-white text-white hover:text-navy px-4 py-2.5 rounded-xl text-xs font-bold transition-all w-full shadow-lg select-none"
                  >
                    View Official Instagram <Instagram size={14} />
                  </a>
                </div>
              </div>
              
              {/* Right Key Responsibilities & Outputs Card */}
              <div className="lg:w-2/3 bg-white/[0.02] border border-white/5 hover:border-white/10 p-6 md:p-8 rounded-[2rem] flex flex-col justify-between transition-all duration-300">
                <div className="mb-6">
                  <h5 className="text-xs font-bold uppercase tracking-[0.15em] text-primary mb-4 flex items-center gap-2">
                    <span>⚡ CODE OF ACTION & RESPONSIBILITIES</span>
                  </h5>
                  <ul className="space-y-3.5">
                    {exp.description.map((item, i) => (
                      <li key={i} className="flex gap-3 text-slate-300 text-xs md:text-sm leading-relaxed">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary/70 mt-1.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="pt-5 border-t border-white/5">
                  <div className="bg-primary/5 border-l-4 border-primary px-4 py-3.5 rounded-r-xl">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-[#2eacf6]/80 block mb-1">CLIENT OUTCOME</span>
                    <p className="text-slate-200 font-medium italic text-xs md:text-[13px] leading-relaxed">
                      "{exp.result}"
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Video Simulated Player Component ---
const VideoPlayerModal = ({ project }: { project: { name: string; img: string; link?: string; type?: string } }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(35);
  const [currentTime, setCurrentTime] = useState("0:11");

  useEffect(() => {
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
  }, [isPlaying]);

  return (
    <div className="flex flex-col lg:flex-row items-center gap-6 bg-[#0B0F19]/95 border border-white/10 p-6 rounded-[2.5rem] max-w-3xl w-full shadow-2xl relative overflow-hidden backdrop-blur-xl">
      {/* Blurred background image for cinema glow */}
      <div 
        className="absolute inset-0 bg-cover bg-center filter blur-3xl opacity-25 scale-110 pointer-events-none -z-10"
        style={{ backgroundImage: `url(${project.img})` }}
      />
      
      {/* Vertical Player Box resembling a beautiful vertical smartphone/reel display */}
      <div className="w-full sm:w-[260px] aspect-[9/16] bg-black rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl relative group shrink-0 flex flex-col justify-between mx-auto">
        {/* Phone Notch */}
        <div className="absolute top-0 inset-x-0 h-8 bg-gradient-to-b from-black/80 to-transparent flex items-center justify-between px-6 z-20 text-[10px] text-white/60 font-mono">
          <span>9:41</span>
          <div className="w-16 h-4 bg-black/40 rounded-full border border-white/5 flex items-center justify-center">
            <span className="w-2 h-0.5 bg-white/50 rounded-full mr-1" />
            <span className="w-4 h-1 bg-primary rounded-full animate-pulse" />
          </div>
          <div className="flex items-center gap-1.5">
            <span>5G</span>
            <span className="text-[9px]">🔋</span>
          </div>
        </div>

        {/* Video Canvas screen indicator */}
        <div className="absolute inset-0 z-10 flex items-center justify-center overflow-hidden">
          <motion.img 
            animate={isPlaying ? { scale: [1.02, 1.06, 1.02] } : { scale: 1.02 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            src={project.img} 
            alt={project.name} 
            className="w-full h-full object-cover filter brightness-[0.8] select-none"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />
        </div>

        {/* Pulsing Play Button */}
        <div className="absolute inset-0 z-30 flex items-center justify-center">
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-14 h-14 rounded-full bg-primary/95 text-white flex items-center justify-center shadow-lg shadow-primary/30 transition-all hover:scale-110 focus:outline-none cursor-pointer"
          >
            {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} className="translate-x-0.5" fill="currentColor" />}
          </button>
          {isPlaying && (
            <span className="absolute w-16 h-16 rounded-full border border-primary/40 animate-ping pointer-events-none" />
          )}
        </div>

        {/* Overlay Likes & Share */}
        <div className="absolute bottom-20 right-3 z-20 flex flex-col gap-3.5 text-white items-center">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/10 hover:bg-white/20 transition-all cursor-pointer">
              ❤️
            </div>
            <span className="text-[8px] font-bold mt-1 text-slate-100 shadow-sm">1.8k</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/10 hover:bg-white/20 transition-all cursor-pointer">
              💬
            </div>
            <span className="text-[8px] font-bold mt-1 text-slate-100 shadow-sm">242</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/10 hover:bg-white/20 transition-all cursor-pointer">
              ✈️
            </div>
            <span className="text-[8px] font-bold mt-1 text-slate-100 shadow-sm">Share</span>
          </div>
        </div>

        {/* Bottom Panel */}
        <div className="absolute bottom-0 inset-x-0 p-4 pt-10 bg-gradient-to-t from-black/95 via-black/40 to-transparent z-20 flex flex-col gap-1.5 text-left">
          <div className="flex items-center gap-2 text-white">
            <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-[8px] font-bold">N</div>
            <div>
              <p className="text-[9px] font-bold leading-none">@naveenraja</p>
              <p className="text-[7px] text-white/50 leading-none mt-0.5">Brand Creator</p>
            </div>
          </div>
          <p className="text-[9px] text-slate-200 line-clamp-1 font-medium">Elevating visual experiences through engaging reels.</p>
          
          {/* Timeline progress slider */}
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[8px] font-mono text-white/70">{currentTime}</span>
            <div className="flex-1 h-0.5 bg-white/20 rounded-full relative overflow-hidden">
              <div className="h-full bg-primary" style={{ width: `${progress}%` }} />
            </div>
            <span className="text-[8px] font-mono text-white/50">0:30</span>
          </div>
        </div>
      </div>

      {/* Right Column Details */}
      <div className="flex-1 flex flex-col justify-between py-2 text-left">
        <div className="mb-6">
          <span className="inline-block px-3 py-1 rounded-full text-[9px] font-mono font-bold uppercase tracking-widest bg-primary/15 text-primary border border-primary/20 mb-3 select-none">
            🎬 {project.type || "Short Form"} Video
          </span>
          <h3 className="text-xl md:text-2xl font-display font-black text-white leading-tight mb-3">
            {project.name}
          </h3>
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-normal mb-6">
            This digital video asset is fully optimized for maximum social media exposure and visual interest. Developed with consistent frame transitions, custom color enhancements, and professional timing metrics.
          </p>

          <div className="grid grid-cols-2 gap-4 bg-white/5 border border-white/5 px-4 py-3 rounded-2xl">
            <div>
              <span className="text-[8px] font-bold text-slate-400 block tracking-widest uppercase">Resolution</span>
              <span className="text-xs text-white font-bold font-mono">1080p Full HD</span>
            </div>
            <div>
              <span className="text-[8px] font-bold text-slate-400 block tracking-widest uppercase">Ratio</span>
              <span className="text-xs text-white font-bold font-mono">9:16 Portrait HUD</span>
            </div>
          </div>
        </div>

        {/* Action Elements */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-white/10">
          {project.link && (
            <a 
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-1.5 bg-[#E1306C] hover:bg-[#E1306C]/90 text-white px-5 py-3 rounded-xl text-xs font-bold transition-all shadow-md select-none"
            >
              <Instagram size={13} /> Open Instagram Reel
            </a>
          )}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="px-5 py-3 rounded-xl text-xs font-bold border border-white/10 text-white hover:bg-white/5 transition-all cursor-pointer select-none"
          >
            {isPlaying ? "Pause Player" : "Play Reel"}
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Portfolio Section ---
const Portfolio = () => {
  const [filter, setFilter] = useState("All");
  const [lightboxProject, setLightboxProject] = useState<{ img: string; name: string; category: string; link?: string; type?: string } | null>(null);
  
  const categories = ["All", "Websites", "Posters", "Videos", "Business Cards", "Certificates"];
  
  const projects = [
    // Posters
    { 
      name: "Free Mental Health Counseling", 
      category: "Posters", 
      type: "Healthcare", 
      img: "https://scary-azure-ggewvsbdlm.edgeone.app/Free%20Mental%20Health%20Counseling.png",
      link: "#"
    },
    { 
      name: "Summer Vacation Special Offer", 
      category: "Posters", 
      type: "Promotion", 
      img: "https://compact-tomato-mi8bghykch.edgeone.app/Summer%20vacation%20special%20offer%20(2).png",
      link: "#"
    },
    { 
      name: "Chettinad Hospital & Research Institute", 
      category: "Posters", 
      type: "Healthcare", 
      img: "https://equivalent-magenta-7znxjkz6qb.edgeone.app/Chettinad%20Hospital%20&%20Research%20Institute%20(3).png",
      link: "#"
    },
    { 
      name: "Professional Course Poster", 
      category: "Posters", 
      type: "Education", 
      img: "https://image2url.com/r2/default/images/1775567911170-fce693e5-c9d3-4847-af80-aab5fac4ae7b.png",
      link: "#"
    },
    { 
      name: "Creative Academy Poster", 
      category: "Posters", 
      type: "Education", 
      img: "https://image2url.com/r2/default/images/1775568052451-413ab29b-d318-4f66-8487-7c156222c620.png",
      link: "#"
    },
    { 
      name: "Healthy Smile Poster", 
      category: "Posters", 
      type: "Healthcare", 
      img: "https://near-olive-5hzpqymsvu.edgeone.app/Give%20your%20child%20a%20healthy%20and%20confident%20smile%20this%20summer!%20(2).png",
      link: "#"
    },
    { 
      name: "Modern Design Poster", 
      category: "Posters", 
      type: "Design", 
      img: "https://lively-lavender-zw35hvf4nf.edgeone.app/Untitled%20design%20(32).png",
      link: "#"
    },
    // Business Cards
    { 
      name: "Modern Business Card Design", 
      category: "Business Cards", 
      type: "Corporate", 
      img: "https://image2url.com/r2/default/images/1775568268455-7723a81d-036a-4e45-b504-53efca63621b.jpeg",
      link: "#"
    },
    { 
      name: "Premium Branding Card", 
      category: "Business Cards", 
      type: "Branding", 
      img: "https://image2url.com/r2/default/images/1775568312921-e33727cd-ebba-4c5a-acb4-3be0c62dcec5.jpeg",
      link: "#"
    },
    { 
      name: "Elegant Professional Card", 
      category: "Business Cards", 
      type: "Corporate", 
      img: "https://image2url.com/r2/default/images/1775568352520-a19a43e1-3bdd-4f87-9695-f0c443f6ccbc.jpeg",
      link: "#"
    },
    { 
      name: "Minimalist Business Card", 
      category: "Business Cards", 
      type: "Personal", 
      img: "https://image2url.com/r2/default/images/1775568381991-22af9ff7-2954-4391-b839-054cd550a551.jpeg",
      link: "#"
    },
    // Certificates
    { 
      name: "Official Brand Certificate", 
      category: "Certificates", 
      type: "Recognition", 
      img: "https://image2url.com/r2/default/images/1775568553342-f176c522-0df3-492c-88c2-0ac80a9b3a94.png",
      link: "#"
    },
    // Videos - RK Homes
    { 
      name: "RK Homes Real Estate Reel", 
      category: "Videos", 
      type: "Real Estate", 
      img: "https://peculiar-aquamarine-yx6ys8abuq.edgeone.app/Untitled%20design%20(30).png",
      link: "https://www.instagram.com/reel/DUs4jgnidOd/?igsh=MWtvNTBiajhlbGo2bw=="
    },
    { 
      name: "Property Showcase Video", 
      category: "Videos", 
      type: "Real Estate", 
      img: "https://peculiar-aquamarine-yx6ys8abuq.edgeone.app/Untitled%20design%20(30).png",
      link: "https://www.instagram.com/reel/DUvbqL5iZKL/?igsh=MWRldXc2YjdlajRzeg=="
    },
    { 
      name: "RK Homes Promotional Reel", 
      category: "Videos", 
      type: "Real Estate", 
      img: "https://peculiar-aquamarine-yx6ys8abuq.edgeone.app/Untitled%20design%20(30).png",
      link: "https://www.instagram.com/reel/DVTYbzEifft/?igsh=M3R6MnV0cmk3eDY2"
    },
    // Videos - Apollo Dental
    { 
      name: "Apollo Dental Academy Reel", 
      category: "Videos", 
      type: "Healthcare", 
      img: "https://past-red-vgchojoaga.edgeone.app/Untitled%20design%20(31).png",
      link: "https://www.instagram.com/reel/DWg_e8Jk1Zp/?igsh=YWxlcWZ0cnV0cnM3"
    },
    { 
      name: "Healthcare Branding Video", 
      category: "Videos", 
      type: "Healthcare", 
      img: "https://past-red-vgchojoaga.edgeone.app/Untitled%20design%20(31).png",
      link: "https://www.instagram.com/reel/DV8p-JQk8o5/?igsh=dXlxZHRyMzdyY3N5"
    },
    { 
      name: "Apollo Academy Highlights", 
      category: "Videos", 
      type: "Healthcare", 
      img: "https://past-red-vgchojoaga.edgeone.app/Untitled%20design%20(31).png",
      link: "https://www.instagram.com/reel/DTnQ8o5k0fu/?igsh=MWQxcDBvbXI5cTMycw=="
    },
    // Websites
    { 
      name: "Apollo Dental Clinic", 
      category: "Websites", 
      type: "Healthcare", 
      img: "https://sacred-beige-xci2dhqb5j.edgeone.app/1.png",
      link: "https://apollodentalclinic.netlify.app/"
    },
    { 
      name: "Vel ADSS", 
      category: "Websites", 
      type: "Business", 
      img: "https://spatial-bronze-dpcvfkivhg.edgeone.app/4.png",
      link: "https://veladss.netlify.app/"
    },
    { 
      name: "Sajal Tech Portfolio", 
      category: "Websites", 
      type: "Portfolio", 
      img: "https://mass-gold-uzmy29scbn.edgeone.app/2.png",
      link: "https://sajaltech-portfolio.netlify.app/"
    },
    { 
      name: "HobbyMate", 
      category: "Websites", 
      type: "Community", 
      img: "https://flaky-harlequin-cqssfghxdn.edgeone.app/3.png",
      link: "https://hobbymate.in/"
    },
    { 
      name: "Domain Markt", 
      category: "Websites", 
      type: "Marketplace", 
      img: "https://well-fuchsia-anyg3pte2c.edgeone.app/5.png",
      link: "https://dev.domainmarkt.io/"
    },
  ];

  const filteredProjects = filter === "All" ? projects : projects.filter(p => p.category === filter);

  return (
    <section id="work" className="py-16 md:py-24 px-6 md:px-12 lg:px-24 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-primary font-bold mb-4 inline-block bg-blue-50 border border-blue-100 px-4 py-1.5 rounded-full select-none">
            EXPLORE PORTFOLIO
          </span>
          <h3 className="text-3xl md:text-5xl font-display font-black text-navy mb-8 tracking-tight">Creative Showcases</h3>
          
          {/* Beautiful Segmented Modern Minimalist Pill Menu bar */}
          <div className="flex flex-wrap justify-center gap-1.5 md:gap-2 bg-slate-50 p-1.5 rounded-2xl md:rounded-full max-w-4xl mx-auto border border-slate-100 shadow-inner select-none mb-10">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
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

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProjects.map((project, idx) => (
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
                
                {project.category === "Videos" || project.link === "#" ? (
                  <button 
                    type="button"
                    onClick={() => setLightboxProject({ 
                      img: project.img, 
                      name: project.name, 
                      category: project.category,
                      link: project.link,
                      type: project.type
                    })}
                    className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-6 text-left w-full h-full cursor-pointer focus:outline-none"
                  >
                    <p className="text-[10px] uppercase font-bold tracking-widest text-primary/80 mb-1">{project.category}</p>
                    <h4 className="text-lg font-bold text-white leading-tight">{project.name}</h4>
                    <span className="text-[11px] text-primary font-bold mt-2.5 flex items-center gap-1 border-t border-white/15 pt-2 w-full">
                      {project.category === "Videos" ? "Play Widescreen Video 🎬" : "Expand Fullscreen Display 🔍"}
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
              className="relative max-w-4xl max-h-[90vh] bg-transparent rounded-2xl overflow-hidden flex flex-col items-center justify-center z-10 w-full"
            >
              <button 
                type="button"
                onClick={() => setLightboxProject(null)}
                className="absolute -top-3 -right-3 md:top-4 md:right-4 bg-white/20 hover:bg-white/30 text-white rounded-full p-2.5 backdrop-blur-md transition-colors z-[120] focus:outline-none cursor-pointer"
              >
                <X size={22} />
              </button>

              {lightboxProject.category === "Videos" ? (
                /* Cinematic simulated player */
                <VideoPlayerModal project={lightboxProject} />
              ) : (
                /* Poster high end display */
                <div className="flex flex-col items-center">
                  <img 
                    src={lightboxProject.img} 
                    alt={lightboxProject.name} 
                    className="max-h-[75vh] w-auto max-w-full object-contain rounded-[2rem] shadow-2xl border border-white/5 bg-[#172554]/20 p-2"
                    referrerPolicy="no-referrer"
                  />
                  <div className="mt-5 text-center px-6 py-3 bg-navy/80 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl max-w-sm">
                    <span className="text-[9px] font-mono font-bold text-primary uppercase tracking-[0.2em]">{lightboxProject.category}</span>
                    <h4 className="text-white text-base font-black tracking-tight mt-1">{lightboxProject.name}</h4>
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
      desc: "2+ years of proven results with healthcare and real estate brands.",
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
            <div className="flex items-center gap-6">
              <div className="flex -space-x-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-12 h-12 rounded-full border-4 border-white bg-slate-200 overflow-hidden">
                    <img src={`https://picsum.photos/seed/user${i}/100/100`} alt="User" referrerPolicy="no-referrer" />
                  </div>
                ))}
              </div>
              <div>
                <p className="text-navy font-bold">Trusted by 10+ Brands</p>
                <p className="text-slate-500 text-sm">Consistent quality delivery</p>
              </div>
            </div>
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
  const steps = [
    { title: "Understand", desc: "Deep dive into your brand goals.", icon: <MessageSquare size={24} />, color: "bg-blue-500" },
    { title: "Strategy", desc: "Planning for maximum impact.", icon: <Layout size={24} />, color: "bg-indigo-500" },
    { title: "Drafting", desc: "Creating the first set of visuals.", icon: <Palette size={24} />, color: "bg-purple-500" },
    { title: "Refining", desc: "Perfecting based on your feedback.", icon: <CheckCircle2 size={24} />, color: "bg-pink-500" },
    { title: "Delivery", desc: "High-quality final files ready to post.", icon: <ExternalLink size={24} />, color: "bg-emerald-500" }
  ];

  return (
    <section className="py-20 md:py-28 px-6 md:px-12 lg:px-24 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-sm uppercase tracking-widest text-primary font-bold mb-4">How I Work</h2>
            <h3 className="text-4xl md:text-5xl mb-0">A simple, transparent process to elevate your brand</h3>
          </div>
          <div className="hidden md:block">
            <div className="w-24 h-24 rounded-full border-2 border-dashed border-slate-300 flex items-center justify-center text-slate-400 animate-spin-slow">
              <ArrowRight size={32} className="rotate-45" />
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-5 gap-4">
          {steps.map((step, idx) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="relative group bg-white p-8 rounded-[2.5rem] border border-slate-100 md:hover:shadow-xl md:hover:shadow-slate-200/50 transition-all duration-500"
            >
              <div className={`w-12 h-12 ${step.color} text-white rounded-2xl flex items-center justify-center mb-8 shadow-lg md:group-hover:scale-110 transition-transform duration-300`}>
                {step.icon}
              </div>
              <div className="absolute top-8 right-8 text-4xl font-display font-black text-slate-50 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                0{idx + 1}
              </div>
              <h4 className="text-xl font-bold mb-3">{step.title}</h4>
              <p className="text-slate-500 text-sm leading-relaxed">{step.desc}</p>
              
              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 translate-y-[-50%] z-10 text-slate-200">
                  <ChevronRight size={24} />
                </div>
              )}
            </motion.div>
          ))}
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
    <section id="contact" className="py-16 md:py-24 bg-slate-50 px-6 md:px-12 lg:px-24 relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-xs uppercase tracking-[0.25em] text-primary font-bold mb-4 inline-block bg-blue-50 border border-blue-100 px-4 py-1.5 rounded-full select-none">
              GET IN TOUCH
            </span>
            <h3 className="text-3xl md:text-5xl font-display font-black leading-tight text-navy mb-6">Let’s Build Something Great Together</h3>
            <p className="text-base text-slate-600 mb-8 leading-relaxed font-medium">
              Looking for someone reliable to handle your design, social page growth, or video edit plans? Send a message and let's discuss details directly on WhatsApp!
            </p>
            
            <div className="grid sm:grid-cols-2 gap-4">
              <a 
                href="tel:6385941180"
                className="flex items-start gap-4 bg-white p-4 rounded-2xl border border-slate-100 hover:border-primary transition-all group shadow-sm/50"
              >
                <div className="w-10 h-10 bg-primary/5 rounded-xl flex items-center justify-center text-primary shrink-0 mt-0.5 group-hover:bg-primary group-hover:text-white transition-all">
                  <Phone size={18} />
                </div>
                <div className="min-w-0">
                  <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Call</p>
                  <p className="text-sm font-bold text-navy">6385941180</p>
                </div>
              </a>
              <a 
                href="mailto:naveenrajafreelancer@gmail.com"
                className="flex items-start gap-4 bg-white p-4 rounded-2xl border border-slate-100 hover:border-primary transition-all group shadow-sm/50"
              >
                <div className="w-10 h-10 bg-primary/5 rounded-xl flex items-center justify-center text-primary shrink-0 mt-0.5 group-hover:bg-primary group-hover:text-white transition-all">
                  <Mail size={18} />
                </div>
                <div className="min-w-0">
                  <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Email</p>
                  <p className="text-xs md:text-sm font-bold text-navy break-all leading-tight">naveenrajafreelancer@gmail.com</p>
                </div>
              </a>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <a 
                href={`https://wa.me/6385941180?text=${encodeURIComponent("Hello Naveen, I'm reaching out from your Portfolio. Let's collaborate!")}`} 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-2.5 bg-[#25D366] text-white px-8 py-4 rounded-xl font-bold hover:shadow-lg hover:shadow-green-100 transition-all text-sm select-none"
              >
                <MessageSquare size={18} /> WhatsApp Live Chat
              </a>
              <a 
                href="https://drive.google.com/file/d/1-XcVYxJoQDDnD8-wLkxR3YPLB-MJEJWq/view?usp=sharing" 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-2.5 bg-navy text-white px-8 py-4 rounded-xl font-bold hover:shadow-lg hover:shadow-navy/10 transition-all text-sm select-none"
              >
                <FileText size={18} /> View Resume
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white p-6 md:p-8 rounded-[2.5rem] shadow-sm border border-slate-100"
          >
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-1.5 ml-1">Your Name</label>
                  <input 
                    type="text" 
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. John Doe" 
                    className="w-full px-5 py-3 rounded-xl bg-slate-50 border border-transparent focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm outline-none font-bold text-navy" 
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-1.5 ml-1">Your Email</label>
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. email@address.com" 
                    className="w-full px-5 py-3 rounded-xl bg-slate-50 border border-transparent focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm outline-none font-bold text-navy" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-1.5 ml-1">Interested Category</label>
                <select 
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-5 py-3 rounded-xl bg-slate-50 border border-transparent focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm outline-none font-bold text-navy cursor-pointer appearance-none"
                >
                  <option value="Social Media">Social Media (Facebook ads, Reels, Analytics)</option>
                  <option value="Poster Editing">Poster Editing (Creative Graphics, Artworks)</option>
                  <option value="Video Editing">Video Editing (Reels, Corporate Assets, Cuts)</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-1.5 ml-1">Message Detail</label>
                <textarea 
                  rows={3} 
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell me briefly about your business and needs..." 
                  className="w-full px-5 py-3 rounded-xl bg-slate-50 border border-transparent focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none text-sm outline-none font-bold text-navy"
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-navy text-white py-4 rounded-xl font-bold text-sm hover:bg-navy/95 cursor-pointer hover:shadow-lg shadow-navy/10 active:scale-[0.99] transition-all select-none"
              >
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
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
