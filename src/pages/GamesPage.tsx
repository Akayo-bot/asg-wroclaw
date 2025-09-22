import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { useTranslation } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, MapPin, Users, Clock, Filter } from 'lucide-react';

const GamesPage = () => {
  const t = useTranslation();
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { key: 'all', label: t.pages.games.filters.all },
    { key: 'upcoming', label: t.pages.games.filters.upcoming },
    { key: 'past', label: t.pages.games.filters.past },
    { key: 'registration', label: t.pages.games.filters.registration },
  ];

  const mockGames = [
    {
      id: '1',
      title: 'Операция "Черный Орел"',
      date: '2024-10-15',
      time: '09:00',
      location: 'Лес Легница',
      players: 45,
      maxPlayers: 60,
      status: 'upcoming',
      registrationOpen: true,
      description: 'Тактическая операция в лесной местности с элементами CQB',
      scenario: 'Захват и удержание территории',
      image: '/placeholder-game.jpg'
    },
    {
      id: '2',
      title: 'Городской штурм',
      date: '2024-11-01',
      time: '10:00',
      location: 'CQB Arena Вроцлав',
      players: 32,
      maxPlayers: 32,
      status: 'full',
      registrationOpen: false,
      description: 'Интенсивный CQB с элементами городских боевых действий',
      scenario: 'Освобождение заложников',
      image: '/placeholder-game.jpg'
    }
  ];

  const getStatusBadge = (status: string, registrationOpen: boolean) => {
    if (status === 'full') {
      return <Badge variant="destructive">Набор закрыт</Badge>;
    }
    if (registrationOpen) {
      return <Badge variant="default" className="bg-primary text-primary-foreground">Регистрация открыта</Badge>;
    }
    return <Badge variant="secondary">Ожидание</Badge>;
  };

  return (
    <Layout showBreadcrumbs>
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="font-rajdhani text-4xl md:text-5xl font-bold mb-4">
              {t.pages.games.title}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t.pages.games.subtitle}
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            <Filter className="w-5 h-5 text-muted-foreground mr-2" />
            {filters.map((filter) => (
              <Button
                key={filter.key}
                variant={activeFilter === filter.key ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveFilter(filter.key)}
                className="cursor-tactical"
              >
                {filter.label}
              </Button>
            ))}
          </div>

          {/* Games Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockGames.map((game) => (
              <Card key={game.id} className="glass-panel tactical-lift cursor-tactical">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="font-rajdhani text-xl">{game.title}</CardTitle>
                    {getStatusBadge(game.status, game.registrationOpen)}
                  </div>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {game.date}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {game.time}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {game.location}
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      {game.players}/{game.maxPlayers} игроков
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {game.description}
                  </p>
                  <div className="mb-4">
                    <span className="text-xs text-muted-foreground">Сценарий:</span>
                    <p className="text-sm font-medium">{game.scenario}</p>
                  </div>
                  <Button 
                    className="w-full cursor-tactical"
                    variant={game.registrationOpen ? 'default' : 'secondary'}
                    disabled={!game.registrationOpen}
                  >
                    {game.registrationOpen ? 'ЗАПИСАТЬСЯ' : 'СПИСОК ОЖИДАНИЯ'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Empty State */}
          {mockGames.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">{t.pages.games.noGames}</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default GamesPage;