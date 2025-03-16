"use client"
import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import "leaflet-defaulticon-compatibility"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"

// Create custom marker icons for different event types
const createCustomIcon = (color:any, emoji:any) => {
  return L.divIcon({
    className: "custom-marker-icon",
    html: `
      <div style="
        background-color: ${color}; 
        width: 32px; 
        height: 32px; 
        border-radius: 50%; 
        display: flex; 
        align-items: center; 
        justify-content: center; 
        border: 2px solid white;
        box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        font-size: 16px;
        color: white;
      ">
        ${emoji}
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  })
}

// Get marker icon based on event status
const getEventIcon = (status:any, emoji:any) => {
  switch (status) {
    case "happening":
      return createCustomIcon("#10b981", emoji) // green
    case "upcoming":
      return createCustomIcon("#3b82f6", emoji) // blue
    case "past":
      return createCustomIcon("#9ca3af", emoji) // gray
    case "recommended":
      return createCustomIcon("#8b5cf6", emoji) // purple
    default:
      return createCustomIcon("#f43f5e", emoji) // pink
  }
}

export default function Map({ events = [], onSelectEvent = () => {} }) {
  // Default center position (can be adjusted based on user location or event cluster)
  const defaultCenter = [27.7172, 85.3240]

  return (
    <MapContainer center={defaultCenter} zoom={13} scrollWheelZoom={true} style={{ height: "100%", width: "100%" }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Event markers */}
      {events.map((event) => (
        <Marker
          key={event.id}
          position={event.location}
          icon={getEventIcon(event.status, event.emoji)}
          eventHandlers={{
            click: () => onSelectEvent(event.id),
          }}
        >
          <Tooltip direction="top" offset={[0, -16]} opacity={1} permanent={false}>
            <div className="font-medium">{event.title}</div>
            <div className="text-xs">{event.date}</div>
          </Tooltip>
        </Marker>
      ))}

      {/* Controls overlay */}
      <div className="absolute right-4 top-4 z-[1000] flex flex-col gap-2 rounded-lg bg-background p-2 shadow-md">
        <button className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-muted">
          <span className="text-lg">+</span>
        </button>
        <button className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-muted">
          <span className="text-lg">−</span>
        </button>
      </div>
    </MapContainer>
  )
}

