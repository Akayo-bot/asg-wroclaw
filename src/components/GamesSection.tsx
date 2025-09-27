import GameCard from './GameCard';
import fieldArena from '@/assets/field-arena.jpg';
import teamPhoto from '@/assets/team-photo.jpg';
import heroImage from '@/assets/hero-airsoft.jpg';
import { useI18n } from '@/contexts/I18nContext';

const GamesSection = () => {
  const { t } = useI18n();
  const upcomingGames = [
    {
      title: "Операция 'Волчья Стая'",
      date: "15 октября",
      time: "09:00 - 18:00",
      location: "Лес Собешице",
      players: "24/40",
      description: "Тактическая игра на выживание в лесной местности. Две команды, одна цель - захватить и удержать контрольные точки.",
      image: fieldArena,
      status: 'upcoming' as const
    },
    {
      title: "Ночной штурм",
      date: "28 октября",
      time: "16:00 - 22:00",
      location: "Полигон Кобержице",
      players: "40/40",
      description: "Игра в условиях ограниченной видимости. Использование тактических фонарей и приборов ночного видения приветствуется.",
      image: heroImage,
      status: 'full' as const
    },
    {
      title: "Защита Периметра",
      date: "05 ноября",
      time: "10:00 - 16:00",
      location: "Заброшенная база",
      players: "18/30",
      description: "Симуляция обороны военной базы от вражеского наступления. Командная игра с элементами стратегии.",
      image: teamPhoto,
      status: 'upcoming' as const
    }
  ];

  return (
    <section id="games" className="py-20 bg-muted/20">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-rajdhani text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t('games.title', 'БЛИЖАЙШИЕ ИГРЫ').split(' ').map((word, i, arr) => 
              i === arr.length - 1 ? <span key={i} className="text-primary">{word}</span> : word + ' '
            )}
          </h2>
          <p className="font-inter text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('games.subtitle', 'Присоединяйтесь к нашим тактическим операциям и почувствуйте настоящий военный дух')}
          </p>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {upcomingGames.map((game, index) => (
            <GameCard key={index} {...game} />
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className="font-inter text-muted-foreground mb-6">
            {t('games.cta.question', 'Не нашли подходящую игру? Предложите свой сценарий!')}
          </p>
          <button className="font-rajdhani text-lg font-bold text-primary hover:text-foreground transition-colors cursor-tactical">
            {t('games.cta.contact', 'СВЯЗАТЬСЯ С ОРГАНИЗАТОРАМИ →')}
          </button>
        </div>
      </div>
    </section>
  );
};

export default GamesSection;