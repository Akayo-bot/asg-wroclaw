import { useState } from 'react';
import { Menu, X, Target } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { useTranslation } from '@/contexts/LanguageContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const t = useTranslation();

  const navItems = [
    { label: t.nav.games, path: '/games' },
    { label: t.nav.team, path: '/team' },
    { label: t.nav.gallery, path: '/gallery' },
    { label: t.nav.articles, path: '/articles' },
    { label: t.nav.contacts, path: '/contacts' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    return location.pathname.startsWith(path) && path !== '/';
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-panel">
      <div className="container mx-auto px-4 lg:px-8">
        <nav className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 cursor-tactical">
            <Target className="w-8 h-8 text-primary" />
            <div>
              <h1 className="font-rajdhani text-2xl font-bold text-foreground tracking-wide">
                RAVEN STRIKE FORCE
              </h1>
              <p className="text-xs text-muted-foreground font-inter tracking-wider">
                СТРАЙКБОЛ ВРОЦЛАВ
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`font-inter text-sm font-medium transition-colors duration-300 cursor-tactical ${
                  isActive(item.path)
                    ? 'text-primary border-b-2 border-primary pb-1'
                    : 'text-foreground hover:text-primary'
                }`}
              >
                {item.label.toUpperCase()}
              </Link>
            ))}
            <LanguageSwitcher />
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
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`font-inter text-sm font-medium transition-colors duration-300 cursor-tactical ${
                    isActive(item.path) ? 'text-primary' : 'text-foreground hover:text-primary'
                  }`}
                >
                  {item.label.toUpperCase()}
                </Link>
              ))}
              <div className="pt-2 border-t border-glass-border">
                <LanguageSwitcher />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;