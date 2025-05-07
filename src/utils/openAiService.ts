
import { useState } from 'react';

// Store API key in memory (in a production app, this should be handled more securely)
let apiKey = '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';  // Replace with your actual OpenAI API key
const organizationId = 'org-qRG6gdWaDdd5J0Rthm0HWjaY';

export const setOpenAiApiKey = (key: string) => {
  apiKey = key;
};

export const getOpenAiApiKey = () => apiKey;

// System message with context about the business
const systemMessage = `
You are an AI assistant for AI Automatizari, a company that helps businesses grow using AI automation.
Your main services include:
1. AI Automation for businesses
2. Process Optimization
3. Time-saving solutions
4. Sales growth strategies

Your goal is to be helpful, answer questions about AI automation services, and guide the conversation 
towards booking a free consultation at https://calendly.com/aiautomatizari/automatizariai.

If asked about pricing, mention that you offer custom solutions and that's why a free consultation is 
the best way to get accurate pricing information.

Be friendly, professional and focus on how AI automation can help businesses save time and increase sales.
`;

// Define message type
export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export const useOpenAi = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const callOpenAi = async (messages: ChatMessage[]): Promise<string> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
          'OpenAI-Organization': organizationId
        },
        body: JSON.stringify({
          model: 'gpt-4o',
          messages: [
            { role: 'system', content: systemMessage },
            ...messages
          ],
          max_tokens: 500
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Failed to get response from OpenAI');
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      return `Sorry, I encountered an error: ${errorMessage}`;
    } finally {
      setIsLoading(false);
    }
  };

  return { callOpenAi, isLoading, error };
};
