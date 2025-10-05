import { useState, useRef, useEffect } from "react";

// Data for the portfolio items, now with video sources
const portfolioItems = [
  {
    id: 1,
    video: "vid1.mp4",
    title: "Luxury Fashion Campaign",
    client: "HAUTE COUTURE",
    category: "Editorial",
  },
  {
    id: 2,
    video: "vid2.mp4",
    title: "Beauty & Cosmetics",
    client: "PRESTIGE BEAUTY",
    category: "Commercial",
  },
  {
    id: 3,
    video: "vid3.mp4",
    title: "Lifestyle Collection",
    client: "MODERN LIVING",
    category: "Lifestyle",
  },
  {
    id: 4,
    video: "vid4.mp4",
    title: "Fashion Editorial",
    client: "VOGUE STYLE",
    category: "Editorial",
  },
  {
    id: 5,
    video: "vid5.mp4",
    title: "Product Photography",
    client: "LUXURY TIMEPIECES",
    category: "Commercial",
  },
  {
    id: 6,
    video: "vid6.mp4",
    title: "Portrait Series",
    client: "FASHION WEEKLY",
    category: "Editorial",
  },
];

const Portfolio = () => {
  const [hoveredId, setHoveredId] = useState(null);
  // Create a ref to hold an array of video elements
  const videoRefs = useRef([]);

  useEffect(() => {
    // Initialize the refs array with the correct number of elements
    videoRefs.current = videoRefs.current.slice(0, portfolioItems.length);
  }, []);

  // Function to handle mouse entering the video area
  const handleMouseEnter = (id, index) => {
    setHoveredId(id);
    // Play the corresponding video using its ref
    if (videoRefs.current[index]) {
      videoRefs.current[index].play();
    }
  };

  // Function to handle mouse leaving the video area
  const handleMouseLeave = (index) => {
    setHoveredId(null);
    // Pause the video and reset its time
    if (videoRefs.current[index]) {
      videoRefs.current[index].pause();
      videoRefs.current[index].currentTime = 0;
    }
  };

  return (
    <section id="work" className="py-32 bg-background">
      <div className="container mx-auto px-6 lg:px-16">
        <div className="max-w-3xl mb-24">
          <span className="text-xs tracking-widest text-accent uppercase font-light mb-4 block">
            Selected Work
          </span>
          <h2 className="text-5xl md:text-7xl font-serif font-light mb-6 tracking-tighter">
            Our Portfolio
          </h2>
          <p className="text-muted-foreground text-lg font-light leading-relaxed">
            A curated showcase of our finest work in luxury brand campaigns and editorial photography.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          {portfolioItems.map((item, index) => (
            <div
              key={item.id}
              className="group relative overflow-hidden cursor-pointer aspect-[3/4] bg-muted"
              onMouseEnter={() => handleMouseEnter(item.id, index)}
              onMouseLeave={() => handleMouseLeave(index)}
            >
              <video
                ref={el => videoRefs.current[index] = el}
                src={item.video}
                loop
                muted
                playsInline
                className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105 group-hover:brightness-75"
              />
              <div
                className={`absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent transition-all duration-500 ${
                  hoveredId === item.id ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="absolute inset-0 p-10 flex flex-col justify-end text-primary-foreground">
                  <div 
                    className="transform transition-all duration-500 ease-out"
                    style={{
                      transform: hoveredId === item.id ? 'translateY(0)' : 'translateY(20px)'
                    }}
                  >
                    <div className="w-12 h-px bg-accent mb-6" />
                    <p className="text-accent text-[10px] font-light tracking-widest uppercase mb-3">
                      {item.category}
                    </p>
                    <h3 className="text-3xl font-serif font-light mb-2 tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-primary-foreground/70 text-xs tracking-wider font-light">
                      {item.client}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;

