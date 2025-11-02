# Yur Chakra 💎

A modern, elegant e-commerce website for handcrafted crystal jewellery. Built with React, TypeScript, and Vite, this project showcases chakra-aligned crystal pieces with a focus on balance, healing, and inner peace.

![Yur Chakra](https://img.shields.io/badge/Status-Active-success)
![License](https://img.shields.io/badge/License-MIT-blue)
![React](https://img.shields.io/badge/React-19.1-61dafb)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178c6)

## ✨ Features

- 🛍️ **Modern E-commerce Interface** - Clean, responsive design for browsing and purchasing crystal jewellery
- 🔮 **Chakra Meanings Page** - Educational content about the seven chakras and their associated crystals
- 🛒 **Shopping Cart** - Full cart functionality with localStorage persistence
- 🧘 **Smart Recommendations** - Chakra-based product recommendations in cart
- 🎨 **Responsive Design** - Mobile-first approach with seamless desktop experience
- ♿ **Accessibility** - ARIA labels, semantic HTML, and keyboard navigation
- 🔍 **Advanced Filtering** - Sort by price, newest, and filter by crystal type
- ⚡ **Fast Performance** - Built with Vite for lightning-fast development and builds
- 🎯 **Type Safety** - Fully typed with TypeScript for robust code

## 🚀 Tech Stack

- **Frontend Framework**: [React 19](https://react.dev/)
- **Type System**: [TypeScript 5.9](https://www.typescriptlang.org/)
- **Build Tool**: [Vite 7](https://vitejs.dev/)
- **Routing**: [React Router 7](https://reactrouter.com/)
- **State Management**: Context API with hooks
- **Styling**: Custom CSS with CSS variables
- **Linting**: ESLint with TypeScript support
- **Deployment**: GitHub Pages

## 📦 Project Structure

```
yur_chakra/
├── public/              # Static assets
│   └── images/         # Product and chakra images
├── src/
│   ├── assets/         # Logo and other assets
│   ├── components/     # Reusable React components
│   │   ├── Cards.tsx
│   │   ├── FeaturedCollection.tsx
│   │   ├── Hero.tsx
│   │   ├── Icon.tsx
│   │   ├── Navbar.tsx
│   │   ├── ScrollShowcase.tsx
│   │   └── ShopCards.tsx
│   ├── context/        # React Context providers
│   │   └── CartContext.tsx
│   ├── data/           # Product data
│   │   └── ShopProducts.ts
│   ├── Pages/          # Page components
│   │   ├── About.tsx
│   │   ├── Cart.tsx
│   │   ├── ChakraMeanings.tsx
│   │   ├── Product.tsx
│   │   └── Shop.tsx
│   ├── styles/         # Component-specific styles
│   ├── utils/          # Utility functions
│   │   └── chakraRecs.ts
│   ├── App.tsx         # Main app component
│   └── main.tsx        # Entry point
├── .env.example        # Environment variables template
├── .gitignore
├── eslint.config.js    # ESLint configuration
├── index.html          # HTML entry point
├── package.json
├── tsconfig.json       # TypeScript configuration
└── vite.config.ts      # Vite configuration
```

## 🛠️ Installation & Setup

### Prerequisites

- Node.js 18+ and npm

### Clone the Repository

```bash
git clone https://github.com/OSMERON/yur_chakra.git
cd yur_chakra
```

### Install Dependencies

```bash
npm install
```

### Environment Variables (Optional)

Copy `.env.example` to `.env` if you need to configure environment variables:

```bash
cp .env.example .env
```

## 🎮 Development

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## 🏗️ Build

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## 🚢 Deployment

This project is configured for GitHub Pages deployment.

### Deploy to GitHub Pages

```bash
npm run deploy
```

This will:
1. Build the production version
2. Deploy to the `gh-pages` branch
3. Make it available at `https://osmeron.github.io/yur_chakra/`

### Manual Deployment

```bash
npm run build
# Upload the `dist` folder to your hosting provider
```

## 🧪 Code Quality

### Linting

Run ESLint to check code quality:

```bash
npm run lint
```

### Type Checking

TypeScript type checking is integrated into the build process:

```bash
npm run build
```

## 🎨 Key Features Explained

### Cart Context

The shopping cart uses React Context API for global state management with:
- Add/remove items
- Quantity updates
- Persistent storage (localStorage)
- Real-time cart count in navbar

### Chakra Recommendations

The cart page analyzes items and recommends complementary crystals based on:
- Chakra associations
- Crystal properties
- User's current selections

### Smart Product Filtering

Shop page supports:
- Crystal type filtering via URL params
- Multiple sort options (featured, price, newest)
- Auto-generated "New" badges
- Custom badges (Bestseller, etc.)

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🐛 Known Issues & Roadmap

- [ ] Add automated tests (Vitest + React Testing Library)
- [ ] Implement actual checkout functionality
- [ ] Add product reviews and ratings
- [ ] Integrate with a backend API
- [ ] Add wishlist feature
- [ ] Implement user authentication
- [ ] Add product image gallery/zoom
- [ ] Create custom favicon

## 📞 Contact & Support

- **GitHub**: [@OSMERON](https://github.com/OSMERON)
- **Website**: [Live Demo](https://osmeron.github.io/yur_chakra/)

## 🙏 Acknowledgments

- Crystal images and descriptions for educational purposes
- React and Vite communities for excellent documentation
- Open source contributors

---

**Made with ❤️ and ⚡ by OSMERON**

