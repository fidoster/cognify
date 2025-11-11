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
        dangerouslyAllowBrowser: true
      });
    }
  }

  async generateOptionsFromPrompt(userPrompt, context = []) {
    if (!this.client) {
      throw new Error('API key not set. Please configure your Anthropic API key.');
    }

    const contextString = context.length > 0
      ? `\n\nPrevious context:\n${context.map((c, i) => `${i + 1}. ${c.prompt}: ${c.selectedOption || 'Starting point'}`).join('\n')}`
      : '';

    const prompt = `You are an AI decision-making assistant. The user is on a decision journey and needs your help exploring options.

User's current question/problem: "${userPrompt}"${contextString}

Generate 3-4 diverse, actionable options or directions they could explore next. Each option should be:
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
      const message = await this.client.messages.create({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 2048,
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

  async generateInsightForNode(userPrompt, selectedOption, fullContext) {
    if (!this.client) {
      return null;
    }

    const prompt = `Based on this decision journey:
Question: "${userPrompt}"
Chosen direction: "${selectedOption}"

Provide a brief, encouraging insight (2-3 sentences) about this choice and what to consider next.`;

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

  async generateJourneySummary(nodes) {
    if (!this.client) {
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
      const message = await this.client.messages.create({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 1024,
        messages: [{
          role: 'user',
          content: prompt
        }]
      });

      const responseText = message.content[0].text;
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

  async improvePrompt(userInput) {
    if (!this.client || !userInput.trim()) {
      return null;
    }

    const prompt = `The user entered: "${userInput}"

If this is vague or could be clearer, suggest a more specific, actionable version (one sentence, 10-20 words). If it's already clear, return null.

Return ONLY the improved prompt text or the word "null".`;

    try {
      const message = await this.client.messages.create({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 128,
        messages: [{
          role: 'user',
          content: prompt
        }]
      });

      const result = message.content[0].text.trim();
      return result.toLowerCase() === 'null' ? null : result;
    } catch (error) {
      console.error('Prompt improvement error:', error);
      return null;
    }
  }
}

export const aiService = new AIService();
