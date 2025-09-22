import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { useTranslation } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Image, Play, Calendar, Filter } from 'lucide-react';

const GalleryPage = () => {
  const t = useTranslation();
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { key: 'all', label: t.pages.gallery.filters.all },
    { key: 'photos', label: t.pages.gallery.filters.photos },
    { key: 'videos', label: t.pages.gallery.filters.videos },
  ];

  const galleryItems = [
    {
      id: '1',
      type: 'photo',
      title: 'Операция "Черный Орел" - Финальный штурм',
      date: '2024-09-15',
      thumbnail: '/placeholder-gallery.jpg',
      image: '/placeholder-gallery.jpg',
      description: 'Решающий момент операции - штурм последнего опорного пункта',
      event: 'Операция "Черный Орел"'
    },
    {
      id: '2',
      type: 'video',
      title: 'Тактическая подготовка команды',
      date: '2024-09-10',
      thumbnail: '/placeholder-video.jpg',
      videoUrl: '#',
      description: 'Обучение новых членов команды основам CQB',
      event: 'Тренировка'
    },
    {
      id: '3',
      type: 'photo',
      title: 'Команда после успешной миссии',
      date: '2024-08-25',
      thumbnail: '/placeholder-team.jpg',
      image: '/placeholder-team.jpg',
      description: 'Групповое фото после победы в турнире',
      event: 'Турнир "Железный Волк"'
    },
    {
      id: '4',
      type: 'photo',
      title: 'Снайперская позиция',
      date: '2024-08-20',
      thumbnail: '/placeholder-sniper.jpg',
      image: '/placeholder-sniper.jpg',
      description: 'Марк в действии на дальней дистанции',
      event: 'Операция "Тихая Охота"'
    },
    {
      id: '5',
      type: 'video',
      title: 'Лучшие моменты сезона 2024',
      date: '2024-08-01',
      thumbnail: '/placeholder-highlights.jpg',
      videoUrl: '#',
      description: 'Компиляция самых ярких моментов года',
      event: 'Сезонное видео'
    },
    {
      id: '6',
      type: 'photo',
      title: 'Новое снаряжение команды',
      date: '2024-07-15',
      thumbnail: '/placeholder-gear.jpg',
      image: '/placeholder-gear.jpg',
      description: 'Презентация обновленного тактического оборудования',
      event: 'Обновление снаряжения'
    }
  ];

  const filteredItems = galleryItems.filter(item => 
    activeFilter === 'all' || item.type === activeFilter.slice(0, -1)
  );

  return (
    <Layout showBreadcrumbs>
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="font-rajdhani text-4xl md:text-5xl font-bold mb-4">
              {t.pages.gallery.title}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t.pages.gallery.subtitle}
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

          {/* Gallery Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <Card key={item.id} className="glass-panel tactical-lift cursor-tactical overflow-hidden">
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="relative">
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        {item.type === 'video' ? (
                          <Play className="w-12 h-12 text-white" />
                        ) : (
                          <Image className="w-12 h-12 text-white" />
                        )}
                      </div>
                      <div className="absolute top-2 left-2">
                        <Badge variant={item.type === 'video' ? 'destructive' : 'secondary'}>
                          {item.type === 'video' ? 'ВИДЕО' : 'ФОТО'}
                        </Badge>
                      </div>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl">
                    {item.type === 'video' ? (
                      <div className="aspect-video bg-black rounded-lg flex items-center justify-center">
                        <Play className="w-16 h-16 text-white" />
                        <span className="ml-2 text-white">Видео будет загружено</span>
                      </div>
                    ) : (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-auto rounded-lg"
                      />
                    )}
                  </DialogContent>
                </Dialog>
                
                <CardContent className="p-4">
                  <h3 className="font-rajdhani text-lg font-bold mb-2 line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {item.description}
                  </p>
                  <div className="flex justify-between items-center text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {item.date}
                    </div>
                    <span className="font-medium">{item.event}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Empty State */}
          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">{t.pages.gallery.noMedia}</p>
            </div>
          )}

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center glass-panel p-6 rounded-lg">
              <div className="text-2xl font-rajdhani font-bold text-primary mb-1">
                {galleryItems.filter(item => item.type === 'photo').length}
              </div>
              <div className="text-sm text-muted-foreground">Фотографий</div>
            </div>
            <div className="text-center glass-panel p-6 rounded-lg">
              <div className="text-2xl font-rajdhani font-bold text-primary mb-1">
                {galleryItems.filter(item => item.type === 'video').length}
              </div>
              <div className="text-sm text-muted-foreground">Видео</div>
            </div>
            <div className="text-center glass-panel p-6 rounded-lg">
              <div className="text-2xl font-rajdhani font-bold text-primary mb-1">24</div>
              <div className="text-sm text-muted-foreground">Событий</div>
            </div>
            <div className="text-center glass-panel p-6 rounded-lg">
              <div className="text-2xl font-rajdhani font-bold text-primary mb-1">2.5GB</div>
              <div className="text-sm text-muted-foreground">Контента</div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default GalleryPage;