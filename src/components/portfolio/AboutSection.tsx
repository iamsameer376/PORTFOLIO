import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { Brain, Code, Briefcase, Award } from "lucide-react";

const stats = [
  { icon: Brain, value: "5+", label: "AI/ML Projects", color: "from-blue-500 to-cyan-400", glow: "#38bdf8" },
  { icon: Code, value: "5+", label: "Applications Built", color: "from-violet-500 to-purple-400", glow: "#a855f7" },
  { icon: Briefcase, value: "1+", label: "Years Freelancing", color: "from-emerald-500 to-teal-400", glow: "#34d399" },
  { icon: Award, value: "5+", label: "Happy Clients", color: "from-orange-500 to-amber-400", glow: "#fb923c" },
];

function TiltCard({ children, className, glowColor }: { children: React.ReactNode; className?: string; glowColor: string }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 25 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 25 });
  const glowX = useSpring(useTransform(mouseX, [-0.5, 0.5], [0, 100]), { stiffness: 200, damping: 25 });
  const glowY = useSpring(useTransform(mouseY, [-0.5, 0.5], [0, 100]), { stiffness: 200, damping: 25 });

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const onMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div style={{ perspective: "800px" }}>
      <motion.div
        ref={cardRef}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className={`relative group ${className ?? ""}`}
      >
        {/* Cursor-following glow — motion value driven, zero re-renders */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: useTransform(
              [glowX, glowY],
              ([x, y]) => `radial-gradient(circle at ${x}% ${y}%, ${glowColor}28, transparent 65%)`
            ),
          }}
        />
        {children}
      </motion.div>
    </div>
  );
}

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="relative py-20 md:py-32 overflow-hidden">
      {/* Ambient background */}
      <div className="ambient-orb w-[600px] h-[600px] bg-primary top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ opacity: 0.06 }} />

      <div className="container mx-auto px-4 md:px-6 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-mono text-sm tracking-wider uppercase neon-text">About Me</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
            Passionate About <span className="text-gradient">AI Innovation</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            I'm an AI & Machine Learning Engineer with a passion for building intelligent systems
            that solve real-world problems. From developing conversational AI assistants to crafting
            full-stack web applications, I combine deep technical expertise with creative problem-solving
            to deliver impactful solutions.
          </p>
        </motion.div>

        {/* Stats Grid — 3D tilt cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 60, z: -80 }}
              animate={isInView ? { opacity: 1, y: 0, z: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.12, ease: "backOut" }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <TiltCard glowColor={stat.glow} className="relative glass rounded-2xl p-6 text-center hover-glow cursor-default overflow-hidden">
                {/* Card inner */}
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} mx-auto mb-4 flex items-center justify-center shadow-lg`} style={{ transform: "translateZ(20px)" }}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-1" style={{ transform: "translateZ(15px)" }}>
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground" style={{ transform: "translateZ(10px)" }}>
                  {stat.label}
                </div>

                {/* Bottom gradient accent */}
                <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${stat.color} opacity-60`} />
              </TiltCard>
            </motion.div>
          ))}
        </div>

        {/* Experience Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-20 max-w-3xl mx-auto"
        >
          <div className="space-y-8">
            {[
              { role: "Full Stack Development Course", period: "2025 - Present", desc: "KodNest" },
              { role: "BE in AI and ML", period: "2021 - 2025", desc: "Impact College of Engineering and Applied Sciences. CGPA: 7.5" },
              { role: "PUC in PCMCs", period: "2019 - 2021", desc: "Viddyaniketana PU College, Sriram Nagar. Score: 79%" },
              { role: "SSLC", period: "2018 - 2019", desc: "National School, Bhagyanagar. Score: 83%" },
            ].map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -40, z: -30 }}
                animate={isInView ? { opacity: 1, x: 0, z: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.9 + i * 0.15 }}
                className="flex gap-6 group"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="flex flex-col items-center">
                  <motion.div
                    whileHover={{ scale: 1.4, boxShadow: "0 0 20px hsl(200 100% 55% / 0.8)" }}
                    className="w-3 h-3 rounded-full bg-primary/80 transition-all duration-300"
                  />
                  {i < 3 && <div className="w-0.5 h-full bg-gradient-to-b from-primary/40 to-transparent mt-2" />}
                </div>
                <div className="pb-8 group-hover:translate-x-2 transition-transform duration-300">
                  <div className="text-xs font-mono text-primary mb-1 neon-text">{exp.period}</div>
                  <h4 className="text-lg font-semibold text-foreground mb-2">{exp.role}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{exp.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
