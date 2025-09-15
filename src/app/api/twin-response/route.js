import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request) {
  try {
    const { twinPersonality, userMessage, conversationHistory = [] } = await request.json();
    
    // Prepare messages including history
    const messages = [
      {
        role: "system",
        content: `You are a digital twin with the following personality: ${twinPersonality}. Respond as this character would.`
      },
      ...conversationHistory.map(msg => ({
        role: msg.isUser ? "user" : "assistant",
        content: msg.content
      })),
      { role: "user", content: userMessage }
    ];

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messages,
    });
    
    return Response.json({ 
      response: response.choices[0].message.content 
    });
  } catch (error) {
    console.error('OpenAI API error:', error);
    return Response.json({ 
      error: 'Error generating response', 
      details: error.message 
    }, { status: 500 });
  }
}
