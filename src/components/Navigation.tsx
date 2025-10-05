import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Sets the scrolled state to true if the user has scrolled more than 50px
      setIsScrolled(window.scrollY > 50);
    };
    // Add scroll event listener when the component mounts
    window.addEventListener("scroll", handleScroll);
    // Remove the listener when the component unmounts
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Function to smoothly scroll to a specific section of the page
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false); // Close mobile menu after clicking a link
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? "bg-black/95 backdrop-blur-xl border-b border-gray-700/50 shadow-lg" 
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 lg:px-16">
        <div className="flex items-center justify-between h-24">
          <button
            onClick={() => scrollToSection("hero")}
            className="text-xl md:text-2xl font-serif font-light tracking-widest text-amber-500 hover:text-amber-400 transition-all duration-300 hover:scale-105"
          >
            ELITE PRODUCTIONS
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-12 text-white">
            {["work", "about", "services", "contact"].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className="relative text-xs font-light tracking-widest hover:text-amber-500 transition-all duration-300 uppercase group"
              >
                {section}
                <span className="absolute -bottom-2 left-0 w-0 h-px bg-amber-500 transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-white hover:bg-gray-800/50 rounded-sm transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-8 border-t border-gray-700/50 animate-fade-in text-white">
            <div className="flex flex-col gap-8">
              {["work", "about", "services", "contact"].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className="text-xs font-light tracking-widest hover:text-amber-500 transition-colors uppercase text-left"
                >
                  {section}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
