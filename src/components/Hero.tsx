import { useEffect, useState } from "react";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  // State for the typing animation text
  const [line1, setLine1] = useState('');
  const [line2, setLine2] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // The full text for the paragraph, split for the line break
  const fullLine1 = "Award-winning production studio specializing in luxury brand campaigns,";
  const fullLine2 = "editorial photography, and cinematic content that captivates.";

  useEffect(() => {
    // Trigger animations on component mount
    setIsVisible(true);
  }, []);

  // Effect for the infinite typing animation
  useEffect(() => {
    if (isVisible) {
      // Store timer IDs to clear them on cleanup
      let typingInterval;
      let restartTimeout;

      const startTypingAnimation = () => {
        setIsTyping(true);
        setLine1('');
        setLine2('');
        let i = 0;
        let currentLine = 1;

        typingInterval = setInterval(() => {
          if (currentLine === 1) {
            // Typing the first line
            if (i < fullLine1.length) {
              setLine1(prev => prev + fullLine1.charAt(i));
              i++;
            } else {
              // Switch to the second line
              currentLine = 2;
              i = 0;
            }
          } else if (currentLine === 2) {
            // Typing the second line
            if (i < fullLine2.length) {
              setLine2(prev => prev + fullLine2.charAt(i));
              i++;
            } else {
              // Typing finished, clear the interval and schedule a restart
              clearInterval(typingInterval);
              setIsTyping(false); // Hide cursor during the pause

              // Wait for 3 seconds before restarting the animation
              restartTimeout = setTimeout(startTypingAnimation, 3000);
            }
          }
        }, 40); // Adjust typing speed here (milliseconds)
      };

      // Initial start after a 1-second delay
      const initialTimeout = setTimeout(startTypingAnimation, 1000);

      // Cleanup function to clear all timers when the component unmounts or isVisible changes
      return () => {
        clearTimeout(initialTimeout);
        clearInterval(typingInterval);
        clearTimeout(restartTimeout);
      };
    }
  }, [isVisible]);

  // Array of video sources for the background
  const videoSources = [
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
   
  ];

  return (
    <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Video Background Container */}
      <div className="absolute inset-0 w-full h-full flex">
        {videoSources.map((src, index) => (
          <video
            key={index}
            className="w-1/3 h-full object-cover"
            autoPlay
            loop
            muted
            playsInline // Important for autoplay on mobile browsers
          >
            <source src={src} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ))}
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />

      {/* Centered Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-16 text-center">
        {/* Animated content wrapper */}
        <div
          className="transition-all duration-1000 ease-out delay-300"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)'
          }}
        >
        

          <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif font-light text-white mb-8 tracking-tighter leading-[0.9]">
            Crafting Visual
            <br />
            <span className="font-normal italic">Masterpieces</span>
          </h1>

          {/* Paragraph with typing animation */}
          <p className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto mb-14 font-light tracking-wide leading-relaxed min-h-[80px] md:min-h-[60px]">
            {line1}
            <br className="hidden md:block" />
            {line2}
            {/* Blinking cursor */}
            {isTyping && <span className="animate-pulse ml-1">|</span>}
          </p>

          <button
            onClick={() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })}
            className="group relative inline-block px-12 py-5 bg-yellow-400 text-black font-light tracking-widest uppercase hover:bg-yellow-500 transition-all duration-300 shadow-lg hover:shadow-yellow-400/50 overflow-hidden"
          >
            <span className="relative z-10">Explore Our Work</span>
            {/* Shimmer effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          </button>
        </div>
      </div>

      {/* Animated line at the bottom */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
        <div className="w-px h-16 bg-gradient-to-b from-white/0 via-white/50 to-white/0 animate-pulse" />
      </div>
    </section>
  );
};

export default Hero;

