// Demo data for when no API key is configured
export const demoJourneys = {
  career: {
    title: "Career Change to Tech",
    nodes: [
      {
        id: 1,
        prompt: "I want to transition into a tech career",
        options: [
          {
            id: "opt1",
            title: "Software Development",
            description: "Learn programming and build applications from scratch",
            nextPrompt: "What programming language should I start with?"
          },
          {
            id: "opt2",
            title: "Product Management",
            description: "Lead product strategy and work with cross-functional teams",
            nextPrompt: "How do I build product management skills?"
          },
          {
            id: "opt3",
            title: "UX/UI Design",
            description: "Design user interfaces and create amazing experiences",
            nextPrompt: "What tools do I need to learn for UX design?"
          },
          {
            id: "opt4",
            title: "Data Science",
            description: "Analyze data and build machine learning models",
            nextPrompt: "What's the best path to learn data science?"
          }
        ]
      },
      {
        id: 2,
        prompt: "What programming language should I start with?",
        options: [
          {
            id: "opt1",
            title: "JavaScript",
            description: "Versatile language for web, mobile, and backend development",
            nextPrompt: "Should I focus on frontend or backend first?"
          },
          {
            id: "opt2",
            title: "Python",
            description: "Great for beginners, used in web, data science, and automation",
            nextPrompt: "What Python frameworks should I learn?"
          },
          {
            id: "opt3",
            title: "Java",
            description: "Enterprise-focused language with strong job market",
            nextPrompt: "What Java career path interests you?"
          }
        ]
      }
    ]
  },

  business: {
    title: "Starting a Business",
    nodes: [
      {
        id: 1,
        prompt: "I want to start my own business",
        options: [
          {
            id: "opt1",
            title: "SaaS Product",
            description: "Build software that solves a recurring problem",
            nextPrompt: "What problem will your SaaS solve?"
          },
          {
            id: "opt2",
            title: "Consulting",
            description: "Offer your expertise to businesses that need it",
            nextPrompt: "What's your area of expertise?"
          },
          {
            id: "opt3",
            title: "E-commerce",
            description: "Sell physical or digital products online",
            nextPrompt: "What type of products will you sell?"
          },
          {
            id: "opt4",
            title: "Agency",
            description: "Provide services like marketing, design, or development",
            nextPrompt: "What services will your agency offer?"
          }
        ]
      }
    ]
  },

  problem: {
    title: "Problem Solving",
    nodes: [
      {
        id: 1,
        prompt: "I need to improve my team's productivity",
        options: [
          {
            id: "opt1",
            title: "Better Communication",
            description: "Implement clearer communication channels and meetings",
            nextPrompt: "What communication tools should we use?"
          },
          {
            id: "opt2",
            title: "Process Optimization",
            description: "Streamline workflows and remove bottlenecks",
            nextPrompt: "Where are the biggest bottlenecks?"
          },
          {
            id: "opt3",
            title: "Skills Development",
            description: "Invest in training and professional growth",
            nextPrompt: "What skills does the team need most?"
          },
          {
            id: "opt4",
            title: "Tools & Technology",
            description: "Adopt better tools to automate and speed up work",
            nextPrompt: "What tools would have the most impact?"
          }
        ]
      }
    ]
  }
};

// Get demo options based on user's prompt
export function getDemoOptions(userPrompt) {
  const lowerPrompt = userPrompt.toLowerCase();

  // Match keywords to demo journeys
  if (lowerPrompt.includes('career') || lowerPrompt.includes('job') || lowerPrompt.includes('work')) {
    return demoJourneys.career.nodes[0].options;
  }

  if (lowerPrompt.includes('business') || lowerPrompt.includes('startup') || lowerPrompt.includes('entrepreneur')) {
    return demoJourneys.business.nodes[0].options;
  }

  if (lowerPrompt.includes('problem') || lowerPrompt.includes('team') || lowerPrompt.includes('productivity')) {
    return demoJourneys.problem.nodes[0].options;
  }

  // Default generic options
  return [
    {
      id: "opt1",
      title: "Explore Options",
      description: "Look at different approaches and perspectives on this decision",
      nextPrompt: "What factors are most important to you?"
    },
    {
      id: "opt2",
      title: "Gather Information",
      description: "Research and collect data to make an informed choice",
      nextPrompt: "What information do you need?"
    },
    {
      id: "opt3",
      title: "Consider Alternatives",
      description: "Think about other paths you might take instead",
      nextPrompt: "What alternatives exist?"
    },
    {
      id: "opt4",
      title: "Seek Expert Advice",
      description: "Consult with someone who has experience in this area",
      nextPrompt: "Who could give you the best advice?"
    }
  ];
}

// Demo summary generator
export function generateDemoSummary(nodes) {
  return {
    summary: `You've explored ${nodes.length} decision point${nodes.length > 1 ? 's' : ''} in your journey. This demo shows how Cognify helps you navigate complex decisions through interactive nodes. Configure an AI provider in the admin panel to get personalized, AI-powered insights!`,
    keyInsights: [
      "Breaking down complex decisions into manageable steps helps clarity",
      "Each choice reveals new paths and considerations",
      "Visual decision trees make it easier to track your thought process"
    ],
    recommendations: [
      "Set up an AI provider in the admin panel for personalized guidance",
      "Try different decision paths to explore all possibilities",
      "Export your journey to review and refine your decisions"
    ]
  };
}
