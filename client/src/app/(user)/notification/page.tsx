'use client';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

const Notification = () => {

  const { notificationList } = useSelector((state) => state.notification);
  const [notifications, setNotifications] = React.useState(notificationList);
  const fetchNotification = async() => {
    const {data} = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/notifications`)

    if (data) {
      setNotifications(data);
    }
  }
  useEffect(()=>{
    fetchNotification()
  },[])
  return (
    <div className="space-y-4 p-4">
      {notifications.length > 0 ? notifications.map((notification) => (
        <div
          key={notification._id}
          className="bg-white rounded-md shadow-md p-4 border border-gray-200"
        >
          <h2 className="text-xl font-semibold text-indigo-600 mb-2">
            {notification?.event?.title}
          </h2>
          <div className="grid grid-cols-2 gap-2 text-sm text-gray-700 mb-3">
            <div>
              <span className="font-semibold">Event Type:</span>{' '}
              {notification?.event?.event_type}
            </div>
            <div>
              <span className="font-semibold">Date:</span>{' '}
              {new Date(notification?.event?.date).toLocaleDateString()}
            </div>
            <div>
              <span className="font-semibold">Time:</span>{' '}
              {notification?.event?.time}
            </div>
            <div>
              <span className="font-semibold">Booked By:</span>{' '}
              {notification?.event?.booked_by}
            </div>
            <div>
              <span className="font-semibold">Artists:</span>{' '}
              {notification?.event?.artists.join(', ')}
            </div>
            <div>
              <span className="font-semibold">Venue:</span> {notification?.venue.title}
            </div>
            <div>
              <span className="font-semibold">Address:</span>{' '}
              {notification?.venue?.address}
            </div>
            <div>
              <span className="font-semibold">Status:</span>{' '}
              <span
                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  notification.status === 'pending'
                    ? 'bg-yellow-100 text-yellow-800'
                    : notification.status === 'approved'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {notification.status}
              </span>
            </div>
            <div className="col-span-2">
              <span className="font-semibold">Booked Date:</span>{' '}
              {new Date(notification.booked_date).toLocaleDateString()}
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Approve
            </button>
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Reject
            </button>
          </div>
        </div>
      )): "No notifications available"}
    </div>
  );
};

export default Notification;