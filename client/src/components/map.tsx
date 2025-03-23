'use client';
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import React from 'react';
import Avatar from './avatar';
import { DatePickerWithRange } from './datePicker';
import { useEffect, useState } from "react"
import type { EventData, VenueData } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Calendar, Check, Clock, MapPin, MapPinIcon, Music, Search, Users, X } from "lucide-react"
import { formatDate } from "@/lib/utils"
import { Input } from "./ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import axios from 'axios';

interface MapProps {
  events: EventData[]
  venues: VenueData[]
  onEventSelect: (event: EventData) => void
  onBookEvent: (eventId: string) => void
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

function LocationMarker({position , setPosition ,setIsDialogOpen, venueAddress}) {

  const map = useMapEvents({
    click(e) {
      if(!position?.lat || !position?.lng){
        setPosition(e.latlng)
      }
     
    }
  })

  const handleMarkerDragEnd = (event:any) => {
    console.log(event)
    setPosition(event.target._latlng)
      };

  return position === null ? null : (
    <Marker
    eventHandlers={{
      dragend: handleMarkerDragEnd,
    }}
    draggable={true}  position={position}  icon={createVenueIcon()}>
      <Popup>
      {venueAddress}
      </Popup>
    </Marker>
  )
}

export default function CustomMap({ events, venues, onEventSelect, onBookEvent }: MapProps) {
  const [mapCenter, setMapCenter] = useState<[number, number]>([27.700769, 85.30014])
  const [venueAddress,setVenueAddress] = useState('')
  const [isClient, setIsClient] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isPickStart, setIsPickStart] = useState(false)
  const [position, setPosition] = useState(null)
  const [venueTitle, setVenueTitle] = useState('');
  const [capacity, setCapacity] = useState('');

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

  const getLocationDetails = async () => {
    if (!position) return;
    try {
      const { data } = await axios.get(
        `https://api.geoapify.com/v1/geocode/reverse?lat=${position.lat}&lon=${position.lng}&apiKey=2bcb950de5554a3bb5b51add57015ba1`
      );
      if (data && data.features.length > 0) {
        const address = data.features[0]?.properties?.formatted || "Unknown Address";
        setVenueAddress(address);
        
       
        setVenueTitle(data.features[0]?.properties?.name || `Venue at ${position.lat.toFixed(4)}, ${position.lng.toFixed(4)}`);
        
       
        setCapacity("5000");
      }
    } catch (error) {
      console.error("Error fetching location details:", error);
    }
  };

  useEffect(()=>{
    if(position?.lat) {
      getLocationDetails()
    }
  },[position?.lat])


const handleResetPick = () => {
    setIsPickStart(false);
    setPosition(null);
  };

  const saveVenue = async () => {
    if (!venueTitle || !capacity || !position) {
      alert("Please fill all fields before saving!");
      return;
    }
    const numericCapacity = Number(capacity);
    if (isNaN(numericCapacity) || numericCapacity <= 0) {
      alert("Please enter a valid capacity (a positive number)!");
      return;
    }
    
    try {
      const payload = {
        title: venueTitle,
        capacity: Number(capacity),
        longitude: position.lng,
        latitude: position.lat,
        venueImage: "https://example.com/venue.jpg",
        address: venueAddress,
      };
      console.log("Saving venue with payload:", payload);

    const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/venue`, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });

      console.log("Venue saved successfully:", data);
      alert("Venue saved successfully !!!!");
      setIsDialogOpen(false);
      setVenueTitle('');
      setCapacity('5000');
      setIsPickStart(false);
    } catch (error) {
      console.error("Error saving venue:", error);
      alert("Failed to save venue. Please try again.....")
    }
  };



  return (
    <MapContainer  center={[27.700769, 85.300140]} zoom={13} scrollWheelZoom={false} style={{ height: '100%', width: '100%', zIndex:899 }}>
     {isPickStart && <LocationMarker setPosition={setPosition} venueAddress={venueAddress} position={position} setIsDialogOpen={setIsDialogOpen}/>}
     
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <div className="z-999 absolute flex right-40 top-6">
    
     {isPickStart ? ( <div className='flex gap-2'><Button>Pick On Map  <MapPinIcon/> </Button>
     <Button onClick={()=>handleResetPick()}><X /></Button> 
      <Button onClick={()=> setIsDialogOpen(true)} className='z-9999'><Check /></Button> </div>)
      :
      <Button className='bg-orange-400 rounded mx-2' onClick={()=>setIsPickStart(true)}>Add Venue</Button>}
        <DatePickerWithRange />
      </div>

      <div className="z-999 absolute right-20 top-6">
        <Avatar/>
      </div>
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



<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Create New Venue</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] z-999">
        <DialogHeader>
          <DialogTitle>Create New Venue</DialogTitle>
          <DialogDescription>
            Co-ordinates: {position?.lat}, {position?.lng}
        
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="venueTitle" className="text-right">
              Venue Title
            </Label>
            <Input readOnly id="venueTitle" value={venueTitle} onChange={(e) => setVenueTitle(e.target.value)} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="capacity" className="text-right">
              Capacity
            </Label>
           <Input id="capacity" value={capacity} onChange={(e) => setCapacity(e.target.value)} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="capacity" className="text-right">
              Address
            </Label>
            <Input readOnly value={venueAddress} id="capacity"  className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="capacity" className="text-right">
              Image
            </Label>
            <Input type='file' id="capacity"  className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={saveVenue}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
      </MapContainer>
  )
}
