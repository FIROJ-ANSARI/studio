import { Instagram, Linkedin, Clapperboard, LayoutGrid, ArrowUp } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const navLinks = ["Work", "About", "Services", "Contact"];
  const socialLinks = [
    { name: "Instagram", icon: Instagram, href: "#" },
    { name: "Behance", icon: LayoutGrid, href: "#" },
    { name: "LinkedIn", icon: Linkedin, href: "#" },
    { name: "Vimeo", icon: Clapperboard, href: "#" },
  ];

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };


  return (
    <footer className="bg-black text-gray-300 font-normal text-sm">
      <div className="container mx-auto px-6 lg:px-16 pt-24 pb-12">
        
        {/* Top Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-16">
          
          {/* Column 1: Brand & Description */}
          <div className="col-span-2 lg:col-span-2">
            <div className="text-xl font-serif tracking-[0.3em] text-gray-200 mb-6">
              ELITE PRODUCTIONS
            </div>
            <p className="text-gray-400 leading-relaxed max-w-sm">
              Crafting visual masterpieces for luxury brands worldwide. Where creativity meets excellence.
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div className="col-span-1">
            <h4 className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-6">
              Navigation
            </h4>
            <div className="flex flex-col gap-4">
              {navLinks.map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="w-fit text-gray-300 transition-colors duration-300 hover:text-white"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
            
          {/* Column 3: Contact Info */}
          <div className="col-span-1">
             <h4 className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-6">
              Contact
            </h4>
            <div className="flex flex-col gap-4">
              <a href="mailto:info@eliteproductions.com" className="hover:text-white transition-colors duration-300">info@eliteproductions.com</a>
              <a href="tel:+12125551234" className="hover:text-white transition-colors duration-300">+1 (212) 555-1234</a>
              <p className="text-gray-400">123 Creative Avenue, NY</p>
            </div>
          </div>

          {/* Column 4: Social Links */}
          <div className="col-span-2 md:col-span-1">
             <h4 className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-6">
              Connect
            </h4>
            <div className="flex gap-5">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    aria-label={social.name}
                    className="text-gray-300 transition-all duration-300 hover:text-white"
                  >
                    <Icon className="w-5 h-5" strokeWidth={1} />
                  </a>
                )
              })}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-8 mt-12 flex justify-between items-center gap-6">
          <p className="text-xs text-gray-500 tracking-wider">
            © {currentYear} Elite Productions. All Rights Reserved.
          </p>
           <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-xs text-gray-400 transition-colors duration-300 hover:text-white"
          >
            Back to Top
            <ArrowUp className="w-3 h-3 transition-transform duration-300 group-hover:-translate-y-1" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


