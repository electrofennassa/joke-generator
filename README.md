# Joke Generator 🎭

A modern, interactive random joke generator application built with React, TypeScript, and Vite. Fetches jokes from multiple APIs and provides a beautiful, responsive UI.

## ✨ Features

- 🎲 **Multiple Joke APIs** - Support for different joke sources
- 💾 **Local Storage** - Save your favorite jokes
- 🌙 **Dark/Light Mode** - Theme toggle for comfortable viewing
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile
- ⚡ **Fast & Lightweight** - Built with Vite for optimal performance
- 🎨 **Beautiful UI** - Modern design with Tailwind CSS
- 🔄 **Loading States** - Smooth loading indicators
- ❌ **Error Handling** - Graceful error management
- 📊 **Statistics** - Track jokes viewed and favorites
- 🎯 **Category Filter** - Filter jokes by category

## 🚀 Quick Start

### Prerequisites

- Node.js >= 16.x
- npm >= 8.x or yarn >= 1.22.x
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/electrofennassa/joke-generator.git
cd joke-generator

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📦 Available Scripts

```bash
# Development
npm run dev              # Start dev server

# Build
npm run build            # Build for production
npm run preview          # Preview production build

# Code Quality
npm run lint             # Run ESLint
npm run type-check       # Check TypeScript types
```

## 🏗️ Project Structure

```
.
├── src/
│   ├── components/
│   │   ├── ui/                  # Reusable UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Badge.tsx
│   │   │   └── Loading.tsx
│   │   ├── layout/              # Layout components
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Container.tsx
│   │   └── features/            # Feature components
│   │       ├── JokeDisplay.tsx
│   │       ├── JokeControls.tsx
│   │       ├── FavoritesList.tsx
│   │       ├── Statistics.tsx
│   │       └── CategoryFilter.tsx
│   ├── api/
│   │   └── jokeService.ts       # API services
│   ├── hooks/
│   │   ├── useJoke.ts
│   │   ├── useLocalStorage.ts
│   │   └── useTheme.ts
│   ├── store/
│   │   └── jokeStore.ts         # Zustand store
│   ├── types/
│   │   └── index.ts             # TypeScript types
│   ├── constants/
│   │   └── index.ts             # App constants
│   ├── utils/
│   │   └── formatters.ts        # Utility functions
│   ├── styles/
│   │   └── globals.css          # Global styles
│   ├── App.tsx                  # Root component
│   └── index.tsx                # Entry point
├── public/                      # Static assets
├── .env.example                 # Environment variables template
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## 🔌 Supported Joke APIs

1. **JokeAPI** - [https://jokeapi.dev/](https://jokeapi.dev/)
   - Multiple categories (Programming, Knock-knock, etc.)
   - Setup/Delivery format

2. **Official Joke API** - [https://official-joke-api.appspot.com/](https://official-joke-api.appspot.com/)
   - Simple format
   - Random jokes

3. **Random Useless Facts** - [https://uselessfacts.jsoup.com/](https://uselessfacts.jsoup.com/)
   - Fun facts as alternative content

## 💾 Local Storage

The app automatically saves:
- ✅ Favorite jokes
- ✅ View history
- ✅ User preferences (theme, category)
- ✅ Statistics (total viewed, favorites count)

## 🎨 Customization

### Change Theme Colors

Edit `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: '#your-color',
      secondary: '#your-color',
    },
  },
}
```

### Add New Joke Source

Edit `src/api/jokeService.ts` and add your API endpoint.

## 🔐 Environment Variables

```bash
cp .env.example .env
```

```env
VITE_API_TIMEOUT=10000
VITE_MAX_RETRIES=3
```

## 📱 Features Detail

### Get Random Joke
- Click "Get Random Joke" button
- Automatically fetches from selected API
- Shows loading indicator
- Handles errors gracefully

### Save to Favorites
- Click heart icon to save joke
- Stored in browser's local storage
- Instantly added to favorites list

### View Favorites
- Access favorites tab
- Remove individual jokes
- Clear all favorites
- Export favorites as JSON

### Filter by Category
- Select category from dropdown
- Automatically fetches jokes from that category
- Saves selection to local storage

### Statistics
- Track total jokes viewed
- Count of favorite jokes
- Last joke fetched time
- API response times

## 🚀 Deployment

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

### Deploy to Netlify

```bash
npm run build
# Drag and drop the 'dist' folder to Netlify
```

### Deploy to GitHub Pages

```bash
npm run build
git add dist/
git commit -m "Deploy to GitHub Pages"
git push origin main
```

## 🐛 Troubleshooting

### API Rate Limiting
- Most APIs have rate limits
- The app implements exponential backoff
- Wait a few seconds before retrying

### Local Storage Not Working
- Check browser's localStorage is enabled
- Clear browser cache and cookies
- Check developer console for errors

### Styling Issues
- Run `npm install` to ensure all dependencies are installed
- Clear browser cache
- Rebuild the project: `npm run build`

## 📚 Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **State Management**: Zustand
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Date Formatting**: date-fns

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For questions or issues:
- Open an issue on GitHub
- Contact: electro_fennassa@proton.me

---

**Made with ❤️ by Electro Fennassa**
