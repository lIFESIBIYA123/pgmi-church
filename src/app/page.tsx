'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, MapPin, Play, Users, Heart, BookOpen } from "lucide-react";
import Link from "next/link";
import { BackgroundSlideshow } from "@/components/ui/background-slideshow";
import { PastorsSection } from "@/components/ui/pastors-section";
import { useEffect, useState } from "react";

interface MinistryDisplay {
  name: string;
  description: string;
  icon: string;
  color: string;
  leader: string;
  meetingTime: string;
}

interface Sermon {
  _id: string;
  title: string;
  description: string;
  date: string;
}

interface Event {
  _id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
}

export default function HomePage() {
  const [sermons, setSermons] = useState<Sermon[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [ministries, setMinistries] = useState<MinistryDisplay[]>([]);

  useEffect(() => {
    // Fetch latest sermons
    fetch('/api/sermons/latest')
      .then(res => res.json())
      .then(data => {
        if (data.sermons) {
          setSermons(data.sermons);
        }
      })
      .catch(() => {
        // Handle error silently
      });

    // Fetch upcoming events
    fetch('/api/events')
      .then(res => res.json())
      .then(data => {
        if (data.events) {
          setEvents(data.events);
        }
      })
      .catch(() => {
        // Handle error silently
      });

    // Fetch ministries
    fetch('/api/ministries')
      .then(res => res.json())
      .then(data => {
        if (data.ministries) {
          const simplifiedMinistries = data.ministries.map((ministry: { name: string; description: string; icon: string; color: string; leader: string; meetingTime: string }) => ({
            name: ministry.name,
            description: ministry.description,
            icon: ministry.icon,
            color: ministry.color,
            leader: ministry.leader,
            meetingTime: ministry.meetingTime
          }));
          setMinistries(simplifiedMinistries);
        }
      })
      .catch(() => {
        // Handle error silently
      });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Background Slideshow */}
      <section className="relative h-screen flex items-center justify-center">
        <BackgroundSlideshow />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Welcome to PGMI Church
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Perfecting Grace Ministries International - Where faith comes alive and community thrives
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/sermons">Watch Sermons</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/events">Join Events</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Welcome Home
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              At PGMI Church, we believe everyone has a place in God 's family.
              Whether you 're new to faith or have been walking with Christ for years,
              you 're welcome here. Join us as we grow together in God 's love and grace.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Heart className="w-8 h-8 text-primary" />
                </div>
                <CardTitle>God 's Love</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Experience the unconditional love of God in a welcoming community
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <BookOpen className="w-8 h-8 text-primary" />
                </div>
                <CardTitle>Biblical Teaching</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Grow in your faith through solid, Bible-based teaching and preaching
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <CardTitle>Community</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Build meaningful relationships and find your place in our church family
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Latest Sermons */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Latest Sermons
            </h2>
            <Button asChild variant="outline">
              <Link href="/sermons">View All</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sermons.slice(0, 3).map((sermon, index) => (
              <Card key={sermon._id || index} className="overflow-hidden">
                <div className="aspect-video bg-muted flex items-center justify-center">
                  <Play className="w-16 h-16 text-muted-foreground" />
                </div>
                <CardHeader>
                  <CardTitle className="line-clamp-2">{sermon.title}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {sermon.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-muted-foreground mb-4">
                    <Calendar className="w-4 h-4 mr-2" />
                    {new Date(sermon.date).toLocaleDateString()}
                  </div>
                  <Button asChild className="w-full">
                    <Link href={`/sermons/${sermon._id}`}>Watch Now</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Ministries */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Get Involved
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover your gifts and find your ministry. We have opportunities for everyone to serve and grow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ministries.slice(0, 6).map((ministry, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4`}
                       style={{ backgroundColor: `${ministry.color}20` }}>
                    <div className="text-2xl">{ministry.icon}</div>
                  </div>
                  <CardTitle>{ministry.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {ministry.description}
                  </p>
                  <div className="text-sm text-muted-foreground">
                    <p><strong>Leader:</strong> {ministry.leader}</p>
                    <p><strong>Meeting:</strong> {ministry.meetingTime}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button asChild size="lg">
              <Link href="/ministries">Explore All Ministries</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Upcoming Events
            </h2>
            <Button asChild variant="outline">
              <Link href="/events">View All</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.slice(0, 3).map((event, index) => (
              <Card key={event._id || index} className="overflow-hidden">
                <CardHeader>
                  <CardTitle className="line-clamp-2">{event.title}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {event.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4 mr-2" />
                      {new Date(event.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="w-4 h-4 mr-2" />
                      {event.time}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4 mr-2" />
                      {event.location}
                    </div>
                  </div>
                  <Button asChild className="w-full">
                    <Link href={`/events/${event._id}`}>Learn More</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pastors Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <PastorsSection />
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Join Us This Sunday
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Experience the love of Christ and become part of our growing community.
            We 'd love to meet you!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link href="/contact">Get in Touch</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/events">View Events</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
