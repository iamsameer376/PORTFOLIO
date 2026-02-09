import { motion } from "framer-motion";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import { type LucideIcon } from "lucide-react";

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-16 items-center`}
    >
      {/* Project Visual */}
      <motion.div
        whileHover={{ scale: 1.02, rotateY: isEven ? 3 : -3 }}
        transition={{ duration: 0.4 }}
        className="flex-1 w-full"
      >
        <div
          className="relative rounded-2xl overflow-hidden glass group cursor-pointer"
          style={{ perspective: "1000px" }}
        >
          {/* Gradient header bar */}
          <div className={`h-2 w-full ${color}`} />

          {/* Card content area */}
          <div className="p-6 md:p-10">
            {/* Icon & Title area */}
            <div className="flex items-center gap-4 mb-6">
              <motion.div
                whileHover={{ rotate: 360 }}
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
            <p className="text-muted-foreground leading-relaxed mb-6">
              {longDescription}
            </p>

            {/* Features */}
            <div className="grid grid-cols-2 gap-2 mb-6">
              {features.map((feature) => (
                <div key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className={`w-1.5 h-1.5 rounded-full ${color}`} />
                  {feature}
                </div>
              ))}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full text-xs font-mono bg-secondary/50 text-muted-foreground border border-border/50"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Links */}
            <div className="flex gap-3">
              <motion.a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full ${color} text-white text-sm font-medium hover:shadow-lg transition-shadow duration-300`}
                style={{ boxShadow: `0 4px 15px -3px ${glowColor}` }}
              >
                <ExternalLink size={14} />
                Live Demo
              </motion.a>
              <motion.a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border text-foreground text-sm font-medium hover:border-primary/50 transition-colors duration-300"
              >
                <Github size={14} />
                Source
              </motion.a>
            </div>
          </div>

          {/* Hover glow effect */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
            style={{
              background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${glowColor}08, transparent 40%)`,
            }}
          />
        </div>
      </motion.div>

      {/* Decorative element */}
      <div className="hidden lg:flex flex-col items-center gap-2">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
          className={`w-4 h-4 rounded-full ${color}`}
          style={{ boxShadow: `0 0 20px ${glowColor}` }}
        />
        <div className="w-0.5 h-24 bg-gradient-to-b from-border to-transparent" />
      </div>

      {/* Side stats */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? 30 : -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="flex-shrink-0 lg:w-48"
      >
        <div className="glass rounded-2xl p-6 space-y-4">
          <div>
            <div className="text-xs text-muted-foreground font-mono uppercase tracking-wider mb-1">Status</div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400" />
              <span className="text-sm text-foreground">Completed</span>
            </div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground font-mono uppercase tracking-wider mb-1">Type</div>
            <span className="text-sm text-foreground">{description}</span>
          </div>
          <motion.a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ x: 5 }}
            className="flex items-center gap-1 text-primary text-sm font-medium"
          >
            View Project <ArrowUpRight size={14} />
          </motion.a>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectCard;
