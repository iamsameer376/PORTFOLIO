import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";
import { ArrowDown, Github, Linkedin, Mail, Sparkles, Phone } from "lucide-react";

const TITLE_WORDS = ["Mohammed", "Sameer"];

const HeroSection = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 60, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 30 });

  const rotateX = useTransform(springY, [-300, 300], [8, -8]);
  const rotateY = useTransform(springX, [-500, 500], [-8, 8]);

  const handleMouseMove = (e: MouseEvent) => {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    mouseX.set(e.clientX - cx);
    mouseY.set(e.clientY - cy);
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.04 } },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-start md:justify-center md:items-center pt-32 md:pt-0 overflow-hidden"
    >
      {/* Ambient orbs */}
      <div className="ambient-orb w-[400px] h-[400px] bg-primary top-1/4 -left-48" style={{ opacity: 0.05 }} />
      <div className="ambient-orb w-[300px] h-[300px] bg-accent bottom-1/4 -right-32" style={{ animationDelay: "3s", opacity: 0.04 }} />

      {/* 3D Parallax container */}
      <motion.div
        style={{ rotateX, rotateY }}
        className="container mx-auto px-4 md:px-6 relative z-10 w-full"
      >
        <div className="max-w-4xl mx-auto text-center">

          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: "backOut" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-border/60 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-sm text-muted-foreground">Available for work</span>
          </motion.div>

          {/* High-Performance Word-by-word title */}
          <div className="mb-2">
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-3">
              <span className="text-foreground block">Hi, I'm</span>
              <motion.span
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-wrap justify-center gap-x-[0.4em]"
              >
                {TITLE_WORDS.map((word, wi) => (
                  <motion.span
                    key={wi}
                    variants={wordVariants}
                    style={{
                      display: "inline-block",
                      background: "linear-gradient(135deg, hsl(200,80%,62%), hsl(265,70%,65%))",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.span>
            </h1>
          </div>

          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex items-center justify-center gap-2 mb-8 px-4"
          >
            <Sparkles className="text-primary w-4 h-4 animate-pulse flex-shrink-0 hidden sm:block" />
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground font-light tracking-wide text-center">
              Artificial Intelligence &amp; Machine Learning Engineer
            </p>
            <Sparkles className="text-accent w-4 h-4 animate-pulse flex-shrink-0 hidden sm:block" />
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="text-sm sm:text-base lg:text-lg text-muted-foreground/80 max-w-2xl mx-auto mb-8 md:mb-12 leading-relaxed px-2"
          >
            Building intelligent systems and crafting exceptional digital experiences.
            From AI voice assistants to full-stack applications — I turn complex ideas into elegant solutions.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10 px-4"
          >
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.07, boxShadow: "0 0 40px hsl(200 100% 55% / 0.6)" }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto px-8 py-3 sm:py-4 rounded-full bg-gradient-primary text-primary-foreground font-semibold transition-all duration-300 relative overflow-hidden group text-center"
            >
              <span className="relative z-10">View My Work</span>
              <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto px-8 py-3 sm:py-4 rounded-full neon-border text-foreground font-semibold transition-all duration-300 text-center"
            >
              Get In Touch
            </motion.a>
          </motion.div>

          {/* Scroll indicator — inline between buttons and social icons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6 }}
            className="flex flex-col items-center gap-1 py-2"
          >
            <span className="text-xs text-muted-foreground/40 font-mono tracking-widest uppercase">Scroll</span>
            <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
              <ArrowDown className="text-muted-foreground/35 w-4 h-4" />
            </motion.div>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.4 }}
            className="flex items-center justify-center gap-4"
          >
            {[
              { icon: Github, href: "https://github.com/iamsameer376", label: "GitHub" },
              { icon: Linkedin, href: "https://www.linkedin.com/in/iamsameer37/", label: "LinkedIn" },
              { icon: Mail, href: "mailto:sameersam37376@gmail.com", label: "Email" },
              { icon: Phone, href: "https://wa.me/8431743739", label: "WhatsApp" },
            ].map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.25, y: -4 }}
                whileTap={{ scale: 0.9 }}
                className="w-12 h-12 rounded-full glass neon-border flex items-center justify-center text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                <Icon size={20} />
              </motion.a>
            ))}
          </motion.div>
        </div>

      </motion.div>
    </section>
  );
};

export default HeroSection;
