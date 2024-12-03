// components/pages/safety-map.tsx
'use client'

import React, { useState, useEffect } from 'react'
import { MapPin } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import dynamic from 'next/dynamic'
import { useLanguage } from '@/components/layout/main-layout'
import type { LatLngExpression } from 'leaflet'

// Import styles in a useEffect
import 'leaflet/dist/leaflet.css'

const translations = {
  en: {
    safetyMap: 'Safety Map',
    weatherInfo: 'Weather Information',
    safeLocations: 'Safe Locations',
    weatherAndSafety: 'Weather and Safety Information',
    safeHouses: 'Safe Houses',
    evacuationPoints: 'Evacuation Points',
    hospitals: 'Hospitals',
    selectLocation: 'Select Location Type',
  },
  sw: {
    safetyMap: 'Ramani ya Usalama',
    weatherInfo: 'Taarifa za Hali ya Hewa',
    safeLocations: 'Maeneo Salama',
    weatherAndSafety: 'Taarifa za Hali ya Hewa na Usalama',
    safeHouses: 'Nyumba Salama',
    evacuationPoints: 'Vituo vya Kuhamia',
    hospitals: 'Hospitali',
    selectLocation: 'Chagua Aina ya Eneo',
  }
}

// Dynamic import of MapComponent with no SSR
const MapComponent = dynamic(() => import('./map-component'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg">
      <p>Loading map...</p>
    </div>
  ),
})

export default function SafetyMap() {
  const { language } = useLanguage()
  const [selectedLocationType, setSelectedLocationType] = useState<string>('all')
  const t = translations[language]

  return (
    <div className="p-8 h-screen flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#800000]">{t.safetyMap}</h1>
        <Select value={selectedLocationType} onValueChange={setSelectedLocationType}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder={t.selectLocation} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t.safeLocations}</SelectItem>
            <SelectItem value="safehouse">{t.safeHouses}</SelectItem>
            <SelectItem value="evacuation">{t.evacuationPoints}</SelectItem>
            <SelectItem value="hospital">{t.hospitals}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card className="flex-1">
        <CardHeader>
          <CardTitle>{t.weatherAndSafety}</CardTitle>
        </CardHeader>
        <CardContent className="p-0 flex-1 h-[calc(100vh-250px)]"> {/* Added fixed height */}
          <MapComponent 
            language={language} 
            selectedLocationType={selectedLocationType}
          />
        </CardContent>
      </Card>
    </div>
  )
}