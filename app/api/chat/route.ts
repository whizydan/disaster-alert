// app/api/chat/route.ts
import { NextResponse } from 'next/server'
import { generateResponse } from '@/lib/groq-client'

export async function POST(req: Request) {
  try {
    const { prompt, language, image } = await req.json()
    const response = await generateResponse(prompt, language, image)
    return NextResponse.json({ response })
  } catch (error) {
    console.error('Error in chat API:', error)
    return NextResponse.json(
      { error: 'Failed to generate response' },
      { status: 500 }
    )
  }
}