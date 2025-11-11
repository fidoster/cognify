// Demo data with creative "what if" scenarios
export const demoJourneys = {
  career: {
    title: "Career Adventure",
    nodes: [
      {
        id: 1,
        prompt: "I want to transition into a tech career",
        options: [
          {
            id: "opt1",
            title: "🚀 Become a Code Wizard",
            description: "What if you could build anything you imagine? Learn to code and create apps that millions use daily. Start small, dream big!",
            nextPrompt: "What type of magic do you want to code - web spells, mobile charms, or data sorcery?"
          },
          {
            id: "opt2",
            title: "🎯 The Strategy Master Path",
            description: "What if you became the person who decides what gets built? Guide products from idea to reality, without writing code!",
            nextPrompt: "Would you rather shape consumer apps or enterprise solutions that transform businesses?"
          },
          {
            id: "opt3",
            title: "🎨 Digital Artist Revolution",
            description: "What if you could design experiences that make people smile? Create beautiful interfaces that feel like magic to use!",
            nextPrompt: "Do you want to craft pixel-perfect visuals or design entire user journeys?"
          },
          {
            id: "opt4",
            title: "🔮 Data Detective Journey",
            description: "What if you could predict the future with data? Uncover hidden patterns and build AI that thinks. The world needs your insights!",
            nextPrompt: "What excites you more - discovering patterns in data or teaching machines to learn?"
          }
        ]
      }
    ]
  },

  business: {
    title: "Entrepreneurial Quest",
    nodes: [
      {
        id: 1,
        prompt: "I want to start my own business",
        options: [
          {
            id: "opt1",
            title: "💡 Build a Money-Making Machine",
            description: "What if your software could earn while you sleep? Create a SaaS that solves real problems and watch it grow exponentially!",
            nextPrompt: "What problem keeps people awake at night that you could solve?"
          },
          {
            id: "opt2",
            title: "🎓 Become a Paid Expert",
            description: "What if companies begged for YOUR advice? Package your expertise into high-value consulting that transforms businesses!",
            nextPrompt: "What secret knowledge do you have that others would pay premium for?"
          },
          {
            id: "opt3",
            title: "🛍️ E-Commerce Empire",
            description: "What if you could sell to the world from your laptop? Build a store that reaches millions and runs on autopilot!",
            nextPrompt: "Would you create your own products or curate the best finds from around the world?"
          },
          {
            id: "opt4",
            title: "⚡ Launch a Creative Agency",
            description: "What if your team became the go-to for amazing work? Build an agency that clients line up to work with!",
            nextPrompt: "What creative superpower will your agency be known for?"
          }
        ]
      }
    ]
  },

  problem: {
    title: "Team Transformation",
    nodes: [
      {
        id: 1,
        prompt: "I need to improve my team's productivity",
        options: [
          {
            id: "opt1",
            title: "🎪 Communication Revolution",
            description: "What if meetings were actually exciting? Transform how your team talks, shares ideas, and collaborates. Make it fun!",
            nextPrompt: "What if you banned all boring meetings and reimagined team communication?"
          },
          {
            id: "opt2",
            title: "⚙️ Process Breakthrough",
            description: "What if work flowed like water? Eliminate bottlenecks and automate the boring stuff. Watch productivity soar!",
            nextPrompt: "What's the ONE bottleneck that, if removed, would change everything?"
          },
          {
            id: "opt3",
            title: "🌟 Skill-Up Adventure",
            description: "What if your team became industry legends? Invest in growth that compounds. Make learning irresistible!",
            nextPrompt: "What superpower does your team need to dominate your industry?"
          },
          {
            id: "opt4",
            title: "🚀 Tech Transformation",
            description: "What if the right tool made you 10x faster? Discover technology that feels like magic. Automate the mundane!",
            nextPrompt: "What manual task, if automated, would give your team superpowers?"
          }
        ]
      }
    ]
  },

  wildcard: {
    title: "Creative Exploration",
    nodes: [
      {
        id: 1,
        prompt: "Let's explore something interesting",
        options: [
          {
            id: "opt1",
            title: "🎲 What If You Took the Risky Path?",
            description: "Sometimes the scariest option leads to the most growth. What if you chose the thing that makes your heart race?",
            nextPrompt: "What's the boldest move you could make right now?"
          },
          {
            id: "opt2",
            title: "🔄 The Reverse Engineering Approach",
            description: "What if you started from your dream outcome and worked backwards? Where would you need to be in 5 years?",
            nextPrompt: "Describe your perfect day in 5 years - what does it look like?"
          },
          {
            id: "opt3",
            title: "🌊 Go With the Flow",
            description: "What if the universe is already guiding you? Sometimes the best path is the one with least resistance. What feels natural?",
            nextPrompt: "What opportunity keeps showing up that you've been ignoring?"
          },
          {
            id: "opt4",
            title: "💎 The Hidden Gem Strategy",
            description: "What if there's a third option you haven't seen yet? Sometimes the best choice isn't on the table. Let's discover it!",
            nextPrompt: "If you could create a perfect option from scratch, what would it be?"
          }
        ]
      }
    ]
  }
};

