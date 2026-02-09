import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { Mic, BarChart3, Globe, CalendarCheck } from "lucide-react";
import ProjectCard from "./ProjectCard";

const projects = [
  {
    title: "SIFRA",
    description: "AI Voice Assistant",
    longDescription:
      "An intelligent AI-powered voice assistant built with advanced NLP and speech recognition capabilities. SIFRA understands natural language commands, performs tasks, answers questions, and learns from interactions to provide increasingly personalized responses.",
    tags: ["Python", "NLP", "Speech Recognition", "TensorFlow", "FastAPI", "WebSocket"],
    icon: Mic,
    color: "bg-gradient-to-r from-blue-500 to-cyan-400",
    glowColor: "rgba(59, 130, 246, 0.5)",
    features: [
      "Voice Recognition",
      "Natural Language Processing",
      "Task Automation",
      "Context Awareness",
      "Multi-language Support",
      "Real-time Responses",
    ],
  },
  {
    title: "ACCRUVISTA CRM",
    description: "Enterprise CRM System",
    longDescription:
      "A comprehensive Customer Relationship Management system built for ACCRUVISTA to streamline their business operations. Features include lead management, sales pipeline tracking, automated reporting, and team collaboration tools.",
    tags: ["React", "Node.js", "PostgreSQL", "REST API", "Chart.js", "Tailwind CSS"],
    icon: BarChart3,
    color: "bg-gradient-to-r from-violet-500 to-purple-400",
    glowColor: "rgba(139, 92, 246, 0.5)",
    features: [
      "Lead Management",
      "Sales Pipeline",
      "Analytics Dashboard",
      "Team Collaboration",
      "Automated Reports",
      "Client Tracking",
    ],
  },
  {
    title: "ACCRUVISTA Website",
    description: "Corporate Website",
    longDescription:
      "A modern, responsive corporate website designed and developed for ACCRUVISTA. Built with a focus on performance, SEO optimization, and stunning visual design that reflects the company's professional brand identity.",
    tags: ["React", "TypeScript", "Framer Motion", "SEO", "Responsive", "Figma"],
    icon: Globe,
    color: "bg-gradient-to-r from-emerald-500 to-teal-400",
    glowColor: "rgba(16, 185, 129, 0.5)",
    features: [
      "Responsive Design",
      "SEO Optimized",
      "Smooth Animations",
      "Contact Forms",
      "Performance Tuned",
      "Brand Identity",
    ],
  },
  {
    title: "BOOKNEX",
    description: "Venue Booking Platform",
    longDescription:
      "A multi-category venue booking application that allows users to discover and book various types of venues including sports turfs, salons, clinics, and more. Features real-time availability, instant booking, reviews, and a seamless payment experience.",
    tags: ["React", "Node.js", "MongoDB", "Stripe", "Google Maps API", "Socket.io"],
    icon: CalendarCheck,
    color: "bg-gradient-to-r from-orange-500 to-amber-400",
    glowColor: "rgba(249, 115, 22, 0.5)",
    features: [
      "Multi-Venue Types",
      "Real-time Availability",
      "Instant Booking",
      "Payment Integration",
      "Reviews & Ratings",
      "Location-based Search",
    ],
  },
];

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="relative py-20 md:py-32 overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-1/3 -right-48 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 -left-48 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 md:px-6 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-primary font-mono text-sm tracking-wider uppercase">Portfolio</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            A showcase of my most impactful work — from AI systems to full-stack applications
          </p>
        </motion.div>

        {/* Projects List */}
        <div className="space-y-24 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} {...project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
