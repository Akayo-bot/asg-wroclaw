import { useState } from 'react';
import { Menu, X, Target, User, LogOut } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { useTranslation } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { AuthModal } from '@/components/auth/AuthModal';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const location = useLocation();
  const t = useTranslation();
  const { user, profile, signOut } = useAuth();

  const navItems = [
    { label: t.nav.games, path: '/games' },
    { label: t.nav.team, path: '/team' },
    { label: t.nav.gallery, path: '/gallery' },
    { label: t.nav.articles, path: '/articles' },
    { label: t.nav.contacts, path: '/contacts' },
  ];

  const handleSignOut = async () => {
    await signOut();
  };

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
            
            {/* Auth Section */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={profile?.avatar_url || ''} alt={profile?.display_name || ''} />
                      <AvatarFallback>
                        {profile?.display_name?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">{profile?.display_name || user.email}</p>
                      <p className="w-[200px] truncate text-sm text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      <span>{t.profile.title}</span>
                    </Link>
                  </DropdownMenuItem>
                  {(profile?.role === 'admin' || profile?.role === 'editor') && (
                    <DropdownMenuItem asChild>
                      <Link to="/admin" className="flex items-center">
                        <Target className="mr-2 h-4 w-4" />
                        <span>{t.admin.title || 'Admin Panel'}</span>
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem asChild>
                    <Link to="/games" className="flex items-center">
                      <Target className="mr-2 h-4 w-4" />
                      <span>{t.nav.games}</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>{t.auth.logout}</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button onClick={() => setIsAuthModalOpen(true)} size="sm">
                {t.auth.login}
              </Button>
            )}
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
              <div className="pt-2 border-t border-glass-border space-y-2">
                <LanguageSwitcher />
                {user ? (
                  <div className="flex flex-col space-y-2">
                    <Link 
                      to="/profile" 
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
                    >
                      <User className="h-4 w-4" />
                      {t.profile.title}
                    </Link>
                    {(profile?.role === 'admin' || profile?.role === 'editor') && (
                      <Link 
                        to="/admin" 
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
                      >
                        <Target className="h-4 w-4" />
                        {t.admin.title || 'Admin Panel'}
                      </Link>
                    )}
                    <button 
                      onClick={() => {
                        handleSignOut();
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
                    >
                      <LogOut className="h-4 w-4" />
                      {t.auth.logout}
                    </button>
                  </div>
                ) : (
                  <Button 
                    onClick={() => {
                      setIsAuthModalOpen(true);
                      setIsMenuOpen(false);
                    }} 
                    size="sm"
                    className="w-full"
                  >
                    {t.auth.login}
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </header>
  );
};

export default Header;