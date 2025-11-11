# Cognify 🧠

**AI-Powered Interactive Decision Pathfinder**

Cognify revolutionizes decision-making through an interactive, node-based journey powered by Claude AI. Enter your question, get AI-generated options, explore multiple paths, and receive intelligent insights at every step.

![Cognify Banner](https://img.shields.io/badge/React-19.2-blue) ![Vite](https://img.shields.io/badge/Vite-7.2-purple) ![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-cyan) ![Framer Motion](https://img.shields.io/badge/Framer%20Motion-latest-pink)

## ✨ Features

- 🌐 **Interactive Node System**: Explore decisions through expandable, connected nodes
- 🤖 **Dynamic AI Generation**: Each prompt generates 3-4 personalized options using Claude AI
- ⚡ **Real-Time Exploration**: Enter prompts, get instant AI-powered alternatives, and choose your path
- 📊 **Visual Journey Tracking**: See your decision path unfold with beautiful node connections
- 💡 **Smart Insights**: AI analyzes your choices and provides contextual guidance
- 🎯 **Journey Summary**: Complete your journey to receive comprehensive analysis and recommendations
- 🎨 **Modern Animations**: Smooth transitions with Framer Motion for a delightful experience
- 📥 **Export Journey**: Download your decision path and insights as a text file
- 🔒 **Privacy-First**: API keys stored locally, no data sent to external servers

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ and npm
- Anthropic API key (get one at [console.anthropic.com](https://console.anthropic.com/))

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

5. Click the settings icon (⚙️) and enter your Anthropic API key

### Building for Production

```bash
npm run build
npm run preview
```

## 🎮 How to Use

1. **Start Your Journey**: Click "Start Your Journey" on the home page
2. **Enter Your Question**: Type any decision, problem, or question you're facing
3. **Explore AI Options**: AI generates 3-4 relevant options for you to consider
4. **Select and Continue**: Choose an option, then enter your next prompt
5. **Build Your Path**: Keep exploring nodes until you reach clarity
6. **Complete Journey**: Click "Complete Journey" for AI-powered summary and insights
7. **Download**: Save your decision path and recommendations for reference

## 💡 Example Use Cases

- **Career Decisions**: "Should I switch careers to tech?"
- **Business Strategy**: "How do I launch my startup?"
- **Problem Solving**: "My team is unproductive, what should I do?"
- **Life Choices**: "Should I relocate to a new city?"
- **Technical Decisions**: "Which framework should I use for my project?"

## 🛠️ Tech Stack

- **Frontend**: React 19.2 with Hooks
- **Build Tool**: Vite 7.2
- **Styling**: Tailwind CSS 3.4
- **Animations**: Framer Motion
- **AI**: Anthropic Claude 3.5 Sonnet
- **Icons**: Lucide React

## 📁 Project Structure

```
cognify/
├── src/
│   ├── components/
│   │   ├── Home.jsx              # Landing page
│   │   ├── NodeJourney.jsx       # Main journey orchestrator
│   │   ├── DecisionNode.jsx      # Individual node component
│   │   ├── PromptInput.jsx       # Input component with suggestions
│   │   ├── JourneySummary.jsx    # Final summary view
│   │   └── APIConfig.jsx         # API settings modal
│   ├── services/
│   │   └── aiService.js          # AI integration & prompts
│   ├── App.jsx                   # Root component
│   ├── main.jsx                  # Entry point
│   └── index.css                 # Global styles
├── public/                        # Static assets
├── index.html
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## 🎨 Key Components

### DecisionNode
Interactive node displaying a question/prompt with AI-generated options. Features:
- Gradient colors based on depth
- Animated entry and hover effects
- Selection state with visual feedback
- Connection lines between nodes

### NodeJourney
Main orchestrator managing the decision flow:
- State management for all nodes
- AI option generation
- Journey completion and summary
- Error handling

### JourneySummary
Beautiful summary view with:
- AI-generated journey analysis
- Key insights extraction
- Actionable recommendations
- Download functionality

### PromptInput
Smart input component featuring:
- Auto-suggestions for quick start
- Loading states
- Suggested follow-up questions
- Responsive design

## 🔑 AI Configuration

1. Get your API key from [Anthropic Console](https://console.anthropic.com/)
2. Click the settings icon (⚙️) in the app
3. Paste your API key
4. Start exploring with AI-powered guidance!

**Note**: Your API key is stored only in your browser's localStorage and is never transmitted to our servers.

## 🎯 Customization

### Adding New Prompt Templates

Edit `src/components/PromptInput.jsx` to add your own suggestion templates:

```javascript
const suggestions = [
  "Your custom prompt here",
  "Another helpful suggestion",
  // ...
];
```

### Customizing AI Behavior

Modify `src/services/aiService.js` to adjust:
- Number of options generated
- Response format
- Prompt engineering
- Context handling

### Styling

All styles use Tailwind CSS. Key customizations in:
- `tailwind.config.js` - Theme colors and extensions
- `src/index.css` - Global styles
- Component files - Component-specific classes

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Deploy!

Vercel automatically detects Vite projects and configures the build.

### Other Platforms

Build command: `npm run build`
Output directory: `dist`

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built with [React](https://react.dev/) and [Vite](https://vitejs.dev/)
- Powered by [Anthropic Claude](https://www.anthropic.com/)
- Animations by [Framer Motion](https://www.framer.com/motion/)
- Icons by [Lucide](https://lucide.dev/)
- Styling with [Tailwind CSS](https://tailwindcss.com/)

## 📧 Support

For questions, issues, or feedback:
- Open an issue on [GitHub](https://github.com/fidoster/cognify/issues)
- Check existing issues for solutions

---

**Made with ❤️ and AI by the Cognify team**

*Navigate complex decisions with confidence. Start your journey today!*
