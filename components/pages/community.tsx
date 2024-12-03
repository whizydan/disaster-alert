'use client'

import React, { useState, useEffect } from 'react'
import { Plus, ThumbsUp, MessageSquare, MapPin } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"

interface Report {
  id: number
  title: string
  description: string
  location: string
  type: string
  timestamp: string
  upvotes: number
  comments: number
  image?: string
}

export default function CommunityReportsPage() {
  const [reports, setReports] = useState<Report[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  // New state variables for form inputs
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [location, setLocation] = useState('')
  const [selectedType, setSelectedType] = useState('')

  useEffect(() => {
    // Simulate fetching reports
    const mockReports: Report[] = [
      {
        id: 1,
        title: 'Flooding on Main Street',
        description:
          'The intersection of Main and Oak is completely flooded. Cars are unable to pass.',
        location: 'Main Street & Oak Avenue',
        type: 'Flood',
        timestamp: '2023-06-15T13:30:00Z',
        upvotes: 15,
        comments: 3,
        image:
          'https://api.time.com/wp-content/uploads/2023/07/northeast-flooding-climate-01.jpg?quality=85&w=1440',
      },
      {
        id: 2,
        title: 'Power Outage in Downtown',
        description:
          'The entire downtown area has lost power. Traffic lights are out.',
        location: 'Downtown',
        type: 'Infrastructure',
        timestamp: '2023-06-15T14:45:00Z',
        upvotes: 32,
        comments: 7,
      },
      {
        id: 3,
        title: 'Tree Down on 5th Avenue',
        description:
          'A large tree has fallen across 5th Avenue, blocking both lanes.',
        location: '5th Avenue',
        type: 'Storm Damage',
        timestamp: '2023-06-15T15:20:00Z',
        upvotes: 8,
        comments: 2,
        image:
          'https://s7d2.scene7.com/is/image/TWCNews/tree_upper_east_side_ny1_ny_03242024IMG_7453?wid=1250&hei=703&$wide-bg$',
      },
    ]
    setReports(mockReports)
  }, [])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Create a new report object
    const newReport: Report = {
      id: reports.length + 1, // This is a simple increment; in real apps, use unique IDs
      title,
      description,
      location,
      type: selectedType,
      timestamp: new Date().toISOString(),
      upvotes: 0,
      comments: 0,
      image: previewUrl, // Assuming image is already uploaded and previewUrl is the URL
    }
    // Update the reports state by adding the new report at the top
    setReports([newReport, ...reports])
    // Reset form fields
    setTitle('')
    setDescription('')
    setLocation('')
    setSelectedType('')
    setSelectedFile(null)
    setPreviewUrl(null)
  }

  const filteredReports = reports.filter(
    (report) =>
      (report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        report.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        report.location.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (filterType === 'all' ||
        report.type.toLowerCase() === filterType.toLowerCase())
  )

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString()
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#800000]">
          Community Reports
        </h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-[#800000] hover:bg-[#600000]">
              <Plus className="mr-2 h-4 w-4" /> New Report
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px] max-h-[90vh] flex flex-col">
            <DialogHeader>
              <DialogTitle className="text-[#800000]">
                Submit a New Report
              </DialogTitle>
              <DialogDescription>
                Provide details about the situation you're reporting.
              </DialogDescription>
            </DialogHeader>
            <div className="flex-1 overflow-y-auto pr-2">
              {/* Scrollable content area */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    placeholder="Report title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Detailed description of the situation"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    placeholder="Location of the incident"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Report Type</Label>
                  <Select
                    value={selectedType}
                    onValueChange={setSelectedType}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Flood">Flood</SelectItem>
                      <SelectItem value="Fire">Fire</SelectItem>
                      <SelectItem value="Storm Damage">
                        Storm Damage
                      </SelectItem>
                      <SelectItem value="Infrastructure">
                        Infrastructure
                      </SelectItem>
                      <SelectItem value="Hazard">Hazard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="image">Upload Image</Label>
                  <div className="flex flex-col gap-4">
                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#800000] file:text-white hover:file:bg-[#600000]"
                    />
                    {previewUrl && (
                      <div className="relative w-full h-48">
                        <img
                          src={previewUrl}
                          alt="Preview"
                          className="w-full h-full object-cover rounded-md"
                        />
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex pt-4 mt-4 border-t">
                  {/* Fixed footer with submit button */}
                  <Button
                    type="submit"
                    className="w-full bg-[#800000] hover:bg-[#600000]"
                  >
                    Submit Report
                  </Button>
                </div>
              </form>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="flex-1">
          <Input
            placeholder="Search reports"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="flood">Flood</SelectItem>
            <SelectItem value="fire">Fire</SelectItem>
            <SelectItem value="storm damage">Storm Damage</SelectItem>
            <SelectItem value="infrastructure">Infrastructure</SelectItem>
            <SelectItem value="hazard">Hazard</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4">
        {filteredReports.map((report) => (
          <Card key={report.id} className="overflow-hidden">
            <CardHeader className="bg-[#800000]/5">
              <CardTitle className="text-[#800000]">
                {report.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <p className="text-sm text-gray-500 mb-4">
                {report.description}
              </p>
              {report.image && (
                <div className="mb-4 relative w-full h-48">
                  <img
                    src={report.image}
                    alt={report.title}
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
              )}
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" /> {report.location}
                </span>
                <span>{report.type}</span>
                <span>{formatDate(report.timestamp)}</span>
              </div>
              <div className="flex items-center gap-4 mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-[#800000] border-[#800000] hover:bg-[#800000] hover:text-white"
                >
                  <ThumbsUp className="mr-2 h-4 w-4" /> {report.upvotes}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-[#800000] border-[#800000] hover:bg-[#800000] hover:text-white"
                >
                  <MessageSquare className="mr-2 h-4 w-4" /> {report.comments}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
