import Anthropic from '@anthropic-ai/sdk';

class AIService {
  constructor() {
    this.client = null;
    this.apiKey = null;
  }

  setApiKey(apiKey) {
    this.apiKey = apiKey;
    if (apiKey) {
      this.client = new Anthropic({
        apiKey: apiKey,
        dangerouslyAllowBrowser: true // Note: In production, use a backend proxy
      });
    }
  }

  async generateDecisionOptions(context, currentNode) {
    if (!this.client) {
      throw new Error('API key not set. Please configure your Anthropic API key.');
    }

    const prompt = `You are a helpful decision-making assistant. Based on the following context, generate 2-4 relevant decision options or questions to help guide the user forward.

Context: ${context}
Current situation: ${currentNode}

Return ONLY a JSON array of options in this format:
[
  {"id": "option1", "text": "Option text", "description": "Brief description"},
  {"id": "option2", "text": "Option text", "description": "Brief description"}
]

Make the options clear, actionable, and helpful for decision-making.`;

    try {
      const message = await this.client.messages.create({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 1024,
        messages: [{
          role: 'user',
          content: prompt
        }]
      });

      const responseText = message.content[0].text;
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

  async getInsight(decisionPath, currentContext) {
    if (!this.client) {
      return null;
    }

    const prompt = `Based on this decision path: ${decisionPath.join(' → ')}
Current context: ${currentContext}

Provide a brief, helpful insight or recommendation (2-3 sentences maximum) to guide the user's decision.`;

    try {
      const message = await this.client.messages.create({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 256,
        messages: [{
          role: 'user',
          content: prompt
        }]
      });

      return message.content[0].text;
    } catch (error) {
      console.error('AI Insight Error:', error);
      return null;
    }
  }

  async analyzeDecisionPath(path) {
    if (!this.client) {
      return 'Complete your decision path to receive AI insights.';
    }

    const prompt = `Analyze this decision path and provide a brief summary (2-3 sentences):
${path.map((step, i) => `${i + 1}. ${step}`).join('\n')}

Provide constructive feedback and next steps.`;

    try {
      const message = await this.client.messages.create({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 512,
        messages: [{
          role: 'user',
          content: prompt
        }]
      });

      return message.content[0].text;
    } catch (error) {
      console.error('AI Analysis Error:', error);
      return 'Unable to analyze decision path at this time.';
    }
  }
}

export const aiService = new AIService();
