import { useLocation, Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { useTranslation } from '@/contexts/LanguageContext';

export const Breadcrumbs = () => {
  const location = useLocation();
  const t = useTranslation();
  
  const pathnames = location.pathname.split('/').filter(x => x);
  
  if (pathnames.length === 0) return null;

  const getBreadcrumbName = (segment: string, index: number) => {
    // Map path segments to translated names
    const pathMap: Record<string, string> = {
      games: t.nav.games,
      team: t.nav.team,
      gallery: t.nav.gallery,
      articles: t.nav.articles,
      contacts: t.nav.contacts,
      about: t.nav.about,
      search: t.nav.search,
      subscribe: t.nav.subscribe,
      event: 'Event',
      article: 'Article',
      category: 'Category',
      test: 'Test'
    };

    return pathMap[segment] || segment;
  };

  return (
    <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
      <Link 
        to="/" 
        className="flex items-center hover:text-primary transition-colors cursor-tactical"
      >
        <Home className="w-4 h-4" />
        <span className="ml-1">{t.common.home}</span>
      </Link>
      
      {pathnames.map((segment, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        
        return (
          <div key={routeTo} className="flex items-center">
            <ChevronRight className="w-4 h-4 mx-2" />
            {isLast ? (
              <span className="text-foreground font-medium">
                {getBreadcrumbName(segment, index)}
              </span>
            ) : (
              <Link
                to={routeTo}
                className="hover:text-primary transition-colors cursor-tactical"
              >
                {getBreadcrumbName(segment, index)}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
};