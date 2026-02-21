import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

const skillCategories = [
  {
    title: "AI & Machine Learning",
    icon: "🧠",
    skills: [
      { name: "Python", level: 95 },
      { name: "TensorFlow", level: 88 },
      { name: "PyTorch", level: 85 },
      { name: "NLP / LLMs", level: 90 },
      { name: "Computer Vision", level: 80 },
      { name: "Scikit-learn", level: 92 },
    ],
    gradient: "from-blue-500 to-cyan-400",
    glow: "shadow-blue-500/30",
    accentColor: "#38bdf8",
  },
  {
    title: "Frontend Development",
    icon: "⚡",
    skills: [
      { name: "React.js", level: 92 },
      { name: "TypeScript", level: 88 },
      { name: "Next.js", level: 82 },
      { name: "Tailwind CSS", level: 95 },
      { name: "Framer Motion", level: 85 },
      { name: "HTML/CSS", level: 96 },
    ],
    gradient: "from-violet-500 to-purple-400",
    glow: "shadow-violet-500/30",
    accentColor: "#a855f7",
  },
  {
    title: "Backend & Database",
    icon: "🛠",
    skills: [
      { name: "Node.js", level: 88 },
      { name: "FastAPI", level: 85 },
      { name: "PostgreSQL", level: 82 },
      { name: "MongoDB", level: 86 },
      { name: "REST APIs", level: 92 },
      { name: "Docker", level: 78 },
    ],
    gradient: "from-emerald-500 to-teal-400",
    glow: "shadow-emerald-500/30",
    accentColor: "#10b981",
  },
];

function SkillCard({
  category,
  index,
  isInView,
}: {
  category: typeof skillCategories[0];
  index: number;
  isInView: boolean;
}) {
  const [flipped, setFlipped] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (flipped) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    setRotate({ x: ((y - cy) / cy) * -10, y: ((x - cx) / cx) * 10 });
  };

  const onMouseLeave = () => {
    if (!flipped) setRotate({ x: 0, y: 0 });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, rotateX: -20 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: "backOut" }}
      style={{ perspective: "1000px" }}
    >
      <div
        ref={ref}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        onClick={() => setFlipped(!flipped)}
        style={{
          transformStyle: "preserve-3d",
          transform: flipped
            ? "perspective(1000px) rotateY(180deg)"
            : `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
          transition: flipped ? "transform 0.6s cubic-bezier(0.4,2,0.5,1)" : "transform 0.1s ease",
          cursor: "pointer",
          position: "relative",
          height: "460px",
        }}
      >
        {/* FRONT */}
        <div
          className="glass rounded-2xl p-6 hover-glow absolute inset-0"
          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
        >
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <span className="text-2xl">{category.icon}</span>
            <div>
              <div className={`h-1 w-12 rounded-full bg-gradient-to-r ${category.gradient} mb-2`} />
              <h3 className="text-xl font-bold text-foreground">{category.title}</h3>
            </div>
          </div>

          <p className="text-xs text-muted-foreground/60 mb-4 font-mono">Click to see skills</p>

          {/* Skills */}
          <div className="space-y-4">
            {category.skills.map((skill, skillIndex) => (
              <div key={skill.name}>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-sm font-medium text-foreground">{skill.name}</span>
                  <span className="text-xs font-mono text-muted-foreground">{skill.level}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${skill.level}%` } : {}}
                    transition={{
                      duration: 1.2,
                      delay: 0.5 + index * 0.15 + skillIndex * 0.06,
                      ease: "easeOut",
                    }}
                    className={`h-full rounded-full bg-gradient-to-r ${category.gradient}`}
                    style={{ boxShadow: `0 0 8px 2px ${category.accentColor}55` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* BACK */}
        <div
          className="glass rounded-2xl p-6 absolute inset-0 flex flex-col items-center justify-center"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: `radial-gradient(ellipse at center, ${category.accentColor}15, hsl(220 18% 8% / 0.9))`,
            border: `1px solid ${category.accentColor}40`,
          }}
        >
          <span className="text-6xl mb-4">{category.icon}</span>
          <h3 className={`text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${category.gradient} mb-3 text-center`}>
            {category.title}
          </h3>
          <p className="text-muted-foreground text-sm text-center mb-6">
            {category.skills.length} skills mastered
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {category.skills.map((s) => (
              <span
                key={s.name}
                className="text-xs px-3 py-1 rounded-full font-mono"
                style={{
                  background: `${category.accentColor}20`,
                  border: `1px solid ${category.accentColor}50`,
                  color: category.accentColor,
                }}
              >
                {s.name}
              </span>
            ))}
          </div>
          <p className="text-xs text-muted-foreground/50 mt-6 font-mono">Click to flip back</p>
        </div>
      </div>
    </motion.div>
  );
}

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="relative py-20 md:py-32 overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="ambient-orb w-[400px] h-[400px] bg-accent bottom-0 right-0" style={{ opacity: 0.07 }} />

      <div className="container mx-auto px-4 md:px-6 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-mono text-sm tracking-wider uppercase neon-text">Expertise</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
            Technical <span className="text-gradient">Skills</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            A comprehensive toolkit spanning AI/ML, frontend, and backend technologies
          </p>
          <p className="text-xs text-muted-foreground/50 font-mono mt-2">↑ Click cards to flip</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {skillCategories.map((category, catIndex) => (
            <SkillCard key={category.title} category={category} index={catIndex} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
