
"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import type { EventData } from "@/lib/types"
import { eventsData, venuesData } from "@/lib/data"
import EventSidebar from "@/components/event-sidebar"

import { MapPin } from "lucide-react"
import Navbar from "./Navbar"

// Dynamically import the Map component with SSR disabled
const MapWithNoSSR = dynamic(() => import("@/components/map"), {
  loading: () => (
    <div className="flex h-[calc(100vh-64px)] items-center justify-center bg-slate-100">
      <div className="flex flex-col items-center gap-2 text-center">
        <MapPin className="h-10 w-10 animate-pulse text-primary" />
        <p className="text-lg font-medium">Loading map...</p>
      </div>
    </div>
  ),
  ssr: false,
})

export default function EventMap() {
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [events, setEvents] = useState<EventData[]>(eventsData)
  const [filteredEvents, setFilteredEvents] = useState<EventData[]>(eventsData)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState<string | null>(null)

  useEffect(() => {
    const filtered = events.filter((event) => {
      const titleMatch = event.title.toLowerCase().includes(searchQuery.toLowerCase())
      const artistMatch = event.artists.some((artist) => artist.toLowerCase().includes(searchQuery.toLowerCase()))
      const venueMatch = event.venue.address.toLowerCase().includes(searchQuery.toLowerCase())
      const typeMatch = !filterType || event.event_type === filterType

      return titleMatch || artistMatch || venueMatch || typeMatch
    })

    setFilteredEvents(filtered)
  }, [searchQuery, filterType, events])

  const handleEventSelect = (event: EventData) => {
    setSelectedEvent(event)
    setSidebarOpen(true)
  }

  const handleBookEvent = (eventId: string) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) => (event.id === eventId ? { ...event, isBooked: !event.isBooked } : event)),
    )
  }

  const handleFilterChange = (type: string | null) => {
    setFilterType(type)
  }

  return (
    <div className="flex h-screen w-screen flex-col">
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filterType={filterType}
        setFilterType={handleFilterChange}
      />

      <div className="relative flex flex-1 overflow-hidden">
        <MapWithNoSSR events={filteredEvents} venues={venuesData} onEventSelect={handleEventSelect} />

        <EventSidebar
          event={selectedEvent}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          onBook={handleBookEvent}
        />
      </div>
    </div>
  )
}
