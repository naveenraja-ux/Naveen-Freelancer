import { motion } from "motion/react";
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
  Layout
} from "lucide-react";
import { useState, useEffect } from "react";

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
    { name: "Work", href: "#work" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-white/90 backdrop-blur-md py-4 shadow-sm" : "bg-transparent py-6"}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 flex justify-between items-center">
        <a href="#" className="text-2xl font-display font-bold text-navy">
          Naveen<span className="text-primary">.</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="text-sm font-medium hover:text-primary transition-colors">
              {link.name}
            </a>
          ))}
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
    <section className="relative pt-[80px] pb-12 md:pt-[120px] md:pb-16 overflow-hidden px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 bg-blue-50 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Available for Freelance Projects
          </div>
          <h1 className="text-2xl md:text-4xl lg:text-6xl font-display leading-[1.05] mb-6">
            Helping Brands Grow Through <span className="text-primary">Design, Content & Video</span>
          </h1>
          <p className="text-base md:text-lg text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Freelance Social Media Manager & Digital Designer crafting scroll-stopping visuals, engaging reels, and powerful brand presence.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#portfolio" className="bg-navy text-white px-10 py-5 rounded-full font-bold hover:bg-navy/90 transition-all flex items-center gap-2 text-lg">
              View My Work <ArrowRight size={22} />
            </a>
            <a href="#contact" className="border-2 border-navy text-navy px-10 py-5 rounded-full font-bold hover:bg-navy hover:text-white transition-all text-lg">
              Let’s Work Together
            </a>
          </div>
          <div className="mt-12 flex flex-col items-center gap-4 text-slate-500">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-12 h-12 rounded-full border-4 border-white bg-slate-200 flex items-center justify-center overflow-hidden shadow-sm">
                  <img src={`https://picsum.photos/seed/client${i}/100/100`} alt="Client" referrerPolicy="no-referrer" />
                </div>
              ))}
            </div>
            <p className="text-sm font-bold uppercase tracking-widest">Worked with Healthcare & Real Estate Brands</p>
          </div>
        </motion.div>
      </div>
      {/* Background Decorative Elements */}
      <div className="absolute top-1/4 -left-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 -right-20 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl -z-10"></div>
    </section>
  );
};

