# Vite React TypeScript Project

A modern, clean boilerplate for building web applications with React, TypeScript, and Vite.

## 🚀 Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool & dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router v7** - Client-side routing
- **ESLint** - Code quality

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── navbar/         # Navigation bar component
│   ├── footer/         # Footer component
│   └── ...             # Add more components here
├── pages/              # Page components
│   └── HomePage.tsx    # Home page
├── hooks/              # Custom React hooks & Context
│   └── Context.tsx     # App context provider
├── services/           # API calls & external services
├── constants/          # Constants, types, and configurations
├── styles/             # Global styles
├── assets/             # Static files (images, icons)
├── routes/             # Route protection & configuration
├── App.tsx            # Main app component
├── main.tsx           # App entry point
└── index.css          # Global styles
```

## 🏃 Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

### Build

```bash
npm run build
```

### Lint

```bash
npm run lint
```

## 📝 Development Guidelines

1. **Components**: Keep components small and focused. Use a folder for each component if it has multiple files.
2. **Types**: Define all TypeScript interfaces in `constants/constants.ts` or component-specific type files.
3. **Styles**: Use Tailwind CSS for styling. Avoid inline styles when possible.
4. **API Calls**: Put all API logic in the `services/` folder.
5. **State Management**: Use Context API for global state (defined in `hooks/Context.tsx`).

## 🔧 Configuration Files

- `vite.config.ts` - Vite configuration
- `tsconfig.json` - TypeScript configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `eslint.config.js` - ESLint configuration

## 📦 Dependencies

See `package.json` for the complete list of dependencies and versions.

## 🤝 Contributing

Feel free to fork this project and use it as a starting template for your applications.

## 📄 License

This project is open source and available under the MIT License.
