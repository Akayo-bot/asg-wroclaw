import { Translations, Language } from '@/types/i18n';

export const translations: Record<Language, Translations> = {
  uk: {
    nav: {
      games: 'Ігри',
      team: 'Команда',
      gallery: 'Галерея',
      articles: 'Статті',
      contacts: 'Контакти',
      about: 'Про нас',
      search: 'Пошук',
      subscribe: 'Підписка'
    },
    common: {
      readMore: 'Читати далі',
      loadMore: 'Завантажити ще',
      loading: 'Завантаження...',
      error: 'Помилка',
      notFound: 'Не знайдено',
      back: 'Назад',
      next: 'Далі',
      previous: 'Попередній',
      home: 'Головна',
      register: 'Реєстрація',
      subscribe: 'Підписатися',
      submit: 'Відправити',
      cancel: 'Скасувати',
      save: 'Зберегти',
      edit: 'Редагувати',
      delete: 'Видалити',
      view: 'Переглянути',
      share: 'Поділитися',
      download: 'Завантажити'
    },
    hero: {
      title: 'RAVEN STRIKE FORCE',
      subtitle: 'ПРОФЕСІЙНИЙ СТРАЙКБОЛ У ВРОЦЛАВІ',
      cta: 'Приєднатися до команди',
      stats: {
        players: 'Гравців',
        gamesPerYear: 'Ігор на рік',
        yearsExperience: 'Років досвіду'
      }
    },
    pages: {
      games: {
        title: 'Найближчі ігри',
        subtitle: 'Календар страйкбольних подій та сценаріїв',
        noGames: 'Наразі немає запланованих ігор',
        filters: {
          all: 'Всі',
          upcoming: 'Майбутні',
          past: 'Минулі',
          registration: 'Реєстрація відкрита'
        }
      },
      team: {
        title: 'Наша команда',
        subtitle: 'Професійні гравці Raven Strike Force',
        noMembers: 'Інформація про команду недоступна'
      },
      gallery: {
        title: 'Галерея',
        subtitle: 'Фото та відео з наших ігор',
        noMedia: 'Немає медіафайлів',
        filters: {
          all: 'Всі',
          photos: 'Фото',
          videos: 'Відео'
        }
      },
      articles: {
        title: 'Статті',
        subtitle: 'Поради, гайди та новини зі світу страйкболу',
        noArticles: 'Статті не знайдені',
        categories: {
          all: 'Всі',
          tactics: 'Тактика',
          equipment: 'Спорядження',
          news: 'Новини',
          guides: 'Гайди'
        }
      },
      contacts: {
        title: 'Контакти',
        subtitle: 'Зв\'яжіться з нами для участі в іграх',
        form: {
          name: 'Ім\'я',
          email: 'Email',
          phone: 'Телефон',
          message: 'Повідомлення',
          submit: 'Відправити',
          success: 'Повідомлення відправлено успішно!',
          error: 'Помилка відправки повідомлення'
        },
        info: {
          phone: 'Телефон',
          email: 'Email',
          location: 'Локація',
          hours: 'Години роботи'
        }
      },
      about: {
        title: 'Про Raven Strike Force',
        subtitle: 'Наша місія та історія',
        mission: 'Наша місія',
        history: 'Історія команди',
        goals: 'Наші цілі'
      },
      search: {
        title: 'Пошук',
        placeholder: 'Шукати статті, ігри, учасників...',
        noResults: 'Результатів не знайдено',
        results: 'Результати пошуку'
      },
      subscribe: {
        title: 'Підписка на новини',
        subtitle: 'Отримуйте інформацію про нові ігри та події',
        email: 'Email адреса',
        submit: 'Підписатися',
        success: 'Підписка оформлена успішно!',
        error: 'Помилка оформлення підписки'
      }
    }
  },
  ru: {
    nav: {
      games: 'Игры',
      team: 'Команда',
      gallery: 'Галерея',
      articles: 'Статьи',
      contacts: 'Контакты',
      about: 'О нас',
      search: 'Поиск',
      subscribe: 'Подписка'
    },
    common: {
      readMore: 'Читать далее',
      loadMore: 'Загрузить еще',
      loading: 'Загрузка...',
      error: 'Ошибка',
      notFound: 'Не найдено',
      back: 'Назад',
      next: 'Далее',
      previous: 'Предыдущий',
      home: 'Главная',
      register: 'Регистрация',
      subscribe: 'Подписаться',
      submit: 'Отправить',
      cancel: 'Отменить',
      save: 'Сохранить',
      edit: 'Редактировать',
      delete: 'Удалить',
      view: 'Просмотреть',
      share: 'Поделиться',
      download: 'Скачать'
    },
    hero: {
      title: 'RAVEN STRIKE FORCE',
      subtitle: 'ПРОФЕССИОНАЛЬНЫЙ СТРАЙКБОЛ ВО ВРОЦЛАВЕ',
      cta: 'Присоединиться к команде',
      stats: {
        players: 'Игроков',
        gamesPerYear: 'Игр в год',
        yearsExperience: 'Лет опыта'
      }
    },
    pages: {
      games: {
        title: 'Ближайшие игры',
        subtitle: 'Календарь страйкбольных событий и сценариев',
        noGames: 'Сейчас нет запланированных игр',
        filters: {
          all: 'Все',
          upcoming: 'Будущие',
          past: 'Прошедшие',
          registration: 'Регистрация открыта'
        }
      },
      team: {
        title: 'Наша команда',
        subtitle: 'Профессиональные игроки Raven Strike Force',
        noMembers: 'Информация о команде недоступна'
      },
      gallery: {
        title: 'Галерея',
        subtitle: 'Фото и видео с наших игр',
        noMedia: 'Нет медиафайлов',
        filters: {
          all: 'Все',
          photos: 'Фото',
          videos: 'Видео'
        }
      },
      articles: {
        title: 'Статьи',
        subtitle: 'Советы, гайды и новости из мира страйкбола',
        noArticles: 'Статьи не найдены',
        categories: {
          all: 'Все',
          tactics: 'Тактика',
          equipment: 'Снаряжение',
          news: 'Новости',
          guides: 'Гайды'
        }
      },
      contacts: {
        title: 'Контакты',
        subtitle: 'Свяжитесь с нами для участия в играх',
        form: {
          name: 'Имя',
          email: 'Email',
          phone: 'Телефон',
          message: 'Сообщение',
          submit: 'Отправить',
          success: 'Сообщение отправлено успешно!',
          error: 'Ошибка отправки сообщения'
        },
        info: {
          phone: 'Телефон',
          email: 'Email',
          location: 'Локация',
          hours: 'Часы работы'
        }
      },
      about: {
        title: 'О Raven Strike Force',
        subtitle: 'Наша миссия и история',
        mission: 'Наша миссия',
        history: 'История команды',
        goals: 'Наши цели'
      },
      search: {
        title: 'Поиск',
        placeholder: 'Искать статьи, игры, участников...',
        noResults: 'Результатов не найдено',
        results: 'Результаты поиска'
      },
      subscribe: {
        title: 'Подписка на новости',
        subtitle: 'Получайте информацию о новых играх и событиях',
        email: 'Email адрес',
        submit: 'Подписаться',
        success: 'Подписка оформлена успешно!',
        error: 'Ошибка оформления подписки'
      }
    }
  },
  pl: {
    nav: {
      games: 'Gry',
      team: 'Drużyna',
      gallery: 'Galeria',
      articles: 'Artykuły',
      contacts: 'Kontakt',
      about: 'O nas',
      search: 'Szukaj',
      subscribe: 'Subskrybuj'
    },
    common: {
      readMore: 'Czytaj więcej',
      loadMore: 'Załaduj więcej',
      loading: 'Ładowanie...',
      error: 'Błąd',
      notFound: 'Nie znaleziono',
      back: 'Wstecz',
      next: 'Dalej',
      previous: 'Poprzedni',
      home: 'Główna',
      register: 'Rejestracja',
      subscribe: 'Subskrybuj',
      submit: 'Wyślij',
      cancel: 'Anuluj',
      save: 'Zapisz',
      edit: 'Edytuj',
      delete: 'Usuń',
      view: 'Zobacz',
      share: 'Udostępnij',
      download: 'Pobierz'
    },
    hero: {
      title: 'RAVEN STRIKE FORCE',
      subtitle: 'PROFESJONALNY AIRSOFT WE WROCŁAWIU',
      cta: 'Dołącz do drużyny',
      stats: {
        players: 'Graczy',
        gamesPerYear: 'Gier rocznie',
        yearsExperience: 'Lat doświadczenia'
      }
    },
    pages: {
      games: {
        title: 'Nadchodzące gry',
        subtitle: 'Kalendarz wydarzeń airsoft i scenariuszy',
        noGames: 'Obecnie brak zaplanowanych gier',
        filters: {
          all: 'Wszystkie',
          upcoming: 'Nadchodzące',
          past: 'Przeszłe',
          registration: 'Rejestracja otwarta'
        }
      },
      team: {
        title: 'Nasza drużyna',
        subtitle: 'Profesjonalni gracze Raven Strike Force',
        noMembers: 'Informacje o drużynie niedostępne'
      },
      gallery: {
        title: 'Galeria',
        subtitle: 'Zdjęcia i filmy z naszych gier',
        noMedia: 'Brak plików multimedialnych',
        filters: {
          all: 'Wszystkie',
          photos: 'Zdjęcia',
          videos: 'Filmy'
        }
      },
      articles: {
        title: 'Artykuły',
        subtitle: 'Porady, przewodniki i wiadomości ze świata airsoft',
        noArticles: 'Nie znaleziono artykułów',
        categories: {
          all: 'Wszystkie',
          tactics: 'Taktyka',
          equipment: 'Wyposażenie',
          news: 'Wiadomości',
          guides: 'Przewodniki'
        }
      },
      contacts: {
        title: 'Kontakt',
        subtitle: 'Skontaktuj się z nami, aby wziąć udział w grach',
        form: {
          name: 'Imię',
          email: 'Email',
          phone: 'Telefon',
          message: 'Wiadomość',
          submit: 'Wyślij',
          success: 'Wiadomość wysłana pomyślnie!',
          error: 'Błąd wysyłania wiadomości'
        },
        info: {
          phone: 'Telefon',
          email: 'Email',
          location: 'Lokalizacja',
          hours: 'Godziny pracy'
        }
      },
      about: {
        title: 'O Raven Strike Force',
        subtitle: 'Nasza misja i historia',
        mission: 'Nasza misja',
        history: 'Historia drużyny',
        goals: 'Nasze cele'
      },
      search: {
        title: 'Szukaj',
        placeholder: 'Szukaj artykuły, gry, członków...',
        noResults: 'Nie znaleziono wyników',
        results: 'Wyniki wyszukiwania'
      },
      subscribe: {
        title: 'Subskrypcja nowości',
        subtitle: 'Otrzymuj informacje o nowych grach i wydarzeniach',
        email: 'Adres email',
        submit: 'Subskrybuj',
        success: 'Subskrypcja została pomyślnie utworzona!',
        error: 'Błąd tworzenia subskrypcji'
      }
    }
  }
};

export const languages = [
  { code: 'uk' as Language, name: 'Українська', flag: '🇺🇦' },
  { code: 'ru' as Language, name: 'Русский', flag: '🇷🇺' },
  { code: 'pl' as Language, name: 'Polski', flag: '🇵🇱' }
];