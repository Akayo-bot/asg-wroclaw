import { useState } from 'react';
import { Menu, X, Target } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: 'Игры', href: '#games' },
    { label: 'Команда', href: '#team' },
    { label: 'Галерея', href: '#gallery' },
    { label: 'Контакты', href: '#contacts' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-panel">
      <div className="container mx-auto px-4 lg:px-8">
        <nav className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-tactical">
            <Target className="w-8 h-8 text-primary" />
            <div>
              <h1 className="font-rajdhani text-2xl font-bold text-foreground tracking-wide">
                RAVEN STRIKE FORCE
              </h1>
              <p className="text-xs text-muted-foreground font-inter tracking-wider">
                СТРАЙКБОЛ ВРОЦЛАВ
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="font-inter text-sm font-medium text-foreground hover:text-primary transition-colors duration-300 cursor-tactical"
              >
                {item.label.toUpperCase()}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-foreground hover:text-primary transition-colors cursor-tactical"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-glass-border">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="font-inter text-sm font-medium text-foreground hover:text-primary transition-colors duration-300 cursor-tactical"
                >
                  {item.label.toUpperCase()}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;