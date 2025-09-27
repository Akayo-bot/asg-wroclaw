import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { useI18n } from '@/contexts/I18nContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Calendar, Clock, User, Filter, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ArticlesPage = () => {
  const { t } = useI18n();
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { key: 'all', label: t('pages.articles.categories.all', 'All') },
    { key: 'tactics', label: t('pages.articles.categories.tactics', 'Tactics') },
    { key: 'equipment', label: t('pages.articles.categories.equipment', 'Equipment') },
    { key: 'news', label: t('pages.articles.categories.news', 'News') },
    { key: 'guides', label: t('pages.articles.categories.guides', 'Guides') },
  ];

  const articles = [
    {
      id: '1',
      slug: 'tactical-movement-basics',
      title: 'Основы тактического передвижения в страйкболе',
      excerpt: 'Изучаем базовые принципы перемещения в команде, технику "срыва и покрытия" и координацию действий.',
      content: 'Полный текст статьи о тактическом передвижении...',
      category: 'tactics',
      categoryLabel: 'Тактика',
      author: 'Алекс "Ворон" Коваленко',
      authorAvatar: '/placeholder-avatar.jpg',
      publishedAt: '2024-09-20',
      readTime: '8 мин',
      thumbnail: '/placeholder-article.jpg',
      featured: true,
      tags: ['тактика', 'команда', 'передвижение']
    },
    {
      id: '2',
      slug: 'choosing-first-airsoft-gun',
      title: 'Как выбрать первый страйкбольный автомат',
      excerpt: 'Подробный гайд по выбору первого оружия для новичков: что учесть, какие модели рассмотреть.',
      content: 'Полный текст статьи о выборе первого автомата...',
      category: 'equipment',
      categoryLabel: 'Снаряжение',
      author: 'Марк "Снайпер" Новак',
      authorAvatar: '/placeholder-avatar.jpg',
      publishedAt: '2024-09-15',
      readTime: '12 мин',
      thumbnail: '/placeholder-equipment.jpg',
      featured: false,
      tags: ['снаряжение', 'новичкам', 'выбор']
    },
    {
      id: '3',
      slug: 'raven-strike-force-wins-tournament',
      title: 'Raven Strike Force побеждает в турнире "Железный Волк"',
      excerpt: 'Отчет о нашей победе в крупнейшем турнире сезона. Анализ тактики и ключевых моментов.',
      content: 'Полный отчет о турнире...',
      category: 'news',
      categoryLabel: 'Новости',
      author: 'Анна "Медик" Петрова',
      authorAvatar: '/placeholder-avatar.jpg',
      publishedAt: '2024-09-10',
      readTime: '5 мин',
      thumbnail: '/placeholder-news.jpg',
      featured: false,
      tags: ['турнир', 'победа', 'команда']
    },
    {
      id: '4',
      slug: 'cqb-techniques-guide',
      title: 'Техники CQB: бой в ограниченном пространстве',
      excerpt: 'Полное руководство по ближнему бою в зданиях: очистка комнат, работа в коридорах.',
      content: 'Полный гайд по CQB...',
      category: 'guides',
      categoryLabel: 'Гайды',
      author: 'Алекс "Ворон" Коваленко',
      authorAvatar: '/placeholder-avatar.jpg',
      publishedAt: '2024-09-05',
      readTime: '15 мин',
      thumbnail: '/placeholder-cqb.jpg',
      featured: true,
      tags: ['CQB', 'тактика', 'гайд']
    },
    {
      id: '5',
      slug: 'winter-gear-recommendations',
      title: 'Экипировка для зимних игр: что нужно знать',
      excerpt: 'Советы по выбору одежды и снаряжения для страйкбола в холодное время года.',
      content: 'Полная статья о зимней экипировке...',
      category: 'equipment',
      categoryLabel: 'Снаряжение',
      author: 'Марк "Снайпер" Новак',
      authorAvatar: '/placeholder-avatar.jpg',
      publishedAt: '2024-08-30',
      readTime: '10 мин',
      thumbnail: '/placeholder-winter.jpg',
      featured: false,
      tags: ['экипировка', 'зима', 'советы']
    }
  ];

  const filteredArticles = articles.filter(article => 
    activeFilter === 'all' || article.category === activeFilter
  );

  const featuredArticles = filteredArticles.filter(article => article.featured);
  const regularArticles = filteredArticles.filter(article => !article.featured);

  const getCategoryColor = (category: string) => {
    const colors = {
      tactics: 'bg-blue-500/10 text-blue-500',
      equipment: 'bg-green-500/10 text-green-500',
      news: 'bg-red-500/10 text-red-500',
      guides: 'bg-purple-500/10 text-purple-500'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-500/10 text-gray-500';
  };

  return (
    <Layout showBreadcrumbs>
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="font-rajdhani text-4xl md:text-5xl font-bold mb-4">
              {t('pages.articles.title', 'Articles')}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('pages.articles.subtitle', 'Guides, tactics, and news')}
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

          {/* Featured Articles */}
          {featuredArticles.length > 0 && (
            <div className="mb-12">
              <h2 className="font-rajdhani text-2xl font-bold mb-6 text-primary">
                {t('pages.articles.featured', 'Featured Articles')}
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {featuredArticles.map((article) => (
                  <Card key={article.id} className="glass-panel tactical-lift cursor-tactical">
                    <div className="aspect-video relative overflow-hidden rounded-t-lg">
                      <img
                        src={article.thumbnail}
                        alt={article.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className={getCategoryColor(article.category)}>
                          {article.categoryLabel}
                        </Badge>
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle className="font-rajdhani text-xl">
                        <Link 
                          to={`/article/${article.slug}`}
                          className="hover:text-primary transition-colors"
                        >
                          {article.title}
                        </Link>
                      </CardTitle>
                      <p className="text-muted-foreground text-sm">
                        {article.excerpt}
                      </p>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <Avatar className="w-6 h-6">
                            <AvatarImage src={article.authorAvatar} alt={article.author} />
                            <AvatarFallback className="text-xs">
                              {article.author.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm text-muted-foreground">{article.author}</span>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {article.publishedAt}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {article.readTime}
                          </div>
                        </div>
                      </div>
                      <Link 
                        to={`/article/${article.slug}`}
                        className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
                      >
                        {t('common.read_more', 'Read More')}
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Regular Articles */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularArticles.map((article) => (
              <Card key={article.id} className="glass-panel tactical-lift cursor-tactical">
                <div className="aspect-video relative overflow-hidden rounded-t-lg">
                  <img
                    src={article.thumbnail}
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className={getCategoryColor(article.category)}>
                      {article.categoryLabel}
                    </Badge>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="font-rajdhani text-lg">
                    <Link 
                      to={`/article/${article.slug}`}
                      className="hover:text-primary transition-colors line-clamp-2"
                    >
                      {article.title}
                    </Link>
                  </CardTitle>
                  <p className="text-muted-foreground text-sm line-clamp-3">
                    {article.excerpt}
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 mb-3">
                    <Avatar className="w-6 h-6">
                      <AvatarImage src={article.authorAvatar} alt={article.author} />
                      <AvatarFallback className="text-xs">
                        {article.author.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-muted-foreground">{article.author}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {article.publishedAt}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {article.readTime}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Empty State */}
          {filteredArticles.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">{t('pages.articles.noArticles', 'No articles available')}</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ArticlesPage;