// Get creative demo options based on user's prompt
export function getDemoOptions(userPrompt) {
  const lowerPrompt = userPrompt.toLowerCase();

  // Match keywords to demo journeys
  if (lowerPrompt.includes('career') || lowerPrompt.includes('job') || lowerPrompt.includes('work') || lowerPrompt.includes('tech')) {
    return demoJourneys.career.nodes[0].options;
  }

  if (lowerPrompt.includes('business') || lowerPrompt.includes('startup') || lowerPrompt.includes('entrepreneur') || lowerPrompt.includes('company')) {
    return demoJourneys.business.nodes[0].options;
  }

  if (lowerPrompt.includes('problem') || lowerPrompt.includes('team') || lowerPrompt.includes('productivity') || lowerPrompt.includes('improve')) {
    return demoJourneys.problem.nodes[0].options;
  }

  // Wildcard for everything else - creative and fun!
  return demoJourneys.wildcard.nodes[0].options;
}

// Demo summary generator with encouragement
export function generateDemoSummary(nodes) {
  const encouragements = [
    "You're thinking like an innovator! 🚀",
    "That's some creative problem-solving! 💡",
    "You're seeing possibilities others miss! 🔮",
    "Your curiosity is your superpower! ⚡"
  ];

  return {
    summary: `${encouragements[Math.floor(Math.random() * encouragements.length)]} You've explored ${nodes.length} exciting ${nodes.length === 1 ? 'scenario' : 'scenarios'} in your decision journey. This demo shows how Cognify turns decisions into adventures! Want even MORE personalized magic? Configure an AI provider in the admin panel to unlock unlimited creative possibilities!`,
    keyInsights: [
      "🎯 The best decisions come from exploring unexpected angles",
      "💡 'What if' thinking opens doors you didn't know existed",
      "🚀 Every option you explored revealed new possibilities",
      "⚡ Your unique perspective is what makes this journey yours"
    ],
    recommendations: [
      "🔮 Set up an AI provider in admin panel for infinite creative scenarios",
      "🎨 Explore the opposite of what you first thought - surprises await!",
      "📊 Try different paths to see all possibilities before deciding",
      "💎 Trust your gut - sometimes the 'crazy' option is the right one"
    ]
  };
}

// Random encouragement for when users are exploring
export const explorationEncouragements = [
  "Ooh, interesting choice! Let's see where this leads... 🤔",
  "Bold move! I like how you think! 💪",
  "Curious minds discover the best paths! 🔍",
  "This is getting exciting! 🎉",
  "You're on to something here! ✨",
  "Plot twist incoming! 🌟",
  "Love the creative thinking! 🎨",
  "That's what I call thinking outside the box! 📦➡️🚀"
];

export function getRandomEncouragement() {
  return explorationEncouragements[Math.floor(Math.random() * explorationEncouragements.length)];
}
