'use client'

import React, { useState } from 'react'
import { Bell, MapPin, AlertTriangle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from '@/components/layout/main-layout'

const translations = {
  en: {
    activeAlerts: 'Active Alerts',
    filterByType: 'Filter by type',
    filterBySeverity: 'Filter by severity',
    searchPlaceholder: 'Search by location or description',
    allTypes: 'All Types',
    allSeverities: 'All Severities',
    flood: 'Flood',
    drought: 'Drought',
    landslide: 'Landslide',
    fire: 'Fire',
    earthquake: 'Earthquake',
    high: 'High',
    medium: 'Medium',
    low: 'Low',
    viewDetails: 'View Details',
    noAlertsTitle: 'No Alerts Found',
    noAlertsDescription: 'There are no active alerts matching your current filters.',
    // Alert descriptions
    floodDesc: 'Coastal flooding due to heavy rainfall',
    droughtDesc: 'Prolonged dry spell affecting crops',
    landslideDesc: 'Risk of landslides in hilly areas',
    fireDesc: 'Forest fire in Karura Forest',
    earthquakeDesc: 'Minor tremors reported',
  },
  sw: {
    activeAlerts: 'Tahadhari Zinazoendelea',
    filterByType: 'Chuja kwa aina',
    filterBySeverity: 'Chuja kwa ukali',
    searchPlaceholder: 'Tafuta kwa eneo au maelezo',
    allTypes: 'Aina Zote',
    allSeverities: 'Ukali Wote',
    flood: 'Mafuriko',
    drought: 'Ukame',
    landslide: 'Maporomoko ya Ardhi',
    fire: 'Moto',
    earthquake: 'Tetemeko la Ardhi',
    high: 'Juu',
    medium: 'Wastani',
    low: 'Chini',
    viewDetails: 'Tazama Maelezo',
    noAlertsTitle: 'Hakuna Tahadhari Zilizopatikana',
    noAlertsDescription: 'Hakuna tahadhari zinazofanana na vichujio vyako vya sasa.',
    // Alert descriptions in Swahili
    floodDesc: 'Mafuriko ya pwani kutokana na mvua kubwa',
    droughtDesc: 'Kipindi kirefu cha ukame kinaathiri mazao',
    landslideDesc: 'Hatari ya maporomoko ya ardhi katika maeneo ya vilima',
    fireDesc: 'Moto wa msitu katika Msitu wa Karura',
    earthquakeDesc: 'Mtetemeko mdogo ulioripotiwa',
  }
}

// Sample data with translations
const getAlertData = (language: 'en' | 'sw') => [
  { 
    id: 1, 
    type: translations[language].flood, 
    location: 'Mombasa', 
    severity: 'High', 
    description: translations[language].floodDesc, 
    timestamp: '2023-11-24T10:30:00Z' 
  },
  { 
    id: 2, 
    type: translations[language].drought, 
    location: 'Turkana', 
    severity: 'Medium', 
    description: translations[language].droughtDesc, 
    timestamp: '2023-11-23T14:45:00Z' 
  },
  { 
    id: 3, 
    type: translations[language].landslide, 
    location: "Murang'a", 
    severity: 'High', 
    description: translations[language].landslideDesc, 
    timestamp: '2023-11-22T08:15:00Z' 
  },
  { 
    id: 4, 
    type: translations[language].fire, 
    location: 'Nairobi', 
    severity: 'Medium', 
    description: translations[language].fireDesc, 
    timestamp: '2023-11-21T16:20:00Z' 
  },
  { 
    id: 5, 
    type: translations[language].earthquake, 
    location: 'Nakuru', 
    severity: 'Low', 
    description: translations[language].earthquakeDesc, 
    timestamp: '2023-11-20T22:10:00Z' 
  },
]

export default function Alerts() {
  const { language } = useLanguage()
  const [alerts, setAlerts] = useState(getAlertData(language))
  const [filterType, setFilterType] = useState('All Types')
  const [filterSeverity, setFilterSeverity] = useState('All Severities')
  const [searchQuery, setSearchQuery] = useState('')

  // Update alerts when language changes
  React.useEffect(() => {
    setAlerts(getAlertData(language))
    setFilterType('All Types')
    setFilterSeverity('All Severities')
  }, [language])

  const t = translations[language]

  const filterAlerts = () => {
    return alerts.filter(alert => 
      (filterType === t.allTypes || alert.type === filterType) &&
      (filterSeverity === t.allSeverities || alert.severity === filterSeverity) &&
      (alert.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
       alert.description.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'High': return 'bg-red-500 text-white'
      case 'Medium': return 'bg-yellow-500 text-black'
      case 'Low': return 'bg-green-500 text-white'
      default: return 'bg-gray-500 text-white'
    }
  }

  const getSeverityText = (severity: string) => {
    switch (severity) {
      case 'High': return t.high
      case 'Medium': return t.medium
      case 'Low': return t.low
      default: return severity
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-primary flex items-center">
        <Bell className="mr-2" />
        {t.activeAlerts}
      </h1>

      <div className="mb-6 flex flex-wrap gap-4">
        <Select onValueChange={(value) => setFilterType(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={t.filterByType} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={t.allTypes}>{t.allTypes}</SelectItem>
            <SelectItem value={t.flood}>{t.flood}</SelectItem>
            <SelectItem value={t.drought}>{t.drought}</SelectItem>
            <SelectItem value={t.landslide}>{t.landslide}</SelectItem>
            <SelectItem value={t.fire}>{t.fire}</SelectItem>
            <SelectItem value={t.earthquake}>{t.earthquake}</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={(value) => setFilterSeverity(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={t.filterBySeverity} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={t.allSeverities}>{t.allSeverities}</SelectItem>
            <SelectItem value="High">{t.high}</SelectItem>
            <SelectItem value="Medium">{t.medium}</SelectItem>
            <SelectItem value="Low">{t.low}</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex-grow">
          <Input
            type="text"
            placeholder={t.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filterAlerts().map(alert => (
          <Card key={alert.id} className="border-primary/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-lg font-bold text-primary">{alert.type}</CardTitle>
              <Badge className={getSeverityColor(alert.severity)}>
                {getSeverityText(alert.severity)}
              </Badge>
            </CardHeader>
            <CardContent>
              <p className="mb-2 flex items-center text-sm text-gray-600">
                <MapPin className="mr-1 h-4 w-4" /> {alert.location}
              </p>
              <p className="mb-4 text-sm">{alert.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">
                  {new Date(alert.timestamp).toLocaleString(language === 'sw' ? 'sw-KE' : 'en-US')}
                </span>
                <Button size="sm" variant="outline" className="text-primary border-primary hover:bg-primary hover:text-white">
                  {t.viewDetails}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filterAlerts().length === 0 && (
        <div className="text-center py-10">
          <AlertTriangle className="mx-auto h-12 w-12 text-yellow-500 mb-4" />
          <h3 className="text-xl font-semibold mb-2">{t.noAlertsTitle}</h3>
          <p className="text-gray-600">{t.noAlertsDescription}</p>
        </div>
      )}
    </div>
  )
}