import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative py-12 border-t border-border/30">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center md:text-left"
          >
            <a href="#home" className="text-xl font-bold text-gradient">
              PORTFOLIO
            </a>
            <p className="text-sm text-muted-foreground mt-1">
              Mohammed Sameer ~ AI & ML engineer
            </p>
          </motion.div>

          <div className="flex items-center gap-4">
            {[
              { icon: Github, href: "https://github.com/iamsameer376" },
              { icon: Linkedin, href: "https://www.linkedin.com/in/iamsameer37/" },
              { icon: Mail, href: "mailto:sameersam37376@gmail.com" },
            ].map(({ icon: Icon, href }) => (
              <motion.a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3, scale: 1.1 }}
                className="w-10 h-10 rounded-full glass flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
              >
                <Icon size={16} />
              </motion.a>
            ))}
          </div>

          <p className="text-xs text-muted-foreground flex items-center gap-1">
            © {new Date().getFullYear()} Mohammed Sameer
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
