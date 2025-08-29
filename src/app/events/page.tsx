'use client'

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Star,
  Music,
  Heart,
  BookOpen,
  Globe
} from "lucide-react";
import Link from "next/link";
import { BackgroundSlideshow } from "@/components/ui/background-slideshow";
import Image from "next/image";

interface Event {
  _id: string;
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  category: string;
  description: string;
  image?: string;
  registration?: boolean;
  featured?: boolean;
  tags?: string[];
  attendees?: number;
  maxAttendees?: number;
}

const categories = ["All", "Worship", "Youth", "Prayer", "Outreach", "Education", "Music", "Family", "Missions"];

export default function EventsPage() {
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [pastEvents, setPastEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTab, setSelectedTab] = useState('upcoming');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/events');
        const data = await response.json();
        setUpcomingEvents(data.upcomingEvents || []);
        setPastEvents(data.pastEvents || []);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const filteredUpcomingEvents = upcomingEvents.filter(event => {
    if (selectedCategory === 'All') return true;
    return event.category === selectedCategory;
  });

  const filteredPastEvents = pastEvents.filter(event => {
    if (selectedCategory === 'All') return true;
    return event.category === selectedCategory;
  });

  const featuredEvents = upcomingEvents.filter(event => event.featured);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Worship': return <Star className="h-4 w-4" />;
      case 'Youth': return <Users className="h-4 w-4" />;
      case 'Prayer': return <Heart className="h-4 w-4" />;
      case 'Outreach': return <Globe className="h-4 w-4" />;
      case 'Education': return <BookOpen className="h-4 w-4" />;
      case 'Music': return <Music className="h-4 w-4" />;
      case 'Family': return <Users className="h-4 w-4" />;
      case 'Missions': return <Globe className="h-4 w-4" />;
      default: return <Calendar className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20">
        <BackgroundSlideshow
          pageKey="events"
          interval={180000} // 3 minutes
          className="z-0"
        />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="mb-8">
            <Image
              src="/images/pgmi logo.png"
              alt="PGMI Logo"
              width={120}
              height={120}
              className="mx-auto mb-6"
              priority
            />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Church Events
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
            Join us for inspiring events, meaningful activities, and opportunities to connect with our church family.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-background border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="flex items-center gap-2"
              >
                {getCategoryIcon(category)}
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Events */}
      {featuredEvents.length > 0 && (
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-foreground text-center mb-12">
              Featured Events
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredEvents.map((event) => (
                <Card key={event._id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video bg-muted flex items-center justify-center relative">
                    {event.image ? (
                      <Image src={event.image} alt={event.title} layout="fill" objectFit="cover" />
                    ) : (
                      <div className="text-center">
                        <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-2" />
                        <p className="text-muted-foreground">Event Image</p>
                      </div>
                    )}
                    <Badge className="absolute top-2 right-2 bg-primary">Featured</Badge>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl">{event.title}</CardTitle>
                    <CardDescription className="space-y-1">
                      <p className="font-medium text-foreground">{event.category}</p>
                      <p className="text-sm text-muted-foreground">{formatDate(event.date)}</p>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {event.description}
                    </p>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">
                          {event.attendees}/{event.maxAttendees} attendees
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {event.tags.slice(0, 3).map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <Button asChild className="w-full">
                      <Link href={`/events/${event.id}`}>Learn More</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Events Tabs */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
              <TabsTrigger value="past">Past Events</TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming" className="space-y-6">
              {loading ? (
                <p>Loading events...</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredUpcomingEvents.map((event) => (
                    <Card key={event._id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="aspect-video bg-muted flex items-center justify-center relative">
                        {event.image ? (
                          <Image src={event.image} alt={event.title} layout="fill" objectFit="cover" />
                        ) : (
                          <div className="text-center">
                            <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-2" />
                            <p className="text-muted-foreground">Event Image</p>
                          </div>
                        )}
                        {event.registration && (
                          <Badge className="absolute top-2 right-2 bg-green-600">Registration Required</Badge>
                        )}
                      </div>
                      <CardHeader>
                        <CardTitle className="text-xl">{event.title}</CardTitle>
                      <CardDescription className="space-y-1">
                        <p className="font-medium text-foreground">{event.category}</p>
                        <p className="text-sm text-muted-foreground">{formatDate(event.date)}</p>
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {event.description}
                      </p>

                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">{event.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">{event.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">
                            {event.attendees}/{event.maxAttendees} attendees
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {event.tags.slice(0, 3).map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex gap-2">
                        <Button asChild className="flex-1">
                          <Link href={`/events/${event._id}`}>Learn More</Link>
                        </Button>
                        {event.registration && (
                          <Button asChild variant="outline">
                            <Link href={`/events/${event._id}/register`}>Register</Link>
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {!loading && filteredUpcomingEvents.length === 0 && (
                <div className="text-center py-12">
                  <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No upcoming events</h3>
                  <p className="text-muted-foreground">Check back soon for new events!</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="past" className="space-y-6">
              {loading ? (
                <p>Loading events...</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredPastEvents.map((event) => (
                    <Card key={event._id} className="overflow-hidden hover:shadow-lg transition-shadow opacity-75">
                      <div className="aspect-video bg-muted flex items-center justify-center relative">
                        {event.image ? (
                          <Image src={event.image} alt={event.title} layout="fill" objectFit="cover" />
                        ) : (
                          <div className="text-center">
                            <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-2" />
                            <p className="text-muted-foreground">Event Image</p>
                          </div>
                        )}
                        <Badge className="absolute top-2 right-2 bg-muted-foreground">Past Event</Badge>
                      </div>
                      <CardHeader>
                        <CardTitle className="text-xl">{event.title}</CardTitle>
                      <CardDescription className="space-y-1">
                        <p className="font-medium text-foreground">{event.category}</p>
                        <p className="text-sm text-muted-foreground">{formatDate(event.date)}</p>
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {event.description}
                      </p>

                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">{event.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">{event.location}</span>
                        </div>
                      </div>

                      <Button asChild variant="outline" className="w-full">
                        <Link href={`/events/${event._id}`}>View Details</Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {!loading && filteredPastEvents.length === 0 && (
                <div className="text-center py-12">
                  <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No past events</h3>
                  <p className="text-muted-foreground">Check our upcoming events!</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Get Involved
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Do not miss out on the amazing events happening at our church.
            Join us and be part of our growing community!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="secondary" size="lg" className="text-lg px-8 py-6">
              <Link href="/contact">Contact Us</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6">
              <Link href="/sermons">View All Sermons</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
