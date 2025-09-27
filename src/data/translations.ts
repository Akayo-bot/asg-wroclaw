import { Translations, Language } from '@/types/i18n';

export const translations: Record<Language, Translations> = {
  en: {
    nav: {
      games: 'Games',
      team: 'Team',
      gallery: 'Gallery',
      articles: 'Articles',
      contacts: 'Contacts',
      about: 'About',
      search: 'Search',
      subscribe: 'Subscribe'
    },
    common: {
      readMore: 'Read More',
      loadMore: 'Load More',
      loading: 'Loading...',
      error: 'Error',
      notFound: 'Not Found',
      back: 'Back',
      next: 'Next',
      previous: 'Previous',
      home: 'Home',
      register: 'Register',
      subscribe: 'Subscribe',
      submit: 'Submit',
      cancel: 'Cancel',
      save: 'Save',
      edit: 'Edit',
      delete: 'Delete',
      view: 'View',
      share: 'Share',
      download: 'Download',
      success: 'Success'
    },
    hero: {
      title: 'RAVEN STRIKE FORCE',
      subtitle: 'PROFESSIONAL AIRSOFT IN WROCŁAW',
      cta: 'Join the Team',
      stats: {
        players: 'Players',
        gamesPerYear: 'Games per Year',
        yearsExperience: 'Years of Experience'
      }
    },
    admin: {
      title: 'Admin Panel',
      dashboard: 'Dashboard',
      dashboardSubtitle: 'Manage site content and settings',
      articles: 'Articles',
      gallery: 'Gallery',
      events: 'Events',
      team: 'Team',
      users: 'Users',
      statistics: 'Statistics',
      settings: 'Settings',
      manageArticles: 'Manage Articles',
      createArticle: 'Create Article',
      editArticle: 'Edit Article',
      backToArticles: 'Back to Articles',
      saveDraft: 'Save Draft',
      publish: 'Publish',
      published: 'Published',
      drafts: 'Drafts',
      allStatuses: 'All Statuses',
      allCategories: 'All Categories',
      confirmDeleteArticle: 'Are you sure you want to delete this article?',
      articleDeleted: 'Article deleted successfully',
      articleCreated: 'Article created successfully',
      articleUpdated: 'Article updated successfully',
      errorFetchingArticles: 'Error fetching articles',
      errorFetchingArticle: 'Error fetching article',
      errorDeletingArticle: 'Error deleting article',
      errorSavingArticle: 'Error saving article',
      noArticlesFound: 'No articles found',
      articleTitle: 'Article Title',
      preview: 'Preview',
      content: 'Content',
      category: 'Category',
      mainImageUrl: 'Main Image URL',
      articleSettings: 'Article Settings',
      articleTitlePlaceholder: 'Enter article title...',
      articlePreviewPlaceholder: 'Brief description of the article...',
      imageUrl: 'Image URL',
      youtubeUrl: 'YouTube Video URL',
      addImage: 'Add Image',
      addVideo: 'Add Video',
      totalArticles: 'Total Articles',
      totalUsers: 'Total Users',
      totalEvents: 'Total Events',
      totalRegistrations: 'Total Registrations',
      galleryItems: 'Gallery Items',
      teamMembers: 'Team Members',
      admins: 'Admins',
      editors: 'Editors',
      upcoming: 'Upcoming',
      completed: 'Completed',
      eventRegistrations: 'Event Registrations',
      photosAndVideos: 'Photos and Videos',
      activeMembers: 'Active Members',
      quickActions: 'Quick Actions',
      createEvent: 'Create Event',
      systemInfo: 'System Info',
      databaseStatus: 'Database Status',
      online: 'Online',
      lastBackup: 'Last Backup',
      automated: 'Automated',
      save: 'Save',
      cancel: 'Cancel',
      unpublish: 'Unpublish',
      free: 'Free',
      unlimited: 'Unlimited',
      registrationOpen: 'Registration Open',
      registrationClosed: 'Registration Closed',
      waitlist: 'Waitlist',
      currency: 'Currency',
      noArticles: 'No articles available',
      noGallery: 'No gallery items available'
    },
    categories: {
      tactics: 'Tactics',
      equipment: 'Equipment',
      news: 'News',
      gameReports: 'Game Reports',
      rules: 'Rules'
    },
    auth: {
      login: 'Login',
      register: 'Register',
      logout: 'Logout',
      pleaseLogin: 'Please log in to continue',
      loginDescription: 'Access your profile and participate in games',
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      displayName: 'Display Name',
      resetPassword: 'Reset Password',
      forgotPassword: 'Forgot Password?',
      googleLogin: 'Continue with Google',
      or: 'or',
      loginSuccess: 'Successfully logged in',
      registerSuccess: 'Registration successful',
      resetPasswordSuccess: 'Password reset link sent',
      emailPlaceholder: 'your.email@example.com',
      passwordPlaceholder: 'Your password',
      displayNamePlaceholder: 'Your nickname',
      confirmPasswordPlaceholder: 'Confirm your password',
      passwordMismatch: 'Passwords do not match',
      error: 'Login error',
      success: 'Success'
    },
    profile: {
      title: 'Profile',
      notLoggedIn: 'You are not logged in',
      settings: 'Settings',
      displayName: 'Display Name',
      bio: 'Bio',
      language: 'Language',
      notifications: 'Notifications',
      updateProfile: 'Update Profile',
      updateSuccess: 'Profile updated successfully',
      updateError: 'Error updating profile',
      memberSince: 'Member since',
      favoriteItems: 'Favorite Items',
      testResults: 'Test Results',
      gameHistory: 'Game History',
      noFavorites: 'No favorite items yet',
      noTestResults: 'No test results yet',
      noGameHistory: 'No game history yet',
      displayNamePlaceholder: 'Enter your display name',
      bioPlaceholder: 'Tell us about yourself...',
      notificationsDescription: 'Receive notifications about new events and updates',
      score: 'Score',
      security: 'Security',
      changePassword: 'Change Password',
      newPassword: 'New Password',
      confirmPassword: 'Confirm Password',
      changePasswordDescription: 'Change your account password',
      passwordChanged: 'Password changed successfully',
      tabs: {
        info: 'Information',
        security: 'Security',
        favorites: 'Favorites',
        tests: 'Tests',
        games: 'Games'
      },
      roles: {
        admin: 'Administrator',
        editor: 'Editor',
        user: 'User'
      },
      statuses: {
        pending: 'Pending',
        approved: 'Approved',
        rejected: 'Rejected',
        cancelled: 'Cancelled'
      }
    },
    games: {
      title: 'UPCOMING GAMES',
      subtitle: 'Join our tactical operations and experience the real military spirit',
      registration_closed: 'Registration Closed',
      join_waitlist: 'Join Waitlist',
      register: 'Register',
      no_upcoming: 'No upcoming games. Check back soon!',
      cta: {
        question: 'Didn\'t find a suitable game? Suggest your own scenario!',
        contact: 'CONTACT ORGANIZERS →'
      },
      status: {
        cancelled: 'Cancelled',
        waitlist: 'Waitlist',
        full: 'Full',
        open: 'Open'
      }
    },
    pages: {
      games: {
        title: 'Upcoming Games',
        subtitle: 'Calendar of airsoft events and scenarios',
        noGames: 'No games scheduled',
        filters: {
          all: 'All',
          upcoming: 'Upcoming',
          past: 'Past',
          registration: 'Registration Open'
        }
      },
      team: {
        title: 'Our Team',
        subtitle: 'Meet the Raven Strike Force members',
        noMembers: 'No team members found'
      },
      gallery: {
        title: 'Gallery',
        subtitle: 'Photos and videos from our games',
        noMedia: 'No media files found',
        filters: {
          all: 'All',
          photos: 'Photos',
          videos: 'Videos'
        }
      },
      articles: {
        title: 'Articles',
        subtitle: 'Guides, news, and tactical materials',
        noArticles: 'No articles found',
        featured: 'Featured Articles',
        categories: {
          all: 'All',
          tactics: 'Tactics',
          equipment: 'Equipment',
          news: 'News',
          guides: 'Guides'
        }
      },
      contacts: {
        title: 'Contacts',
        subtitle: 'Get in touch with us',
        form: {
          name: 'Name',
          email: 'Email',
          phone: 'Phone',
          message: 'Message',
          submit: 'Send Message',
          success: 'Message sent successfully',
          error: 'Error sending message'
        },
        info: {
          phone: 'Phone',
          email: 'Email',
          location: 'Location',
          hours: 'Hours'
        }
      },
      about: {
        title: 'About Us',
        subtitle: 'Our mission and values',
        mission: 'Mission',
        history: 'History',
        goals: 'Goals'
      },
      search: {
        title: 'Search',
        placeholder: 'Search for articles, events...',
        noResults: 'No results found',
        results: 'Search Results'
      },
      subscribe: {
        title: 'Subscribe',
        subtitle: 'Stay updated with the latest news',
        email: 'Email',
        submit: 'Subscribe',
        success: 'Successfully subscribed',
        error: 'Subscription error'
      }
    },
    errors: {
      unauthorized: 'Unauthorized access',
      serverError: 'Server error',
      insufficientPermissions: 'Insufficient permissions',
      adminAccessRequired: 'Admin access required',
      passwordMismatch: 'Passwords do not match',
      passwordTooShort: 'Password too short',
      passwordChangeError: 'Error changing password',
      superadminProtected: 'SuperAdmin role is protected',
      lastSuperadmin: 'Cannot remove the last SuperAdmin'
    }
  },
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
      download: 'Завантажити',
      success: 'Успіх'
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
    admin: {
      title: 'Адміністрування',
      dashboard: 'Панель управління',
      dashboardSubtitle: 'Огляд статистики та швидкий доступ до управління',
      articles: 'Статті',
      gallery: 'Галерея',
      events: 'Події',
      team: 'Команда',
      users: 'Користувачі',
      statistics: 'Статистика',
      settings: 'Налаштування',
      manageArticles: 'Керувати статтями',
      createArticle: 'Створити статтю',
      editArticle: 'Редагувати статтю',
      backToArticles: 'Назад до статей',
      saveDraft: 'Зберегти чернетку',
      publish: 'Опублікувати',
      published: 'Опубліковано',
      drafts: 'Чернетки',
      allStatuses: 'Всі статуси',
      allCategories: 'Всі категорії',
      confirmDeleteArticle: 'Ви впевнені, що хочете видалити цю статтю?',
      articleDeleted: 'Статтю видалено успішно',
      articleCreated: 'Статтю створено успішно',
      articleUpdated: 'Статтю оновлено успішно',
      errorFetchingArticles: 'Помилка завантаження статей',
      errorFetchingArticle: 'Помилка завантаження статті',
      errorDeletingArticle: 'Помилка видалення статті',
      errorSavingArticle: 'Помилка збереження статті',
      noArticlesFound: 'Статті не знайдені',
      articleTitle: 'Назва статті',
      preview: 'Попередній перегляд',
      content: 'Зміст',
      category: 'Категорія',
      mainImageUrl: 'URL головного зображення',
      articleSettings: 'Налаштування статті',
      articleTitlePlaceholder: 'Введіть назву статті...',
      articlePreviewPlaceholder: 'Короткий опис статті...',
      imageUrl: 'URL зображення',
      youtubeUrl: 'URL YouTube відео',
      addImage: 'Додати зображення',
      addVideo: 'Додати відео',
      totalArticles: 'Всього статей',
      totalUsers: 'Всього користувачів',
      totalEvents: 'Всього подій',
      totalRegistrations: 'Всього реєстрацій',
      galleryItems: 'Елементи галереї',
      teamMembers: 'Учасники команди',
      admins: 'Адміністратори',
      editors: 'Редактори',
      upcoming: 'Майбутні',
      completed: 'Завершені',
      eventRegistrations: 'Реєстрації на події',
      photosAndVideos: 'Фото та відео',
      activeMembers: 'Активні учасники',
      quickActions: 'Швидкі дії',
      createEvent: 'Створити подію',
      systemInfo: 'Інформація про систему',
      databaseStatus: 'Статус бази даних',
      online: 'Онлайн',
      lastBackup: 'Остання резервна копія',
      automated: 'Автоматично',
      save: 'Зберегти',
      cancel: 'Скасувати',
      unpublish: 'Скасувати публікацію',
      free: 'Безкоштовно',
      unlimited: 'Необмежено',
      registrationOpen: 'Реєстрація відкрита',
      registrationClosed: 'Реєстрацію закрито',
      waitlist: 'Список очікування',
      currency: 'Валюта',
      noArticles: 'Немає статей',
      noGallery: 'Немає елементів галереї'
    },
    categories: {
      tactics: 'Тактика',
      equipment: 'Спорядження',
      news: 'Новини',
      gameReports: 'Звіти з ігор',
      rules: 'Правила'
    },
    auth: {
      login: 'Увійти',
      register: 'Реєстрація',
      logout: 'Вийти',
      pleaseLogin: 'Будь ласка, увійдіть до системи',
      loginDescription: 'Увійдіть до свого облікового запису для доступу до панелі адміністрування',
      email: 'Email',
      password: 'Пароль',
      confirmPassword: 'Підтвердити пароль',
      displayName: 'Ім\'я для відображення',
      resetPassword: 'Відновити пароль',
      forgotPassword: 'Забули пароль?',
      googleLogin: 'Увійти через Google',
      or: 'або',
      loginSuccess: 'Успішний вхід!',
      registerSuccess: 'Реєстрація успішна! Перевірте email для підтвердження.',
      resetPasswordSuccess: 'Лист для відновлення надіслано!',
      emailPlaceholder: 'Введіть ваш email',
      passwordPlaceholder: 'Введіть пароль',
      displayNamePlaceholder: 'Ваше ім\'я',
      confirmPasswordPlaceholder: 'Підтвердіть пароль',
      passwordMismatch: 'Паролі не співпадають',
      error: 'Помилка аутентифікації',
      success: 'Успіх'
    },
    profile: {
      title: 'Профіль',
      notLoggedIn: 'Ви не увійшли до системи',
      settings: 'Налаштування',
      displayName: 'Ім\'я для відображення',
      bio: 'Про себе',
      language: 'Мова',
      notifications: 'Сповіщення',
      updateProfile: 'Оновити профіль',
      updateSuccess: 'Профіль оновлено успішно',
      updateError: 'Помилка оновлення профілю',
      memberSince: 'Учасник з',
      favoriteItems: 'Обрані елементи',
      testResults: 'Результати тестів',
      gameHistory: 'Історія ігор',
      noFavorites: 'Поки немає обраних елементів',
      noTestResults: 'Поки немає результатів тестів',
      noGameHistory: 'Поки немає історії ігор',
      displayNamePlaceholder: 'Введіть ваше ім\'я для відображення',
      bioPlaceholder: 'Розкажіть про себе...',
      notificationsDescription: 'Отримувати сповіщення про нові події та оновлення',
      score: 'Рахунок',
      security: 'Безпека',
      changePassword: 'Змінити пароль',
      newPassword: 'Новий пароль',
      confirmPassword: 'Підтвердити пароль',
      changePasswordDescription: 'Змініть пароль вашого облікового запису',
      passwordChanged: 'Пароль змінено успішно',
      tabs: {
        info: 'Інформація',
        security: 'Безпека',
        favorites: 'Обране',
        tests: 'Тести',
        games: 'Ігри'
      },
      roles: {
        admin: 'Адміністратор',
        editor: 'Редактор',
        user: 'Користувач'
      },
      statuses: {
        pending: 'Очікує',
        approved: 'Схвалено',
        rejected: 'Відхилено',
        cancelled: 'Скасовано'
      }
    },
    games: {
      title: 'НАЙБЛИЖЧІ ІГРИ',
      subtitle: 'Приєднуйтесь до наших тактичних операцій та відчуйте справжній військовий дух',
      registration_closed: 'Реєстрацію закрито',
      join_waitlist: 'Список очікування',
      register: 'Записатися',
      no_upcoming: 'Поки немає запланованих ігор. Завітайте пізніше!',
      cta: {
        question: 'Не знайшли підходящу гру? Запропонуйте свій сценарій!',
        contact: 'ЗВ\'ЯЗАТИСЯ З ОРГАНІЗАТОРАМИ →'
      },
      status: {
        cancelled: 'Скасовано',
        waitlist: 'Очікування',
        full: 'Повна',
        open: 'Відкрито'
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
        featured: 'Рекомендовані статті',
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
    },
    errors: {
      unauthorized: 'Несанкціонований доступ',
      serverError: 'Помилка сервера',
      insufficientPermissions: 'Недостатньо прав',
      adminAccessRequired: 'Потрібен доступ адміністратора або редактора',
      passwordMismatch: 'Паролі не співпадають',
      passwordTooShort: 'Пароль занадто короткий',
      passwordChangeError: 'Помилка зміни пароля',
      superadminProtected: 'Роль SuperAdmin захищена',
      lastSuperadmin: 'Неможливо видалити останнього SuperAdmin'
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
      download: 'Скачать',
      success: 'Успех'
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
    admin: {
      title: 'Администрирование',
      dashboard: 'Панель управления',
      dashboardSubtitle: 'Обзор статистики и быстрый доступ к управлению',
      articles: 'Статьи',
      gallery: 'Галерея',
      events: 'События',
      team: 'Команда',
      users: 'Пользователи',
      statistics: 'Статистика',
      settings: 'Настройки',
      manageArticles: 'Управление статьями',
      createArticle: 'Создать статью',
      editArticle: 'Редактировать статью',
      backToArticles: 'Назад к статьям',
      saveDraft: 'Сохранить черновик',
      publish: 'Опубликовать',
      published: 'Опубликовано',
      drafts: 'Черновики',
      allStatuses: 'Все статусы',
      allCategories: 'Все категории',
      confirmDeleteArticle: 'Вы уверены, что хотите удалить эту статью?',
      articleDeleted: 'Статья удалена успешно',
      articleCreated: 'Статья создана успешно',
      articleUpdated: 'Статья обновлена успешно',
      errorFetchingArticles: 'Ошибка загрузки статей',
      errorFetchingArticle: 'Ошибка загрузки статьи',
      errorDeletingArticle: 'Ошибка удаления статьи',
      errorSavingArticle: 'Ошибка сохранения статьи',
      noArticlesFound: 'Статьи не найдены',
      articleTitle: 'Название статьи',
      preview: 'Предпросмотр',
      content: 'Содержание',
      category: 'Категория',
      mainImageUrl: 'URL главного изображения',
      articleSettings: 'Настройки статьи',
      articleTitlePlaceholder: 'Введите название статьи...',
      articlePreviewPlaceholder: 'Краткое описание статьи...',
      imageUrl: 'URL изображения',
      youtubeUrl: 'URL YouTube видео',
      addImage: 'Добавить изображение',
      addVideo: 'Добавить видео',
      totalArticles: 'Всего статей',
      totalUsers: 'Всего пользователей',
      totalEvents: 'Всего событий',
      totalRegistrations: 'Всего регистраций',
      galleryItems: 'Элементы галереи',
      teamMembers: 'Участники команды',
      admins: 'Администраторы',
      editors: 'Редакторы',
      upcoming: 'Предстоящие',
      completed: 'Завершенные',
      eventRegistrations: 'Регистрации на события',
      photosAndVideos: 'Фото и видео',
      activeMembers: 'Активные участники',
      quickActions: 'Быстрые действия',
      createEvent: 'Создать событие',
      systemInfo: 'Информация о системе',
      databaseStatus: 'Статус базы данных',
      online: 'Онлайн',
      lastBackup: 'Последняя резервная копия',
      automated: 'Автоматически',
      save: 'Сохранить',
      cancel: 'Отменить',
      unpublish: 'Отменить публикацию',
      free: 'Бесплатно',
      unlimited: 'Неограничено',
      registrationOpen: 'Регистрация открыта',
      registrationClosed: 'Регистрация закрыта',
      waitlist: 'Список ожидания',
      currency: 'Валюта',
      noArticles: 'Нет статей',
      noGallery: 'Нет элементов галереи'
    },
    categories: {
      tactics: 'Тактика',
      equipment: 'Снаряжение',
      news: 'Новости',
      gameReports: 'Отчеты с игр',
      rules: 'Правила'
    },
    auth: {
      login: 'Войти',
      register: 'Регистрация',
      logout: 'Выйти',
      pleaseLogin: 'Пожалуйста, войдите в систему',
      loginDescription: 'Войдите в свою учетную запись для доступа к панели администрирования',
      email: 'Email',
      password: 'Пароль',
      confirmPassword: 'Подтвердить пароль',
      displayName: 'Имя для отображения',
      resetPassword: 'Восстановить пароль',
      forgotPassword: 'Забыли пароль?',
      googleLogin: 'Войти через Google',
      or: 'или',
      loginSuccess: 'Успешный вход!',
      registerSuccess: 'Регистрация успешна! Проверьте email для подтверждения.',
      resetPasswordSuccess: 'Письмо для восстановления отправлено!',
      emailPlaceholder: 'Введите ваш email',
      passwordPlaceholder: 'Введите пароль',
      displayNamePlaceholder: 'Ваше имя',
      confirmPasswordPlaceholder: 'Подтвердите пароль',
      passwordMismatch: 'Пароли не совпадают',
      error: 'Ошибка аутентификации',
      success: 'Успех'
    },
    profile: {
      title: 'Профиль',
      notLoggedIn: 'Вы не вошли в систему',
      settings: 'Настройки',
      displayName: 'Имя для отображения',
      bio: 'О себе',
      language: 'Язык',
      notifications: 'Уведомления',
      updateProfile: 'Обновить профиль',
      updateSuccess: 'Профиль обновлен успешно',
      updateError: 'Ошибка обновления профиля',
      memberSince: 'Участник с',
      favoriteItems: 'Избранные элементы',
      testResults: 'Результаты тестов',
      gameHistory: 'История игр',
      noFavorites: 'Пока нет избранных элементов',
      noTestResults: 'Пока нет результатов тестов',
      noGameHistory: 'Пока нет истории игр',
      displayNamePlaceholder: 'Введите ваше имя для отображения',
      bioPlaceholder: 'Расскажите о себе...',
      notificationsDescription: 'Получать уведомления о новых событиях и обновлениях',
      score: 'Счет',
      security: 'Безопасность',
      changePassword: 'Изменить пароль',
      newPassword: 'Новый пароль',
      confirmPassword: 'Подтвердить пароль',
      changePasswordDescription: 'Измените пароль вашей учетной записи',
      passwordChanged: 'Пароль изменен успешно',
      tabs: {
        info: 'Информация',
        security: 'Безопасность',
        favorites: 'Избранное',
        tests: 'Тесты',
        games: 'Игры'
      },
      roles: {
        admin: 'Администратор',
        editor: 'Редактор',
        user: 'Пользователь'
      },
      statuses: {
        pending: 'Ожидает',
        approved: 'Одобрено',
        rejected: 'Отклонено',
        cancelled: 'Отменено'
      }
    },
    games: {
      title: 'БЛИЖАЙШИЕ ИГРЫ',
      subtitle: 'Присоединяйтесь к нашим тактическим операциям и почувствуйте настоящий военный дух',
      registration_closed: 'Регистрация закрыта',
      join_waitlist: 'Список ожидания',
      register: 'Записаться',
      no_upcoming: 'Пока нет запланированных игр. Заходите позже!',
      cta: {
        question: 'Не нашли подходящую игру? Предложите свой сценарий!',
        contact: 'СВЯЗАТЬСЯ С ОРГАНИЗАТОРАМИ →'
      },
      status: {
        cancelled: 'Отменена',
        waitlist: 'Ожидание',
        full: 'Полная',
        open: 'Открыта'
      }
    },
    pages: {
      games: {
        title: 'Ближайшие игры',
        subtitle: 'Календарь страйкбольных событий и сценариев',
        noGames: 'Пока нет запланированных игр', 
        filters: {
          all: 'Все',
          upcoming: 'Предстоящие',
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
        featured: 'Рекомендуемые статьи',
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
    },
    errors: {
      unauthorized: 'Неавторизованный доступ',
      serverError: 'Ошибка сервера',
      insufficientPermissions: 'Недостаточно прав',
      adminAccessRequired: 'Требуется доступ администратора или редактора',
      passwordMismatch: 'Пароли не совпадают',
      passwordTooShort: 'Пароль слишком короткий',
      passwordChangeError: 'Ошибка изменения пароля',
      superadminProtected: 'Роль SuperAdmin защищена',
      lastSuperadmin: 'Нельзя удалить последнего SuperAdmin'
    }
  },
  pl: {
    nav: {
      games: 'Gry',
      team: 'Zespół',
      gallery: 'Galeria',
      articles: 'Artykuły',
      contacts: 'Kontakty',
      about: 'O nas',
      search: 'Szukaj',
      subscribe: 'Subskrypcja'
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
      home: 'Strona główna',
      register: 'Rejestracja',
      subscribe: 'Subskrybuj',
      submit: 'Wyślij',
      cancel: 'Anuluj',
      save: 'Zapisz',
      edit: 'Edytuj',
      delete: 'Usuń',
      view: 'Zobacz',
      share: 'Udostępnij',
      download: 'Pobierz',
      success: 'Sukces'
    },
    hero: {
      title: 'RAVEN STRIKE FORCE',
      subtitle: 'PROFESJONALNY AIRSOFT WE WROCŁAWIU',
      cta: 'Dołącz do zespołu',
      stats: {
        players: 'Graczy',
        gamesPerYear: 'Gier rocznie',
        yearsExperience: 'Lat doświadczenia'
      }
    },
    admin: {
      title: 'Administracja',
      dashboard: 'Panel kontrolny',
      dashboardSubtitle: 'Przegląd statystyk i szybki dostęp do zarządzania',
      articles: 'Artykuły',
      gallery: 'Galeria',
      events: 'Wydarzenia',
      team: 'Zespół',
      users: 'Użytkownicy',
      statistics: 'Statystyki',
      settings: 'Ustawienia',
      manageArticles: 'Zarządzaj artykułami',
      createArticle: 'Utwórz artykuł',
      editArticle: 'Edytuj artykuł',
      backToArticles: 'Powrót do artykułów',
      saveDraft: 'Zapisz szkic',
      publish: 'Publikuj',
      published: 'Opublikowano',
      drafts: 'Szkice',
      allStatuses: 'Wszystkie statusy',
      allCategories: 'Wszystkie kategorie',
      confirmDeleteArticle: 'Czy na pewno chcesz usunąć ten artykuł?',
      articleDeleted: 'Artykuł usunięty pomyślnie',
      articleCreated: 'Artykuł utworzony pomyślnie',
      articleUpdated: 'Artykuł zaktualizowany pomyślnie',
      errorFetchingArticles: 'Błąd pobierania artykułów',
      errorFetchingArticle: 'Błąd pobierania artykułu',
      errorDeletingArticle: 'Błąd usuwania artykułu',
      errorSavingArticle: 'Błąd zapisywania artykułu',
      noArticlesFound: 'Nie znaleziono artykułów',
      articleTitle: 'Tytuł artykułu',
      preview: 'Podgląd',
      content: 'Zawartość',
      category: 'Kategoria',
      mainImageUrl: 'URL głównego obrazu',
      articleSettings: 'Ustawienia artykułu',
      articleTitlePlaceholder: 'Wprowadź tytuł artykułu...',
      articlePreviewPlaceholder: 'Krótki opis artykułu...',
      imageUrl: 'URL obrazu',
      youtubeUrl: 'URL video YouTube',
      addImage: 'Dodaj obraz',
      addVideo: 'Dodaj video',
      totalArticles: 'Wszystkich artykułów',
      totalUsers: 'Wszystkich użytkowników',
      totalEvents: 'Wszystkich wydarzeń',
      totalRegistrations: 'Wszystkich rejestracji',
      galleryItems: 'Elementy galerii',
      teamMembers: 'Członkowie zespołu',
      admins: 'Administratorzy',
      editors: 'Redaktorzy',
      upcoming: 'Nadchodzące',
      completed: 'Zakończone',
      eventRegistrations: 'Rejestracje wydarzeń',
      photosAndVideos: 'Zdjęcia i filmy',
      activeMembers: 'Aktywni członkowie',
      quickActions: 'Szybkie akcje',
      createEvent: 'Utwórz wydarzenie',
      systemInfo: 'Informacje o systemie',
      databaseStatus: 'Status bazy danych',
      online: 'Online',
      lastBackup: 'Ostatnia kopia zapasowa',
      automated: 'Automatyczna',
      save: 'Zapisz',
      cancel: 'Anuluj', 
      unpublish: 'Cofnij publikację',
      free: 'Darmowe',
      unlimited: 'Nieograniczone',
      registrationOpen: 'Rejestracja otwarta',
      registrationClosed: 'Rejestracja zamknięta',
      waitlist: 'Lista oczekujących',
      currency: 'Waluta',
      noArticles: 'Brak artykułów',
      noGallery: 'Brak elementów galerii'
    },
    categories: {
      tactics: 'Taktyka',
      equipment: 'Sprzęt',
      news: 'Aktualności',
      gameReports: 'Raporty z gier',
      rules: 'Zasady'
    },
    auth: {
      login: 'Zaloguj się',
      register: 'Rejestracja',
      logout: 'Wyloguj się',
      pleaseLogin: 'Proszę się zalogować',
      loginDescription: 'Zaloguj się na swoje konto, aby uzyskać dostęp do panelu administracyjnego',
      email: 'Email',
      password: 'Hasło',
      confirmPassword: 'Potwierdź hasło',
      displayName: 'Nazwa wyświetlana',
      resetPassword: 'Resetuj hasło',
      forgotPassword: 'Zapomniałeś hasła?',
      googleLogin: 'Zaloguj się przez Google',
      or: 'lub',
      loginSuccess: 'Pomyślnie zalogowano!',
      registerSuccess: 'Rejestracja pomyślna! Sprawdź email w celu potwierdzenia.',
      resetPasswordSuccess: 'Link do resetowania hasła został wysłany!',
      emailPlaceholder: 'Wprowadź swój email',
      passwordPlaceholder: 'Wprowadź hasło',
      displayNamePlaceholder: 'Twoje imię',
      confirmPasswordPlaceholder: 'Potwierdź hasło',
      passwordMismatch: 'Hasła nie pasują',
      error: 'Błąd uwierzytelniania',
      success: 'Sukces'
    },
    profile: {
      title: 'Profil',
      notLoggedIn: 'Nie jesteś zalogowany',
      settings: 'Ustawienia',
      displayName: 'Nazwa wyświetlana',
      bio: 'O sobie',
      language: 'Język',
      notifications: 'Powiadomienia',
      updateProfile: 'Zaktualizuj profil',
      updateSuccess: 'Profil zaktualizowany pomyślnie',
      updateError: 'Błąd aktualizacji profilu',
      memberSince: 'Członek od',
      favoriteItems: 'Ulubione elementy',
      testResults: 'Wyniki testów',
      gameHistory: 'Historia gier',
      noFavorites: 'Brak ulubionych elementów',
      noTestResults: 'Brak wyników testów',
      noGameHistory: 'Brak historii gier',
      displayNamePlaceholder: 'Wprowadź swoją nazwę wyświetlaną',
      bioPlaceholder: 'Opowiedz o sobie...',
      notificationsDescription: 'Otrzymuj powiadomienia o nowych wydarzeniach i aktualizacjach',
      score: 'Wynik',
      security: 'Bezpieczeństwo',
      changePassword: 'Zmień hasło',
      newPassword: 'Nowe hasło',
      confirmPassword: 'Potwierdź hasło',
      changePasswordDescription: 'Zmień hasło swojego konta',
      passwordChanged: 'Hasło zmieniono pomyślnie',
      tabs: {
        info: 'Informacje',
        security: 'Bezpieczeństwo',
        favorites: 'Ulubione',
        tests: 'Testy',
        games: 'Gry'
      },
      roles: {
        admin: 'Administrator',
        editor: 'Redaktor',
        user: 'Użytkownik'
      },
      statuses: {
        pending: 'Oczekujący',
        approved: 'Zatwierdzony',
        rejected: 'Odrzucony',
        cancelled: 'Anulowany'
      }
    },
    games: {
      title: 'NADCHODZĄCE GRY',
      subtitle: 'Dołącz do naszych operacji taktycznych i poczuj prawdziwego ducha wojskowego',
      registration_closed: 'Rejestracja zamknięta',
      join_waitlist: 'Lista oczekujących',
      register: 'Zapisz się',
      no_upcoming: 'Brak zaplanowanych gier. Sprawdź ponownie wkrótce!',
      cta: {
        question: 'Nie znalazłeś odpowiedniej gry? Zaproponuj własny scenariusz!',
        contact: 'SKONTAKTUJ SIĘ Z ORGANIZATORAMI →'
      },
      status: {
        cancelled: 'Anulowana',
        waitlist: 'Lista oczekujących',
        full: 'Pełna',
        open: 'Otwarta'
      }
    },
    pages: {
      games: {
        title: 'Nadchodzące gry',
        subtitle: 'Kalendarz wydarzeń airsoftowych i scenariuszy',
        noGames: 'Brak zaplanowanych gier',
        filters: {
          all: 'Wszystkie',
          upcoming: 'Nadchodzące',
          past: 'Przeszłe',
          registration: 'Rejestracja otwarta'
        }
      },
      team: {
        title: 'Nasz zespół',
        subtitle: 'Profesjonalni gracze Raven Strike Force',
        noMembers: 'Informacje o zespole niedostępne'
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
        subtitle: 'Porady, przewodniki i wiadomości ze świata airsoftu',
        noArticles: 'Nie znaleziono artykułów',
        featured: 'Polecane artykuły',
        categories: {
          all: 'Wszystkie',
          tactics: 'Taktyka',
          equipment: 'Sprzęt',
          news: 'Aktualności',
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
        history: 'Historia zespołu',
        goals: 'Nasze cele'
      },
      search: {
        title: 'Wyszukiwanie',
        placeholder: 'Szukaj artykułów, gier, uczestników...',
        noResults: 'Nie znaleziono wyników',
        results: 'Wyniki wyszukiwania'
      },
      subscribe: {
        title: 'Subskrypcja wiadomości',
        subtitle: 'Otrzymuj informacje o nowych grach i wydarzeniach',
        email: 'Adres email',
        submit: 'Subskrybuj',
        success: 'Subskrypcja została pomyślnie utworzona!',
        error: 'Błąd tworzenia subskrypcji'
      }
    },
    errors: {
      unauthorized: 'Nieautoryzowany dostęp',
      serverError: 'Błąd serwera',
      insufficientPermissions: 'Niewystarczające uprawnienia',
      adminAccessRequired: 'Wymagany dostęp administratora lub redaktora',
      passwordMismatch: 'Hasła nie pasują',
      passwordTooShort: 'Hasło jest za krótkie',
      passwordChangeError: 'Błąd zmiany hasła',
      superadminProtected: 'Rola SuperAdmin jest chroniona',
      lastSuperadmin: 'Nie można usunąć ostatniego SuperAdmin'
    }
  }
};

export const languages = [
  { code: 'uk' as Language, name: 'Українська', flag: '🇺🇦' },
  { code: 'ru' as Language, name: 'Русский', flag: '🇷🇺' },
  { code: 'pl' as Language, name: 'Polski', flag: '🇵🇱' },
  { code: 'en' as Language, name: 'English', flag: '🇺🇸' }
];