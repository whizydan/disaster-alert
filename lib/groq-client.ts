// lib/groq-client.ts
import { Groq } from 'groq-sdk'

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
})

export async function generateResponse(
  prompt: string, 
  language: 'en' | 'sw',
  imageBase64?: string
) {
  try {
    // System prompt for multilingual support
    const systemPrompt = language === 'sw' 
      ? "Wewe ni msaidizi anayeongea Kiswahili sanifu. Jibu maswali yote kwa Kiswahili."
      : "You are a helpful assistant. Respond in English."

    const messages = [
      {
        role: "system",
        content: systemPrompt
      }
    ]

    // If image is provided, use vision model
    if (imageBase64) {
      const completion = await groq.chat.completions.create({
        model: "llama-3-2-90b-vision-preview",
        messages: [
          ...messages,
          {
            role: "user",
            content: [
              {
                type: "text",
                text: prompt
              },
              {
                type: "image_url",
                image_url: {
                  url: `data:image/jpeg;base64,${imageBase64}`
                }
              }
            ]
          }
        ],
        temperature: 0.7,
        max_tokens: 1024,
        stream: false
      })
      return completion.choices[0]?.message?.content || ''
    }

    // Text-only completion
    const completion = await groq.chat.completions.create({
      model: "llama3-8b-8192",
      messages: [
        ...messages,
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 1024,
      stream: false
    })
    return completion.choices[0]?.message?.content || ''
  } catch (error) {
    console.error('Error generating response:', error)
    throw error
  }
}