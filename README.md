# Cognify 🧠

**AI-Powered Interactive Decision Pathfinder with Multi-Provider Support**

Cognify revolutionizes decision-making through an interactive, node-based journey powered by AI. Choose from multiple AI providers (Anthropic Claude, OpenAI GPT, Google Gemini, DeepSeek), enter your questions, get AI-generated options, explore multiple paths, and receive intelligent insights at every step.

![Cognify Banner](https://img.shields.io/badge/React-19.2-blue) ![Vite](https://img.shields.io/badge/Vite-7.2-purple) ![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-cyan) ![Framer Motion](https://img.shields.io/badge/Framer%20Motion-latest-pink)

## ✨ Features

### Core Features
- 🌐 **Interactive Node System**: Explore decisions through expandable, connected nodes
- 🤖 **Multi-Provider AI Support**: Choose from Anthropic Claude, OpenAI GPT, Google Gemini, or DeepSeek
- ⚡ **Real-Time Exploration**: Enter prompts, get instant AI-powered alternatives, and choose your path
- 📊 **Visual Journey Tracking**: See your decision path unfold with beautiful node connections
- 💡 **Smart Insights**: AI analyzes your choices and provides contextual guidance
- 🎯 **Journey Summary**: Complete your journey to receive comprehensive analysis and recommendations
- 🎨 **Modern Animations**: Smooth transitions with Framer Motion for a delightful experience
- 📥 **Export Journey**: Download your decision path and insights as a text file
- 🔒 **Privacy-First**: API keys stored locally, no data sent to external servers

### Admin Panel Features
- 🎛️ **Multi-Provider Configuration**: Set up and switch between multiple AI providers
- ⚙️ **Advanced Settings**:
  - Adjust AI temperature (creativity level)
  - Configure number of options per node
  - Set maximum token limits
  - Choose specific models for each provider
- 📝 **Custom Templates**: Create and manage reusable prompt templates
- 🎨 **Theme Customization**: Choose from 5 beautiful theme presets
- 📊 **Usage Statistics**: Track API usage across all providers
- 💾 **Import/Export**: Backup and restore your settings
- 🔄 **Live Updates**: Changes apply immediately without page reload

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ and npm
- At least one AI provider API key:
  - **Anthropic**: [console.anthropic.com](https://console.anthropic.com/)
  - **OpenAI**: [platform.openai.com](https://platform.openai.com/api-keys)
  - **Google Gemini**: [aistudio.google.com](https://aistudio.google.com/app/apikey)
  - **DeepSeek**: [platform.deepseek.com](https://platform.deepseek.com/)

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

5. Click the settings icon (⚙️) to open the admin panel and configure your AI provider

### Building for Production

```bash
npm run build
npm run preview
```

## 🎮 How to Use

### Getting Started
1. **Configure AI Provider**: Click settings icon → Go to "AI Providers" tab → Add API key
2. **Start Your Journey**: Click "Start Your Journey" on the home page
3. **Enter Your Question**: Type any decision, problem, or question you're facing
4. **Explore AI Options**: AI generates 3-4 relevant options for you to consider
5. **Select and Continue**: Choose an option, then enter your next prompt
6. **Build Your Path**: Keep exploring nodes until you reach clarity
7. **Complete Journey**: Click "Complete Journey" for AI-powered summary and insights
8. **Download**: Save your decision path and recommendations for reference

### Admin Panel Guide

#### AI Providers Tab
- **Add Multiple Providers**: Configure API keys for all providers you want to use
- **Switch Providers**: Click "Use This" on any configured provider to switch
- **Model Selection**: Choose specific models for each provider
- **Status Indicators**: See which providers are configured at a glance

#### Settings Tab
- **Temperature**: Control AI creativity (0.0 = focused, 1.0 = creative)
- **Options Count**: Set how many options AI generates (2-6)
- **Max Tokens**: Configure response length (512-4096)
- **Import/Export**: Backup your settings to a JSON file

#### Templates Tab
- **Create Templates**: Add frequently used prompts
- **Quick Start**: Use templates to begin journeys faster
- **Organize**: Manage and delete templates as needed

#### Theme Tab
- **Choose Theme**: Select from 5 color schemes
- **Preview**: See theme colors before applying
- **Instant Apply**: Themes take effect on reload

#### Usage Tab
- **Total Requests**: See overall API usage
- **Provider Breakdown**: Track usage by provider
- **Percentages**: View usage distribution
- **Reset Stats**: Clear usage data anytime

## 💡 Example Use Cases

- **Career Decisions**: "Should I switch careers to tech?"
- **Business Strategy**: "How do I launch my startup?"
- **Problem Solving**: "My team is unproductive, what should I do?"
- **Life Choices**: "Should I relocate to a new city?"
- **Technical Decisions**: "Which framework should I use for my project?"
- **Learning Paths**: "How should I learn machine learning?"
- **Product Development**: "What features should I prioritize?"

## 🛠️ Tech Stack

- **Frontend**: React 19.2 with Hooks
- **Build Tool**: Vite 7.2
- **Styling**: Tailwind CSS 3.4
- **Animations**: Framer Motion
- **AI Providers**:
  - Anthropic Claude SDK
  - OpenAI SDK
  - Google Generative AI SDK
  - DeepSeek (via OpenAI-compatible API)
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
│   │   ├── AdminPanel.jsx        # Comprehensive admin panel
│   │   └── APIConfig.jsx         # Legacy API config (deprecated)
│   ├── services/
│   │   └── aiService.js          # Multi-provider AI service
│   ├── App.jsx                   # Root component
│   ├── main.jsx                  # Entry point
│   └── index.css                 # Global styles
├── public/                        # Static assets
├── index.html
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## 🎨 Supported AI Providers

### Anthropic Claude
- **Best For**: Complex reasoning, detailed analysis
- **Models**: Claude 3.5 Sonnet, Claude 3.5 Haiku, Claude 3 Opus
- **Pricing**: Most expensive, highest quality

### OpenAI GPT
- **Best For**: General-purpose tasks, versatile responses
- **Models**: GPT-4o, GPT-4o Mini, GPT-4 Turbo
- **Pricing**: Moderate, excellent value

### Google Gemini
- **Best For**: Fast responses, efficient processing
- **Models**: Gemini 2.0 Flash, Gemini 1.5 Pro, Gemini 1.5 Flash
- **Pricing**: Very affordable, great speed

### DeepSeek
- **Best For**: Cost-effective, coding tasks
- **Models**: DeepSeek Chat, DeepSeek Coder
- **Pricing**: Most affordable option

## 🔑 Configuration

### Setting Up Providers

1. **Anthropic Claude**:
   - Get key from [console.anthropic.com](https://console.anthropic.com/)
   - Format: `sk-ant-...`

2. **OpenAI**:
   - Get key from [platform.openai.com](https://platform.openai.com/api-keys)
   - Format: `sk-...`

3. **Google Gemini**:
   - Get key from [aistudio.google.com](https://aistudio.google.com/app/apikey)
   - Format: `AIza...`

4. **DeepSeek**:
   - Get key from [platform.deepseek.com](https://platform.deepseek.com/)
   - Format: `sk-...`

### Recommended Settings

**For Creative Exploration**:
- Temperature: 0.8-1.0
- Options Count: 4-6
- Provider: Claude 3.5 Sonnet or GPT-4o

**For Focused Decision-Making**:
- Temperature: 0.3-0.5
- Options Count: 3-4
- Provider: Any

**For Budget-Conscious Usage**:
- Provider: Gemini Flash or DeepSeek
- Options Count: 3
- Max Tokens: 1024

## 🎯 Customization

### Adding Custom Prompt Templates

Use the Templates tab in the admin panel to add frequently used prompts:
1. Click "AI Providers" → "Templates"
2. Click "+ Add Template"
3. Enter name and prompt text
4. Templates appear in the home screen for quick access

### Customizing Themes

1. Open Admin Panel → Theme tab
2. Choose from 5 preset themes
3. Theme applies on next page load

### Adjusting AI Behavior

Fine-tune AI responses in Settings tab:
- **Temperature**: Controls randomness and creativity
- **Options Count**: More options = more exploration
- **Max Tokens**: Longer responses = more detail

### Exporting/Importing Settings

**Export**:
1. Admin Panel → Settings tab
2. Click "Export Settings"
3. Saves JSON file with all configurations

**Import**:
1. Admin Panel → Settings tab
2. Click "Import Settings"
3. Select previously exported JSON file

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Deploy!

Vercel automatically detects Vite projects and configures the build.

### Other Platforms

Build command: `npm run build`
Output directory: `dist`

### Environment Variables

No environment variables needed! All API keys are stored in browser localStorage.

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
- AI powered by:
  - [Anthropic Claude](https://www.anthropic.com/)
  - [OpenAI](https://openai.com/)
  - [Google Gemini](https://deepmind.google/technologies/gemini/)
  - [DeepSeek](https://www.deepseek.com/)
- Animations by [Framer Motion](https://www.framer.com/motion/)
- Icons by [Lucide](https://lucide.dev/)
- Styling with [Tailwind CSS](https://tailwindcss.com/)

## 📧 Support

For questions, issues, or feedback:
- Open an issue on [GitHub](https://github.com/fidoster/cognify/issues)
- Check existing issues for solutions

## 🔐 Security Note

**API Key Storage**: All API keys are stored in your browser's localStorage. They are never sent to any server except the respective AI provider APIs. For production use with multiple users, consider implementing a backend proxy to securely manage API keys.

---

**Made with ❤️ and AI by the Cognify team**

*Navigate complex decisions with confidence. Choose your AI, start your journey today!*
