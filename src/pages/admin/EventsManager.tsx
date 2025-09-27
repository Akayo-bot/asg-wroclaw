import React, { useState, useEffect } from 'react';
import { useI18n } from '@/contexts/I18nContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Edit, Trash2, Calendar, MapPin, Users, DollarSign, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Tables } from '@/integrations/supabase/types';

type Event = Tables<'events'>;

interface EventForm {
  title_uk: string;
  title_ru: string;
  title_pl: string;
  description_uk: string;
  description_ru: string;
  description_pl: string;
  location_uk: string;
  location_ru: string;
  location_pl: string;
  rules_uk: string;
  rules_ru: string;
  rules_pl: string;
  scenario_uk: string;
  scenario_ru: string;
  scenario_pl: string;
  event_date: string;
  price: string;
  max_participants: string;
  status: string;
  registration_deadline: string;
  main_image_url: string;
}

const EventsManager = () => {
  const { t, language } = useI18n();
  const { toast } = useToast();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'upcoming' | 'registration_open' | 'completed'>('all');
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState<EventForm>({
    title_uk: '',
    title_ru: '',
    title_pl: '',
    description_uk: '',
    description_ru: '',
    description_pl: '',
    location_uk: '',
    location_ru: '',
    location_pl: '',
    rules_uk: '',
    rules_ru: '',
    rules_pl: '',
    scenario_uk: '',
    scenario_ru: '',
    scenario_pl: '',
    event_date: '',
    price: '',
    max_participants: '',
    status: 'upcoming',
    registration_deadline: '',
    main_image_url: '',
  });

  useEffect(() => {
    fetchEvents();
  }, [statusFilter]);

  const fetchEvents = async () => {
    try {
      let query = supabase.from('events').select('*');
      
      if (statusFilter !== 'all') {
        query = query.eq('status', statusFilter);
      }
      
      query = query.order('event_date', { ascending: false });
      
      const { data, error } = await query;
      if (error) throw error;
      
      setEvents(data || []);
    } catch (error) {
      console.error('Error fetching events:', error);
      toast({
        title: t('common.error', 'Error'),
        description: t('events.fetch_error', 'Failed to fetch events'),
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const eventData = {
        ...formData,
        price: formData.price ? parseFloat(formData.price) : null,
        max_participants: formData.max_participants ? parseInt(formData.max_participants) : null,
        event_date: new Date(formData.event_date).toISOString(),
        registration_deadline: formData.registration_deadline ? new Date(formData.registration_deadline).toISOString() : null,
        status: formData.status as 'upcoming' | 'registration_open' | 'completed' | 'cancelled',
      };

      if (editingEvent) {
        const { error } = await supabase
          .from('events')
          .update({
            ...eventData,
            updated_at: new Date().toISOString(),
          })
          .eq('id', editingEvent.id);
        
        if (error) throw error;
        
        toast({
          title: t('common.success', 'Success'),
          description: t('events.updated', 'Event updated successfully'),
        });
      } else {
        const { error } = await supabase
          .from('events')
          .insert({
            ...eventData,
            created_by: (await supabase.auth.getUser()).data.user?.id || '',
          });
        
        if (error) throw error;
        
        toast({
          title: t('common.success', 'Success'),
          description: t('events.created', 'Event created successfully'),
        });
      }
      
      resetForm();
      fetchEvents();
    } catch (error) {
      console.error('Error saving event:', error);
      toast({
        title: t('common.error', 'Error'),
        description: t('events.save_error', 'Failed to save event'),
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteEvent = async (id: string) => {
    if (!confirm(t('events.confirm_delete', 'Are you sure you want to delete this event?'))) return;

    try {
      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setEvents(events.filter(event => event.id !== id));
      toast({
        title: t('common.success', 'Success'),
        description: t('events.deleted', 'Event deleted successfully'),
      });
    } catch (error) {
      console.error('Error deleting event:', error);
      toast({
        title: t('common.error', 'Error'),
        description: t('events.delete_error', 'Failed to delete event'),
        variant: 'destructive',
      });
    }
  };

  const resetForm = () => {
    setFormData({
      title_uk: '',
      title_ru: '',
      title_pl: '',
      description_uk: '',
      description_ru: '',
      description_pl: '',
      location_uk: '',
      location_ru: '',
      location_pl: '',
      rules_uk: '',
      rules_ru: '',
      rules_pl: '',
      scenario_uk: '',
      scenario_ru: '',
      scenario_pl: '',
      event_date: '',
      price: '',
      max_participants: '',
      status: 'upcoming',
      registration_deadline: '',
      main_image_url: '',
    });
    setEditingEvent(null);
    setIsDialogOpen(false);
  };

  const editEvent = (event: Event) => {
    setEditingEvent(event);
    setFormData({
      title_uk: event.title_uk,
      title_ru: event.title_ru,
      title_pl: event.title_pl,
      description_uk: event.description_uk,
      description_ru: event.description_ru,
      description_pl: event.description_pl,
      location_uk: event.location_uk,
      location_ru: event.location_ru,
      location_pl: event.location_pl,
      rules_uk: event.rules_uk || '',
      rules_ru: event.rules_ru || '',
      rules_pl: event.rules_pl || '',
      scenario_uk: event.scenario_uk || '',
      scenario_ru: event.scenario_ru || '',
      scenario_pl: event.scenario_pl || '',
      event_date: new Date(event.event_date).toISOString().slice(0, 16),
      price: event.price?.toString() || '',
      max_participants: event.max_participants?.toString() || '',
      status: event.status,
      registration_deadline: event.registration_deadline ? new Date(event.registration_deadline).toISOString().slice(0, 16) : '',
      main_image_url: event.main_image_url || '',
    });
    setIsDialogOpen(true);
  };

  const getTitle = (event: Event) => {
    const titles = {
      uk: event.title_uk,
      ru: event.title_ru,
      pl: event.title_pl,
      en: event.title_uk, // fallback
    };
    return titles[language] || event.title_uk;
  };

  const getLocation = (event: Event) => {
    const locations = {
      uk: event.location_uk,
      ru: event.location_ru,
      pl: event.location_pl,
      en: event.location_uk, // fallback
    };
    return locations[language] || event.location_uk;
  };

  const filteredEvents = events.filter(event => {
    if (searchTerm) {
      const title = getTitle(event).toLowerCase();
      const location = getLocation(event).toLowerCase();
      if (!title.includes(searchTerm.toLowerCase()) && !location.includes(searchTerm.toLowerCase())) {
        return false;
      }
    }
    return true;
  });

  const getStatusBadge = (status: string) => {
    const statusMap = {
      upcoming: { variant: 'secondary' as const, label: t('events.status.upcoming', 'Upcoming') },
      registration_open: { variant: 'default' as const, label: t('events.status.registration_open', 'Registration Open') },
      completed: { variant: 'outline' as const, label: t('events.status.completed', 'Completed') },
      cancelled: { variant: 'destructive' as const, label: t('events.status.cancelled', 'Cancelled') },
    };
    const statusInfo = statusMap[status as keyof typeof statusMap] || statusMap.upcoming;
    return <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>;
  };

  if (loading && events.length === 0) {
    return <div className="text-center py-8">{t('common.loading', 'Loading...')}</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">{t('events.title', 'Events Management')}</h1>
          <p className="text-muted-foreground">{t('events.description', 'Manage your airsoft events and games')}</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { resetForm(); setIsDialogOpen(true); }}>
              <Plus className="h-4 w-4 mr-2" />
              {t('events.add_event', 'Add Event')}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingEvent ? t('events.edit_event', 'Edit Event') : t('events.add_event', 'Add Event')}
              </DialogTitle>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="event_date">{t('events.event_date', 'Event Date')}</Label>
                  <Input
                    id="event_date"
                    type="datetime-local"
                    value={formData.event_date}
                    onChange={(e) => setFormData({ ...formData, event_date: e.target.value })}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="price">{t('events.price', 'Price')}</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="100.00"
                  />
                </div>
                
                <div>
                  <Label htmlFor="max_participants">{t('events.max_participants', 'Max Participants')}</Label>
                  <Input
                    id="max_participants"
                    type="number"
                    value={formData.max_participants}
                    onChange={(e) => setFormData({ ...formData, max_participants: e.target.value })}
                    placeholder="50"
                  />
                </div>
                
                <div>
                  <Label htmlFor="status">{t('events.status.label', 'Status')}</Label>
                  <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="upcoming">{t('events.status.upcoming', 'Upcoming')}</SelectItem>
                      <SelectItem value="registration_open">{t('events.status.registration_open', 'Registration Open')}</SelectItem>
                      <SelectItem value="completed">{t('events.status.completed', 'Completed')}</SelectItem>
                      <SelectItem value="cancelled">{t('events.status.cancelled', 'Cancelled')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="registration_deadline">{t('events.registration_deadline', 'Registration Deadline')}</Label>
                  <Input
                    id="registration_deadline"
                    type="datetime-local"
                    value={formData.registration_deadline}
                    onChange={(e) => setFormData({ ...formData, registration_deadline: e.target.value })}
                  />
                </div>
                
                <div>
                  <Label htmlFor="main_image_url">{t('events.main_image_url', 'Main Image URL')}</Label>
                  <Input
                    id="main_image_url"
                    value={formData.main_image_url}
                    onChange={(e) => setFormData({ ...formData, main_image_url: e.target.value })}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>

              <Tabs defaultValue="uk" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="uk">🇺🇦 Українська</TabsTrigger>
                  <TabsTrigger value="ru">🇷🇺 Русский</TabsTrigger>
                  <TabsTrigger value="pl">🇵🇱 Polski</TabsTrigger>
                </TabsList>

                {['uk', 'ru', 'pl'].map((lang) => (
                  <TabsContent key={lang} value={lang} className="space-y-4">
                    <div>
                      <Label htmlFor={`title_${lang}`}>{t('events.title_field', 'Title')}</Label>
                      <Input
                        id={`title_${lang}`}
                        value={formData[`title_${lang}` as keyof EventForm]}
                        onChange={(e) => setFormData({ 
                          ...formData, 
                          [`title_${lang}`]: e.target.value 
                        })}
                        placeholder={t('events.title_placeholder', 'Enter event title')}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor={`description_${lang}`}>{t('events.description_field', 'Description')}</Label>
                      <Textarea
                        id={`description_${lang}`}
                        value={formData[`description_${lang}` as keyof EventForm]}
                        onChange={(e) => setFormData({ 
                          ...formData, 
                          [`description_${lang}`]: e.target.value 
                        })}
                        placeholder={t('events.description_placeholder', 'Enter event description')}
                        rows={3}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor={`location_${lang}`}>{t('events.location_field', 'Location')}</Label>
                      <Input
                        id={`location_${lang}`}
                        value={formData[`location_${lang}` as keyof EventForm]}
                        onChange={(e) => setFormData({ 
                          ...formData, 
                          [`location_${lang}`]: e.target.value 
                        })}
                        placeholder={t('events.location_placeholder', 'Enter event location')}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor={`rules_${lang}`}>{t('events.rules_field', 'Rules')}</Label>
                      <Textarea
                        id={`rules_${lang}`}
                        value={formData[`rules_${lang}` as keyof EventForm]}
                        onChange={(e) => setFormData({ 
                          ...formData, 
                          [`rules_${lang}`]: e.target.value 
                        })}
                        placeholder={t('events.rules_placeholder', 'Enter event rules')}
                        rows={3}
                      />
                    </div>

                    <div>
                      <Label htmlFor={`scenario_${lang}`}>{t('events.scenario_field', 'Scenario')}</Label>
                      <Textarea
                        id={`scenario_${lang}`}
                        value={formData[`scenario_${lang}` as keyof EventForm]}
                        onChange={(e) => setFormData({ 
                          ...formData, 
                          [`scenario_${lang}`]: e.target.value 
                        })}
                        placeholder={t('events.scenario_placeholder', 'Enter event scenario')}
                        rows={3}
                      />
                    </div>
                  </TabsContent>
                ))}
              </Tabs>

              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={resetForm}>
                  {t('common.cancel', 'Cancel')}
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? t('common.loading', 'Loading...') : t('common.save', 'Save')}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={t('events.search_placeholder', 'Search events...')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={statusFilter} onValueChange={(value: any) => setStatusFilter(value)}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t('events.all_statuses', 'All Statuses')}</SelectItem>
            <SelectItem value="upcoming">{t('events.status.upcoming', 'Upcoming')}</SelectItem>
            <SelectItem value="registration_open">{t('events.status.registration_open', 'Registration Open')}</SelectItem>
            <SelectItem value="completed">{t('events.status.completed', 'Completed')}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4">
        {filteredEvents.map((event) => (
          <Card key={event.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="text-lg">{getTitle(event)}</CardTitle>
                  <div className="flex items-center gap-4 mt-2 text-muted-foreground text-sm">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(event.event_date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {getLocation(event)}
                    </div>
                    {event.max_participants && (
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {event.max_participants} max
                      </div>
                    )}
                    {event.price && (
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4" />
                        {event.price}
                      </div>
                    )}
                  </div>
                  <div className="mt-2">
                    {getStatusBadge(event.status)}
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => editEvent(event)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => deleteEvent(event.id)}
                    className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <Card>
          <CardContent className="py-8 text-center">
            <p className="text-muted-foreground">{t('events.no_events', 'No events found')}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EventsManager;