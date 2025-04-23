'use client';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { 
  Bell, 
  Calendar, 
  Clock, 
  Tag, 
  Users, 
  User, 
  MapPin, 
  Calendar as CalendarIcon, 
  CheckCircle, 
  XCircle,
  Music
} from 'lucide-react';

const Notification = () => {

  const { notificationList } = useSelector((state) => state.notification);
  const [notifications, setNotifications] = React.useState(notificationList);
  const fetchNotification = () => {

  }
  useEffect(()=>{
    fetchNotification()
  },[])

  const approveReject = async (status: string, id: string) => {
    try {
      const { data } = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/bookings/${id}`, {
        status: status,
      });
      return data;
    } catch (error: any) {
      console.error(`Error updating ID ${id}:`, error.message);
      throw new Error(`Failed to update item with ID ${id}. Please try again.`);
    }
  }

  return (
    <div className="max-w-5xl mx-auto bg-gray-50 p-6 rounded-3xl">
    {/* Header */}
    <div className="bg-gradient-to-r from-orange-600 to-orange-400 text-white rounded-2xl px-8 py-6 shadow-lg mb-6 flex justify-between items-center">
      <h1 className="text-3xl font-bold flex items-center gap-3">
        <Bell size={28} strokeWidth={2.5} />
        Your Notifications
      </h1>
      <div className="bg-white text-black bg-opacity-20 px-4 py-2 rounded-full text-sm font-medium">
        {notifications.length} {notifications.length === 1 ? 'Event' : 'Events'}
      </div>
    </div>
    
    {/* Content */}
    <div className="space-y-8">
      {notifications.length > 0 ? (
        notifications.map((notification) => (
          <div 
            key={notification._id} 
            className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:translate-y-1 border border-gray-100"
          >
            {/* Title bar with gradient */}
            <div className="bg-gradient-to-r from-orange-500 to-orange-400 px-6 py-5">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-white">{notification?.event?.title}</h2>
                <div className={`
                  px-4 py-1.5 rounded-full text-xs font-bold shadow-sm
                  ${notification.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                    notification.status === 'approved' ? 'bg-green-100 text-green-800' : 
                    'bg-red-100 text-red-800'}
                `}>
                  {notification.status.toUpperCase()}
                </div>
              </div>
            </div>
            
            {/* Main content */}
            <div className="p-8">
              {/* Quick info badges */}
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-2 bg-orange-50 rounded-lg px-4 py-2 border border-orange-100">
                  <Calendar size={18} className="text-orange-500" />
                  <span className="font-medium">{new Date(notification?.event?.date).toLocaleDateString()}</span>
                </div>
                
                <div className="flex items-center gap-2 bg-orange-50 rounded-lg px-4 py-2 border border-orange-100">
                  <Clock size={18} className="text-orange-500" />
                  <span className="font-medium">{notification?.event?.time}</span>
                </div>
                
                <div className="flex items-center gap-2 bg-orange-50 rounded-lg px-4 py-2 border border-orange-100">
                  <Tag size={18} className="text-orange-500" />
                  <span className="font-medium">{notification?.event?.event_type}</span>
                </div>
              </div>
              
              {/* Detailed info in a card */}
              <div className="bg-gray-50 rounded-xl p-6 mb-8 border border-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Left column */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="flex items-center gap-2 text-gray-700 font-semibold mb-3">
                        <Music className="text-orange-500" size={18} />
                        Artists
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {notification?.event?.artists.map((artist, index) => (
                          <span key={index} className="bg-orange-100 text-orange-700 px-3 py-1.5 rounded-lg text-sm flex items-center gap-1">
                            <Users size={14} />
                            {artist}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="flex items-center gap-2 text-gray-700 font-semibold mb-3">
                        <User className="text-orange-500" size={18} />
                        Booked By
                      </h3>
                      <p className="bg-white p-3 rounded-lg border border-gray-100">{notification?.event?.booked_by}</p>
                    </div>
                  </div>
                  
                  {/* Right column */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="flex items-center gap-2 text-gray-700 font-semibold mb-3">
                        <MapPin className="text-orange-500" size={18} />
                        Venue Details
                      </h3>
                      <div className="bg-white p-4 rounded-lg border border-gray-100 space-y-3">
                        <p className="font-medium">{notification?.venue.title}</p>
                        <p className="text-gray-600">{notification?.venue?.address}</p>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="flex items-center gap-2 text-gray-700 font-semibold mb-3">
                        <CalendarIcon className="text-orange-500" size={18} />
                        Booking Details
                      </h3>
                      <p className="bg-white p-3 rounded-lg border border-gray-100">
                        Booked on {new Date(notification.booked_date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Action buttons */}
              <div className="flex justify-end gap-4">
                <button 
                onClick={() => approveReject("Declined", notification?._id)}
                className="bg-white border-2 border-red-400 text-red-500 font-medium px-5 py-2.5 rounded-lg hover:bg-red-50 transition-colors flex items-center gap-2">
                  <XCircle size={18} />
                  Reject
                </button>
                <button
                onClick={() => approveReject("Approved", notification?._id)}
                className="bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium px-5 py-2.5 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-colors shadow-md flex items-center gap-2">
                  <CheckCircle size={18} />
                  Approve
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="bg-white rounded-xl shadow-lg p-12 text-center flex flex-col items-center">
          <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mb-6">
            <Bell size={32} className="text-orange-500" />
          </div>
          <h2 className="text-2xl font-bold text-orange-500 mb-2">No Notifications</h2>
          <p className="text-gray-500 text-center max-w-md">
            Your notification center is empty. New notifications will appear here when events are booked.
          </p>
        </div>
      )}
    </div>
  </div>
  );
};

export default Notification;