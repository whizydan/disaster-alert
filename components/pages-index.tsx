// components/pages-index.tsx
'use client'

import React, { useState, useEffect } from 'react'
import { Bell, MapPin, Users } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { useLanguage } from '@/components/layout/main-layout'

interface Alert {
  id: number
  title: string
  severity: 'High' | 'Medium' | 'Low'
}

interface SafeRoute {
  id: number
  name: string
}

const translations = {
  en: {
    dashboard: 'Dashboard',
    activeAlerts: 'Active Alerts',
    sinceLastHour: 'since last hour',
    highRiskAreas: 'High-Risk Areas',
    sinceYesterday: 'since yesterday',
    safeRoutes: 'Safe Routes',
    newRoutesAdded: 'new routes added',
    recentAlerts: 'Recent Alerts',
    view: 'View',
    high: 'High',
    medium: 'Medium',
    low: 'Low',
    communityReports: 'Community Reports'
  },
  sw: {
    dashboard: 'Dashibodi',
    activeAlerts: 'Tahadhari Zinazoendelea',
    sinceLastHour: 'tangu saa iliyopita',
    highRiskAreas: 'Maeneo ya Hatari Kubwa',
    sinceYesterday: 'tangu jana',
    safeRoutes: 'Njia Salama',
    newRoutesAdded: 'njia mpya zimeongezwa',
    recentAlerts: 'Tahadhari za Hivi Karibuni',
    view: 'Tazama',
    high: 'Juu',
    medium: 'Wastani',
    low: 'Chini',
    communityReports: 'Ripoti za Jamii'
  }
}

export function Index() {
  const { language } = useLanguage()
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [routes, setRoutes] = useState<SafeRoute[]>([])

  useEffect(() => {
    // Simulate fetching alerts
    setAlerts([
      { id: 1, title: 'Flood in Mombasa', severity: 'High' },
      { id: 2, title: 'Drought in Turkana', severity: 'Medium' },
      { id: 3, title: "Landslide in Murang'a", severity: 'High' },
    ])

    // Simulate fetching routes
    setRoutes([
      { id: 1, name: 'Nairobi to Nakuru' },
      { id: 2, name: 'Mombasa to Malindi' },
    ])
  }, [])

  const t = translations[language]

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">{t.dashboard}</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <CardContent className="p-0">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">{t.activeAlerts}</p>
                <h3 className="text-2xl font-bold mt-2">3</h3>
                <p className="text-sm text-muted-foreground">+2 {t.sinceLastHour}</p>
              </div>
              <Bell className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card className="p-6">
          <CardContent className="p-0">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">{t.highRiskAreas}</p>
                <h3 className="text-2xl font-bold mt-2">5</h3>
                <p className="text-sm text-muted-foreground">+1 {t.sinceYesterday}</p>
              </div>
              <MapPin className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card className="p-6">
          <CardContent className="p-0">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">{t.communityReports}</p>
                <h3 className="text-2xl font-bold mt-2">15</h3>
                <p className="text-sm text-muted-foreground">+5 {t.sinceYesterday}</p>
              </div>
              <Users className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card className="p-6">
          <CardContent className="p-0">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">{t.safeRoutes}</p>
                <h3 className="text-2xl font-bold mt-2">2</h3>
                <p className="text-sm text-muted-foreground">2 {t.newRoutesAdded}</p>
              </div>
              <MapPin className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Alerts and Safe Routes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4">{t.recentAlerts}</h2>
            <div className="space-y-4">
              {alerts.map((alert) => (
                <div key={alert.id} className="flex items-center justify-between">
                  <span className="font-medium">{alert.title}</span>
                  <span
                    className={cn(
                      "px-2 py-1 text-xs rounded",
                      alert.severity === 'High' ? "bg-red-100 text-red-700" :
                      alert.severity === 'Medium' ? "bg-yellow-100 text-yellow-700" :
                      "bg-green-100 text-green-700"
                    )}
                  >
                    {t[alert.severity.toLowerCase() as 'high' | 'medium' | 'low']}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card>
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4">{t.safeRoutes}</h2>
            <div className="space-y-4">
              {routes.map((route) => (
                <div key={route.id} className="flex items-center justify-between">
                  <span className="font-medium">{route.name}</span>
                  <Button variant="outline" size="sm">
                    {t.view}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}