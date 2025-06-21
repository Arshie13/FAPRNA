"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Calendar,
  MapPin,
  Users,
  Clock,
  Award,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { getLatestEvent, getNotLatestEvents } from "@/lib/actions/event-actions";
import { IEvent } from "@/lib/interfaces";

export default function EventRegistration() {
  const [isLoading, setIsLoading] = useState(false);
  const [events, setEvents] = useState<IEvent[]>([])
  const [latestEvent, setLatestEvent] = useState<IEvent | null>(null);
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  useEffect(() => {
    const fetchLatestEvent = async () => {
      try {
        setIsLoading(true);
        const [events, latest] = await Promise.all([
          getNotLatestEvents(),
          getLatestEvent()
        ])
        setLatestEvent(latest);
        setEvents(events);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchLatestEvent();
  }, [])

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = () => {
    if (touchStartX.current !== null && touchEndX.current !== null) {
      const diff = touchStartX.current - touchEndX.current;
      if (Math.abs(diff) > 50) {
        if (diff > 0 && current < events.length - 1) {
          setCurrent(current + 1);
        } else if (diff < 0 && current > 0) {
          setCurrent(current - 1);
        }
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600 border-opacity-50"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-red-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 text-white text-2xl font-medium mb-8">
            <Calendar className="w-4 h-4 mr-2" />
            FAPRNA-NV EVENTS
          </div>

          <p className="text-xl max-w-2xl mx-auto opacity-90">
            Discover exciting upcoming events and register now to be part of the
            experience{" "}
          </p>
        </div>
      </section>

      {/* Featured Event */}
      {latestEvent && (
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-red-100 text-red-700 text-sm font-semibold mb-6">
                <Award className="w-4 h-4 mr-2" />
                FEATURED EVENT
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {latestEvent.title}
              </h2>
            </div>

            <Card className="max-w-4xl mx-auto border-0 shadow-xl bg-white">
              <div className="grid md:grid-cols-2">
                <div className="relative h-64 md:h-auto">
                  <Image
                    src={latestEvent.image || "/placeholder.svg"}
                    alt={latestEvent.title}
                    fill
                    className="object-cover rounded-l-lg"
                    priority
                  />
                </div>
                <CardContent className="p-8">
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center text-blue-600">
                      <Calendar className="w-5 h-5 mr-2" />
                      <span className="font-semibold">{latestEvent.date.toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock className="w-5 h-5 mr-2" />
                      <span>{latestEvent.time}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-5 h-5 mr-2" />
                      <span>{latestEvent.location}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Users className="w-5 h-5 mr-2" />
                      <span>{latestEvent.ceus} CEUs Available</span>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-6">{latestEvent.description}</p>
                  <Link
                    href={`/event-registration/details/${latestEvent.title}`}
                  >
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 font-semibold">
                      Learn More!
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </div>
            </Card>
          </div>
        </section>
      )}

      {/* Upcoming Events */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Events List
            </h2>
            <p className="text-lg text-gray-600">
              Explore our calendar of professional development opportunities
            </p>
          </div>

          {events && (
            <>
              {/* Mobile carousel */}
              <div className="block md:hidden">
                <div
                  className="relative w-full overflow-hidden"
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                >
                  <div
                    className="flex transition-transform duration-300"
                    style={{ transform: `translateX(-${current * 100}%)` }}
                  >
                    {events.map((event, idx) => (
                      <div key={idx} className="min-w-full px-2">
                        <Card
                          className="border border-gray-200 shadow-lg hover:shadow-xl transition-shadow bg-white"
                        >
                          <div className="relative h-48">
                            <Image
                              src={event.image || "/placeholder.svg"}
                              alt={event.title}
                              fill
                              className="object-cover rounded-t-lg"
                            />
                            <div className="absolute top-4 right-4">
                              <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                {event.ceus} CEUs
                              </span>
                            </div>
                          </div>
                          <CardContent className="p-6">
                            <div className="mb-4">
                              <div className="text-blue-600 font-semibold text-sm mb-2">
                                {event.date.toLocaleDateString()} • {event.time}
                              </div>
                              <h3 className="text-xl font-bold text-gray-900 mb-2">
                                {event.title}
                              </h3>
                              <p className="text-gray-600 text-sm mb-3">
                                {event.description}
                              </p>
                              <div className="flex items-center text-gray-500 text-sm">
                                <MapPin className="w-4 h-4 mr-1" />
                                {event.location}
                              </div>
                            </div>
                            <Link
                              href={`/event-registration/details/${event.title}`}
                            >
                              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 font-semibold">
                                Learn More!
                                <ArrowRight className="w-4 h-4 ml-2" />
                              </Button>
                            </Link>
                          </CardContent>
                        </Card>
                      </div>
                    ))}
                  </div>
                  {/* Carousel navigation dots */}
                  <div className="flex justify-center mt-4 gap-2">
                    {events.map((_, idx) => (
                      <button
                        key={idx}
                        className={`h-2 w-2 rounded-full ${
                          current === idx ? "bg-[#003366]" : "bg-gray-300"
                        }`}
                        onClick={() => setCurrent(idx)}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              {/* Desktop/tablet grid */}
              <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {events.map((event, index) => (
                  <Card
                    key={index}
                    className="border border-gray-200 shadow-lg hover:shadow-xl transition-shadow bg-white"
                  >
                    <div className="relative h-48">
                      <Image
                        src={event.image || "/placeholder.svg"}
                        alt={event.title}
                        fill
                        className="object-cover rounded-t-lg"
                      />
                      <div className="absolute top-4 right-4">
                        <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                          {event.ceus} CEUs
                        </span>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <div className="mb-4">
                        <div className="text-blue-600 font-semibold text-sm mb-2">
                          {event.date.toLocaleDateString()} • {event.time}
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {event.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-3">
                          {event.description}
                        </p>
                        <div className="flex items-center text-gray-500 text-sm">
                          <MapPin className="w-4 h-4 mr-1" />
                          {event.location}
                        </div>
                      </div>
                      <Link
                        href={`/event-registration/details/${event.title}`}
                      >
                        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 font-semibold">
                          Learn More!
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}

          <div className="mt-12 text-center">
            <div className="relative inline-block p-6 bg-gradient-to-r from-blue-600 to-red-600 hover:from-blue-700 hover:to-red-700 text-white px-12 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <p className="text--600">
                Questions about registration?{" "}
                <Link
                  href="#contact"
                  className="font-medium text-blue-600 hover:text-purple-600 transition-colors"
                >
                  Contact us
                </Link>{" "}
                for assistance.
              </p>
              {/* Decorative elements */}
              <div className="absolute -top-2 -right-2 h-4 w-4 rounded-full bg-blue-200/50"></div>
              <div className="absolute -bottom-2 -left-2 h-3 w-3 rounded-full bg-purple-200/50"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
