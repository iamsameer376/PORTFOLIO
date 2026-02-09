import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send, Mail, MapPin, Phone, CheckCircle, Loader2 } from "lucide-react"; // Import Loader2
import emailjs from '@emailjs/browser';
import { toast } from "sonner"; // If this path is correct based on alias

const ContactSection = () => {
  const ref = useRef(null);
  const formRef = useRef<HTMLFormElement>(null); // Add form ref
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isSubmitting, setIsSubmitting] = useState(false); // Valid state name
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formRef.current) return;

    setIsSubmitting(true);

    // REPLACE THESE VALUES WITH YOUR EMAILJS CREDENTIALS
    const serviceId = "service_evct6yz";
    const templateId = "template_bo3bnrm";
    const publicKey = "BULaWqCBBv4Lg9QU3";

    emailjs
      .sendForm(serviceId, templateId, formRef.current, {
        publicKey: publicKey,
      })
      .then(
        () => {
          setSubmitted(true);
          toast.success("Message sent successfully!");
          if (formRef.current) formRef.current.reset();
          setTimeout(() => setSubmitted(false), 3000);
        },
        (error) => {
          console.error('FAILED...', error.text);
          toast.error("Failed to send message. Please try again.");
        },
      )
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <section id="contact" className="relative py-20 md:py-32 overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[300px] h-[150px] md:w-[800px] md:h-[400px] bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 md:px-6 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-mono text-sm tracking-wider uppercase">Contact</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
            Let's <span className="text-gradient">Connect</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Have a project in mind or want to collaborate? I'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Get in touch</h3>
              <p className="text-muted-foreground leading-relaxed">
                Whether you need an AI solution, a full-stack application, or just want to discuss
                technology — I'm always open to new opportunities and conversations.
              </p>
            </div>

            <div className="space-y-4">
              {[
                { icon: Mail, label: "Email", value: "sameersam37376@gmail.com" },
                { icon: Phone, label: "Phone", value: "8431743739" },
                { icon: MapPin, label: "Location", value: "Bengaluru, India" },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                  className="flex items-center gap-4 p-4 glass rounded-xl hover-glow"
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground font-mono uppercase">{item.label}</div>
                    <div className="text-sm text-foreground font-medium">{item.value}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <form ref={formRef} onSubmit={handleSubmit} className="glass rounded-2xl p-8 space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider block mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="from_name" // Added name
                    placeholder="John Doe"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider block mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="from_email" // Added name
                    placeholder="john@example.com"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider block mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject" // Added name
                  placeholder="Project Inquiry"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all text-sm"
                />
              </div>
              <div>
                <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider block mb-2">
                  Message
                </label>
                <textarea
                  rows={5}
                  name="message" // Added name
                  placeholder="Tell me about your project..."
                  required
                  className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all text-sm resize-none"
                />
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isSubmitting} // Disable while submitting
                className="w-full py-4 rounded-xl bg-gradient-primary text-primary-foreground font-semibold flex items-center justify-center gap-2 hover:shadow-xl hover:shadow-primary/25 transition-shadow duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin" size={18} />
                    Sending...
                  </>
                ) : submitted ? (
                  <>
                    <CheckCircle size={18} />
                    Message Sent!
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
