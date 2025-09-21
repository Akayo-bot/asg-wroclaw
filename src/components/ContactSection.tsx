import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, Clock, Facebook, Instagram } from 'lucide-react';

const ContactSection = () => {
  const contactInfo = [
    {
      icon: Phone,
      label: 'Телефон',
      value: '+48 123 456 789',
      description: 'Звоните с 9:00 до 21:00'
    },
    {
      icon: Mail,
      label: 'Email',
      value: 'info@ravenstrike.pl',
      description: 'Ответим в течение 24 часов'
    },
    {
      icon: MapPin,
      label: 'Локация',
      value: 'Вроцлав, Польша',
      description: 'Игры в радиусе 50 км'
    },
    {
      icon: Clock,
      label: 'Режим работы',
      value: 'Пн-Вс 9:00-21:00',
      description: 'Консультации и бронирование'
    }
  ];

  return (
    <section id="contacts" className="py-20 bg-muted/20">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-rajdhani text-4xl md:text-5xl font-bold text-foreground mb-4">
            ГОТОВЫ К <span className="text-primary">БОЮ?</span>
          </h2>
          <p className="font-inter text-lg text-muted-foreground max-w-2xl mx-auto">
            Свяжитесь с нами для участия в играх или организации собственного события
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {contactInfo.map((item, index) => (
                <div 
                  key={index}
                  className="bg-card p-6 rounded-lg tactical-lift cursor-tactical group"
                >
                  <item.icon className="w-8 h-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
                  <div className="font-rajdhani text-lg font-bold text-foreground">
                    {item.label}
                  </div>
                  <div className="font-inter text-primary font-medium">
                    {item.value}
                  </div>
                  <div className="font-inter text-xs text-muted-foreground mt-1">
                    {item.description}
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className="bg-card p-6 rounded-lg tactical-lift">
              <h3 className="font-rajdhani text-xl font-bold text-foreground mb-4">
                СЛЕДИТЕ ЗА НАМИ
              </h3>
              <div className="flex space-x-4">
                <button className="p-3 bg-primary/10 hover:bg-primary hover:text-primary-foreground rounded-lg transition-colors cursor-tactical group">
                  <Facebook className="w-6 h-6 group-hover:scale-110 transition-transform" />
                </button>
                <button className="p-3 bg-primary/10 hover:bg-primary hover:text-primary-foreground rounded-lg transition-colors cursor-tactical group">
                  <Instagram className="w-6 h-6 group-hover:scale-110 transition-transform" />
                </button>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-card p-8 rounded-lg tactical-lift">
            <h3 className="font-rajdhani text-2xl font-bold text-foreground mb-6">
              НАПИСАТЬ НАМ
            </h3>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-inter text-sm font-medium text-foreground mb-2 block">
                    Имя
                  </label>
                  <Input 
                    placeholder="Ваше имя"
                    className="bg-muted border-border text-foreground cursor-tactical"
                  />
                </div>
                <div>
                  <label className="font-inter text-sm font-medium text-foreground mb-2 block">
                    Телефон
                  </label>
                  <Input 
                    placeholder="+48 123 456 789"
                    className="bg-muted border-border text-foreground cursor-tactical"
                  />
                </div>
              </div>
              
              <div>
                <label className="font-inter text-sm font-medium text-foreground mb-2 block">
                  Email
                </label>
                <Input 
                  type="email"
                  placeholder="your@email.com"
                  className="bg-muted border-border text-foreground cursor-tactical"
                />
              </div>
              
              <div>
                <label className="font-inter text-sm font-medium text-foreground mb-2 block">
                  Сообщение
                </label>
                <Textarea 
                  placeholder="Расскажите о своих планах или задайте вопрос..."
                  rows={5}
                  className="bg-muted border-border text-foreground cursor-tactical resize-none"
                />
              </div>
              
              <Button 
                type="submit"
                className="btn-tactical-primary w-full font-rajdhani text-lg font-bold cursor-tactical"
              >
                ОТПРАВИТЬ СООБЩЕНИЕ
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;