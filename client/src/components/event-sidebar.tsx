"use client"

import { useState } from "react"
import type { EventData } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, Music, Users, X } from "lucide-react"
import { formatDate } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-media-query"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Sheet, SheetContent } from "@/components/ui/sheet"

interface EventSidebarProps {
  event: EventData | null
  isOpen: boolean
  onClose: () => void
  onBook: (eventId: string) => void
}

export default function EventSidebar({ event, isOpen, onClose, onBook }: EventSidebarProps) {
  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false)
  const isMobile = useMediaQuery("(max-width: 768px)")

  const handleBookEvent = () => {
    if (event) {
      onBook(event.id)
      setIsBookingConfirmed(true)

      // Reset confirmation after 3 seconds
      setTimeout(() => {
        setIsBookingConfirmed(false)
      }, 3000)
    }
  }

  const EventContent = () => {
    if (!event) return null

    return (
      <div className="flex h-full w-full flex-col">
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="text-xl font-bold">Event Details</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <div
            className="mb-4 h-48 w-full rounded-lg bg-cover bg-center"
            style={{ backgroundImage: `url(${event.image || "/placeholder.svg?height=192&width=384"})` }}
          />

          <div className="mb-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold">{event.title}</h1>
            <Badge variant={event.isFull ? "destructive" : "default"}>{event.isFull ? "Sold Out" : "Available"}</Badge>
          </div>

          <div className="mb-6 space-y-3">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              <span>{formatDate(event.date)}</span>
              <Clock className="ml-2 h-5 w-5 text-primary" />
              <span>{event.time}</span>
            </div>

            <div className="flex items-center gap-2">
              <Music className="h-5 w-5 text-primary" />
              <span className="font-medium">Artists:</span>
              <span>{event.artists.join(", ")}</span>
            </div>

            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              <span className="font-medium">Venue:</span>
              <span>{event.venue.address}</span>
            </div>

            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <span className="font-medium">Capacity:</span>
              <span>{event.venue.capacity}</span>
            </div>
          </div>

          <div className="mb-6 rounded-lg bg-muted p-4">
            <h3 className="mb-2 text-lg font-semibold">About this event</h3>
            <p>
              {event.description || "Join us for an amazing event featuring talented artists and a great atmosphere!"}
            </p>
          </div>

          <div className="mb-6">
            <h3 className="mb-2 text-lg font-semibold">Organized by</h3>
            <p>{event.booked_by}</p>
          </div>
        </div>

        <div className="border-t p-4">
          {event.isFull ? (
            <Button disabled className="w-full">
              Sold Out
            </Button>
          ) : event.isBooked ? (
            <div className="space-y-2">
              <Button variant="outline" className="w-full" onClick={handleBookEvent}>
                Cancel Booking
              </Button>
              {isBookingConfirmed && (
                <p className="text-center text-sm text-muted-foreground">Booking cancelled successfully!</p>
              )}
            </div>
          ) : (
            <div className="space-y-2">
              <Button className="w-full" onClick={handleBookEvent}>
                Book Now
              </Button>
              {isBookingConfirmed && (
                <p className="text-center text-sm text-primary">Booking confirmed successfully!</p>
              )}
            </div>
          )}
        </div>
      </div>
    )
  }

  if (!event) return null

  if (isMobile) {
    return (
      <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DialogContent className="h-[90vh] max-w-md p-0 sm:max-w-md">
          <EventContent />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent side="right" className="w-[400px] p-0 sm:max-w-md">
        <EventContent />
      </SheetContent>
    </Sheet>
  )
}

