"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { format } from "date-fns"
import { CalendarIcon, Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Switch } from "@/components/ui/switch"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import { createEvent, updateEvent } from "@/lib/actions/event-actions"
import { EventType } from "@/generated/prisma"
import { IEvent } from "@/lib/interfaces"
import { ImageUploadForm } from "@/components/admin/ImageUpload"

interface Event {
  id: string
  type: "EVENT" | "RECOGNITION" | "TEAM"
  title: string
  time: string
  date: Date
  location: string
  address: string
  description: string
  ceus: number
  image: string
  ytLink?: string
  expected_attendees: number
  createdAt: Date
  updatedAt: Date
  isFinished: boolean
  isLatest: boolean
}

interface EventFormProps {
  event?: Event
}

export default function EventForm({ event }: EventFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const isEditing = !!event

  // Initialize form with default values or existing event data
  const form = useForm<IEvent>({
    defaultValues: {
      type: event?.type || EventType.EVENT,
      title: event?.title || "",
      time: event?.time || "",
      date: event?.date ? new Date(event.date) : new Date(),
      location: event?.location || "",
      address: event?.address || "",
      description: event?.description || "",
      ceus: event?.ceus || 0,
      image: event?.image || "",
      expected_attendees: event?.expected_attendees || 0,
      isFinished: event?.isFinished || false,
      isLatest: event?.isLatest || false,
    },
  })

  // Helper to set image URL in the form from ImageUploadForm
  const setImageUrl = (url: string) => {
    form.setValue("image", url, { shouldValidate: true, shouldDirty: true })
  }

  // Handle form submission
  const onSubmit = async (values: IEvent) => {
    setIsSubmitting(true)
    try {
      const formattedValues = {
        ...values,
        ceus: Number(values.ceus),
        expected_attendees: Number(values.expected_attendees),
        date: values.date
      };
      if (isEditing && event) {
        await updateEvent(event.id, values)
        toast("Event item updated successfully")
      } else {
        await createEvent(formattedValues)
        toast.success("Event item created successfully");
      }
      router.push("/admin/events")
      router.refresh()
    } catch {
      toast(isEditing ? "Failed to update event item" : "Failed to create event item")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{isEditing ? "Edit Event" : "Create Event"}</h1>
        <p className="text-gray-500">
          {isEditing ? "Update existing event item details" : "Add a new event item to the website"}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{isEditing ? "Edit Event Item" : "Create Event Item"}</CardTitle>
          <CardDescription>
            Fill in the details below to {isEditing ? "update the" : "create a new"} event item.
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* Event Type */}
                <FormField
                  control={form.control}
                  name="type"
                  rules={{ required: "Please select a event type" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Event Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select an event type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value={EventType.EVENT}>Event</SelectItem>
                          <SelectItem value={EventType.RECOGNITION}>Recognition</SelectItem>
                          <SelectItem value={EventType.TEAM}>Team</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>Select the type of event item you are creating.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Title */}
                <FormField
                  control={form.control}
                  name="title"
                  rules={{
                    required: "Title is required",
                    minLength: { value: 3, message: "Title must be at least 3 characters" },
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter event title" {...field} />
                      </FormControl>
                      <FormDescription>The title of the event item.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Date */}
                <FormField
                  control={form.control}
                  name="date"
                  rules={{ required: "Please select a date" }}
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                        </PopoverContent>
                      </Popover>
                      <FormDescription>The date when the event will take place.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Time */}
                <FormField
                  control={form.control}
                  name="time"
                  rules={{ required: "Please enter a time" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Time</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 8 am - 3pm" {...field} />
                      </FormControl>
                      <FormDescription>The time of the event (e.g., 8 am - 3pm).</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Location */}
                <FormField
                  control={form.control}
                  name="location"
                  rules={{
                    required: "Location is required",
                    minLength: { value: 3, message: "Location must be at least 3 characters" },
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter location name" {...field} />
                      </FormControl>
                      <FormDescription>The venue or location name.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Address */}
                <FormField
                  control={form.control}
                  name="address"
                  rules={{
                    required: "Address is required",
                    minLength: { value: 3, message: "Address must be at least 3 characters" },
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter full address" {...field} />
                      </FormControl>
                      <FormDescription>The full address of the location.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* CEUs */}
                <FormField
                  control={form.control}
                  name="ceus"
                  rules={{
                    required: "CEUs is required",
                    min: { value: 0, message: "CEUs must be a non-negative number" },
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CEUs</FormLabel>
                      <FormControl>
                        <Input type="number" min="0" {...field} />
                      </FormControl>
                      <FormDescription>Number of Continuing Education Units available (0 if none).</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Expected Attendees */}
                <FormField
                  control={form.control}
                  name="expected_attendees"
                  rules={{
                    required: "Expected attendees is required",
                    min: { value: 0, message: "Expected attendees must be a non-negative number" },
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Expected Attendees</FormLabel>
                      <FormControl>
                        <Input type="number" min="0" {...field} />
                      </FormControl>
                      <FormDescription>Estimated number of attendees.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Image URL */}
                {/* <FormField
                  control={form.control}
                  name="image"
                  rules={{ required: "Image URL is required" }}
                  render={({ field }) => (
                    <FormItem className="col-span-1 md:col-span-2">
                      <FormLabel>Image URL</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter image URL" {...field} />
                      </FormControl>
                      <FormDescription>URL to the image for this event item.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}

                <ImageUploadForm setImageUrl={setImageUrl} />

                {/* Description */}
                <FormField
                  control={form.control}
                  name="description"
                  rules={{
                    required: "Description is required",
                    minLength: { value: 10, message: "Description must be at least 10 characters" },
                  }}
                  render={({ field }) => (
                    <FormItem className="col-span-1 md:col-span-2">
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Enter a detailed description" className="min-h-32" {...field} />
                      </FormControl>
                      <FormDescription>Detailed description of the event item.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Is Finished */}
                <FormField
                  control={form.control}
                  name="isFinished"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Finished Event</FormLabel>
                        <FormDescription>Mark if this event has already taken place.</FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {/* Is Latest */}
                <FormField
                  control={form.control}
                  name="isLatest"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Latest Event</FormLabel>
                        <FormDescription>Feature this as the latest event item on the homepage.</FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
            {/* Show YouTube Link if event is finished */}
            {form.watch("isFinished") && (
              <div className="px-6 pb-6">
                <FormField
                  control={form.control}
                  name="ytLink"
                  rules={{
                    pattern: {
                      value: /^$|^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/,
                      message: "Please enter a valid YouTube URL",
                    },
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>YouTube Link</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter YouTube video URL (optional)" {...field} />
                      </FormControl>
                      <FormDescription>
                        Add a YouTube link for the event recording (optional, shown only for finished events).
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
            <CardFooter className="flex justify-between">
              <Button type="button" variant="outline" onClick={() => router.push("/admin/events")}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isEditing ? "Update Event" : "Create Event"}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  )
}
