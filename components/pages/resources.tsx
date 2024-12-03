// components/pages/resources.tsx
'use client'

import React, { useState } from 'react'
import { Download, ExternalLink, PlayCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useLanguage } from '@/components/layout/main-layout'

interface Resource {
  id: number
  title: { en: string; sw: string }
  description: { en: string; sw: string }
  type: 'guide' | 'video' | 'external'
  url: string
}

const translations = {
  en: {
    resources: 'Resources',
    searchResources: 'Search resources',
    all: 'All',
    guides: 'Guides',
    videos: 'Videos',
    external: 'External Links',
    downloadPDF: 'Download PDF',
    watchVideo: 'Watch Video',
    visitWebsite: 'Visit Website',
    firstAid: 'First Aid',
    disasterResponse: 'Disaster Response',
    emergencyContacts: 'Emergency Contacts'
  },
  sw: {
    resources: 'Rasilimali',
    searchResources: 'Tafuta rasilimali',
    all: 'Zote',
    guides: 'Miongozo',
    videos: 'Video',
    external: 'Viungo vya Nje',
    downloadPDF: 'Pakua PDF',
    watchVideo: 'Tazama Video',
    visitWebsite: 'Tembelea Tovuti',
    firstAid: 'Huduma ya Kwanza',
    disasterResponse: 'Kukabiliana na Majanga',
    emergencyContacts: 'Nambari za Dharura'
  }
}

const resources: Resource[] = [
  {
    id: 1,
    title: {
      en: 'First Aid Training Manual',
      sw: 'Mwongozo wa Mafunzo ya Huduma ya Kwanza'
    },
    description: {
      en: 'Official manual for first aid training provided by the Kenya Red Cross Society.',
      sw: 'Mwongozo rasmi wa mafunzo ya huduma ya kwanza kutoka Msalaba Mwekundu Kenya.'
    },
    type: 'guide',
    url: 'https://www.redcross.or.ke/first-aid-training-manual'
  },
  {
    id: 2,
    title: {
      en: 'Disaster Preparedness Guide',
      sw: 'Mwongozo wa Kujiandaa na Majanga'
    },
    description: {
      en: 'Learn how to prepare for various disasters and emergencies.',
      sw: 'Jifunze jinsi ya kujiandaa kwa majanga na dharura mbalimbali.'
    },
    type: 'guide',
    url: 'https://www.redcross.or.ke/disaster-preparedness-guide'
  },
  {
    id: 3,
    title: {
      en: 'Kenya Red Cross Mobile App',
      sw: 'App ya Msalaba Mwekundu Kenya'
    },
    description: {
      en: 'Download the official app for updates and emergency alerts.',
      sw: 'Pakua app rasmi kwa taarifa na tahadhari za dharura.'
    },
    type: 'external',
    url: 'https://www.redcross.or.ke/mobile-app'
  },
  {
    id: 4,
    title: {
      en: 'Blood Donation Information',
      sw: 'Taarifa za Utoaji Damu'
    },
    description: {
      en: 'Find out how and where to donate blood in Kenya.',
      sw: 'Pata taarifa jinsi na wapi pa kutoa damu nchini Kenya.'
    },
    type: 'external',
    url: 'https://www.redcross.or.ke/blood-donation'
  },
  {
    id: 5,
    title: {
      en: 'CPR Training Video',
      sw: 'Video ya Mafunzo ya CPR'
    },
    description: {
      en: 'Step-by-step video guide on performing CPR.',
      sw: 'Mwongozo wa video wa hatua kwa hatua wa kufanya CPR.'
    },
    type: 'video',
    url: 'https://www.youtube.com/watch?v=pwyOCAt5FNc' // Example YouTube link
  },
  {
    id: 6,
    title: {
      en: 'Emergency Contact Numbers',
      sw: 'Nambari za Dharura'
    },
    description: {
      en: 'List of important emergency contact numbers in Kenya.',
      sw: 'Orodha ya nambari muhimu za dharura nchini Kenya.'
    },
    type: 'guide',
    url: 'https://www.redcross.org/contact-us.html'
  }
]

function ResourceCard({ resource, language }: { resource: Resource; language: 'en' | 'sw' }) {
  const t = translations[language]
  
  const getButtonText = (type: string) => {
    switch(type) {
      case 'guide': return t.downloadPDF
      case 'video': return t.watchVideo
      case 'external': return t.visitWebsite
      default: return ''
    }
  }

  const getIcon = (type: string) => {
    switch(type) {
      case 'guide': return <Download className="mr-2 h-4 w-4" />
      case 'video': return <PlayCircle className="mr-2 h-4 w-4" />
      case 'external': return <ExternalLink className="mr-2 h-4 w-4" />
      default: return null
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{resource.title[language]}</CardTitle>
        <CardDescription>{resource.description[language]}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button 
          variant="outline" 
          className="w-full"
          onClick={() => window.open(resource.url, '_blank')}
        >
          {getIcon(resource.type)}
          {getButtonText(resource.type)}
        </Button>
      </CardContent>
    </Card>
  )
}

export default function ResourcesPage() {
  const { language } = useLanguage()
  const [searchQuery, setSearchQuery] = useState('')
  const t = translations[language]

  const filteredResources = resources.filter(resource =>
    resource.title[language].toLowerCase().includes(searchQuery.toLowerCase()) ||
    resource.description[language].toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="p-8 h-screen flex flex-col">
      <h1 className="text-2xl font-bold mb-6 text-[#800000]">{t.resources}</h1>
      
      <div className="mb-6">
        <Input
          placeholder={t.searchResources}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-md"
        />
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">{t.all}</TabsTrigger>
          <TabsTrigger value="guides">{t.guides}</TabsTrigger>
          <TabsTrigger value="videos">{t.videos}</TabsTrigger>
          <TabsTrigger value="external">{t.external}</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredResources.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} language={language} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="guides">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredResources
              .filter(r => r.type === 'guide')
              .map((resource) => (
                <ResourceCard key={resource.id} resource={resource} language={language} />
              ))}
          </div>
        </TabsContent>
        <TabsContent value="videos">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredResources
              .filter(r => r.type === 'video')
              .map((resource) => (
                <ResourceCard key={resource.id} resource={resource} language={language} />
              ))}
          </div>
        </TabsContent>
        <TabsContent value="external">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredResources
              .filter(r => r.type === 'external')
              .map((resource) => (
                <ResourceCard key={resource.id} resource={resource} language={language} />
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
