import { useState, useEffect, useRef } from "react";
import { Award, Users, Camera, Zap } from "lucide-react";

// Data for statistics section
const stats = [
  { icon: Award, value: "50+", label: "Awards Won" },
  { icon: Users, value: "200+", label: "Happy Clients" },
  { icon: Camera, value: "500+", label: "Projects Completed" },
  { icon: Zap, value: "15+", label: "Years Experience" },
];

// Custom hook for the count-up animation
const useCountUp = (endValue, duration = 2000, start = false) => {
    const [count, setCount] = useState(0);
    const numericEnd = parseInt(endValue, 10);

    useEffect(() => {
        if (!start) return;
        let startTime = null;
        
        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const currentCount = Math.floor(progress * numericEnd);
            setCount(currentCount);

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        const animationFrameId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrameId);
    }, [start, numericEnd, duration]);

    return count;
};

// Component for a single stat item with counter animation
const StatItem = ({ stat, startAnimation }) => {
    const { icon: Icon, value, label } = stat;
    const count = useCountUp(value, 2000, startAnimation);
    const suffix = value.replace(/[0-9]/g, ''); // Extracts the '+' if it exists

    return (
        <div className="bg-background/5 backdrop-blur-sm border border-primary-foreground/10 p-10 text-center transition-all duration-500 group hover:bg-background/10 hover:border-accent hover:shadow-2xl hover:shadow-accent/20 hover:-translate-y-2">
            <Icon className="w-8 h-8 mx-auto mb-6 text-accent group-hover:scale-110 transition-transform duration-500" strokeWidth={1.5} />
            <div className="text-5xl font-serif font-light mb-3 tracking-tight">
                {count}{suffix}
            </div>
            <div className="text-primary-foreground/60 text-[10px] tracking-widest uppercase font-light">
                {label}
            </div>
        </div>
    );
};

const About = () => {
    // State for animations
    const [phase, setPhase] = useState('typing1');
    const [line1, setLine1] = useState('');
    const [line2, setLine2] = useState('');
    const [startAnimations, setStartAnimations] = useState(false);
    const [counterKey, setCounterKey] = useState(0); // Key to force re-render of counters
    const sectionRef = useRef(null);

    const fullLine1 = "Where Creativity";
    const fullLine2 = "Meets Excellence";
    const typingSpeed = 100;
    const deletingSpeed = 50;
    const pauseDuration = 2000;

    // Effect to trigger animations when the component becomes visible
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setStartAnimations(true);
                    observer.unobserve(sectionRef.current);
                }
            },
            { threshold: 0.2 }
        );

        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => {
            if (sectionRef.current) observer.unobserve(sectionRef.current);
        };
    }, []);

    // Effect for the infinite typing animation state machine
    useEffect(() => {
        if (!startAnimations) return;

        const handleTyping = () => {
            switch (phase) {
                case 'typing1':
                    if (line1.length < fullLine1.length) setLine1(fullLine1.substring(0, line1.length + 1));
                    else setPhase('typing2');
                    break;
                case 'typing2':
                    if (line2.length < fullLine2.length) setLine2(fullLine2.substring(0, line2.length + 1));
                    else setTimeout(() => setPhase('deleting2'), pauseDuration);
                    break;
                case 'deleting2':
                    if (line2.length > 0) setLine2(line2.substring(0, line2.length - 1));
                    else setPhase('deleting1');
                    break;
                case 'deleting1':
                    if (line1.length > 0) {
                        setLine1(line1.substring(0, line1.length - 1));
                    } else {
                        // Pause before restarting the cycle
                        setTimeout(() => {
                            // Restart counter and typing animations simultaneously
                            setCounterKey(prevKey => prevKey + 1);
                            setPhase('typing1');
                        }, 500);
                    }
                    break;
                default: break;
            }
        };

        // This prevents setting a timeout when we are in the pause phase of 'deleting1'
        if (phase === 'deleting1' && line1.length === 0) {
             const timer = setTimeout(handleTyping, 0);
             return () => clearTimeout(timer);
        }

        const speed = phase.includes('deleting') ? deletingSpeed : typingSpeed;
        const timer = setTimeout(handleTyping, speed);
        return () => clearTimeout(timer);
    }, [line1, line2, phase, startAnimations]);
    
    // Helper to render the second line with italic text correctly
    const renderLine2 = () => {
        const meetsPart = "Meets ";
        if (line2.startsWith(meetsPart)) {
            const excellencePart = line2.substring(meetsPart.length);
            return <>{meetsPart}<span className="italic font-normal">{excellencePart}</span></>;
        }
        return line2;
    };

    return (
        <section id="about" ref={sectionRef} className="relative py-32 bg-primary text-primary-foreground overflow-hidden">
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 left-0 w-96 h-96 bg-accent rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl" />
            </div>
            
            <div className="container mx-auto px-6 lg:px-16 relative z-10">
                <div className="grid lg:grid-cols-2 gap-20 items-center">
                    <div>
                        <span className="text-xs tracking-widest text-accent uppercase font-light mb-6 block">About Us</span>
                        <h2 className="text-5xl md:text-7xl font-serif font-light mb-8 tracking-tighter leading-[1.1] min-h-[150px] md:min-h-[180px]">
                            {line1}
                            <br />
                            {renderLine2()}
                            <span className="animate-pulse">|</span>
                        </h2>
                        <div className="space-y-6 text-primary-foreground/80 text-base font-light leading-relaxed">
                            <p>We are a premier production studio dedicated to creating stunning visual content for luxury brands worldwide. Our team of award-winning photographers, directors, and creative professionals brings your vision to life with unparalleled artistry and precision.</p>
                            <p>From concept to final delivery, we handle every aspect of production with meticulous attention to detail, ensuring each project exceeds expectations and creates lasting impact in the luxury market.</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        {stats.map((stat, index) => (
                            <StatItem 
                                key={`${index}-${counterKey}`} // Use the updating key to force re-mount
                                stat={stat} 
                                startAnimation={startAnimations} 
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;

