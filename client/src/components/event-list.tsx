"use client"

import { useState } from "react"
import { Calendar, MapPin, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { mockEvents } from "@/lib/mock-data"

export function EventList() {
  const [selectedCategory, setSelectedCategory] = useState("all")

  // Filter events based on selected category
  const filteredEvents =
    selectedCategory === "all" ? mockEvents : mockEvents.filter((event) => event.status === selectedCategory)

  return (
    <div className="flex-1 overflow-y-auto pb-16 md:pb-0">
      {filteredEvents.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  )
}

function EventCard({ event }) {
  // Status badge styling
  const getBadgeVariant = () => {
    switch (event.status) {
      case "happening":
        return "default"
      case "upcoming":
        return "secondary"
      case "past":
        return "outline"
      case "recommended":
        return "destructive"
      default:
        return "default"
    }
  }

  // Status label
  const getStatusLabel = () => {
    switch (event.status) {
      case "happening":
        return "Happening Now"
      case "upcoming":
        return "Upcoming"
      case "past":
        return "Past"
      case "recommended":
        return "Recommended"
      default:
        return ""
    }
  }

  return (
    <div className="border-b p-4 hover:bg-muted/50">
      <div className="flex gap-3">
        <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md">
          <img src={event.image || "/placeholder.svg"} alt={event.title} className="h-full w-full object-cover" />
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <h3 className="font-medium">{event.title}</h3>
            <Badge variant={getBadgeVariant()}>{getStatusLabel()}</Badge>
          </div>

          <div className="mt-1 space-y-1 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              <span>{event.venue}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              <span>{event.attendees} attending</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3 flex gap-2">
        <Button size="sm" className="flex-1">
          Book Tickets
        </Button>
        <Button size="sm" variant="outline" className="flex-1">
          Details
        </Button>
      </div>
    </div>
  )
}

