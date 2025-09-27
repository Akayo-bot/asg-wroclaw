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
import { Switch } from '@/components/ui/switch';
import { Plus, Edit, Trash2, Calendar, MapPin, Users, DollarSign, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Tables } from '@/integrations/supabase/types';
import { formatCurrency, formatPlayerLimits } from '@/lib/formatters';

type Event = Tables<'events'>;

interface EventForm {
  title_uk: string;
  title_ru: string;
  title_pl: string;
  title_en: string;
  description_uk: string;
  description_ru: string;
  description_pl: string;
  description_en: string;
  location_uk: string;
  location_ru: string;
  location_pl: string;
  location_en: string;
  rules_uk: string;
  rules_ru: string;
  rules_pl: string;
  rules_en: string;
  scenario_uk: string;
  scenario_ru: string;
  scenario_pl: string;
  scenario_en: string;
  event_date: string;
  start_datetime: string;
  registration_deadline: string;
  price_amount: string;
  price_currency: string;
  max_participants: string;
  min_players: string;
  max_players: string;
  limit_mode: string;
  status: string;
  status_registration: string;
  main_image_url: string;
  cover_url: string;
  map_url: string;
}

const EventsManager = () => {
  const { t, language } = useI18n();
  const { toast } = useToast();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'upcoming' | 'registration_open' | 'completed' | 'cancelled'>('all');
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState<EventForm>({
    title_uk: '',
    title_ru: '',
    title_pl: '',
    title_en: '',
    description_uk: '',
    description_ru: '',
    description_pl: '',
    description_en: '',
    location_uk: '',
    location_ru: '',
    location_pl: '',
    location_en: '',
    rules_uk: '',
    rules_ru: '',
    rules_pl: '',
    rules_en: '',
    scenario_uk: '',
    scenario_ru: '',
    scenario_pl: '',
    scenario_en: '',
    event_date: '',
    start_datetime: '',
    registration_deadline: '',
    price_amount: '',
    price_currency: 'PLN',
    max_participants: '',
    min_players: '',
    max_players: '',
    limit_mode: 'unlimited',
    status: 'upcoming',
    status_registration: 'open',
    main_image_url: '',
    cover_url: '',
    map_url: '',
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
      
      query = query.order('start_datetime', { ascending: false });
      
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
      const { data: { user } } = await supabase.auth.getUser();
      
      const eventData = {
        title_uk: formData.title_uk,
        title_ru: formData.title_ru,
        title_pl: formData.title_pl,
        title_en: formData.title_en,
        description_uk: formData.description_uk,
        description_ru: formData.description_ru,
        description_pl: formData.description_pl,
        description_en: formData.description_en,
        location_uk: formData.location_uk,
        location_ru: formData.location_ru,
        location_pl: formData.location_pl,
        location_en: formData.location_en,
        rules_uk: formData.rules_uk,
        rules_ru: formData.rules_ru,
        rules_pl: formData.rules_pl,
        rules_en: formData.rules_en,
        scenario_uk: formData.scenario_uk,
        scenario_ru: formData.scenario_ru,
        scenario_pl: formData.scenario_pl,
        scenario_en: formData.scenario_en,
        event_date: new Date(formData.event_date).toISOString(),
        start_datetime: new Date(formData.start_datetime || formData.event_date).toISOString(),
        registration_deadline: formData.registration_deadline ? new Date(formData.registration_deadline).toISOString() : null,
        price: formData.price_amount ? parseFloat(formData.price_amount) : null,
        price_amount: formData.price_amount ? parseFloat(formData.price_amount) : null,
        price_currency: formData.price_currency,
        max_participants: formData.max_participants ? parseInt(formData.max_participants) : null,
        min_players: formData.min_players ? parseInt(formData.min_players) : null,
        max_players: formData.max_players ? parseInt(formData.max_players) : null,
        limit_mode: formData.limit_mode,
        status: formData.status as 'upcoming' | 'registration_open' | 'completed' | 'cancelled',
        status_registration: formData.status_registration as 'open' | 'closed' | 'waitlist',
        created_by: user?.id || '',
        main_image_url: formData.main_image_url || null,
        cover_url: formData.cover_url || null,
        map_url: formData.map_url || null,
      };

      if (editingEvent) {
        const { error } = await supabase
          .from('events')
          .update(eventData)
          .eq('id', editingEvent.id);
        
        if (error) throw error;
        
        toast({
          title: t('common.success', 'Success'),
          description: t('events.updated', 'Event updated successfully'),
        });
      } else {
        const { error } = await supabase
          .from('events')
          .insert([eventData]);
        
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
      title_en: '',
      description_uk: '',
      description_ru: '',
      description_pl: '',
      description_en: '',
      location_uk: '',
      location_ru: '',
      location_pl: '',
      location_en: '',
      rules_uk: '',
      rules_ru: '',
      rules_pl: '',
      rules_en: '',
      scenario_uk: '',
      scenario_ru: '',
      scenario_pl: '',
      scenario_en: '',
      event_date: '',
      start_datetime: '',
      registration_deadline: '',
      price_amount: '',
      price_currency: 'PLN',
      max_participants: '',
      min_players: '',
      max_players: '',
      limit_mode: 'unlimited',
      status: 'upcoming',
      status_registration: 'open',
      main_image_url: '',
      cover_url: '',
      map_url: '',
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
      title_en: event.title_en || '',
      description_uk: event.description_uk,
      description_ru: event.description_ru,
      description_pl: event.description_pl,
      description_en: event.description_en || '',
      location_uk: event.location_uk,
      location_ru: event.location_ru,
      location_pl: event.location_pl,
      location_en: event.location_en || '',
      rules_uk: event.rules_uk || '',
      rules_ru: event.rules_ru || '',
      rules_pl: event.rules_pl || '',
      rules_en: event.rules_en || '',
      scenario_uk: event.scenario_uk || '',
      scenario_ru: event.scenario_ru || '',
      scenario_pl: event.scenario_pl || '',
      scenario_en: event.scenario_en || '',
      event_date: event.event_date ? new Date(event.event_date).toISOString().slice(0, 16) : '',
      start_datetime: event.start_datetime ? new Date(event.start_datetime).toISOString().slice(0, 16) : '',
      registration_deadline: event.registration_deadline ? new Date(event.registration_deadline).toISOString().slice(0, 16) : '',
      price_amount: event.price_amount ? event.price_amount.toString() : '',
      price_currency: event.price_currency || 'PLN',
      max_participants: event.max_participants ? event.max_participants.toString() : '',
      min_players: event.min_players ? event.min_players.toString() : '',
      max_players: event.max_players ? event.max_players.toString() : '',
      limit_mode: event.limit_mode || 'unlimited',
      status: event.status,
      status_registration: event.status_registration || 'open',
      main_image_url: event.main_image_url || '',
      cover_url: event.cover_url || '',
      map_url: event.map_url || '',
    });
    setIsDialogOpen(true);
  };

  const getTitle = (event: Event) => {
    const titles = {
      uk: event.title_uk,
      ru: event.title_ru,
      pl: event.title_pl,
      en: event.title_en || event.title_uk,
    };
    return titles[language as keyof typeof titles] || event.title_uk;
  };

  const getLocation = (event: Event) => {
    const locations = {
      uk: event.location_uk,
      ru: event.location_ru,
      pl: event.location_pl,
      en: event.location_en || event.location_uk,
    };
    return locations[language as keyof typeof locations] || event.location_uk;
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
                  <Label htmlFor="start_datetime">{t('events.start_datetime', 'Start Date & Time')}</Label>
                  <Input
                    id="start_datetime"
                    type="datetime-local"
                    value={formData.start_datetime}
                    onChange={(e) => setFormData({ ...formData, start_datetime: e.target.value })}
                  />
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
                
                <div className="flex gap-2">
                  <div className="flex-1">
                    <Label htmlFor="price_amount">{t('events.price', 'Price')}</Label>
                    <Input
                      id="price_amount"
                      type="number"
                      step="0.01"
                      value={formData.price_amount}
                      onChange={(e) => setFormData({ ...formData, price_amount: e.target.value })}
                      placeholder="100.00"
                    />
                  </div>
                  <div>
                    <Label htmlFor="price_currency">{t('events.currency', 'Currency')}</Label>
                    <Select value={formData.price_currency} onValueChange={(value) => setFormData({ ...formData, price_currency: value })}>
                      <SelectTrigger className="w-24">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="PLN">PLN</SelectItem>
                        <SelectItem value="USD">USD</SelectItem>
                        <SelectItem value="EUR">EUR</SelectItem>
                        <SelectItem value="UAH">UAH</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="limit_mode">{t('events.limit_mode', 'Player Limits')}</Label>
                  <Select value={formData.limit_mode} onValueChange={(value) => setFormData({ ...formData, limit_mode: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="unlimited">{t('events.unlimited', 'Unlimited')}</SelectItem>
                      <SelectItem value="ranged">{t('events.ranged', 'Set Range')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {formData.limit_mode === 'ranged' && (
                  <>
                    <div>
                      <Label htmlFor="min_players">{t('events.min_players', 'Min Players')}</Label>
                      <Input
                        id="min_players"
                        type="number"
                        value={formData.min_players}
                        onChange={(e) => setFormData({ ...formData, min_players: e.target.value })}
                        placeholder="8"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="max_players">{t('events.max_players', 'Max Players')}</Label>
                      <Input
                        id="max_players"
                        type="number"
                        value={formData.max_players}
                        onChange={(e) => setFormData({ ...formData, max_players: e.target.value })}
                        placeholder="40"
                      />
                    </div>
                  </>
                )}
                
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
                  <Label htmlFor="status_registration">{t('events.registration_status', 'Registration Status')}</Label>
                  <Select value={formData.status_registration} onValueChange={(value) => setFormData({ ...formData, status_registration: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="open">{t('events.registration.open', 'Open')}</SelectItem>
                      <SelectItem value="closed">{t('events.registration.closed', 'Closed')}</SelectItem>
                      <SelectItem value="waitlist">{t('events.registration.waitlist', 'Waitlist')}</SelectItem>
                    </SelectContent>
                  </Select>
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
                
                <div>
                  <Label htmlFor="cover_url">{t('events.cover_url', 'Cover Image URL')}</Label>
                  <Input
                    id="cover_url"
                    value={formData.cover_url}
                    onChange={(e) => setFormData({ ...formData, cover_url: e.target.value })}
                    placeholder="https://example.com/cover.jpg"
                  />
                </div>
                
                <div>
                  <Label htmlFor="map_url">{t('events.map_url', 'Map URL')}</Label>
                  <Input
                    id="map_url"
                    value={formData.map_url}
                    onChange={(e) => setFormData({ ...formData, map_url: e.target.value })}
                    placeholder="https://maps.google.com/..."
                  />
                </div>
              </div>

              <Tabs defaultValue="uk" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="uk">🇺🇦 Українська</TabsTrigger>
                  <TabsTrigger value="ru">🇷🇺 Русский</TabsTrigger>
                  <TabsTrigger value="pl">🇵🇱 Polski</TabsTrigger>
                  <TabsTrigger value="en">🇺🇸 English</TabsTrigger>
                </TabsList>

                {['uk', 'ru', 'pl', 'en'].map((lang) => (
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
                        required={lang !== 'en'}
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
                        required={lang !== 'en'}
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
                        required={lang !== 'en'}
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
            <SelectItem value="cancelled">{t('events.status.cancelled', 'Cancelled')}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event) => (
          <Card key={event.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg line-clamp-2">{getTitle(event)}</CardTitle>
                {getStatusBadge(event.status)}
              </div>
              <div className="flex items-center text-sm text-muted-foreground gap-4">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {event.start_datetime ? new Date(event.start_datetime).toLocaleDateString(language === 'uk' ? 'uk-UA' : language === 'ru' ? 'ru-RU' : language === 'pl' ? 'pl-PL' : 'en-US') : 'No date'}
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {getLocation(event)}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {formatPlayerLimits(event.limit_mode, event.min_players, event.max_players, 0, language)}
                  </div>
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-4 w-4" />
                    {formatCurrency(event.price_amount, event.price_currency || 'PLN', language)}
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" size="sm" onClick={() => editEvent(event)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => deleteEvent(event.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredEvents.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">{t('events.no_events', 'No events found')}</p>
        </div>
      )}
    </div>
  );
};

export default EventsManager;