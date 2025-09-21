import { Shield, Target, Users, Zap } from 'lucide-react';
import teamPhoto from '@/assets/team-photo.jpg';

const TeamSection = () => {
  const teamStats = [
    { icon: Shield, label: 'Безопасность', value: '100%', description: 'Приоритет №1' },
    { icon: Target, label: 'Точность', value: '95%', description: 'Попаданий в цель' },
    { icon: Users, label: 'Команда', value: '12', description: 'Опытных игроков' },
    { icon: Zap, label: 'Адреналин', value: '∞', description: 'Гарантирован' },
  ];

  return (
    <section id="team" className="py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div>
              <h2 className="font-rajdhani text-4xl md:text-5xl font-bold text-foreground mb-6">
                НАША <span className="text-primary">КОМАНДА</span>
              </h2>
              <p className="font-inter text-lg text-muted-foreground leading-relaxed mb-8">
                Raven Strike Force — это команда профессиональных организаторов страйкбольных игр с многолетним опытом. 
                Мы создаем незабываемые тактические сценарии, которые проверят ваши навыки на прочность.
              </p>
            </div>

            {/* Team Stats */}
            <div className="grid grid-cols-2 gap-6">
              {teamStats.map((stat, index) => (
                <div 
                  key={index}
                  className="bg-card p-6 rounded-lg tactical-lift cursor-tactical group"
                >
                  <stat.icon className="w-8 h-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
                  <div className="font-rajdhani text-2xl font-bold text-foreground">
                    {stat.value}
                  </div>
                  <div className="font-rajdhani text-sm font-bold text-primary uppercase tracking-wider">
                    {stat.label}
                  </div>
                  <div className="font-inter text-xs text-muted-foreground mt-1">
                    {stat.description}
                  </div>
                </div>
              ))}
            </div>

            {/* Mission Statement */}
            <div className="bg-primary/10 border border-primary/20 p-6 rounded-lg">
              <h3 className="font-rajdhani text-xl font-bold text-primary mb-3">
                НАША МИССИЯ
              </h3>
              <p className="font-inter text-foreground leading-relaxed">
                Создавать реалистичные тактические симуляции, которые развивают командный дух, 
                стратегическое мышление и позволяют каждому игроку почувствовать себя настоящим бойцом.
              </p>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-lg">
              <img
                src={teamPhoto}
                alt="Команда Raven Strike Force в тактической экипировке"
                className="w-full h-full object-cover night-vision-hover transition-all duration-500"
              />
              
              {/* Tactical Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
              
              {/* Team Badge */}
              <div className="absolute bottom-6 left-6 glass-panel p-4 rounded-lg">
                <div className="font-rajdhani text-lg font-bold text-foreground">
                  RAVEN STRIKE FORCE
                </div>
                <div className="font-inter text-sm text-primary">
                  EST. 2019 • WROCŁAW
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 border-2 border-primary/30 rounded-full animate-tactical-pulse" />
            <div className="absolute -bottom-4 -left-4 w-16 h-16 border-2 border-destructive/30 rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;