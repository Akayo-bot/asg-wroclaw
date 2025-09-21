import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import GamesSection from '@/components/GamesSection';
import TeamSection from '@/components/TeamSection';
import ContactSection from '@/components/ContactSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <HeroSection />
        <GamesSection />
        <TeamSection />
        <ContactSection />
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

export default Index;