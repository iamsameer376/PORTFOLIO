import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Brain, Code, Briefcase, Award } from "lucide-react";

const stats = [
  { icon: Brain, value: "5+", label: "AI/ML Projects" },
  { icon: Code, value: "5+", label: "Applications Built" },
  { icon: Briefcase, value: "1+", label: "Years Freelancing" },
  { icon: Award, value: "5+", label: "Happy Clients" },
];

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="relative py-20 md:py-32 overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 md:px-6 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-mono text-sm tracking-wider uppercase">About Me</span>
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

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="relative group"
            >
              <div className="glass rounded-2xl p-6 text-center hover-glow cursor-default">
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-gradient-primary mx-auto mb-4 flex items-center justify-center group-hover:shadow-lg group-hover:shadow-primary/25 transition-shadow duration-300">
                  <stat.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Experience Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-20 max-w-3xl mx-auto"
        >
          <div className="space-y-8">
            {[
              {
                role: "Full Stack Development Course",
                period: "2025 - Present",
                desc: "KodNest",
              },
              {
                role: "BE in AI and ML",
                period: "2021 - 2025",
                desc: "Impact College of Engineering and Applied Sciences. CGPA: 7.5",
              },
              {
                role: "PUC in PCMCs",
                period: "2019 - 2021",
                desc: "Viddyaniketana PU College, Sriram Nagar. Score: 79%",
              },
              {
                role: "SSLC",
                period: "2018 - 2019",
                desc: "National School, Bhagyanagar. Score: 83%",
              },
            ].map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.8 + i * 0.15 }}
                className="flex gap-6 group"
              >
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-primary group-hover:shadow-lg group-hover:shadow-primary/50 transition-shadow" />
                  {i < 3 && <div className="w-0.5 h-full bg-border mt-2" />}
                </div>
                <div className="pb-8">
                  <div className="text-xs font-mono text-primary mb-1">{exp.period}</div>
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
