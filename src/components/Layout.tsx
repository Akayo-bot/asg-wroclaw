import { ReactNode } from 'react';
import Header from '@/components/Header';
import { Breadcrumbs } from '@/components/Breadcrumbs';

interface LayoutProps {
  children: ReactNode;
  showBreadcrumbs?: boolean;
}

export const Layout = ({ children, showBreadcrumbs = false }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      {showBreadcrumbs && (
        <div className="pt-20">
          <div className="container mx-auto px-4 lg:px-8 py-4">
            <Breadcrumbs />
          </div>
        </div>
      )}
      <main className={showBreadcrumbs ? '' : 'pt-20'}>
        {children}
      </main>
      
      {/* Footer */}
      <footer className="py-8 border-t border-border/20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center">
            <p className="font-inter text-sm text-muted-foreground">
              © 2024 Raven Strike Force. Все права защищены.
            </p>
            <p className="font-inter text-xs text-muted-foreground mt-2">
              Страйкбол Вроцлав • Создано с помощью Lovable
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};