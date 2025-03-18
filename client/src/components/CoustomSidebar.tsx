"use client";
import React, { useState } from "react";
import {
  Menu,
  Ellipsis,
  History,
  Bookmark,
  CalendarSearch,
  X,
  Search,
} from "lucide-react";
import ImageGroup from "@/components/ImageGroup";
import { useRouter } from "next/navigation";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SearchProps {
  isClicked: boolean;
}

interface MapProps {
  posix: [number, number];
}

function Drawer({ isOpen, onClose }: DrawerProps) {
  return (
    <div
      className={`fixed top-0 z-999 left-0 h-full bg-gray-800 bg-opacity-50 transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className=" relative w-64 h-full bg-white shadow-xl">
        <h1 className="text-center pt-4 font-bold text-[#fe6807]">JATRA</h1>
        <button
          className="p-2 top-2 absolute right-3 text-gray-700"
          onClick={onClose}
        >
          <X className="hover:text-blue-500 cursor-pointer" />
        </button>

        <div className="p-4">Drawer Content</div>
      </div>
    </div>
  );
}

export function CustomSearch({ isClicked }: SearchProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>(["Apple", "Banana", "Cherry", "Date", "Elderberry"]);
  const [isFocused, setIsFocused] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredSuggestions = suggestions.filter((item) =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative left-20 z-999 w-96">
<div className={`flex items-center bg-white rounded-3xl border-gray-300 ${isFocused ? 'rounded-b-none' : ''}`}>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Search Event"
          className="w-full p-3 outline-none"
        />
        <Search className="w-6 h-6 mr-3 text-gray-500" />
      </div>

      {isClicked && isFocused && (
        <div className="absolute top-full shadow-2xl left-0 w-full bg-white border border-gray-300 h-auto overflow-auto">
          {filteredSuggestions.length > 0 ? (
            filteredSuggestions.map((item, index) => (
              <div
                key={index}
                className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                onClick={() => setSearchTerm(item)}
              >
                {item}
              </div>
            ))
          ) : (
            <div className="px-4 py-2 text-gray-500">No results found</div>
          )}
        </div>
      )}
    </div>
  );
}

interface SidebarProps {
  onButtonClick: () => void;
}

function Sidebar({ onButtonClick }: SidebarProps) {
  const imageUrls: string[] = [
    "/logojatra.png",
    "/lakhey.jpg",
    "auth-3.jpg",
    "auth-4.jpg",
  ];

  const router = useRouter()
  return (
    <div
      className={`fixed z-999 left-0 top-0 h-full bg-white shadow-lg transition-transform duration-300 ease-in-out w-[5.3%]`}
    >
      <div className="space-y-4 p-4">
        <button
          className="flex items-center gap-4 w-full p-2 cursor-pointer rounded-lg transition-colors"
          onClick={onButtonClick}
        >
          <Menu className="w-8 h-8 text-gray-700" />
        </button>
        <button onClick={() => router.push('/shop')} className="flex text-gray-700 flex-col text-sm items-center w-full p-1 cursor-pointer rounded-lg transition-colors">
          <CalendarSearch className="w-6 h-6" />
          <span>Event</span>
        </button>
        <button className="flex text-gray-700 flex-col text-sm items-center w-full p-1 cursor-pointer rounded-lg transition-colors">
          <Bookmark className="w-6 h-6" />
          <span>Saved</span>
        </button>
        <button className="flex flex-col text-gray-700 items-center text-sm w-full p-1 cursor-pointer rounded-lg transition-colors">
          <History className="w-6 h-6" />
          <span>Recents</span>
        </button>
        <div className="h-px bg-gray-300 my-4" />
        <div>
          <button className="cursor-pointer flex flex-col items-center">
            <ImageGroup images={imageUrls} />
          </button>
          <p className="text-center mt-2 text-xs">Kathmandu</p>
        </div>
        <div>
          <button className="text-xs cursor-pointer flex flex-col gap-1 items-center">
            <img className="rounded-lg w-9 h-9" src="auth-3.jpg" alt="model" />
          </button>
          <p className="text-center mt-2 text-xs">Kathmandu</p>
        </div>
        <button className="flex flex-col text-xs gap-1 items-center justify-center w-full cursor-pointer transition-colors">
          <Ellipsis className="w-fit p-1 h-7 rounded-lg bg-gray-100 text-gray-700" />
          <span>View More</span>
        </button>
      </div>
    </div>
  );
}


interface CustomSidebarProps {
  children: React.ReactNode;
}

const CustomSidebar = ({ children }: CustomSidebarProps) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div>
      <Sidebar onButtonClick={() => setIsDrawerOpen(true)} />
      <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
      <div
        className={`h-screen w-full bg-gray-200 flex items-center justify-center  ${
          isDrawerOpen ? 'opacity-50 pointer-events-none' : 'opacity-100'
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default CustomSidebar;


