import { Layout } from '@/components/Layout';
import { useTranslation } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Facebook, 
  Instagram,
  MessageCircle,
  Send
} from 'lucide-react';

const ContactsPage = () => {
  const t = useTranslation();

  const contactInfo = [
    {
      icon: Phone,
      title: t.pages.contacts.info.phone,
      value: '+48 123 456 789',
      description: 'Доступен ежедневно с 10:00 до 22:00'
    },
    {
      icon: Mail,
      title: t.pages.contacts.info.email,
      value: 'info@ravenstrike.pl',
      description: 'Ответим в течение 24 часов'
    },
    {
      icon: MapPin,
      title: t.pages.contacts.info.location,
      value: 'Вроцлав, Польша',
      description: 'Основная база операций'
    },
    {
      icon: Clock,
      title: t.pages.contacts.info.hours,
      value: 'Пн-Вс: 10:00 - 22:00',
      description: 'Время для связи и консультаций'
    }
  ];

  const socialLinks = [
    {
      icon: Facebook,
      name: 'Facebook',
      url: '#',
      handle: '@ravenstrikewroclaw'
    },
    {
      icon: Instagram,
      name: 'Instagram',
      url: '#',
      handle: '@raven_strike_force'
    }
  ];

  return (
    <Layout showBreadcrumbs>
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="font-rajdhani text-4xl md:text-5xl font-bold mb-4">
              {t.pages.contacts.title}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t.pages.contacts.subtitle}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="font-rajdhani text-2xl font-bold mb-6 text-primary">
                Контактная информация
              </h2>
              
              <div className="grid gap-4 mb-8">
                {contactInfo.map((info, index) => (
                  <Card key={index} className="glass-panel">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-lg bg-primary/10">
                          <info.icon className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-rajdhani text-lg font-bold mb-1">
                            {info.title}
                          </h3>
                          <p className="text-foreground font-medium mb-1">
                            {info.value}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {info.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Social Media */}
              <div>
                <h3 className="font-rajdhani text-xl font-bold mb-4 text-primary">
                  Социальные сети
                </h3>
                <div className="flex gap-4">
                  {socialLinks.map((social, index) => (
                    <Card key={index} className="glass-panel tactical-lift cursor-tactical">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <social.icon className="w-5 h-5 text-primary" />
                          <div>
                            <p className="font-medium">{social.name}</p>
                            <p className="text-sm text-muted-foreground">{social.handle}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="mt-8">
                <h3 className="font-rajdhani text-xl font-bold mb-4 text-primary">
                  Быстрые действия
                </h3>
                <div className="grid gap-3">
                  <Button className="justify-start gap-3 cursor-tactical" variant="outline">
                    <MessageCircle className="w-5 h-5" />
                    Написать в Telegram
                  </Button>
                  <Button className="justify-start gap-3 cursor-tactical" variant="outline">
                    <Phone className="w-5 h-5" />
                    Заказать звонок
                  </Button>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <Card className="glass-panel">
                <CardHeader>
                  <CardTitle className="font-rajdhani text-2xl flex items-center gap-2">
                    <Send className="w-6 h-6 text-primary" />
                    Связаться с нами
                  </CardTitle>
                  <p className="text-muted-foreground">
                    Заполните форму, и мы свяжемся с вами в ближайшее время
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">{t.pages.contacts.form.name}</Label>
                      <Input 
                        id="name"
                        placeholder="Ваше имя"
                        className="cursor-tactical"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">{t.pages.contacts.form.phone}</Label>
                      <Input 
                        id="phone"
                        placeholder="+48 123 456 789"
                        className="cursor-tactical"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="email">{t.pages.contacts.form.email}</Label>
                    <Input 
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      className="cursor-tactical"
                    />
                  </div>

                  <div>
                    <Label htmlFor="subject">Тема сообщения</Label>
                    <Input 
                      id="subject"
                      placeholder="О чем хотите поговорить?"
                      className="cursor-tactical"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">{t.pages.contacts.form.message}</Label>
                    <Textarea 
                      id="message"
                      placeholder="Расскажите подробнее о своем вопросе или предложении..."
                      rows={5}
                      className="cursor-tactical"
                    />
                  </div>

                  <Button className="w-full cursor-tactical">
                    <Send className="w-4 h-4 mr-2" />
                    {t.pages.contacts.form.submit}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    Отправляя форму, вы соглашаетесь с обработкой персональных данных
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-16">
            <h2 className="font-rajdhani text-2xl font-bold mb-8 text-center text-primary">
              Часто задаваемые вопросы
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="glass-panel">
                <CardHeader>
                  <CardTitle className="font-rajdhani text-lg">
                    Как присоединиться к команде?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Свяжитесь с нами любым удобным способом. Мы расскажем о требованиях, 
                    пригласим на тренировку и поможем с выбором снаряжения.
                  </p>
                </CardContent>
              </Card>

              <Card className="glass-panel">
                <CardHeader>
                  <CardTitle className="font-rajdhani text-lg">
                    Нужно ли свое снаряжение?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Для начала можно использовать арендованное снаряжение. 
                    Поможем с выбором и покупкой собственного оборудования.
                  </p>
                </CardContent>
              </Card>

              <Card className="glass-panel">
                <CardHeader>
                  <CardTitle className="font-rajdhani text-lg">
                    Какой уровень подготовки нужен?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Принимаем игроков любого уровня. Главное - желание учиться, 
                    дисциплинированность и командный дух.
                  </p>
                </CardContent>
              </Card>

              <Card className="glass-panel">
                <CardHeader>
                  <CardTitle className="font-rajdhani text-lg">
                    Как часто проводятся игры?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Организуем игры 2-3 раза в месяц. Также участвуем в турнирах 
                    и специальных мероприятиях по всей Польше.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ContactsPage;