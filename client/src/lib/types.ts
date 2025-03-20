export interface VenueData {
  id: string
  name: string
  capacity: number
  longitude: number
  latitude: number
  venueImage: string
  address: string
}

export interface EventData {
  id: string
  title: string
  event_type: string
  date: string
  time: string
  booked_by: string
  artists: string[]
  image: string
  description?: string
  isFull?: boolean
  isBooked?: boolean
  venue: {
    capacity: number
    longitude: number
    latitude: number
    venueImage: string
    address: string
  }
}

