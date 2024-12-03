// components/layout/sidebar.tsx
'use client'

import React, { useState } from 'react'
import { AlertTriangle, Home, Bell, MapPin, Users, Calendar, Settings, HelpCircle, ChevronLeft, ChevronRight, MessageSquare, FileText } from 'lucide-react'
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { cn } from "@/lib/utils"
import { usePathname } from 'next/navigation'

interface SidebarProps {
  translations: Record<string, string>
  onCollapse?: (collapsed: boolean) => void
}

export function Sidebar({ translations: t, onCollapse }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const pathname = usePathname()

  const handleCollapse = () => {
    setIsCollapsed(!isCollapsed)
    onCollapse?.(!isCollapsed)
  }

  const navItems = [
    { icon: Home, label: t.dashboard, href: '/' },
    { icon: Bell, label: t.alerts, href: '/alerts' },
    { icon: MapPin, label: t.safetyMap, href: '/safety-map' },
    { icon: Users, label: t.communityReports, href: '/community' },
    { icon: Calendar, label: t.calendar, href: '/calendar' },
    { icon: MessageSquare, label: t.chatbot, href: '/chatbot' },
    { icon: FileText, label: t.resources, href: '/resources' },
    { icon: Settings, label: t.settings, href: '/settings' }
  ]

  return (
    <div 
      className={cn(
        "relative h-screen bg-[#800000] text-white transition-all duration-300",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-3 top-6 z-50 h-6 w-6 rounded-full bg-[#800000] text-white hover:bg-[#900000]"
        onClick={handleCollapse}
      >
        {isCollapsed ? 
          <ChevronRight className="h-4 w-4" /> : 
          <ChevronLeft className="h-4 w-4" />
        }
      </Button>

      <div className="p-4">
        <div className="flex items-center gap-2 mb-6">
          <AlertTriangle className="h-5 w-5" />
          {!isCollapsed && <span className="text-lg font-bold">{t.disasterAlert}</span>}
        </div>

        <nav className="space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded hover:bg-white/10 transition-all",
                pathname === item.href && "bg-white/20",
                isCollapsed ? "justify-center px-2" : "justify-start"
              )}
            >
              <item.icon className="h-5 w-5" />
              {!isCollapsed && <span className="text-sm">{item.label}</span>}
            </Link>
          ))}
        </nav>

        <div className={cn(
          "absolute bottom-8 left-0 px-4 space-y-2",
          isCollapsed ? "w-16" : "w-64"
        )}>
          <Link
            href="/help"
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded hover:bg-white/10",
              isCollapsed ? "justify-center px-2" : "justify-start"
            )}
          >
            <HelpCircle className="h-5 w-5" />
            {!isCollapsed && <span className="text-sm">{t.help}</span>}
          </Link>
        </div>
      </div>
    </div>
  )
}