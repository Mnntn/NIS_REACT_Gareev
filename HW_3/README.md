# 🛒 HW_3 — E-commerce Admin Panel

## 👨‍💻 Автор

**Гареев Данир Фанзилович БПИ-236**
Telegram: [@manntion](https://t.me/manntion)

---

## 📌 Описание проекта

SPA административная панель для e-commerce системы, реализованная на React + TypeScript + Redux Toolkit + RTK Query.

Основные возможности:

- аутентификация и авторизация (DummyJSON API);
- защищённые маршруты (redirect неавторизованных на `/login`);
- каталог продуктов с поиском и пагинацией;
- детальная страница продукта;
- профиль пользователя;
- настройки приложения (язык, тема, размер страницы);
- интернационализация (русский / английский);
- светлая / тёмная тема.

---

## 🧩 Логика реализации

### Архитектура (Feature Sliced Design)

```
src/
├── app/                    # Инициализация приложения
│   ├── store.ts           # Redux store
│   └── router.tsx         # Маршрутизация
├── pages/                 # Страницы приложения
│   ├── auth/              # Авторизация / Регистрация
│   ├── dashboard/         # Главная страница
│   ├── products/          # Список продуктов
│   ├── product-detail/    # Детальная страница
│   ├── profile/           # Профиль
│   ├── settings/          # Настройки
│   └── not-found/         # 404
├── widgets/               # Композитные блоки
│   ├── header/            # Шапка
│   ├── sidebar/           # Боковое меню
│   └── layout/            # Layout
├── features/              # Функциональные блоки
│   └── settings/          # Слайс настроек
├── entities/              # Бизнес-сущности
│   ├── user/              # Пользователь
│   └── product/           # Продукт
└── shared/                # Переиспользуемый код
    ├── api/               # API конфигурация
    ├── i18n/              # Интернационализация
    ├── lib/               # Утилиты, хуки
    ├── ui/                # UI компоненты
    └── types/             # TypeScript типы
```

### Основные компоненты

#### `app/store.ts`

Redux store:

- слайс `auth` — данные пользователя, токен, состояние аутентификации;
- слайс `settings` — язык, тема, размер страницы;
- RTK Query API — кэширование запросов.

#### `app/router.tsx`

Маршрутизация:

- публичные: `/login`, `/register`;
- приватные: `/`, `/products`, `/products/:id`, `/profile`, `/settings`, `/logout`;
- `ProtectedRoute` — redirect неавторизованных на `/login`.

#### `entities/user/model/userSlice.ts`

Аутентификация:

- `login` — thunk для POST `/auth/login`;
- `getCurrentUser` — thunk для GET `/auth/me`;
- `logout` — очистка состояния и localStorage.

#### `entities/product/model/productApi.ts`

RTK Query API:

- `getProducts` — список продуктов (с пагинацией и поиском);
- `getProductById` — продукт по ID;
- `getCategories` — список категорий.

#### `features/settings/model/settingsSlice.ts`

Настройки:

- `setLanguage` — смена языка (en/ru);
- `setTheme` — смена темы (light/dark);
- `setPageSize` — продуктов на странице (5/10/20/50);
- сохранение в localStorage.

#### `widgets/layout/Layout.tsx`

Общий layout для приватной части:

- `Header` — шапка с навигацией и переключением темы;
- `Sidebar` — боковое меню;
- `Outlet` — рендеринг дочерних маршрутов.

---

## 🧠 Алгоритмы

**Аутентификация:**

```ts
const login = createAsyncThunk('auth/login', async ({ username, password }) => {
  const response = await fetch('https://dummyjson.com/auth/login', {
    method: 'POST',
    body: JSON.stringify({ username, password, expiresInMins: 60 }),
  });
  return response.json();
});
```

**Пагинация:**

```ts
const { data } = useGetProductsQuery({
  limit: pageSize,
  skip: currentPage * pageSize,
  search: searchTerm,
});
```

**Переключение темы:**

```ts
setTheme(theme === 'light' ? 'dark' : 'light');
document.documentElement.setAttribute('data-theme', theme);
```

**Интернационализация:**

```ts
i18n.changeLanguage(lang); // ru/en без перезагрузки
```

---

## 🧱 Типизация

```ts
export type User = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
};

export type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
};

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface SettingsState {
  language: 'en' | 'ru';
  theme: 'light' | 'dark';
  pageSize: number;
}
```

---

## ⚙️ Установка и запуск

```bash
# Установка зависимостей
npm install

# Запуск в dev-режиме
npm run dev

# Сборка для продакшена
npm run build

# Проверка типов
npm run type-check
```

После запуска: **[http://localhost:5173](http://localhost:5173)**

---

## 🔐 Тестовые учётные данные

Приложение использует [DummyJSON API](https://dummyjson.com/docs):


| Username | Password    |
| -------- | ----------- |
| emilys   | emilyspass  |


---

## 📄 Маршруты

### Публичные

- `/login` — авторизация
- `/register` — регистрация (заглушка)

### Приватные

- `/` — Dashboard
- `/products` — каталог продуктов
- `/products/:id` — страница продукта
- `/profile` — профиль пользователя
- `/settings` — настройки
- `/logout` — выход
- `*` — 404

---

## 🌐 Интернационализация

Переводы хранятся в JSON-файлах:

- `src/shared/i18n/locales/en/translation.json`
- `src/shared/i18n/locales/ru/translation.json`

Переключение языка:

- через настройки приложения;
- без перезагрузки страницы.

---

## 🎨 Темы

- **Light** — светлая тема (по умолчанию)
- **Dark** — тёмная тема

Переключение:

- через настройки;
- через иконку в хедере;
- сохранение в localStorage.

---

