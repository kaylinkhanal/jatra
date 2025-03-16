"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

export function EventMarker({ event, position, isSelected, onClick }) {
  const [isHovered, setIsHovered] = useState(false)

  // Determine marker color based on event type
  const getMarkerColor = () => {
    switch (event.status) {
      case "happening":
        return "bg-green-500"
      case "upcoming":
        return "bg-blue-500"
      case "past":
        return "bg-gray-400"
      case "recommended":
        return "bg-purple-500"
      default:
        return "bg-primary"
    }
  }

  // Calculate position based on the map dimensions
  // In a real implementation, this would use the map library's projection
  const left = `${50 + (position[1] - -75.69003) * 1000}%`
  const top = `${50 + (position[0] - 4.79029) * 1000}%`

  return (
    <div
      className={cn(
        "absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all",
        isSelected || isHovered ? "z-10" : "z-0",
      )}
      style={{
        left: left,
        top: top,
      }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={cn(
          "flex items-center justify-center rounded-full border-2 border-white shadow-md transition-all",
          getMarkerColor(),
          isSelected || isHovered ? "h-12 w-12" : "h-8 w-8",
        )}
      >
        {event.emoji && <span className="text-white">{event.emoji}</span>}
      </div>

      {/* Show event title on hover */}
      {(isHovered || isSelected) && (
        <div className="absolute top-full left-1/2 mt-1 -translate-x-1/2 whitespace-nowrap rounded bg-background px-2 py-1 text-xs font-medium shadow-md">
          {event.title}
        </div>
      )}
    </div>
  )
}

