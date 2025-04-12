"use client";
import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { CalendarIcon as CalendarImage } from "lucide-react";
import { Calendar } from "./ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";

const EventDailog = () => {
  const [date, setDate] = useState<Date>();
  const[isDialogOpen, setIsDialogOpen] = useState(false)
  const { userDetails } = useSelector((state) => state.user);

  const initialValues = {
    title: "",
    event_type: "",
    date: null, // Initialize date as null
    time: "",
    artists: [""],
    image: "",
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    event_type: Yup.string()
      .oneOf(["concert", "livemusic", "music festival"], "Invalid event type")
      .required("Event type is required"),
    date: Yup.date().nullable().required("Date is required"), // Allow null and require it
    artists: Yup.array().of(Yup.string()),
    time: Yup.string().required("Time is required"),
    image: Yup.string(),
  });

  const handleSubmit = async(values, { setSubmitting, resetForm }) => {
    const details = { ...values, booked_by: userDetails?.data?._id };
    try {
      const {data} = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/event`, details);
      setSubmitting(false);
      toast.success("Event Created Successfully");
      setIsDialogOpen(false)
      resetForm()
    } catch (error) {
      if (error.status) {
        toast.error(error.response.data.msg);
        setSubmitting(false);
      }
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setIsDialogOpen(true)} className="bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-md px-4 py-2 shadow-md hover:shadow-lg transition-all duration-200 focus:ring-2 focus:ring-orange-300 focus:outline-none mr-2">
          Add Event
        </Button>
      </DialogTrigger>
      <DialogTitle />
      <DialogContent className="sm:max-w-md bg-white rounded-lg shadow-xl border-orange-200 border-2 z-999 overflow-y-auto">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, values, setFieldValue, errors, touched, resetForm }) => (
            <Form className="space-y-1 w-full">
              <div className="space-y-1">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-orange-800"
                >
                  Title
                </label>
                <Field
                  type="text"
                  name="title"
                  className="w-full px-3 py-2 border border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="text-red-500 text-xs"
                />
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="event_type"
                  className="block text-sm font-medium text-orange-800"
                >
                  Event Type
                </label>
                <Field
                  as="select"
                  name="event_type"
                  className="w-full px-3 py-2 border border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                >
                  <option value="">Select Event Type</option>
                  <option value="concert">Concert</option>
                  <option value="livemusic">Live Music</option>
                  <option value="music festival">Music Festival</option>
                </Field>
                <ErrorMessage
                  name="event_type"
                  component="div"
                  className="text-red-500 text-xs"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between gap-4 w-full">
                  <div className="w-1/2 space-y-1">
                    <label
                      htmlFor="date"
                      className="block text-sm font-medium text-orange-800"
                    >
                      Date
                    </label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal border border-orange-300",
                            !date && "text-gray-400"
                          )}
                        >
                          <CalendarImage />
                          {date ? (
                            format(date, "PPP")
                          ) : (
                            <span>Select date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-auto p-0 z-999"
                        align="start"
                      >
                        <Calendar
                          mode="single"
                          selected={date}
                          disabled={(date) => date < new Date()}
                          onSelect={(selectedDate) => {
                            setDate(selectedDate);
                            setFieldValue("date", selectedDate);
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    {errors.date && touched.date && (
                      <div className="text-red-500 text-xs mt-1">
                        {errors.date}
                      </div>
                    )}
                  </div>

                  <div className="w-1/2 space-y-1">
                    <label
                      htmlFor="time"
                      className="block text-sm font-medium text-orange-800"
                    >
                      Time
                    </label>
                    <Field
                      type="time"
                      name="time"
                      className="w-full px-3 py-2 border border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 h-10"
                    />
                    <ErrorMessage
                      name="time"
                      component="div"
                      className="text-red-500 text-xs"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="artists"
                  className="block text-sm font-medium text-orange-800"
                >
                  Artists
                </label>
                <div className="max-h-40 overflow-y-auto border border-orange-200 rounded-md p-2 bg-orange-50">
                  {values.artists.map((artist, index) => (
                    <div key={index} className="flex space-x-2 mb-2">
                      <Field
                        type="text"
                        name={`artists[${index}]`}
                        className="flex-1 px-3 py-2 border border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white"
                      />
                      {values.artists.length > 1 && (
                        <button
                          type="button"
                          onClick={() => {
                            setFieldValue(
                              "artists",
                              values.artists.filter((_, i) => i !== index)
                            );
                          }}
                          className="px-2 py-1 bg-orange-100 text-orange-700 rounded-md hover:bg-orange-200 transition-colors"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setFieldValue("artists", [...values.artists, ""])
                  }
                  className="px-2 py-1 bg-orange-100 text-orange-700 rounded-md hover:bg-orange-200 transition-colors text-sm"
                >
                  + Add Artist
                </button>
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="image"
                  className="block text-sm font-medium text-orange-800"
                >
                  Image URL
                </label>
                <Field
                  type="text"
                  name="image"
                  className="w-full px-3 py-2 border border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
                <ErrorMessage
                  name="image"
                  component="div"
                  className="text-red-500 text-xs"
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-md shadow transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Submitting..." : "Add Event"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default EventDailog;
