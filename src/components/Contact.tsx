import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { useState, useEffect } from "react";

// Simple Input Component with Underline Style
const UnderlineInput = ({ id, label, ...props }) => {
    return (
        <div className="relative">
            <input
                id={id}
                placeholder={label}
                className="block w-full px-1 py-3 bg-transparent border-b border-gray-300 focus:border-amber-500 focus:outline-none transition-colors duration-300 font-light text-gray-800 placeholder-gray-400"
                {...props}
            />
        </div>
    );
};

// Simple Textarea Component with Underline Style
const UnderlineTextarea = ({ id, label, ...props }) => {
    return (
        <div className="relative">
            <textarea
                id={id}
                placeholder={label}
                className="block w-full px-1 py-3 bg-transparent border-b border-gray-300 focus:border-amber-500 focus:outline-none transition-colors duration-300 font-light text-gray-800 placeholder-gray-400 resize-none"
                rows={4}
                {...props}
            ></textarea>
        </div>
    );
};

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Thank you for reaching out! We'll be in touch soon.");
    e.target.reset(); // Reset form fields after submission
  };

  const [animatedText, setAnimatedText] = useState("");
  const [phase, setPhase] = useState("typing");
  const fullText = "Together";

  // Typing animation effect
  useEffect(() => {
    let timeoutId;
    if (phase === "typing") {
      if (animatedText.length < fullText.length) {
        timeoutId = setTimeout(() => {
          setAnimatedText(fullText.slice(0, animatedText.length + 1));
        }, 150);
      } else {
        // Pause after typing is complete
        timeoutId = setTimeout(() => setPhase("deleting"), 2500);
      }
    } else if (phase === "deleting") {
      if (animatedText.length > 0) {
        timeoutId = setTimeout(() => {
          setAnimatedText(animatedText.slice(0, animatedText.length - 1));
        }, 100);
      } else {
        // Pause after deleting is complete
        timeoutId = setTimeout(() => setPhase("typing"), 500);
      }
    }
    return () => clearTimeout(timeoutId);
  }, [animatedText, phase]);

  return (
    <section id="contact" className="py-24 md:py-32 bg-white text-gray-600">
      <div className="container mx-auto px-6 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Left Column */}
          <div className="animate-fade-in-up">
            <span className="text-xs tracking-[0.2em] text-gray-400 uppercase font-light mb-6 block">
              Get In Touch
            </span>
            <h2 className="text-5xl md:text-7xl font-serif font-light text-amber-500 mb-8 tracking-tighter leading-none">
              Let's Create
              <br />
              <span className="italic font-normal text-6xl md:text-8xl min-h-[72px] md:min-h-[96px] inline-block">
                {animatedText}
                <span className="animate-pulse text-gray-400">|</span>
              </span>
            </h2>
            <p className="text-base mb-16 font-light leading-relaxed">
              Ready to bring your vision to life? Get in touch with our team to discuss your next project and discover how we can elevate your brand.
            </p>

            <div className="space-y-10">
                {/* Contact Info Item */}
                <div className="flex items-center gap-6">
                    <div className="flex-shrink-0 w-14 h-14 flex items-center justify-center border border-gray-200 rounded-full">
                        <Mail className="w-6 h-6 text-amber-500" strokeWidth={1} />
                    </div>
                    <div>
                        <div className="text-xs uppercase tracking-[0.2em] text-gray-400 font-light mb-1">Email</div>
                        <a href="mailto:info@eliteproductions.com" className="text-base text-gray-600 font-light tracking-wider">
                            info@eliteproductions.com
                        </a>
                    </div>
                </div>
                 {/* Contact Info Item */}
                <div className="flex items-center gap-6">
                    <div className="flex-shrink-0 w-14 h-14 flex items-center justify-center border border-gray-200 rounded-full">
                        <Phone className="w-6 h-6 text-amber-500" strokeWidth={1} />
                    </div>
                    <div>
                        <div className="text-xs uppercase tracking-[0.2em] text-gray-400 font-light mb-1">Phone</div>
                        <a href="tel:+12125551234" className="text-base text-gray-600 font-light tracking-wider">
                            +1 (212) 555-1234
                        </a>
                    </div>
                </div>
                 {/* Contact Info Item */}
                <div className="flex items-center gap-6">
                     <div className="flex-shrink-0 w-14 h-14 flex items-center justify-center border border-gray-200 rounded-full">
                        <MapPin className="w-6 h-6 text-amber-500" strokeWidth={1} />
                    </div>
                    <div>
                        <div className="text-xs uppercase tracking-[0.2em] text-gray-400 font-light mb-1">Studio</div>
                        <p className="text-base text-gray-600 font-light tracking-wider">
                            123 Creative Avenue, New York
                        </p>
                    </div>
                </div>
            </div>
          </div>

          {/* Right Column (Form) */}
          <div>
            <h3 className="text-xl font-serif font-light mb-12 text-amber-500">Send us a message</h3>
            <form onSubmit={handleSubmit} className="space-y-8">
                <UnderlineInput id="name" label="Your Name" type="text" required />
                <UnderlineInput id="email" label="Email Address" type="email" required />
                <UnderlineInput id="subject" label="Subject" type="text" required />
                <UnderlineTextarea id="message" label="Tell us about your project..." required />
                
                <button
                  type="submit"
                  className="group w-full max-w-xs inline-flex items-center justify-center px-8 py-4 text-sm font-light tracking-[0.2em] text-white uppercase bg-amber-500 transition-all duration-300 hover:bg-amber-600"
                >
                  <span className="relative flex items-center gap-3">
                    SEND MESSAGE <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;



