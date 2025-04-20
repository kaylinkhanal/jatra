
"use client";
import { useEffect, useState } from "react";
import { Clock, MapPin, Users } from "lucide-react";
import { SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import { format } from "date-fns";
import { CalendarIcon as CalendarImage } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { io } from 'socket.io-client';
import { setNotification, setNotificationList } from "@/lib/redux/features/notification/notificationSlice";

const socket = io('http://localhost:9000');

export default function VenueBookingSheet({ venueDetails, venueBookings ,selectedVenueId}) {
  const dispatch = useDispatch();
  const [date, setDate] = useState<Date>();
  const [events,setEvents] = useState([])
  const [eventId, setEventId] = useState(null)
  const {userDetails} =useSelector(state=>state.user)
  const formatDate = (dateString:Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (dateString:string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const bookingSchema = Yup.object().shape({
    date: Yup.date()
      .required("Date is required")
      .test(
        "is-date-available",
        "Venue is already booked for this date",
        (value, context) => {
          if (!value || !venueBookings) return true; // Skip validation if no date or bookings

          const selectedDate = new Date(
            value.getFullYear(),
            value.getMonth(),
            value.getDate()
          );

          return !venueBookings.some((booking) => {
            const bookedDate = new Date(booking.booked_date);
            return (
              bookedDate.getFullYear() === selectedDate.getFullYear() &&
              bookedDate.getMonth() === selectedDate.getMonth() &&
              bookedDate.getDate() === selectedDate.getDate()
            );
          });
        }
      ),
  });

  const handleBookingEvent = async(values) => {
    socket.emit('eventRequest',  {
      "event": eventId,
      "venue": selectedVenueId,
      "booked_date": date,
      "userId": userDetails?.data._id
    });
  };

  const fetchUserEvents = async() => {
   const {data} =await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/events/${userDetails?.data._id}`)
   setEvents(data)
  }
  useEffect(()=>{
    socket.on('connection', ()=> console.log("socket connected"));
  },[])
  

  useEffect(() => {
    socket.on('eventRequest', (eventRequest) => {
      dispatch(setNotification(true))
     dispatch(setNotificationList(eventRequest))
    });
  }
  , []);


  useEffect(()=>{
    if(!eventId)  fetchUserEvents()
  },[eventId])

  return (
    <SheetContent className="overflow-y-auto z-999 p-2">
      <div className="w-full pr-6">
        <div className="bg-orange-500 p-3 rounded-lg mb-4">
          <SheetHeader className="pb-0">
            <SheetTitle className="text-white text-lg font-semibold">
              Book {venueDetails?.title}
            </SheetTitle>
          </SheetHeader>
        </div>

        {/* Venue Details Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-3 mb-4">
          <h3 className="text-sm font-medium text-gray-800 mb-2">
            Venue Details
          </h3>

          <div className="space-y-2 text-sm">
            <div className="flex items-center">
              <Users className="h-4 w-4 text-orange-500 mr-2" />
              <span className="text-gray-700">
                Capacity: {venueDetails?.capacity}
              </span>
            </div>

            <div className="flex items-start">
              <MapPin className="h-4 w-4 text-orange-500 mr-2 mt-0.5" />
              <span className="text-gray-700">{venueDetails?.address}</span>
            </div>
          </div>
        </div>

        {/* Existing Bookings Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-3 mb-4">
          <h3 className="text-sm font-medium text-gray-800 mb-3">
            Existing Bookings
          </h3>

          {venueBookings && venueBookings.length > 0 ? (
            <div className="space-y-3">
              {venueBookings.map((booking) => (
                <div
                  key={booking?._id}
                  className="border border-orange-100 rounded-md p-2 bg-orange-50"
                >
                  <div className="flex items-center space-x-2">
                    <CalendarImage className="h-3.5 w-3.5 text-orange-500" />
                    <span className="text-xs font-medium text-gray-700">
                      {formatDate(booking.booked_date)}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2 mt-1">
                    <Clock className="h-3.5 w-3.5 text-orange-500" />
                    <span className="text-xs text-gray-600">
                      {formatTime(booking.booked_date)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-xs text-gray-500">
              No existing bookings found.
            </div>
          )}
        </div>

        {/* Booking Form Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-3">
          <h3 className="text-sm font-medium text-gray-800 mb-3">
            Make a New Booking
          </h3>
          <Formik
            initialValues={{
              date: null,
              time: "",
            }}
            validationSchema={bookingSchema}
            onSubmit={(values) => {
              handleBookingEvent(values);
            }}
          >
            {({ errors, touched, setFieldValue }) => (
              <Form className="space-y-3">
                <div>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] justify-start text-left font-normal border border-orange-300",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarImage />
                        {date ? format(date, "PPP") : <span>Book a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 z-999" align="start">
                      <Calendar
                        mode="single"
                        disabled={(date) =>date < new Date()}
                        selected={date}
                        onSelect={(selectedDate) => {
                          setDate(selectedDate);
                          setFieldValue("date", selectedDate);
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  {errors.date && touched.date && (
                    <div className="text-red-500 text-xs mt-1">{errors.date}</div>
                  )}
                </div>
                  <select onChange={(e) => setEventId(e.target.value)} className="w-full border border-gray-300 rounded-md p-2">
                 
                    {events.map((event) => (
                      <option  value={event._id}>{event.title}</option>
                    ))}
                  </select>
                <button

                  className="w-full bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium py-2 px-3 rounded transition duration-200 mt-1"
                >
                  Book Venue
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </SheetContent>
  );
}