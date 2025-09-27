import { Layout } from '@/components/Layout';
import { useI18n } from '@/contexts/I18nContext';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, Shield, Target, Zap } from 'lucide-react';

const TeamPage = () => {
  const { t } = useI18n();

  const teamMembers = [
    {
      id: '1',
      name: 'Алекс "Ворон" Коваленко',
      role: 'Командир отряда',
      specialty: 'Тактическое планирование',
      experience: '8 лет',
      avatar: '/placeholder-avatar.jpg',
      stats: {
        games: 120,
        wins: 89,
        accuracy: 92
      },
      bio: 'Основатель команды с опытом в реальных боевых действиях. Специализируется на долгосрочном планировании операций и координации команды.'
    },
    {
      id: '2', 
      name: 'Марк "Снайпер" Новак',
      role: 'Снайпер',
      specialty: 'Дальний бой',
      experience: '6 лет',
      avatar: '/placeholder-avatar.jpg',
      stats: {
        games: 95,
        wins: 78,
        accuracy: 96
      },
      bio: 'Мастер дальнего боя с безупречной точностью. Обеспечивает прикрытие команды и ведет разведку на больших дистанциях.'
    },
    {
      id: '3',
      name: 'Анна "Медик" Петрова',
      role: 'Медик',
      specialty: 'Поддержка команды',
      experience: '4 года',
      avatar: '/placeholder-avatar.jpg',
      stats: {
        games: 87,
        wins: 71,
        accuracy: 88
      },
      bio: 'Врач по профессии, незаменимый член команды. Отвечает за безопасность и медицинскую поддержку во время операций.'
    }
  ];

  const getRoleIcon = (role: string) => {
    switch (role.toLowerCase()) {
      case 'командир отряда':
        return <Star className="w-5 h-5 text-primary" />;
      case 'снайпер':
        return <Target className="w-5 h-5 text-primary" />;
      case 'медик':
        return <Shield className="w-5 h-5 text-primary" />;
      default:
        return <Zap className="w-5 h-5 text-primary" />;
    }
  };

  return (
    <Layout showBreadcrumbs>
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="font-rajdhani text-4xl md:text-5xl font-bold mb-4">
              {t('nav.team', 'Team')}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('team.subtitle', 'Meet our team')}
            </p>
          </div>

          {/* Team Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <div className="text-center glass-panel p-6 rounded-lg">
              <div className="text-2xl font-rajdhani font-bold text-primary mb-1">12</div>
              <div className="text-sm text-muted-foreground">{t('pages.team.stats.active_members', 'Active Members')}</div>
            </div>
            <div className="text-center glass-panel p-6 rounded-lg">
              <div className="text-2xl font-rajdhani font-bold text-primary mb-1">156</div>
              <div className="text-sm text-muted-foreground">{t('pages.team.stats.games_played', 'Games Played')}</div>
            </div>
            <div className="text-center glass-panel p-6 rounded-lg">
              <div className="text-2xl font-rajdhani font-bold text-primary mb-1">89%</div>
              <div className="text-sm text-muted-foreground">{t('pages.team.stats.win_rate', 'Win Rate')}</div>
            </div>
            <div className="text-center glass-panel p-6 rounded-lg">
              <div className="text-2xl font-rajdhani font-bold text-primary mb-1">5</div>
              <div className="text-sm text-muted-foreground">{t('pages.team.stats.years_active', 'Years Active')}</div>
            </div>
          </div>

          {/* Team Members */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map((member) => (
              <Card key={member.id} className="glass-panel tactical-lift">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Avatar className="w-16 h-16 mr-4">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {member.name.split(' ')[0].charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-rajdhani text-lg font-bold">{member.name}</h3>
                      <div className="flex items-center gap-2 mb-1">
                        {getRoleIcon(member.role)}
                        <Badge variant="secondary" className="text-xs">
                          {member.role}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{member.specialty}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 mb-4 text-center">
                    <div>
                      <div className="text-lg font-rajdhani font-bold text-primary">{member.stats.games}</div>
                      <div className="text-xs text-muted-foreground">{t('pages.team.stats.games_label', 'Games')}</div>
                    </div>
                    <div>
                      <div className="text-lg font-rajdhani font-bold text-primary">{member.stats.wins}</div>
                      <div className="text-xs text-muted-foreground">{t('pages.team.stats.wins_label', 'Wins')}</div>
                    </div>
                    <div>
                      <div className="text-lg font-rajdhani font-bold text-primary">{member.stats.accuracy}%</div>
                      <div className="text-xs text-muted-foreground">{t('pages.team.stats.accuracy_label', 'Accuracy')}</div>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mb-3">{member.bio}</p>
                  
                  <div className="flex justify-between items-center text-xs text-muted-foreground">
                    <span>{t('pages.team.experience_label', 'Experience:')} {member.experience}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Mission Statement */}
          <div className="mt-16 text-center">
            <div className="glass-panel p-8 rounded-lg max-w-4xl mx-auto">
              <h2 className="font-rajdhani text-2xl font-bold mb-4 text-primary">
                {t('pages.team.mission.title', 'Our Mission')}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {t('pages.team.mission.description', 'Raven Strike Force is a team of professionals united by passion for tactical airsoft...')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TeamPage;