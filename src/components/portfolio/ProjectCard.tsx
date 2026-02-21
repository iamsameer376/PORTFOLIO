import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import { type LucideIcon } from "lucide-react";
import { useRef } from "react";

interface ProjectCardProps {
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  icon: LucideIcon;
  color: string;
  glowColor: string;
  index: number;
  features: string[];
  liveUrl?: string;
  githubUrl?: string;
}

const ProjectCard = ({
  title,
  description,
  longDescription,
  tags,
  icon: Icon,
  color,
  glowColor,
  index,
  features,
  liveUrl = "#",
  githubUrl = "#",
}: ProjectCardProps) => {
  const isEven = index % 2 === 0;
  const cardRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), { stiffness: 150, damping: 20 });
  const glowX = useSpring(useTransform(mouseX, [-0.5, 0.5], [0, 100]), { stiffness: 150, damping: 20 });
  const glowY = useSpring(useTransform(mouseY, [-0.5, 0.5], [0, 100]), { stiffness: 150, damping: 20 });

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
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: "backOut" }}
      className={`flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} gap-8 lg:gap-16 items-center`}
    >
      {/* Project Visual — 3D Tilt Card */}
      <div className="flex-1 w-full" style={{ perspective: "1200px" }}>
        <motion.div
          ref={cardRef}
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
          style={{
            rotateX,
            rotateY,
          }}
          className="relative rounded-2xl overflow-hidden glass group cursor-pointer"
        >
          {/* Gradient header bar */}
          <div className={`h-1.5 w-full ${color}`} />

          {/* Neon glow follow */}
          <motion.div
            className="absolute inset-0 pointer-events-none rounded-2xl z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle at ${glowX}% ${glowY}%, ${glowColor}20, transparent 55%)`,
            }}
          />

          {/* Card content area */}
          <div className="p-6 md:p-10 relative z-20">
            {/* Icon & Title */}
            <div className="flex items-center gap-4 mb-6">
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
                className={`w-14 h-14 rounded-xl ${color} flex items-center justify-center shadow-lg`}
                style={{ boxShadow: `0 8px 30px -5px ${glowColor}` }}
              >
                <Icon className="w-7 h-7 text-white" />
              </motion.div>
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-foreground">{title}</h3>
                <p className="text-sm text-muted-foreground">{description}</p>
              </div>
            </div>

            {/* Description */}
            <p className="text-muted-foreground leading-relaxed mb-6">{longDescription}</p>

            {/* Features */}
            <div className="grid grid-cols-2 gap-2 mb-6">
              {features.map((feature) => (
                <div key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className={`w-1.5 h-1.5 rounded-full ${color} shadow-[0_0_6px_1px]`} style={{ boxShadow: `0 0 6px 1px ${glowColor}` }} />
                  {feature}
                </div>
              ))}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {tags.map((tag) => (
                <motion.span
                  key={tag}
                  whileHover={{ scale: 1.08, y: -2 }}
                  className="px-3 py-1 rounded-full text-xs font-mono bg-secondary/50 text-muted-foreground border border-border/50 cursor-default"
                >
                  {tag}
                </motion.span>
              ))}
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              {liveUrl && liveUrl !== "#" && (
                <motion.a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, boxShadow: `0 8px 30px -5px ${glowColor}` }}
                  whileTap={{ scale: 0.95 }}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full ${color} text-white text-sm font-medium transition-all duration-300 relative overflow-hidden group/btn`}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <ExternalLink size={14} />
                    Live Demo
                  </span>
                  <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-500 skew-x-12" />
                </motion.a>
              )}
              {githubUrl && githubUrl !== "#" && (
                <motion.a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full neon-border text-foreground text-sm font-medium transition-colors duration-300"
                >
                  <Github size={14} />
                  Source
                </motion.a>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Decorative orb */}
      <div className="hidden lg:flex flex-col items-center gap-2">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
          className={`w-4 h-4 rounded-full ${color}`}
          style={{ boxShadow: `0 0 20px ${glowColor}` }}
        />
        <div className="w-0.5 h-24 bg-gradient-to-b from-border to-transparent" />
      </div>

      {/* Side info card */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? 30 : -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="flex-shrink-0 lg:w-48"
        whileHover={{ y: -4 }}
      >
        <div className="glass rounded-2xl p-6 space-y-4 neon-border">
          <div>
            <div className="text-xs text-muted-foreground font-mono uppercase tracking-wider mb-1">Status</div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.6)]" />
              <span className="text-sm text-foreground">Completed</span>
            </div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground font-mono uppercase tracking-wider mb-1">Type</div>
            <span className="text-sm text-foreground">{description}</span>
          </div>
          {liveUrl && liveUrl !== "#" && (
            <motion.a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ x: 5 }}
              className="flex items-center gap-1 text-primary text-sm font-medium neon-text"
            >
              View Project <ArrowUpRight size={14} />
            </motion.a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectCard;
