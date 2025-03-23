import React, { useState, useEffect } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown_menu";
import { useMap } from "react-leaflet";
import L, { Marker } from "leaflet";
import { createPortal } from "react-dom";
import { useDispatch } from "react-redux";
import { logout } from "@/lib/redux/features/user/userSlice";

interface MapAvatarProps {
  user: {
    name: string;
    imageUrl?: string;
  };
  position: [number, number];
}

function MapAvatar({ user, position }: MapAvatarProps) {

  const map = useMap();
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const [marker, setMarker] = useState<Marker | null>(null);

  useEffect(() => {
    if (!map) return;

    const avatarContainer = document.createElement("div");
    avatarContainer.style.position = "absolute"; 
    avatarContainer.style.transform = "translate(-50%, -50%)"; 
    avatarContainer.style.zIndex = "1000"; 
    setContainer(avatarContainer);

    const customIcon = L.divIcon({
      html: "", 
      className: "", 
      iconSize: [0, 0], 
    });

    const newMarker = L.marker(position, { icon: customIcon }).addTo(map);
    newMarker.getElement()?.appendChild(avatarContainer);
    setMarker(newMarker);

    return () => {
      if (marker) {
        map.removeLayer(marker);
      }
    };
  }, [map, position]);

  if (!container) return null;

  return createPortal(
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer shadow-lg border-2 border-white">
          {user.imageUrl ? (
            <AvatarImage src={user.imageUrl} alt={user.name} />
          ) : (
            <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
          )}
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={() => {
 
            
          }}
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>,
    container
  );
}

export default MapAvatar;
