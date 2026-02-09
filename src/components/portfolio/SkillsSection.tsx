import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const skillCategories = [
  {
    title: "AI & Machine Learning",
    skills: [
      { name: "Python", level: 95 },
      { name: "TensorFlow", level: 88 },
      { name: "PyTorch", level: 85 },
      { name: "NLP / LLMs", level: 90 },
      { name: "Computer Vision", level: 80 },
      { name: "Scikit-learn", level: 92 },
    ],
    gradient: "from-blue-500 to-cyan-400",
    glow: "shadow-blue-500/20",
  },
  {
    title: "Frontend Development",
    skills: [
      { name: "React.js", level: 92 },
      { name: "TypeScript", level: 88 },
      { name: "Next.js", level: 82 },
      { name: "Tailwind CSS", level: 95 },
      { name: "Framer Motion", level: 85 },
      { name: "HTML/CSS", level: 96 },
    ],
    gradient: "from-violet-500 to-purple-400",
    glow: "shadow-violet-500/20",
  },
  {
    title: "Backend & Database",
    skills: [
      { name: "Node.js", level: 88 },
      { name: "FastAPI", level: 85 },
      { name: "PostgreSQL", level: 82 },
      { name: "MongoDB", level: 86 },
      { name: "REST APIs", level: 92 },
      { name: "Docker", level: 78 },
    ],
    gradient: "from-emerald-500 to-teal-400",
    glow: "shadow-emerald-500/20",
  },
];

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="relative py-20 md:py-32 overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-30" />

      <div className="container mx-auto px-4 md:px-6 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-mono text-sm tracking-wider uppercase">Expertise</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
            Technical <span className="text-gradient">Skills</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            A comprehensive toolkit spanning AI/ML, frontend, and backend technologies
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: catIndex * 0.15 }}
              whileHover={{ y: -8 }}
              className="glass rounded-2xl p-6 hover-glow"
            >
              {/* Category header */}
              <div className={`h-1 w-16 rounded-full bg-gradient-to-r ${category.gradient} mb-6`} />
              <h3 className="text-xl font-bold text-foreground mb-6">{category.title}</h3>

              {/* Skills */}
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{
                      duration: 0.4,
                      delay: 0.3 + catIndex * 0.15 + skillIndex * 0.05,
                    }}
                  >
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-sm font-medium text-foreground">{skill.name}</span>
                      <span className="text-xs font-mono text-muted-foreground">{skill.level}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${skill.level}%` } : {}}
                        transition={{
                          duration: 1,
                          delay: 0.5 + catIndex * 0.15 + skillIndex * 0.05,
                          ease: "easeOut",
                        }}
                        className={`h-full rounded-full bg-gradient-to-r ${category.gradient} ${category.glow} shadow-lg`}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
