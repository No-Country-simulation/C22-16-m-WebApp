# Estructura de directorios del proyecto
my-react-app/
├── public/
│   └── favicon.ico
├── src/
│   ├── assets/                 # Archivos estáticos como imágenes o fuentes
│   │   └── react.svg
│   ├── components/             # Componentes reutilizables
│   │   ├── common/
│   │   │   ├── Button.tsx
│   │   │   └── Typography.tsx
│   │   └── layout/             # Diseños de página (header, footer, sidebar)
│   │       ├── Header.tsx
│   │       └── Footer.tsx
│   ├── hooks/                  # Custom hooks
│   │   └── useCustomHook.ts
│   ├── pages/                  # Páginas principales de la aplicación
│   │   ├── Home.tsx
│   │   ├── About.tsx
│   │   └── NotFound.tsx
│   ├── routes/                 # Configuración de rutas
│   │   └── AppRoutes.tsx
│   ├── services/               # Servicios de API o lógica de negocio
│   │   └── api.ts
│   ├── store/                  # Redux
│   │   ├── index.ts
│   │   └── slices/
│   │       └── exampleSlice.ts
│   ├── styles/                 # Archivos CSS personalizados
│   │   └── index.css
│   ├── types/                  # Tipos y definiciones de TypeScript
│   │   └── index.ts
│   ├── utils/                  # Utilidades y funciones de ayuda
│   │   └── helpers.ts
│   ├── App.tsx
│   └── main.tsx
├── .eslintrc.cjs
├── .gitignore
├── index.html
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts