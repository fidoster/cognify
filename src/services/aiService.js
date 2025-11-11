import Anthropic from '@anthropic-ai/sdk';
import OpenAI from 'openai';
import { GoogleGenerativeAI } from '@google/generative-ai';

class MultiProviderAIService {
  constructor() {
    this.provider = 'anthropic'; // default
    this.clients = {
      anthropic: null,
      openai: null,
      gemini: null,
      deepseek: null
    };
    this.apiKeys = {
      anthropic: null,
      openai: null,
      gemini: null,
      deepseek: null
    };
    this.settings = {
      temperature: 0.7,
      maxTokens: 2048,
      optionsCount: 4,
      model: {
        anthropic: 'claude-3-5-sonnet-20241022',
        openai: 'gpt-4o',
        gemini: 'gemini-2.0-flash-exp',
        deepseek: 'deepseek-chat'
      }
    };
    this.usage = {
      totalRequests: 0,
      byProvider: {
        anthropic: 0,
        openai: 0,
        gemini: 0,
        deepseek: 0
      }
    };
    this.loadFromStorage();
  }

  loadFromStorage() {
    // Load API keys
    Object.keys(this.apiKeys).forEach(provider => {
      const key = localStorage.getItem(`api_key_${provider}`);
      if (key) {
        this.setApiKey(provider, key);
      }
    });

    // Load settings
    const savedSettings = localStorage.getItem('ai_settings');
    if (savedSettings) {
      this.settings = { ...this.settings, ...JSON.parse(savedSettings) };
    }

    // Load provider
    const savedProvider = localStorage.getItem('ai_provider');
    if (savedProvider) {
      this.provider = savedProvider;
    }

    // Load usage
    const savedUsage = localStorage.getItem('ai_usage');
    if (savedUsage) {
      this.usage = { ...this.usage, ...JSON.parse(savedUsage) };
    }
  }

  saveToStorage() {
    localStorage.setItem('ai_settings', JSON.stringify(this.settings));
    localStorage.setItem('ai_provider', this.provider);
    localStorage.setItem('ai_usage', JSON.stringify(this.usage));
  }

  setProvider(provider) {
    this.provider = provider;
    this.saveToStorage();
  }

  setApiKey(provider, apiKey) {
    this.apiKeys[provider] = apiKey;
    localStorage.setItem(`api_key_${provider}`, apiKey);

    // Initialize client based on provider
    switch (provider) {
      case 'anthropic':
        if (apiKey) {
          this.clients.anthropic = new Anthropic({
            apiKey: apiKey,
            dangerouslyAllowBrowser: true
          });
        }
        break;
      case 'openai':
        if (apiKey) {
          this.clients.openai = new OpenAI({
            apiKey: apiKey,
            dangerouslyAllowBrowser: true
          });
        }
        break;
      case 'gemini':
        if (apiKey) {
          this.clients.gemini = new GoogleGenerativeAI(apiKey);
        }
        break;
      case 'deepseek':
        if (apiKey) {
          this.clients.deepseek = new OpenAI({
            apiKey: apiKey,
            baseURL: 'https://api.deepseek.com/v1',
            dangerouslyAllowBrowser: true
          });
        }
        break;
    }
  }

  updateSettings(newSettings) {
    this.settings = { ...this.settings, ...newSettings };
    this.saveToStorage();
  }

  trackUsage(provider) {
    this.usage.totalRequests++;
    this.usage.byProvider[provider]++;
    this.saveToStorage();
  }

  resetUsage() {
    this.usage = {
      totalRequests: 0,
      byProvider: {
        anthropic: 0,
        openai: 0,
        gemini: 0,
        deepseek: 0
      }
    };
    this.saveToStorage();
  }

  async generateOptionsFromPrompt(userPrompt, context = []) {
    const client = this.clients[this.provider];
    if (!client) {
      throw new Error(`Please configure your ${this.provider.toUpperCase()} API key in the admin panel.`);
    }

    const contextString = context.length > 0
      ? `\n\nPrevious context:\n${context.map((c, i) => `${i + 1}. ${c.prompt}: ${c.selectedOption || 'Starting point'}`).join('\n')}`
      : '';

    const systemPrompt = `You are an AI decision-making assistant. The user is on a decision journey and needs your help exploring options.

User's current question/problem: "${userPrompt}"${contextString}

Generate ${this.settings.optionsCount} diverse, actionable options or directions they could explore next. Each option should be:
- Clear and specific
- Actionable and practical
- Different from the others (explore various angles)
- Help them progress in their decision-making

Return ONLY a JSON array in this exact format:
[
  {
    "id": "opt1",
    "title": "Brief title (3-6 words)",
    "description": "Detailed description explaining this path (15-25 words)",
    "nextPrompt": "A suggested follow-up question if they choose this option"
  }
]

Make it insightful and helpful!`;

    try {
      let responseText;

      switch (this.provider) {
        case 'anthropic':
          const anthropicResponse = await client.messages.create({
            model: this.settings.model.anthropic,
            max_tokens: this.settings.maxTokens,
            temperature: this.settings.temperature,
            messages: [{ role: 'user', content: systemPrompt }]
          });
          responseText = anthropicResponse.content[0].text;
          break;

        case 'openai':
          const openaiResponse = await client.chat.completions.create({
            model: this.settings.model.openai,
            max_tokens: this.settings.maxTokens,
            temperature: this.settings.temperature,
            messages: [{ role: 'user', content: systemPrompt }]
          });
          responseText = openaiResponse.choices[0].message.content;
          break;

        case 'gemini':
          const geminiModel = client.getGenerativeModel({
            model: this.settings.model.gemini,
            generationConfig: {
              temperature: this.settings.temperature,
              maxOutputTokens: this.settings.maxTokens,
            }
          });
          const geminiResponse = await geminiModel.generateContent(systemPrompt);
          responseText = geminiResponse.response.text();
          break;

        case 'deepseek':
          const deepseekResponse = await client.chat.completions.create({
            model: this.settings.model.deepseek,
            max_tokens: this.settings.maxTokens,
            temperature: this.settings.temperature,
            messages: [{ role: 'user', content: systemPrompt }]
          });
          responseText = deepseekResponse.choices[0].message.content;
          break;

        default:
          throw new Error('Invalid provider');
      }

      this.trackUsage(this.provider);

      const jsonMatch = responseText.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }

      throw new Error('Failed to parse AI response');
    } catch (error) {
      console.error('AI Service Error:', error);
      throw error;
    }
  }

  async generateJourneySummary(nodes) {
    const client = this.clients[this.provider];
    if (!client) {
      return {
        summary: 'Complete your API setup to receive AI-powered journey analysis.',
        keyInsights: [],
        recommendations: []
      };
    }

    const journeyPath = nodes.map((node, i) =>
      `Step ${i + 1}: ${node.prompt}${node.selectedOption ? ` → Chose: ${node.selectedOption.title}` : ''}`
    ).join('\n');

    const prompt = `Analyze this decision-making journey and provide insights:

${journeyPath}

Provide a response in this JSON format:
{
  "summary": "A 2-3 sentence summary of their decision journey and what they accomplished",
  "keyInsights": ["insight 1", "insight 2", "insight 3"],
  "recommendations": ["specific action 1", "specific action 2", "specific action 3"]
}

Make it actionable, insightful, and encouraging.`;

    try {
      let responseText;

      switch (this.provider) {
        case 'anthropic':
          const anthropicResponse = await this.clients.anthropic.messages.create({
            model: this.settings.model.anthropic,
            max_tokens: 1024,
            temperature: this.settings.temperature,
            messages: [{ role: 'user', content: prompt }]
          });
          responseText = anthropicResponse.content[0].text;
          break;

        case 'openai':
          const openaiResponse = await this.clients.openai.chat.completions.create({
            model: this.settings.model.openai,
            max_tokens: 1024,
            temperature: this.settings.temperature,
            messages: [{ role: 'user', content: prompt }]
          });
          responseText = openaiResponse.choices[0].message.content;
          break;

        case 'gemini':
          const geminiModel = this.clients.gemini.getGenerativeModel({
            model: this.settings.model.gemini,
            generationConfig: {
              temperature: this.settings.temperature,
              maxOutputTokens: 1024,
            }
          });
          const geminiResponse = await geminiModel.generateContent(prompt);
          responseText = geminiResponse.response.text();
          break;

        case 'deepseek':
          const deepseekResponse = await this.clients.deepseek.chat.completions.create({
            model: this.settings.model.deepseek,
            max_tokens: 1024,
            temperature: this.settings.temperature,
            messages: [{ role: 'user', content: prompt }]
          });
          responseText = deepseekResponse.choices[0].message.content;
          break;
      }

      this.trackUsage(this.provider);

      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }

      throw new Error('Failed to parse summary');
    } catch (error) {
      console.error('Summary Error:', error);
      return {
        summary: 'Your decision journey explored multiple paths and considerations.',
        keyInsights: ['Each choice revealed new perspectives', 'The journey helped clarify priorities'],
        recommendations: ['Review your path', 'Consider next steps', 'Take action on insights']
      };
    }
  }

  getProviderName() {
    const names = {
      anthropic: 'Anthropic Claude',
      openai: 'OpenAI GPT',
      gemini: 'Google Gemini',
      deepseek: 'DeepSeek'
    };
    return names[this.provider] || this.provider;
  }

  isConfigured() {
    return !!this.clients[this.provider];
  }

  getAllProviderStatus() {
    return {
      anthropic: !!this.clients.anthropic,
      openai: !!this.clients.openai,
      gemini: !!this.clients.gemini,
      deepseek: !!this.clients.deepseek
    };
  }
}

export const aiService = new MultiProviderAIService();
