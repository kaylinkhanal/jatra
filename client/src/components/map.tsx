
"use client"

import { useEffect, useState } from "react"
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import "leaflet-defaulticon-compatibility"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"
import type { EventData, VenueData } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin, Music, Search, Users } from "lucide-react"
import { formatDate } from "@/lib/utils"
import { Input } from "./ui/input"

interface MapProps {
  events: EventData[]
  venues: VenueData[]
  onEventSelect: (event: EventData) => void
  onBookEvent: (eventId: string) => void
}

export default function Map({ events, venues, onEventSelect, onBookEvent }: MapProps) {
  const [mapCenter, setMapCenter] = useState<[number, number]>([27.700769, 85.30014])
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient) {
      return
    }
    delete (L.Icon.Default.prototype as any)._getIconUrl

    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "/marker-icon-2x.png",
      iconUrl: "/marker-icon.png",
      shadowUrl: "/marker-shadow.png",
    })
  }, [isClient])

  const createEventIcon = (isFull: boolean, isBooked: boolean) => {
    return new L.Icon({
      iconUrl: isBooked ? "/booked-event-marker.svg" : isFull ? "/full-event-marker.svg" : "/event-marker.svg",
      iconSize: [40, 40],
      iconAnchor: [20, 40],
      popupAnchor: [0, -40],
      className: `event-marker ${isFull ? "event-full" : ""} ${isBooked ? "event-booked" : ""}`,
    })
  }

  const createVenueIcon = () => {
    return new L.Icon({
      iconUrl: "/venue-marker.svg",
      iconSize: [36, 36],
      iconAnchor: [18, 36],
      popupAnchor: [0, -36],
      className: "venue-marker",
    })
  }

  // Component to recenter map when filtered events change
  function MapUpdater({ events }: { events: EventData[] }) {
    const map = useMap()

    useEffect(() => {
      if (events.length > 0) {
        // Calculate bounds of all events
        const bounds = L.latLngBounds(events.map((event) => [event.venue.latitude, event.venue.longitude]))
        map.fitBounds(bounds, { padding: [50, 50] })
      }
    }, [events, map])

    return null
  }

  return (
    <div className="h-full w-full">
      <MapContainer
        center={mapCenter}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
        className="z-0"
      >

        <div className="absolute left-24 top-4 z-999 bg-white">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search events, artists, or locations..."
            className="w-full pl-8"
          />
        </div>
        </div>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapUpdater events={events} />

        {events.map((event) => (
          <Marker
            key={event.id}
            position={[event.venue.latitude, event.venue.longitude]}
            icon={createEventIcon(event.isFull || false, event.isBooked || false)}
            eventHandlers={{
              click: () => {
                onEventSelect(event)
              },
            }}
          >
            <Popup className="event-popup">
              <div className="w-72 p-1">
                <div
                  className="mb-2 h-32 w-full rounded-md bg-cover bg-center"
                  style={{ backgroundImage: `url(${event.image || "/placeholder.svg?height=128&width=256"})` }}
                />
                <h3 className="text-lg font-bold">{event.title}</h3>
                <div className="my-2 flex items-center gap-1 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(event.date)}</span>
                  <Clock className="ml-2 h-4 w-4" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Music className="h-4 w-4" />
                  <span>{event.artists.join(", ")}</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{event.venue.address}</span>
                </div>

                <div className="mt-3 flex gap-2">
                  {event.isFull ? (
                    <Button disabled className="flex-1">
                      Sold Out
                    </Button>
                  ) : event.isBooked ? (
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={(e) => {
                        e.stopPropagation()
                        onBookEvent(event.id)
                      }}
                    >
                      Cancel Booking
                    </Button>
                  ) : (
                    <Button
                      className="flex-1"
                      onClick={(e) => {
                        e.stopPropagation()
                        onBookEvent(event.id)
                      }}
                    >
                      Book Now
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation()
                      onEventSelect(event)
                    }}
                  >
                    Details
                  </Button>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

        {venues.map((venue) => (
          <Marker key={venue.id} position={[venue.latitude, venue.longitude]} icon={createVenueIcon()}>
            <Popup>
              <div className="w-64 p-1">
                <div
                  className="mb-2 h-32 w-full rounded-md bg-cover bg-center"
                  style={{ backgroundImage: `url(${venue.venueImage || "/placeholder.svg?height=128&width=256"})` }}
                />
                <h3 className="text-lg font-bold">{venue.name}</h3>
                <div className="my-2 flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{venue.address}</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>Capacity: {venue.capacity}</span>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}