// --- Working Animation Component ---
const WorkingAnimation = () => {
  return (
    <div className="relative w-full aspect-square max-w-md mx-auto flex items-center justify-center">
      {/* Background Glows */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute w-64 h-64 bg-primary/20 rounded-full blur-3xl"
      />
      
      {/* Laptop Base */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="relative z-10 w-4/5 h-3/5 bg-navy rounded-2xl border-4 border-slate-800 shadow-2xl flex flex-col overflow-hidden"
      >
        {/* Screen Content */}
        <div className="h-full w-full p-4 flex flex-col gap-3">
          <div className="flex gap-2">
            <div className="w-2 h-2 rounded-full bg-red-400" />
            <div className="w-2 h-2 rounded-full bg-yellow-400" />
            <div className="w-2 h-2 rounded-full bg-green-400" />
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <motion.div 
              animate={{ width: ["40%", "80%", "40%"] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="h-2 bg-white/10 rounded-full" 
            />
            <motion.div 
              animate={{ width: ["60%", "30%", "60%"] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="h-2 bg-white/10 rounded-full" 
            />
            <div className="h-2 bg-white/10 rounded-full w-full" />
            <div className="flex-1 flex items-center justify-center">
              <motion.div
                animate={{ 
                  rotate: 360,
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              >
                <Palette className="text-primary/40" size={64} />
              </motion.div>
            </div>
          </div>
        </div>
        {/* Keyboard Area */}
        <div className="h-4 bg-slate-800 w-full" />
      </motion.div>

      {/* Floating Elements */}
      <motion.div
        animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute top-10 right-10 z-20 bg-white p-4 rounded-2xl shadow-xl border border-slate-100"
      >
        <Layout className="text-primary" size={32} />
      </motion.div>

      <motion.div
        animate={{ y: [0, 20, 0], x: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute bottom-10 left-0 z-20 bg-white p-4 rounded-2xl shadow-xl border border-slate-100"
      >
        <ExternalLink className="text-emerald-500" size={32} />
      </motion.div>

      <motion.div
        animate={{ y: [0, -15, 0], x: [0, 15, 0] }}
        transition={{ duration: 4.5, repeat: Infinity }}
        className="absolute top-0 left-1/4 z-20 bg-white p-3 rounded-xl shadow-lg border border-slate-100"
      >
        <Palette className="text-purple-500" size={28} />
      </motion.div>

      <motion.div
        animate={{ y: [0, 15, 0], x: [0, -15, 0] }}
        transition={{ duration: 5.5, repeat: Infinity }}
        className="absolute bottom-0 right-1/4 z-20 bg-white p-3 rounded-xl shadow-lg border border-slate-100"
      >
        <CheckCircle2 className="text-blue-500" size={28} />
      </motion.div>

      <motion.div
        animate={{ scale: [1, 1.1, 1], rotate: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-1/2 -right-4 z-20 bg-white p-3 rounded-xl shadow-lg border border-slate-100 flex items-center justify-center"
      >
        <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
          C
        </div>
      </motion.div>

      <motion.div
        animate={{ scale: [1, 1.2, 1], rotate: [0, 10, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-1/4 left-0 z-20 bg-white p-3 rounded-xl shadow-lg border border-slate-100"
      >
        <FileText className="text-blue-500" size={24} />
      </motion.div>

      {/* Abstract Person Shape */}
      <motion.div 
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-0 z-0 w-1/2 h-1/2 bg-slate-200 rounded-t-full blur-sm opacity-50"
      />
    </div>
  );
};

// --- About Section ---
const About = () => {
  const highlights = [
    "1.5+ Years Experience",
    "Worked with Real Clients",
    "End-to-End Digital Support",
    "Consistent & Quality-Focused"
  ];

  return (
    <section id="about" className="py-16 md:py-24 px-6 md:px-12 lg:px-24 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <h2 className="text-sm uppercase tracking-widest text-primary font-bold mb-3">Who I Am</h2>
            <h3 className="text-3xl md:text-4xl mb-6">I’m Naveen, a freelance Social Media Manager & Digital Designer.</h3>
            <div className="space-y-4 text-base md:text-lg text-slate-600 leading-relaxed">
              <p>
                I help brands grow with impactful visuals and engaging content. With 1.5+ years of real client work experience, I’ve handled everything from daily social media management to video editing, branding creatives, and website design.
              </p>
              <p>
                I don’t just design — I help brands look professional, stay consistent, and attract the right audience.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-8">
              {highlights.map((point) => (
                <div key={point} className="flex items-center gap-3 bg-white p-3 rounded-xl shadow-sm border border-slate-100">
                  <CheckCircle2 className="text-primary shrink-0" size={20} />
                  <span className="font-semibold text-navy text-sm md:text-base">{point}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2"
          >
            <WorkingAnimation />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// --- Services Section ---
const Services = () => {
  const services = [
    {
      icon: <Instagram size={28} />,
      title: "Social Media Management",
      description: "Daily posts & content planning, Instagram reels & engagement, page handling & growth.",
      gradient: "from-pink-500/10 to-orange-500/10",
      accent: "text-pink-500"
    },
    {
      icon: <Layout size={28} />,
      title: "Website Design",
      description: "Custom UI/UX design, live website development, and hosting setup for your business.",
      gradient: "from-cyan-500/10 to-blue-500/10",
      accent: "text-cyan-500"
    },
    {
      icon: <Video size={28} />,
      title: "Video Editing",
      description: "Reels & Shorts editing, promotional videos, real estate & business edits.",
      gradient: "from-red-500/10 to-rose-500/10",
      accent: "text-red-500"
    },
    {
      icon: <Palette size={28} />,
      title: "Digital & Creative Design",
      description: "Posters, social media creatives, branding visuals, business cards, invitations, certificates, PDFs, and professional documents.",
      gradient: "from-blue-500/10 to-indigo-500/10",
      accent: "text-blue-500"
    }
  ];

  return (
    <section id="services" className="py-16 md:py-24 px-6 md:px-12 lg:px-24 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-sm uppercase tracking-widest text-primary font-bold mb-3">What I Do</h2>
            <h3 className="text-3xl md:text-4xl lg:text-5xl">Elevating Your Brand with Modern Digital Solutions</h3>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, idx) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="relative group"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} rounded-[2rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              <div className="relative bg-white p-6 rounded-[2rem] border border-slate-100 card-shadow h-full flex flex-col hover:border-primary/20 transition-all duration-300">
                <div className={`w-14 h-14 rounded-xl bg-slate-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 ${service.accent}`}>
                  {service.icon}
                </div>
                <h4 className="text-lg font-bold mb-3 group-hover:text-primary transition-colors">{service.title}</h4>
                <p className="text-slate-500 leading-relaxed mb-6 flex-1 text-sm">{service.description}</p>
                <div className="flex items-center gap-2 text-xs font-bold text-navy group-hover:gap-3 transition-all">
                  Learn More <ArrowRight size={14} className="text-primary" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Experience Section ---
const Experience = () => {
  const experiences = [
    {
      company: "Apollo Dental Clinic",
      role: "Freelancer – Social Media & Digital Design",
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
      color: "from-blue-600 to-blue-400",
      logo: "https://image2url.com/r2/default/images/1775567270735-9f31738c-e14f-443e-bc63-25dc45697c09.png",
      link: "https://www.instagram.com/apolloacademy_cosmetology?igsh=OGg3MGpzazF6OGVr"
    },
    {
      company: "RK Homes and Developers",
      role: "Freelance Video Editor & Designer",
      location: "Malumichampatti",
      duration: "Feb 2025 – Present",
      description: [
        "Handling complete social media management and digital branding activities.",
        "Created all brand works including company logo and marketing materials.",
        "Edited real estate promotional videos and designed posters/creatives.",
        "Ensuring visual consistency across all digital platforms.",
        "Designing invitation cards, business materials, and digital documents."
      ],
      result: "Delivered visually appealing content and established a consistent brand identity for real estate promotions.",
      color: "from-emerald-600 to-emerald-400",
      logo: "https://image2url.com/r2/default/images/1775567375158-7f88bf1b-57de-4441-8238-8cd70decdc64.png",
      link: "https://www.instagram.com/rkhomesdevelopers?igsh=MTk2eXllb2x1MmhrNQ=="
    }
  ];

  return (
    <section id="work" className="py-16 md:py-24 px-6 md:px-12 lg:px-24 bg-navy text-white overflow-hidden relative">
      {/* Abstract Background Shapes */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 skew-x-12 translate-x-1/4 -z-0"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <h2 className="text-sm uppercase tracking-widest text-primary font-bold mb-4">Work Experience</h2>
          <h3 className="text-3xl md:text-5xl mb-6">Real Client Projects</h3>
          <p className="text-slate-400 text-sm md:text-base">As a freelancer, I handle end-to-end digital branding and social media for these brands.</p>
        </div>

        <div className="space-y-12 md:space-y-16">
          {experiences.map((exp, idx) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col lg:flex-row gap-6 md:gap-8 items-stretch"
            >
              <div className={`lg:w-1/3 p-6 md:p-8 rounded-[2rem] bg-gradient-to-br ${exp.color} flex flex-col justify-between shadow-2xl shadow-navy/50`}>
                <div>
                  <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mb-6 overflow-hidden p-2">
                    <img src={exp.logo} alt={exp.company} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                  </div>
                  <h4 className="text-xl md:text-2xl font-bold mb-2">{exp.company}</h4>
                  <p className="text-white/90 font-medium text-xs md:text-sm mb-2">{exp.role}</p>
                  <div className="flex items-center gap-2 text-white/70 text-[10px] md:text-xs mb-4">
                    <MapPin size={14} /> {exp.location}
                  </div>
                </div>
                <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-white/20">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">Duration</span>
                      <p className="text-base md:text-lg font-bold">{exp.duration}</p>
                    </div>
                    <a 
                      href="#portfolio" 
                      className="inline-flex items-center gap-2 bg-white text-navy px-4 py-2 rounded-full font-bold text-xs hover:bg-primary hover:text-white transition-all shadow-md"
                    >
                      View My Works <ArrowRight size={14} />
                    </a>
                  </div>
                  <a 
                    href={exp.link} 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-white text-navy px-4 py-3 rounded-full text-xs font-bold hover:bg-primary hover:text-white transition-all w-full shadow-lg"
                  >
                    View Instagram <Instagram size={14} />
                  </a>
                </div>
              </div>
              
              <div className="lg:w-2/3 bg-white/5 border border-white/10 p-6 md:p-10 rounded-[2rem] backdrop-blur-md flex flex-col justify-center">
                <div className="mb-6">
                  <h5 className="text-xs md:text-sm font-bold uppercase tracking-widest text-primary mb-4">Key Responsibilities</h5>
                  <ul className="space-y-3">
                    {exp.description.map((item, i) => (
                      <li key={i} className="flex gap-3 text-slate-300 text-xs md:text-sm leading-relaxed">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="pt-6 border-t border-white/10">
                  <h5 className="text-[10px] md:text-sm font-bold uppercase tracking-widest text-slate-500 mb-2">The Result</h5>
                  <p className="text-slate-200 font-medium italic text-xs md:text-sm leading-relaxed">"{exp.result}"</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Portfolio Section ---
const Portfolio = () => {
  const [filter, setFilter] = useState("All");
  
  const categories = ["All", "Websites", "Posters", "Videos", "Business card", "Certificates"];
  
  const projects = [
    // Posters
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
      category: "Business card", 
      type: "Corporate", 
      img: "https://image2url.com/r2/default/images/1775568268455-7723a81d-036a-4e45-b504-53efca63621b.jpeg",
      link: "#"
    },
    { 
      name: "Premium Branding Card", 
      category: "Business card", 
      type: "Branding", 
      img: "https://image2url.com/r2/default/images/1775568312921-e33727cd-ebba-4c5a-acb4-3be0c62dcec5.jpeg",
      link: "#"
    },
    { 
      name: "Elegant Professional Card", 
      category: "Business card", 
      type: "Corporate", 
      img: "https://image2url.com/r2/default/images/1775568352520-a19a43e1-3bdd-4f87-9695-f0c443f6ccbc.jpeg",
      link: "#"
    },
    { 
      name: "Minimalist Business Card", 
      category: "Business card", 
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
      img: "https://image2url.com/r2/default/images/1775567270735-9f31738c-e14f-443e-bc63-25dc45697c09.png",
      link: "https://apollodentalclinic.netlify.app/"
    },
    { 
      name: "Sajal Tech Portfolio", 
      category: "Websites", 
      type: "Portfolio", 
      img: "https://picsum.photos/seed/sajal/800/600",
      link: "https://sajaltech-portfolio.netlify.app/"
    },
    { 
      name: "HobbyMate", 
      category: "Websites", 
      type: "Community", 
      img: "https://picsum.photos/seed/hobby/800/600",
      link: "https://hobbymate.in/"
    },
    { 
      name: "DomainMarkt", 
      category: "Websites", 
      type: "Marketplace", 
      img: "https://picsum.photos/seed/domain/800/600",
      link: "https://domainmarkt.io/"
    },
  ];

  const filteredProjects = filter === "All" ? projects : projects.filter(p => p.category === filter);

  return (
    <section id="portfolio" className="py-16 md:py-24 px-6 md:px-12 lg:px-24 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm uppercase tracking-widest text-primary font-bold mb-4">My Work</h2>
          <h3 className="text-4xl md:text-5xl mb-8">Creative Showcase</h3>
          
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all border-2 ${filter === cat ? "bg-navy border-navy text-white shadow-lg shadow-navy/20" : "bg-white border-slate-100 text-slate-600 hover:border-primary hover:text-primary"}`}
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
              <div className="relative aspect-[3/4] rounded-[2rem] overflow-hidden mb-4 card-shadow border border-slate-100">
                <img 
                  src={project.img} 
                  alt={project.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <a 
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-6"
                >
                  <p className="text-xs font-bold text-primary uppercase tracking-widest mb-2">{project.category}</p>
                  <h4 className="text-lg font-bold text-white leading-tight">{project.name}</h4>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Why Choose Me Section ---
const WhyChooseMe = () => {
  const points = [
    { 
      title: "Real Client Experience", 
      desc: "1.5+ years of proven results with healthcare and real estate brands.",
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
                className={`${point.color} p-8 rounded-[2.5rem] border border-transparent hover:border-slate-200 transition-all group`}
              >
                <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
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
              className="relative group bg-white p-8 rounded-[2.5rem] border border-slate-100 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-500"
            >
              <div className={`w-12 h-12 ${step.color} text-white rounded-2xl flex items-center justify-center mb-8 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                {step.icon}
              </div>
              <div className="absolute top-8 right-8 text-4xl font-display font-black text-slate-50 opacity-0 group-hover:opacity-100 transition-opacity">
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
  return (
    <section id="contact" className="py-16 md:py-24 bg-slate-50 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-sm uppercase tracking-widest text-primary font-bold mb-3">Get In Touch</h2>
            <h3 className="text-3xl md:text-4xl mb-6">Let’s Build Something Great</h3>
            <p className="text-base text-slate-600 mb-8 leading-relaxed">
              Looking for someone reliable to handle your design, content, or video work? I’m here to help.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-4">
              <a 
                href="tel:6385941180"
                className="flex items-start gap-4 bg-white p-4 rounded-2xl border border-slate-100 hover:border-primary transition-colors group"
              >
                <div className="w-10 h-10 bg-primary/5 rounded-xl flex items-center justify-center text-primary shrink-0 mt-0.5 group-hover:bg-primary group-hover:text-white transition-all">
                  <Phone size={20} />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Call</p>
                  <p className="text-sm font-bold text-navy">6385941180</p>
                </div>
              </a>
              <a 
                href="mailto:naveenrajafreelancer@gmail.com"
                className="flex items-start gap-4 bg-white p-4 rounded-2xl border border-slate-100 hover:border-primary transition-colors group"
              >
                <div className="w-10 h-10 bg-primary/5 rounded-xl flex items-center justify-center text-primary shrink-0 mt-0.5 group-hover:bg-primary group-hover:text-white transition-all">
                  <Mail size={20} />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Email</p>
                  <p className="text-sm font-bold text-navy break-all">naveenrajafreelancer@gmail.com</p>
                </div>
              </a>
            </div>

            <div className="mt-8">
              <a 
                href="https://wa.me/6385941180" 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-3 bg-[#25D366] text-white px-8 py-4 rounded-full font-bold hover:opacity-90 transition-all shadow-lg shadow-green-200 text-sm"
              >
                <MessageSquare size={20} /> WhatsApp Me
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100"
          >
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid sm:grid-cols-2 gap-4">
                <input type="text" placeholder="Name" className="w-full px-5 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-primary transition-all text-sm" />
                <input type="email" placeholder="Email" className="w-full px-5 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-primary transition-all text-sm" />
              </div>
              <select className="w-full px-5 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-primary transition-all text-sm">
                <option>Social Media Management</option>
                <option>Creative Design</option>
                <option>Video Editing</option>
                <option>Digital Design</option>
              </select>
              <textarea rows={3} placeholder="Message" className="w-full px-5 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-primary transition-all resize-none text-sm"></textarea>
              <button className="w-full bg-navy text-white py-4 rounded-xl font-bold text-base hover:bg-navy/90 transition-all">
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// --- Footer Component ---
const Footer = () => {
  return (
    <footer className="bg-white pt-20 pb-10 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="grid md:grid-cols-3 gap-12 mb-16">
          <div className="col-span-2">
            <a href="#" className="text-3xl font-display font-bold text-navy mb-6 block">
              Naveen<span className="text-primary">.</span>
            </a>
            <p className="text-slate-500 max-w-sm leading-relaxed">
              Freelance Social Media Manager & Digital Designer helping brands grow with impactful visuals and engaging content.
            </p>
          </div>
          <div>
            <h5 className="font-bold text-navy mb-6">Quick Links</h5>
            <ul className="space-y-4 text-slate-500 font-medium">
              <li><a href="#about" className="hover:text-primary transition-colors">About Me</a></li>
              <li><a href="#services" className="hover:text-primary transition-colors">Services</a></li>
              <li><a href="#portfolio" className="hover:text-primary transition-colors">Portfolio</a></li>
              <li><a href="#contact" className="hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="pt-10 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-400 text-sm font-medium">
            © {new Date().getFullYear()} Naveen. All rights reserved.
          </p>
          <div className="flex gap-8 text-slate-400 text-sm font-medium">
            <a href="#" className="hover:text-navy">Privacy Policy</a>
            <a href="#" className="hover:text-navy">Terms of Service</a>
          </div>
        </div>
      </div>
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
