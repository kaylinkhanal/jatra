'use client';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import React from 'react';
import MapAvatar from './mapavatar';

export default function Map() {
  const user = {
    name: 'John Doe',
    imageUrl: '/avatar.png', 
  };
  const userPosition: [number, number] = [27.700769, 85.300140];

  return (
    <MapContainer center={[27.700769, 85.300140]} zoom={13} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapAvatar user={user} position={userPosition} />
      <div className="z-999 absolute right-5">hello</div>
    </MapContainer>
  );
}