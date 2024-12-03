// components/pages/map-component.tsx
'use client'

import React, { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Import marker icons
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

export default function MapComponent({ language, selectedLocationType }: MapComponentProps) {
  const [isClient, setIsClient] = useState(false)
  const [position, setPosition] = useState<[number, number]>([-1.2921, 36.8219]) // Nairobi coordinates

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

  if (!isClient) return null

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
      <Marker position={position} icon={markerIcon}>
        <Popup>
          Your location
        </Popup>
      </Marker>
    </MapContainer>
  )
}