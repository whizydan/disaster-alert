// src/components/pages/chatbot.tsx
'use client'

import React, { useState, useRef } from 'react'
import { Send, Mic, ImageIcon, Loader2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { useLanguage } from '@/components/layout/main-layout'

interface Message {
  role: 'user' | 'assistant'
  content: string
  image?: string
}

const translations = {
  en: {
    chatbot: 'AI Assistant',
    chatHistory: 'Chat History',
    typeMessage: 'Type your message...',
    imageSelected: 'Image selected',
    send: 'Send',
    listen: 'Listen',
    speak: 'Speak',
    loading: 'Processing your request...',
    errorImageSize: 'Image size should be less than 5MB',
    errorMessage: 'Failed to generate response. Please try again.',
    speechError: 'Speech recognition not supported in this browser'
  },
  sw: {
    chatbot: 'Msaidizi wa AI',
    chatHistory: 'Historia ya Mazungumzo',
    typeMessage: 'Andika ujumbe wako...',
    imageSelected: 'Picha imechaguliwa',
    send: 'Tuma',
    listen: 'Sikiliza',
    speak: 'Ongea',
    loading: 'Inashughulikia ombi lako...',
    errorImageSize: 'Ukubwa wa picha unapaswa kuwa chini ya 5MB',
    errorMessage: 'Imeshindwa kutoa jibu. Tafadhali jaribu tena.',
    speechError: 'Utambuzi wa sauti haupatikani katika kivinjari hiki'
  }
}

export default function Chatbot() {
  const { language } = useLanguage()
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const t = translations[language]

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setError(t.errorImageSize)
        return
      }

      setSelectedImage(file)
      const preview = URL.createObjectURL(file)
      setImagePreview(preview)
      setError(null)
    }
  }

  const handleSend = async () => {
    if (input.trim() === '' && !selectedImage) return
    setIsLoading(true)
    setError(null)

    try {
      let imageBase64 = null
      if (selectedImage) {
        const buffer = await selectedImage.arrayBuffer()
        imageBase64 = Buffer.from(buffer).toString('base64')
      }

      // Add user message
      const userMessage: Message = {
        role: 'user',
        content: input,
        image: imagePreview || undefined
      }
      setMessages(prev => [...prev, userMessage])
      setInput('')
      setSelectedImage(null)
      setImagePreview(null)

      // Call API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: input,
          language,
          image: imageBase64
        })
      })

      if (!response.ok) {
        throw new Error('Failed to get response')
      }

      const data = await response.json()

      // Add assistant response
      const assistantMessage: Message = {
        role: 'assistant',
        content: data.response
      }
      setMessages(prev => [...prev, assistantMessage])

      // Handle text-to-speech if needed
      if (window.speechSynthesis) {
        const utterance = new SpeechSynthesisUtterance(data.response)
        utterance.lang = language === 'en' ? 'en-US' : 'sw-KE'
        speechSynthesis.speak(utterance)
      }
    } catch (error) {
      console.error('Error:', error)
      setError(t.errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window)) {
      setError(t.speechError)
      return
    }

    const recognition = new window.webkitSpeechRecognition() as SpeechRecognitionInstance
    recognition.lang = language === 'en' ? 'en-US' : 'sw-KE'

    recognition.onstart = () => {
      setIsListening(true)
      setError(null)
    }

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript
      setInput(transcript)
    }

    recognition.onerror = () => {
      setIsListening(false)
      setError(t.speechError)
    }

    recognition.onend = () => setIsListening(false)

    recognition.start()
  }

  return (
    <div className="p-8 h-screen flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#800000]">{t.chatbot}</h1>
        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}
      </div>
      
      <Card className="flex-1 flex flex-col">
        <CardHeader>
          <CardTitle>{t.chatHistory}</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 overflow-auto p-6">
          {messages.map((message, index) => (
            <div 
              key={index} 
              className={`mb-6 ${message.role === 'user' ? 'text-right' : 'text-left'}`}
            >
              <div className={`inline-block max-w-[80%] p-4 rounded-lg ${
                message.role === 'user' ? 'bg-[#800000] text-white' : 'bg-gray-100 text-black'
              }`}>
                {message.image && (
                  <img 
                    src={message.image}
                    alt="Uploaded content"
                    className="max-w-full h-auto rounded-lg mb-2"
                  />
                )}
                <p className="text-base leading-relaxed">{message.content}</p>
              </div>
            </div>
          ))}
        </CardContent>
        
        <div className="p-4 border-t bg-white">
          {imagePreview && (
            <div className="mb-2">
              <img 
                src={imagePreview}
                alt="Preview"
                className="max-h-32 rounded-lg"
              />
            </div>
          )}
          
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <Button
                onClick={() => fileInputRef.current?.click()}
                variant="outline"
                size="icon"
                disabled={isLoading}
                className="text-[#800000]"
              >
                <ImageIcon className="h-4 w-4" />
              </Button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
              />
            </div>
            
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t.typeMessage}
              className="flex-1 min-h-[60px]"
              disabled={isLoading}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleSend()
                }
              }}
            />
            
            <div className="flex flex-col gap-2">
              <Button
                onClick={startListening}
                variant="outline"
                size="icon"
                disabled={isLoading || isListening}
                className={`text-[#800000] ${isListening ? 'bg-red-50' : ''}`}
              >
                <Mic className="h-4 w-4" />
              </Button>
              
              <Button
                onClick={handleSend}
                disabled={isLoading || (!input.trim() && !selectedImage)}
                className="bg-[#800000] hover:bg-[#600000]"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
