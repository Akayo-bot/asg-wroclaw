import React, { useState } from 'react';
import { useI18n } from '@/contexts/I18nContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  Clock, 
  Users, 
  Coins, 
  Settings, 
  Image as ImageIcon, 
  MapPin, 
  FileText,
  Globe2,
  X
} from 'lucide-react';

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
  start_datetime: string;
  registration_deadline: string;
  price_amount: string;
  price_currency: string;
  min_players: string;
  max_players: string;
  limit_mode: string;
  status: string;
  status_registration: string;
  main_image_url: string;
  cover_url: string;
  map_url: string;
}

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: EventForm) => Promise<void>;
  editingEvent?: any | null;
  formData: EventForm;
  setFormData: (data: EventForm) => void;
  loading: boolean;
}

const EventModal: React.FC<EventModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  editingEvent,
  formData,
  setFormData,
  loading
}) => {
  const { t, language } = useI18n();
  const [activeLanguage, setActiveLanguage] = useState<'uk' | 'ru' | 'pl' | 'en'>(language as 'uk' | 'ru' | 'pl' | 'en');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Validate required fields
    if (!formData.start_datetime) {
      newErrors.start_datetime = t('events.validation.required', 'This field is required');
    }

    if (!formData.title_uk && !formData.title_ru && !formData.title_pl && !formData.title_en) {
      newErrors.title = t('events.validation.titleRequired', 'Title is required in at least one language');
    }

    // Validate registration deadline
    if (formData.registration_deadline && formData.start_datetime) {
      const deadline = new Date(formData.registration_deadline);
      const startDate = new Date(formData.start_datetime);
      if (deadline >= startDate) {
        newErrors.registration_deadline = t('events.validation.deadlineBeforeStart', 'Registration deadline must be before event start');
      }
    }

    // Validate player limits
    if (formData.limit_mode === 'ranged') {
      const minPlayers = parseInt(formData.min_players);
      const maxPlayers = parseInt(formData.max_players);
      
      if (!formData.min_players || minPlayers <= 0) {
        newErrors.min_players = t('events.validation.minPlayersRequired', 'Min players must be greater than 0');
      }
      
      if (!formData.max_players || maxPlayers <= 0) {
        newErrors.max_players = t('events.validation.maxPlayersRequired', 'Max players must be greater than 0');
      }
      
      if (minPlayers && maxPlayers && minPlayers > maxPlayers) {
        newErrors.min_players = t('events.validation.minLessThanMax', 'Min players cannot be greater than max players');
      }
    }

    // Validate URLs
    const urlPattern = /^https?:\/\/.+/;
    if (formData.main_image_url && !urlPattern.test(formData.main_image_url)) {
      newErrors.main_image_url = t('events.validation.invalidUrl', 'Please enter a valid URL');
    }
    if (formData.cover_url && !urlPattern.test(formData.cover_url)) {
      newErrors.cover_url = t('events.validation.invalidUrl', 'Please enter a valid URL');
    }
    if (formData.map_url && !urlPattern.test(formData.map_url)) {
      newErrors.map_url = t('events.validation.invalidUrl', 'Please enter a valid URL');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      await onSubmit(formData);
    }
  };

  const languages = [
    { code: 'uk', name: 'Українська', flag: '🇺🇦' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'pl', name: 'Polski', flag: '🇵🇱' },
    { code: 'en', name: 'English', flag: '🇺🇸' }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[900px] max-h-[90vh] overflow-hidden rounded-2xl shadow-2xl">
        <DialogHeader className="flex flex-row items-center justify-between pb-6 border-b">
          <DialogTitle className="text-2xl font-bold">
            {editingEvent ? t('events.edit_event', 'Edit Event') : t('events.create_event', 'Create Event')}
          </DialogTitle>
          
          <div className="flex items-center gap-2">
            <Globe2 className="h-4 w-4 text-muted-foreground" />
            <div className="flex gap-1">
              {languages.map((lang) => (
                <Button
                  key={lang.code}
                  type="button"
                  variant={activeLanguage === lang.code ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setActiveLanguage(lang.code as 'uk' | 'ru' | 'pl' | 'en')}
                  className="h-8 px-2 text-xs"
                >
                  {lang.flag} {lang.code.toUpperCase()}
                </Button>
              ))}
            </div>
          </div>
        </DialogHeader>

        <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
          <form onSubmit={handleSubmit} className="space-y-6 p-1">
            {/* Basic Information */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  {t('events.sections.basic', 'Basic Information')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor={`title_${activeLanguage}`} className="flex items-center gap-2">
                    {t('events.title_field', 'Title')}
                    <Badge variant="outline" className="text-xs">{activeLanguage.toUpperCase()}</Badge>
                  </Label>
                  <Input
                    id={`title_${activeLanguage}`}
                    value={formData[`title_${activeLanguage}` as keyof EventForm]}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      [`title_${activeLanguage}`]: e.target.value 
                    })}
                    placeholder={t('events.title_placeholder', 'Enter event title')}
                    className="mt-1"
                  />
                  {errors.title && <p className="text-sm text-destructive mt-1">{errors.title}</p>}
                </div>

                <div>
                  <Label htmlFor={`description_${activeLanguage}`} className="flex items-center gap-2">
                    {t('events.description_field', 'Description')}
                    <Badge variant="outline" className="text-xs">{activeLanguage.toUpperCase()}</Badge>
                  </Label>
                  <Textarea
                    id={`description_${activeLanguage}`}
                    value={formData[`description_${activeLanguage}` as keyof EventForm]}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      [`description_${activeLanguage}`]: e.target.value 
                    })}
                    placeholder={t('events.description_placeholder', 'Enter event description')}
                    rows={3}
                    className="mt-1"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Date & Time */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  {t('events.sections.datetime', 'Date & Time')}
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="start_datetime" className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {t('events.start_datetime', 'Event Date & Time')} *
                  </Label>
                  <Input
                    id="start_datetime"
                    type="datetime-local"
                    value={formData.start_datetime}
                    onChange={(e) => setFormData({ ...formData, start_datetime: e.target.value })}
                    className="mt-1"
                  />
                  {errors.start_datetime && <p className="text-sm text-destructive mt-1">{errors.start_datetime}</p>}
                </div>
                
                <div>
                  <Label htmlFor="registration_deadline" className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {t('events.registration_deadline', 'Registration Deadline')}
                  </Label>
                  <Input
                    id="registration_deadline"
                    type="datetime-local"
                    value={formData.registration_deadline}
                    onChange={(e) => setFormData({ ...formData, registration_deadline: e.target.value })}
                    className="mt-1"
                  />
                  {errors.registration_deadline && <p className="text-sm text-destructive mt-1">{errors.registration_deadline}</p>}
                </div>
              </CardContent>
            </Card>

            {/* Participants */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  {t('events.sections.participants', 'Participants')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="limit_mode">{t('events.limit_mode', 'Player Limits')}</Label>
                  <Select value={formData.limit_mode} onValueChange={(value) => setFormData({ ...formData, limit_mode: value })}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="unlimited">{t('events.unlimited', 'Unlimited')}</SelectItem>
                      <SelectItem value="ranged">{t('events.ranged', 'Set Range')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {formData.limit_mode === 'ranged' && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="min_players">{t('events.min_players', 'Min Players')}</Label>
                      <Input
                        id="min_players"
                        type="number"
                        min="1"
                        value={formData.min_players}
                        onChange={(e) => setFormData({ ...formData, min_players: e.target.value })}
                        placeholder="8"
                        className="mt-1"
                      />
                      {errors.min_players && <p className="text-sm text-destructive mt-1">{errors.min_players}</p>}
                    </div>
                    
                    <div>
                      <Label htmlFor="max_players">{t('events.max_players', 'Max Players')}</Label>
                      <Input
                        id="max_players"
                        type="number"
                        min="1"
                        value={formData.max_players}
                        onChange={(e) => setFormData({ ...formData, max_players: e.target.value })}
                        placeholder="40"
                        className="mt-1"
                      />
                      {errors.max_players && <p className="text-sm text-destructive mt-1">{errors.max_players}</p>}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Payment */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Coins className="h-5 w-5" />
                  {t('events.sections.payment', 'Payment')}
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <Label htmlFor="price_amount">{t('events.price', 'Price')}</Label>
                  <Input
                    id="price_amount"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.price_amount}
                    onChange={(e) => setFormData({ ...formData, price_amount: e.target.value })}
                    placeholder={t('events.price_placeholder', 'Leave empty for free event')}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="price_currency">{t('events.currency', 'Currency')}</Label>
                  <Select value={formData.price_currency} onValueChange={(value) => setFormData({ ...formData, price_currency: value })}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PLN">PLN (zł)</SelectItem>
                      <SelectItem value="USD">USD ($)</SelectItem>
                      <SelectItem value="EUR">EUR (€)</SelectItem>
                      <SelectItem value="UAH">UAH (₴)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Status */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  {t('events.sections.status', 'Status')}
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="status">{t('events.status.label', 'Event Status')}</Label>
                  <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">{t('events.status.draft', 'Draft')}</SelectItem>
                      <SelectItem value="published">{t('events.status.published', 'Published')}</SelectItem>
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
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="open">{t('events.registration.open', 'Open')}</SelectItem>
                      <SelectItem value="closed">{t('events.registration.closed', 'Closed')}</SelectItem>
                      <SelectItem value="waitlist">{t('events.registration.waitlist', 'Waitlist')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Media */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <ImageIcon className="h-5 w-5" />
                  {t('events.sections.media', 'Media')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="main_image_url">{t('events.main_image_url', 'Main Image URL')}</Label>
                  <Input
                    id="main_image_url"
                    type="url"
                    value={formData.main_image_url}
                    onChange={(e) => setFormData({ ...formData, main_image_url: e.target.value })}
                    placeholder="https://example.com/image.jpg"
                    className="mt-1"
                  />
                  {errors.main_image_url && <p className="text-sm text-destructive mt-1">{errors.main_image_url}</p>}
                </div>
                
                <div>
                  <Label htmlFor="cover_url">{t('events.cover_url', 'Cover Image URL')}</Label>
                  <Input
                    id="cover_url"
                    type="url"
                    value={formData.cover_url}
                    onChange={(e) => setFormData({ ...formData, cover_url: e.target.value })}
                    placeholder="https://example.com/cover.jpg"
                    className="mt-1"
                  />
                  {errors.cover_url && <p className="text-sm text-destructive mt-1">{errors.cover_url}</p>}
                </div>
              </CardContent>
            </Card>

            {/* Location */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  {t('events.sections.location', 'Location')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor={`location_${activeLanguage}`} className="flex items-center gap-2">
                    {t('events.location_field', 'Location')}
                    <Badge variant="outline" className="text-xs">{activeLanguage.toUpperCase()}</Badge>
                  </Label>
                  <Input
                    id={`location_${activeLanguage}`}
                    value={formData[`location_${activeLanguage}` as keyof EventForm]}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      [`location_${activeLanguage}`]: e.target.value 
                    })}
                    placeholder={t('events.location_placeholder', 'Enter event location')}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="map_url">{t('events.map_url', 'Map URL')}</Label>
                  <Input
                    id="map_url"
                    type="url"
                    value={formData.map_url}
                    onChange={(e) => setFormData({ ...formData, map_url: e.target.value })}
                    placeholder="https://maps.google.com/..."
                    className="mt-1"
                  />
                  {errors.map_url && <p className="text-sm text-destructive mt-1">{errors.map_url}</p>}
                </div>
              </CardContent>
            </Card>

            {/* Rules */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  {t('events.sections.rules', 'Rules')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  <Label htmlFor={`rules_${activeLanguage}`} className="flex items-center gap-2">
                    {t('events.rules_field', 'Rules')}
                    <Badge variant="outline" className="text-xs">{activeLanguage.toUpperCase()}</Badge>
                  </Label>
                  <Textarea
                    id={`rules_${activeLanguage}`}
                    value={formData[`rules_${activeLanguage}` as keyof EventForm]}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      [`rules_${activeLanguage}`]: e.target.value 
                    })}
                    placeholder={t('events.rules_placeholder', 'Enter event rules')}
                    rows={4}
                    className="mt-1"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Footer */}
            <div className="flex justify-between items-center pt-4 border-t sticky bottom-0 bg-background">
              <p className="text-sm text-muted-foreground">
                * {t('events.required_fields', 'Required fields')}
              </p>
              <div className="flex gap-3">
                <Button type="button" variant="outline" onClick={onClose} disabled={loading}>
                  {t('common.cancel', 'Cancel')}
                </Button>
                <Button type="submit" disabled={loading} className="min-w-[120px]">
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                      {t('common.saving', 'Saving...')}
                    </div>
                  ) : (
                    editingEvent ? t('common.update', 'Update') : t('common.create', 'Create')
                  )}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EventModal;