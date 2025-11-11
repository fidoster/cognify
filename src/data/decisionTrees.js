export const decisionTrees = {
  careerPath: {
    id: 'career',
    title: 'Career Path Finder',
    description: 'Discover your ideal career direction',
    icon: '🎯',
    rootNode: {
      id: 'start',
      question: 'What type of work energizes you most?',
      options: [
        {
          id: 'creative',
          text: 'Creative & Artistic Work',
          description: 'Design, art, writing, innovation',
          nextNode: {
            id: 'creative-branch',
            question: 'Which creative field interests you?',
            options: [
              {
                id: 'visual',
                text: 'Visual Design',
                description: 'UI/UX, graphic design, animation',
                result: {
                  title: 'Visual Designer Path',
                  description: 'Consider roles like UI/UX Designer, Graphic Designer, or Motion Graphics Artist',
                  recommendations: [
                    'Build a portfolio on Dribbble or Behance',
                    'Learn Figma, Adobe Creative Suite',
                    'Study design principles and psychology',
                    'Network with design communities'
                  ]
                }
              },
              {
                id: 'content',
                text: 'Content Creation',
                description: 'Writing, video, podcasting',
                result: {
                  title: 'Content Creator Path',
                  description: 'Explore roles like Content Strategist, Copywriter, or Video Producer',
                  recommendations: [
                    'Start a blog or YouTube channel',
                    'Learn SEO and content marketing',
                    'Build a portfolio of your best work',
                    'Study storytelling and audience engagement'
                  ]
                }
              }
            ]
          }
        },
        {
          id: 'analytical',
          text: 'Analytical & Technical Work',
          description: 'Data, code, systems, problem-solving',
          nextNode: {
            id: 'tech-branch',
            question: 'What technical area appeals to you?',
            options: [
              {
                id: 'software',
                text: 'Software Development',
                description: 'Building applications and systems',
                result: {
                  title: 'Software Engineer Path',
                  description: 'Perfect for becoming a Full-Stack, Frontend, or Backend Developer',
                  recommendations: [
                    'Learn JavaScript, Python, or another language',
                    'Build projects and contribute to open source',
                    'Master Git and development tools',
                    'Consider bootcamps or CS degree'
                  ]
                }
              },
              {
                id: 'data',
                text: 'Data & Analytics',
                description: 'Insights, patterns, predictions',
                result: {
                  title: 'Data Scientist Path',
                  description: 'Become a Data Analyst, Data Scientist, or ML Engineer',
                  recommendations: [
                    'Learn Python, SQL, and statistics',
                    'Master data visualization tools',
                    'Study machine learning fundamentals',
                    'Work on real-world datasets'
                  ]
                }
              }
            ]
          }
        },
        {
          id: 'people',
          text: 'People & Communication',
          description: 'Teaching, leading, helping, connecting',
          nextNode: {
            id: 'people-branch',
            question: 'How do you prefer to work with people?',
            options: [
              {
                id: 'teaching',
                text: 'Teaching & Mentoring',
                description: 'Educating and guiding others',
                result: {
                  title: 'Educator Path',
                  description: 'Consider roles like Teacher, Corporate Trainer, or Online Course Creator',
                  recommendations: [
                    'Get teaching certification if needed',
                    'Create educational content online',
                    'Develop expertise in your subject area',
                    'Learn instructional design principles'
                  ]
                }
              },
              {
                id: 'leadership',
                text: 'Leadership & Strategy',
                description: 'Managing teams and projects',
                result: {
                  title: 'Management Path',
                  description: 'Pursue roles like Project Manager, Product Manager, or Team Lead',
                  recommendations: [
                    'Develop leadership skills',
                    'Learn project management frameworks (Agile, Scrum)',
                    'Get relevant certifications (PMP, CSM)',
                    'Build cross-functional communication skills'
                  ]
                }
              }
            ]
          }
        }
      ]
    }
  },

  techStack: {
    id: 'techstack',
    title: 'Tech Stack Chooser',
    description: 'Find the right technology stack for your project',
    icon: '⚙️',
    rootNode: {
      id: 'start',
      question: 'What type of application are you building?',
      options: [
        {
          id: 'web',
          text: 'Web Application',
          description: 'Browser-based application',
          nextNode: {
            id: 'web-type',
            question: 'What\'s your priority?',
            options: [
              {
                id: 'performance',
                text: 'Performance & SEO',
                description: 'Fast loading, search optimization',
                result: {
                  title: 'Next.js + React',
                  description: 'Perfect for performance-critical web apps',
                  recommendations: [
                    'Next.js for SSR/SSG',
                    'React for UI components',
                    'Tailwind CSS for styling',
                    'Vercel for hosting'
                  ]
                }
              },
              {
                id: 'interactive',
                text: 'Rich Interactivity',
                description: 'Complex user interactions',
                result: {
                  title: 'React + Vite',
                  description: 'Fast development with hot reload',
                  recommendations: [
                    'React for UI',
                    'Vite for dev experience',
                    'Redux/Zustand for state',
                    'React Query for data fetching'
                  ]
                }
              }
            ]
          }
        },
        {
          id: 'mobile',
          text: 'Mobile Application',
          description: 'iOS and/or Android app',
          nextNode: {
            id: 'mobile-type',
            question: 'Which approach do you prefer?',
            options: [
              {
                id: 'crossplatform',
                text: 'Cross-Platform',
                description: 'One codebase for iOS & Android',
                result: {
                  title: 'React Native',
                  description: 'Build native apps with JavaScript',
                  recommendations: [
                    'React Native for mobile',
                    'Expo for faster development',
                    'Native modules when needed',
                    'Firebase for backend'
                  ]
                }
              },
              {
                id: 'native',
                text: 'Native Performance',
                description: 'Platform-specific development',
                result: {
                  title: 'Swift/Kotlin',
                  description: 'Native development for best performance',
                  recommendations: [
                    'Swift for iOS',
                    'Kotlin for Android',
                    'Platform-specific UI frameworks',
                    'Native APIs and features'
                  ]
                }
              }
            ]
          }
        }
      ]
    }
  },

  problemSolving: {
    id: 'debugging',
    title: 'Bug Troubleshooter',
    description: 'Systematic approach to debugging',
    icon: '🐛',
    rootNode: {
      id: 'start',
      question: 'When does the issue occur?',
      options: [
        {
          id: 'build',
          text: 'During Build/Compile',
          description: 'Build fails or compilation errors',
          result: {
            title: 'Build Error Resolution',
            description: 'Check your build configuration and dependencies',
            recommendations: [
              'Read the error message carefully',
              'Check package.json dependencies',
              'Clear node_modules and reinstall',
              'Verify build tool configuration'
            ]
          }
        },
        {
          id: 'runtime',
          text: 'At Runtime',
          description: 'App crashes or misbehaves when running',
          nextNode: {
            id: 'runtime-type',
            question: 'What type of runtime issue?',
            options: [
              {
                id: 'crash',
                text: 'Application Crashes',
                description: 'Complete failure or white screen',
                result: {
                  title: 'Crash Debugging',
                  description: 'Find and fix critical errors',
                  recommendations: [
                    'Check browser/app console for errors',
                    'Add error boundaries (React)',
                    'Use try-catch blocks',
                    'Check for null/undefined values'
                  ]
                }
              },
              {
                id: 'wrong-behavior',
                text: 'Incorrect Behavior',
                description: 'Works but produces wrong results',
                result: {
                  title: 'Logic Debugging',
                  description: 'Trace through your logic step by step',
                  recommendations: [
                    'Add console.log at key points',
                    'Use debugger breakpoints',
                    'Check state management',
                    'Verify data transformations'
                  ]
                }
              }
            ]
          }
        }
      ]
    }
  }
};

export const getTreeById = (id) => {
  return Object.values(decisionTrees).find(tree => tree.id === id);
};

export const getAllTrees = () => {
  return Object.values(decisionTrees);
};
