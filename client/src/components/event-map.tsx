"use client"

import { useState } from "react"
import dynamic from "next/dynamic"
import { Loader2 } from "lucide-react"
import { mockEvents } from "@/lib/mock-data"

export default function EventMap() {
  // Dynamically import the map component with no SSR
  // This is important for Leaflet which requires browser APIs
  const Map = dynamic(() => import("@/components/map"), {
    loading: () => (
      <div className="flex h-full w-full items-center justify-center bg-muted/20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="sr-only">Loading map</span>
      </div>
    ),
    ssr: false,
  })

  const [selectedEvent, setSelectedEvent] = useState(null)

  return (
    <>
      {/* Map container */}
      <div className="h-full w-full">
        <Map events={mockEvents} onSelectEvent={setSelectedEvent} />
      </div>

      {/* Event preview that appears when marker is clicked */}
      {selectedEvent && (
        <div className="absolute bottom-4 left-1/2 z-[1000] w-[90%] max-w-md -translate-x-1/2 rounded-lg bg-background p-4 shadow-lg md:bottom-8">
          <EventPreview event={mockEvents.find((e) => e.id === selectedEvent)} onClose={() => setSelectedEvent(null)} />
        </div>
      )}
    </>
  )
}

function EventPreview({ event, onClose }) {
  if (!event) return null

  return (
    <div className="flex gap-3">
      <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
        <img src={event.image || "/placeholder.svg"} alt={event.title} className="h-full w-full object-cover" />
      </div>
      <div className="flex-1">
        <h3 className="font-medium">{event.title}</h3>
        <p className="text-sm text-muted-foreground">{event.date}</p>
        <p className="text-sm text-muted-foreground">{event.venue}</p>
      </div>
      <button onClick={onClose} className="h-6 w-6 flex-shrink-0 rounded-full hover:bg-muted">
        ×
      </button>
    </div>
  )
}

