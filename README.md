# Cognify 🧠

**AI-Powered Interactive Decision Trees**

Cognify helps you navigate complex decisions with intelligent guidance. Built with React, Vite, and powered by Claude AI, it provides an interactive way to explore decision paths and get smart recommendations.

![Cognify Banner](https://img.shields.io/badge/React-19.2-blue) ![Vite](https://img.shields.io/badge/Vite-7.2-purple) ![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-cyan)

## ✨ Features

- 🤖 **AI-Powered Insights**: Get intelligent suggestions and analysis at every decision point
- 🎯 **Interactive Decision Trees**: Navigate complex choices with a beautiful, intuitive interface
- 📊 **Path Visualization**: See your decision journey and backtrack when needed
- 💡 **Smart Recommendations**: Receive actionable next steps based on your choices
- 🎨 **Modern UI**: Clean, responsive design with smooth animations
- 🔒 **Privacy-First**: API keys stored locally, no data sent to external servers

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ and npm
- (Optional) Anthropic API key for AI features

### Installation

1. Clone the repository:
```bash
git clone https://github.com/fidoster/cognify.git
cd cognify
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:5173`

### Building for Production

```bash
npm run build
npm run preview
```

## 🔑 AI Configuration

To enable AI-powered insights:

1. Get an API key from [Anthropic Console](https://console.anthropic.com/)
2. Click the settings icon (⚙️) in the top-right corner
3. Enter your API key
4. Enjoy intelligent decision guidance!

**Note**: Your API key is stored locally in your browser and never sent to our servers.

## 🎯 Available Decision Trees

### Career Path Finder
Discover your ideal career direction based on your interests and strengths.

### Tech Stack Chooser
Find the perfect technology stack for your next project.

### Bug Troubleshooter
Systematic approach to debugging and problem-solving.

## 🛠️ Tech Stack

- **Frontend**: React 19.2
- **Build Tool**: Vite 7.2
- **Styling**: Tailwind CSS
- **AI**: Anthropic Claude API
- **Icons**: Lucide React

## 📁 Project Structure

```
cognify/
├── src/
│   ├── components/         # React components
│   │   ├── Home.jsx       # Landing page
│   │   ├── DecisionTreeView.jsx
│   │   ├── NodeView.jsx
│   │   ├── ResultView.jsx
│   │   ├── AIInsights.jsx
│   │   ├── DecisionPath.jsx
│   │   └── APIConfig.jsx
│   ├── services/          # Service layer
│   │   └── aiService.js   # AI integration
│   ├── data/              # Data structures
│   │   └── decisionTrees.js
│   ├── App.jsx            # Main app component
│   ├── main.jsx           # Entry point
│   └── index.css          # Global styles
├── public/                # Static assets
├── index.html
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## 🎨 Customization

### Adding Your Own Decision Tree

Edit `src/data/decisionTrees.js` to add new decision trees:

```javascript
export const decisionTrees = {
  yourTree: {
    id: 'your-tree',
    title: 'Your Decision Tree',
    description: 'Help users make decisions about...',
    icon: '🌟',
    rootNode: {
      id: 'start',
      question: 'Your first question?',
      options: [
        {
          id: 'option1',
          text: 'Option 1',
          description: 'Description here',
          nextNode: { /* ... */ }
        }
      ]
    }
  }
};
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built with [React](https://react.dev/) and [Vite](https://vitejs.dev/)
- Powered by [Anthropic Claude](https://www.anthropic.com/)
- Icons by [Lucide](https://lucide.dev/)
- Styling with [Tailwind CSS](https://tailwindcss.com/)

## 📧 Contact

For questions or feedback, please open an issue on GitHub.

---

**Made with ❤️ by the Cognify team**
