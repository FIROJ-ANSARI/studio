import { Camera, Film, Palette, Sparkles } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const services = [
  {
    icon: Camera,
    title: "Commercial Photography",
    description: "High-end product and lifestyle photography that elevates your brand and captures attention in the luxury market.",
  },
  {
    icon: Film,
    title: "Video Production",
    description: "Cinematic brand films and advertising content that tells your story with compelling visual impact and emotion.",
  },
  {
    icon: Palette,
    title: "Creative Direction",
    description: "Strategic vision and art direction that brings cohesive, memorable campaigns to life with distinctive style.",
  },
  {
    icon: Sparkles,
    title: "Post Production",
    description: "World-class retouching and editing that perfects every detail of your visual content with precision.",
  },
];

// A sub-component for the individual service card to manage its own animation state
const ServiceCard = ({ service, index, startAnimation }) => {
    const { icon: Icon, title, description } = service;
    const [animatedTitle, setAnimatedTitle] = useState("");
    const [phase, setPhase] = useState('pending'); // 'pending', 'typing', 'deleting'

    const typingSpeed = 60;
    const deletingSpeed = 40;
    const pauseDuration = 2500;

    // Effect to kick off the animation once the section is visible
    useEffect(() => {
        if (startAnimation && phase === 'pending') {
            // No stagger, start immediately
            const startTimeout = setTimeout(() => {
                setPhase('typing');
            }, 0); 
            return () => clearTimeout(startTimeout);
        }
    }, [startAnimation, phase, index]);

    // The main animation loop effect
    useEffect(() => {
        if (phase === 'pending') return;

        let timeoutId;

        if (phase === 'typing') {
            if (animatedTitle.length < title.length) {
                // Typing...
                timeoutId = setTimeout(() => {
                    setAnimatedTitle(title.slice(0, animatedTitle.length + 1));
                }, typingSpeed);
            } else {
                // Finished typing. Pause, then switch to deleting.
                timeoutId = setTimeout(() => {
                    setPhase('deleting');
                }, pauseDuration);
            }
        } else if (phase === 'deleting') {
            if (animatedTitle.length > 0) {
                // Deleting...
                timeoutId = setTimeout(() => {
                    setAnimatedTitle(animatedTitle.slice(0, animatedTitle.length - 1));
                }, deletingSpeed);
            } else {
                // Finished deleting. Pause briefly, then switch back to typing.
                timeoutId = setTimeout(() => {
                    setPhase('typing');
                }, 500);
            }
        }

        return () => clearTimeout(timeoutId);

    }, [animatedTitle, phase, title]);
    
    // The cursor is visible while typing, and also during the pause *after* typing is complete.
    const showCursor = phase === 'typing' || (phase === 'deleting' && animatedTitle.length === title.length);
    
    return (
        <div
            className="group bg-background p-12 lg:p-16 hover:bg-card transition-all duration-500 relative overflow-hidden hover:-translate-y-2 hover:shadow-2xl hover:shadow-accent/10"
        >
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl transform translate-x-32 -translate-y-32 group-hover:scale-150 group-hover:bg-accent/10 transition-transform duration-700" />
            
            <div className="relative z-10">
                <Icon 
                    className="w-10 h-10 mb-8 text-accent group-hover:scale-110 group-hover:rotate-[-12deg] transition-all duration-500" 
                    strokeWidth={1.5}
                />
                <h3 className="text-2xl md:text-3xl font-serif font-light mb-6 tracking-tight group-hover:text-accent transition-colors duration-500 min-h-[72px] md:min-h-[88px]">
                    {animatedTitle}
                    {showCursor && <span className="animate-pulse ml-1">|</span>}
                </h3>
                <p className="text-muted-foreground leading-relaxed font-light">
                    {description}
                </p>
                
                <div className="w-0 h-px bg-accent mt-8 group-hover:w-16 transition-all duration-500" />
            </div>
        </div>
    );
};


const Services = () => {
  const [startAnimations, setStartAnimations] = useState(false);
  const sectionRef = useRef(null);

  // This effect will trigger the animations when the section is scrolled into view
  useEffect(() => {
    const observer = new IntersectionObserver(
        (entries) => {
            if (entries[0].isIntersecting) {
                setStartAnimations(true);
                observer.unobserve(sectionRef.current); // Stop observing after it's visible
            }
        },
        { threshold: 0.1 } // Trigger when 10% of the element is visible
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
        observer.observe(currentRef);
    }

    return () => {
        if (currentRef) {
            observer.unobserve(currentRef);
        }
    };
  }, []);

  return (
    <section id="services" ref={sectionRef} className="py-32 bg-muted">
      <div className="container mx-auto px-6 lg:px-16">
        <div className="max-w-3xl mb-24 animate-fade-in-up">
          <span className="text-xs tracking-widest text-accent uppercase font-light mb-4 block">
            What We Offer
          </span>
          <h2 className="text-5xl md:text-7xl font-serif font-light mb-6 tracking-tighter">
            Our Services
          </h2>
          <p className="text-muted-foreground text-lg font-light leading-relaxed">
            Comprehensive production solutions tailored to luxury brands and creative visionaries
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-px bg-border">
          {services.map((service, index) => (
            <ServiceCard 
                key={index} 
                service={service} 
                index={index} 
                startAnimation={startAnimations} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;

