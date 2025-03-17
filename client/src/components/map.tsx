'use client';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import React from 'react';
import MapAvatar from './mapavatar';
import Avatar from './avatar';
import Image from 'next/image';
import { DatePickerWithRange } from './datePicker';

export default function Map() {
  const user = {
    name: 'John Doe',
    imageUrl: '/avatar.png', 
  };
  const userPosition: [number, number] = [27.700769, 85.300140];

  const eventsList = [
    {
      "title": "Kutumba Live Performance",
      "event_type": "livemusic",
      "date": "2024-10-26T20:00:00.000Z",
      "time": "8:00 PM",
      "booked_by": "Patan Cultural Center",
      "artists": ["Kutumba"],
      "image": "https://example.com/kutumba-live.jpg",
      "venue": {
        "capacity": 300,
        "longitude": 85.3218,
        "latitude": 27.6782,
        "venueImage": "https://example.com/patan-cultural-center.jpg",
        "address": "Patan Durbar Square, Lalitpur, Nepal"
      }
    },
    {
      "title": "Indreni Festival",
      "event_type": "music festival",
      "date": "2024-11-08T14:00:00.000Z",
      "time": "2:00 PM",
      "booked_by": "Pokhara Lakeside Events",
      "artists": ["Trishul", "The Shadows Nepal", "Albatross"],
      "image": "https://example.com/indreni-festival.jpg",
      "venue": {
        "capacity": 1000,
        "longitude": 83.9679,
        "latitude": 28.2104,
        "venueImage": "https://example.com/pokhara-lakeside.jpg",
        "address": "Lakeside, Pokhara, Nepal"
      }
    },
    {
      "title": "Batti Ra Chittai Concert",
      "event_type": "concert",
      "date": "2024-12-20T19:30:00.000Z",
      "time": "7:30 PM",
      "booked_by": "Kathmandu Concerts",
      "artists": ["Batti Ra Chittai"],
      "image": "https://example.com/batti-ra-chittai-concert.jpg",
      "venue": {
        "capacity": 500,
        "longitude": 85.3157,
        "latitude": 27.7172,
        "venueImage": "https://example.com/kathmandu-concert-hall.jpg",
        "address": "Sundhara, Kathmandu, Nepal"
      }
    },
    {
      "title": "Night with Ciney Gurung",
       "event_type": "livemusic",
       "date": "2025-01-10T21:00:00.000Z",
       "time": "9:00 PM",
       "booked_by": "Jhamsikhel Live Stage",
       "isFull": true,
       "artists": ["Ciney Gurung"],
       "image": "https://example.com/ciney-gurung-live.jpg",
       "venue": {
          "capacity": 200,
          "longitude": 85.3184,
          "latitude": 27.6818,
          "venueImage": "https://example.com/jhamsikhel-stage.jpg",
          "address": "Jhamsikhel, Lalitpur, Nepal"
       }
    },
      {
      "title": "1974 AD Acoustic Set",
      "event_type": "livemusic",
      "date": "2025-02-14T20:30:00.000Z",
      "time": "8:30 PM",
      "booked_by": "Durbarmarg Music Lounge",
      "artists": ["1974 AD"],
      "image": "https://example.com/1974ad-acoustic.jpg",
      "venue": {
         "capacity": 250,
         "longitude": 85.3210,
         "latitude": 27.7125,
         "venueImage": "https://example.com/durbarmarg-lounge.jpg",
         "address": "Durbarmarg, Kathmandu, Nepal"
      }
    }
  ]


  const venue = [
    {
      "capacity": 300,
      "longitude": 85.3166,
      "latitude": 27.6825,
      "venueImage": "https://example.com/patan-cultural-center.jpg",
      "address": "Patan Durbar Square, Lalitpur, Nepal"
    },
    {
      "capacity": 1000,
      "longitude": 83.9700,
      "latitude": 28.2080,
      "venueImage": "https://example.com/pokhara-lakeside.jpg",
      "address": "Lakeside, Pokhara, Nepal"
    },
    {
      "capacity": 500,
      "longitude": 85.3200,
      "latitude": 27.7150,
      "venueImage": "https://example.com/kathmandu-concert-hall.jpg",
      "address": "Sundhara, Kathmandu, Nepal"
    },
    {
      "capacity": 200,
      "longitude": 85.3195,
      "latitude": 27.6800,
      "venueImage": "https://example.com/jhamsikhel-stage.jpg",
      "address": "Jhamsikhel, Lalitpur, Nepal"
    },
    {
      "capacity": 250,
      "longitude": 85.3225,
      "latitude": 27.7135,
      "venueImage": "https://example.com/durbarmarg-lounge.jpg",
      "address": "Durbarmarg, Kathmandu, Nepal"
    },
      {
      "capacity": 400,
      "longitude": 85.3080,
      "latitude": 27.7000,
      "venueImage": "https://example.com/thamel-venue.jpg",
      "address": "Thamel, Kathmandu, Nepal"
    },
    {
      "capacity": 600,
      "longitude": 85.3300,
      "latitude": 27.6900,
      "venueImage": "https://example.com/boudha-venue.jpg",
      "address": "Boudha, Kathmandu, Nepal"
    },
    {
      "capacity": 800,
      "longitude": 84.0000,
      "latitude": 28.2200,
      "venueImage": "https://example.com/fewa-venue.jpg",
      "address": "Near Fewa Lake, Pokhara, Nepal"
    }
  ]


  const venueIcon = new L.Icon({
    iconUrl: "https://www.shutterstock.com/image-vector/red-color-inserted-label-word-260nw-1954191421.jpg",
    iconSize: [64, 64], // Adjust size as needed
    className: 'rounded-full border-2 border-green-500 shadow-md ',
    iconAnchor: [16, 32], // Adjust anchor if needed
    popupAnchor: [0, -32], // Adjust popup anchor if needed
  });


    const generateIcon = (isFull: any)=>{
      return new L.Icon({
        iconUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSt3m1Nz9EL53Dck61ZJ5dlJPZoWlaIc26anA&s",
        iconSize: [64, 64], // Adjust size as needed
        className: `rounded-full border-4 border-${isFull? 'black': 'green-500'} shadow-md `,
        iconAnchor: [16, 32], // Adjust anchor if needed
        popupAnchor: [0, -32], // Adjust popup anchor if needed
      });
    
    }
  return (
    <MapContainer center={[27.700769, 85.300140]} zoom={13} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    
      <div className="z-999 absolute right-40 top-6">
        <DatePickerWithRange />
      </div>

      <div className="z-999 absolute right-20 top-6">
        <Avatar/>
      </div>
      {eventsList.map((item:any,id:any)=>{
          return(
          <Marker key={id} position={[item.venue.latitude,item.venue.longitude]} icon={generateIcon(item.isFull)}>
           <Popup>
           {item.title}
           {item.event_type}
           </Popup>
         </Marker>
          ) 
      })}

{venue.map((item:any,id:any)=>{
          return(
          <Marker key={id} position={[item.latitude,item.longitude]} icon={venueIcon}>
           <Popup>
           {item.title}
           {item.event_type}
           </Popup>
         </Marker>
          ) 
      })}
     
    </MapContainer>
  );
}