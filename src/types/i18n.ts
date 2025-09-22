export type Language = 'uk' | 'ru' | 'pl';

export interface LanguageOption {
  code: Language;
  name: string;
  flag: string;
}

export interface NavigationItem {
  label: string;
  path: string;
}

export interface Translations {
  nav: {
    games: string;
    team: string;
    gallery: string;
    articles: string;
    contacts: string;
    about: string;
    search: string;
    subscribe: string;
  };
  common: {
    readMore: string;
    loadMore: string;
    loading: string;
    error: string;
    notFound: string;
    back: string;
    next: string;
    previous: string;
    home: string;
    register: string;
    subscribe: string;
    submit: string;
    cancel: string;
    save: string;
    edit: string;
    delete: string;
    view: string;
    share: string;
    download: string;
  };
  hero: {
    title: string;
    subtitle: string;
    cta: string;
    stats: {
      players: string;
      gamesPerYear: string;
      yearsExperience: string;
    };
  };
  pages: {
    games: {
      title: string;
      subtitle: string;
      noGames: string;
      filters: {
        all: string;
        upcoming: string;
        past: string;
        registration: string;
      };
    };
    team: {
      title: string;
      subtitle: string;
      noMembers: string;
    };
    gallery: {
      title: string;
      subtitle: string;
      noMedia: string;
      filters: {
        all: string;
        photos: string;
        videos: string;
      };
    };
    articles: {
      title: string;
      subtitle: string;
      noArticles: string;
      categories: {
        all: string;
        tactics: string;
        equipment: string;
        news: string;
        guides: string;
      };
    };
    contacts: {
      title: string;
      subtitle: string;
      form: {
        name: string;
        email: string;
        phone: string;
        message: string;
        submit: string;
        success: string;
        error: string;
      };
      info: {
        phone: string;
        email: string;
        location: string;
        hours: string;
      };
    };
    about: {
      title: string;
      subtitle: string;
      mission: string;
      history: string;
      goals: string;
    };
    search: {
      title: string;
      placeholder: string;
      noResults: string;
      results: string;
    };
    subscribe: {
      title: string;
      subtitle: string;
      email: string;
      submit: string;
      success: string;
      error: string;
    };
  };
}