# Modern Navbar Component

Современный компонент навигации, созданный с использованием Headless UI и Tailwind CSS, следуя лучшим практикам Tailwind UI.

## Особенности

### ✨ Современный дизайн
- Стеклянный эффект с backdrop-blur
- Плавные анимации и переходы
- Адаптивный дизайн для всех устройств
- Поддержка темной темы

### 🎯 Функциональность
- Полностью функциональное мобильное меню
- Интеграция с системой аутентификации
- Поддержка многоязычности
- Роли пользователей (admin, editor, superadmin)
- Анимированные индикаторы активных ссылок

### 🛠 Технологии
- **Headless UI** - для доступности и управления состоянием
- **Tailwind CSS** - для стилизации
- **Radix UI** - для компонентов (Dropdown, Avatar)
- **Lucide React** - для иконок
- **React Router** - для навигации

## Использование

### Базовое использование

```tsx
import ModernNavbar from '@/components/ModernNavbar';

function App() {
  return (
    <div>
      <ModernNavbar />
      {/* Остальной контент */}
    </div>
  );
}
```

### Интеграция с существующим Header

```tsx
// src/components/Header.tsx
import ModernNavbar from '@/components/ModernNavbar';

const Header = () => {
  return <ModernNavbar />;
};

export default Header;
```

## Компоненты

### ModernNavbar
Основной компонент навигации с полным функционалом.

**Props:** Нет (использует контексты для получения данных)

**Контексты:**
- `useI18n()` - для переводов
- `useAuth()` - для аутентификации
- `useBranding()` - для настроек брендинга

### NavbarShowcase
Демонстрационный компонент с различными стилями навигации.

**Включает:**
- MinimalNavbar - минималистичный стиль
- SearchNavbar - с поиском и уведомлениями
- DarkNavbar - темная тема
- GradientNavbar - градиентный фон

## Стили и анимации

### Анимации
- **Hover эффекты** - плавные переходы цветов
- **Active индикаторы** - анимированные подчеркивания
- **Мобильное меню** - плавное появление с задержкой
- **Логотип** - эффекты при наведении

### CSS классы
```css
/* Стеклянный эффект */
.glass-panel {
  backdrop-blur-md;
  bg-white/80;
  dark:bg-gray-900/80;
}

/* Анимированные ссылки */
.group-hover:scale-x-100 {
  transition-transform duration-300 origin-left;
}

/* Плавные переходы */
.transition-all duration-300 {
  transition: all 300ms ease;
}
```

## Адаптивность

### Desktop (lg:)
- Полная навигация в горизонтальном меню
- Dropdown для пользователя
- Поиск и уведомления

### Mobile (< lg)
- Гамбургер меню
- Вертикальная навигация
- Полноэкранное мобильное меню

## Доступность

- **ARIA атрибуты** - правильная семантика
- **Клавиатурная навигация** - поддержка Tab/Enter
- **Screen readers** - скрытые подписи
- **Focus management** - правильное управление фокусом

## Кастомизация

### Цвета
Используйте CSS переменные для изменения цветовой схемы:

```css
:root {
  --primary: 220 14.3% 95.9%;
  --primary-foreground: 220.9 39.3% 11%;
  --foreground: 220 13% 9%;
  --muted-foreground: 220 8.9% 46.1%;
}
```

### Размеры
```css
/* Высота навигации */
.h-20 { height: 5rem; }

/* Отступы */
.px-4 { padding-left: 1rem; padding-right: 1rem; }
```

## Примеры использования

### 1. Минималистичный стиль
```tsx
<MinimalNavbar />
```

### 2. С поиском
```tsx
<SearchNavbar />
```

### 3. Темная тема
```tsx
<DarkNavbar />
```

### 4. Градиентный фон
```tsx
<GradientNavbar />
```

## Демо страница

Для просмотра всех стилей навигации, перейдите на `/navbar-demo` или используйте компонент `NavbarShowcase`.

## Зависимости

```json
{
  "@headlessui/react": "^1.7.19",
  "@radix-ui/react-avatar": "^1.0.4",
  "@radix-ui/react-dropdown-menu": "^2.0.6",
  "lucide-react": "^0.263.1",
  "tailwindcss": "^3.3.0"
}
```

## Браузерная поддержка

- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

## Лицензия

MIT License
