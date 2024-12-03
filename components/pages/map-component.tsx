// components/pages/map-component.tsx
'use client'

import React, { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Define types for safe locations
interface SafeLocation {
  position: [number, number]
  name: string
}

interface SafeLocationsData {
  safehouse: SafeLocation[]
  evacuation: SafeLocation[]
  hospital: SafeLocation[]
}

const markerIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
})

interface MapComponentProps {
  language: 'en' | 'sw'
  selectedLocationType: string
}

const locationLabels = {
  en: {
    yourLocation: 'Your location',
    loading: 'Loading map...'
  },
  sw: {
    yourLocation: 'Mahali ulipo',
    loading: 'Inapakia ramani...'
  }
}

// Mock safe locations data with proper typing
const safeLocations: SafeLocationsData = {
  safehouse: [
    { position: [-1.2821, 36.8219], name: 'Central Safe House' },
    { position: [-1.2773, 36.8162], name: 'Western Safe House' },
  ],
  evacuation: [
    { position: [-1.2673, 36.8062], name: 'Main Evacuation Point' },
    { position: [-1.2751, 36.8116], name: 'Secondary Evacuation Point' },
  ],
  hospital: [
    { position: [-1.2931, 36.8172], name: 'Emergency Hospital' },
    { position: [-1.3031, 36.8072], name: 'City Hospital' },
  ]
}

export default function MapComponent({ language, selectedLocationType }: MapComponentProps) {
  const [isClient, setIsClient] = useState(false)
  const [position, setPosition] = useState<[number, number]>([-1.2921, 36.8219])
  const labels = locationLabels[language]

  useEffect(() => {
    setIsClient(true)
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setPosition([position.coords.latitude, position.coords.longitude])
      },
      () => {
        setPosition([-1.2921, 36.8219]) // Fallback to Nairobi
      }
    )
  }, [])

  if (!isClient) {
    return <div>{labels.loading}</div>
  }

  // Filter locations based on selectedLocationType with proper typing
  const filteredLocations = selectedLocationType === 'all' 
    ? Object.values(safeLocations).flat()
    : safeLocations[selectedLocationType as keyof SafeLocationsData] || []

  return (
    <MapContainer
      center={position}
      zoom={13}
      style={{ height: '100%', width: '100%', zIndex: 1 }}
      scrollWheelZoom={true}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {/* User's location marker */}
      <Marker position={position} icon={markerIcon}>
        <Popup>
          {labels.yourLocation}
        </Popup>
      </Marker>

      {/* Safe locations markers */}
      {filteredLocations.map((location: SafeLocation, index: number) => (
        <Marker
          key={index}
          position={location.position}
          icon={markerIcon}
        >
          <Popup>
            {location.name}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}