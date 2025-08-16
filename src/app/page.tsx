'use client'
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Play, Users, Heart, BookOpen, Music, Globe, Coffee, Monitor } from "lucide-react";
import Link from "next/link";
import { BackgroundSlideshow } from "@/components/ui/background-slideshow";
import { PastorsSection } from "@/components/ui/pastors-section";
import { ministries as staticMinistries } from "@/lib/data/ministries";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

// Mock data - replace with real data later
const upcomingEvents = [
  {
    id: 1,
    title: "Sunday Worship Service",
    date: "Every Sunday",
    time: "10:00 AM",
    location: "Main Sanctuary",
    description: "Join us for inspiring worship and powerful preaching.",
  },
  {
    id: 2,
    title: "Youth Ministry Meeting",
    date: "Every Wednesday",
    time: "6:30 PM",
    location: "Youth Center",
    description: "Dynamic youth ministry for teenagers and young adults.",
  },
  {
    id: 3,
    title: "Prayer Meeting",
    date: "Every Friday",
    time: "7:00 PM",
    location: "Prayer Room",
    description: "Corporate prayer and intercession for our community.",
  },
];

type Sermon = { title: string; preacher: string; date: string; duration?: string; videoUrl?: string };

// Background images for slideshow
const backgroundImages = [
  "/images/background.jpg",
  "/images/background2.jpg",
  "/images/background3.jpg",
  "/images/background4.jpg",
  "/images/background5.jpg",
  "/images/background6.jpg",
];

// Icon mapping for ministries
const iconMap = {
  Users,
  Music,
  Heart,
  BookOpen,
  Globe,
  Coffee,
  Monitor,
};

interface MinistryDisplay {
  name: string;
  description: string;
  icon: string;
  color: string;
  leader: string;
  meetingTime: string;
}

export default function HomePage() {
  const { data: session } = useSession();
  const [latestSermon, setLatestSermon] = useState<Sermon | null>(null);
  const [events, setEvents] = useState<any[]>([]);
  const [ministries, setMinistries] = useState<MinistryDisplay[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch latest sermon
        const sermonResponse = await fetch('/api/sermons/latest');
        if (sermonResponse.ok) {
          const sermonData = await sermonResponse.json();
          if (sermonData) {
            setLatestSermon({
              title: sermonData.title,
              preacher: sermonData.preacher,
              date: new Date(sermonData.date).toLocaleDateString(),
              duration: sermonData.duration,
              videoUrl: sermonData.videoUrl
            });
          }
        }
      } catch (error) {
        console.log('No sermons available yet');
      }

      try {
        // Fetch events
        const eventsResponse = await fetch('/api/events');
        if (eventsResponse.ok) {
          const eventsData = await eventsResponse.json();
          if (Array.isArray(eventsData)) {
            setEvents(eventsData.slice(0, 6));
          }
        }
      } catch (error) {
        console.log('Using static events data');
      }

      try {
        // Fetch ministries
        const ministriesResponse = await fetch('/api/ministries');
        if (ministriesResponse.ok) {
          const ministriesData = await ministriesResponse.json();
          if (Array.isArray(ministriesData) && ministriesData.length > 0) {
            setMinistries(ministriesData.map((m: any) => ({
              name: m.name,
              description: m.description,
              icon: m.icon || 'Users',
              color: m.color || 'bg-primary',
              leader: m.leader || '—',
              meetingTime: m.meetingTime || '—',
            })));
          }
        }
      } catch (error) {
        console.log('Using static ministries data');
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32">
        <BackgroundSlideshow
          images={backgroundImages}
          interval={180000} // 3 minutes
          className="z-0"
        />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">

          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Welcome to{" "}
            <span className="text-primary">PGMI</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-4 max-w-3xl mx-auto">
            Perfecting Grace Ministries International
          </p>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
            A place where faith comes alive, community thrives, and God's love transforms lives.
            Join us on this incredible journey of spiritual growth and discovery.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg px-8 py-6">
              <Link href="/about">Learn More</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6">
              <Link href="/events">Join Us</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Welcome Message */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              A Message from Our Pastor
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              "At PGMI, we believe in creating a warm, welcoming environment where
              everyone can experience the love of Christ. Our mission is to spread God's love,
              build meaningful relationships, and help each person discover their purpose in God's plan.
              Whether you're new to faith or have been walking with God for years, there's a place for you here."
            </p>
            <p className="text-lg font-semibold text-foreground">
              — Pastor Andrew
            </p>
          </div>
        </div>
      </section>

      {/* Ministries Preview */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
            Our Ministries
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {ministries.map((ministry) => {
              const IconComponent = iconMap[ministry.icon as keyof typeof iconMap];
              return (
                <Card key={ministry.name} className="text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-md">
                  <CardHeader className="pb-4">
                    <div className={`w-20 h-20 ${ministry.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                      {IconComponent && <IconComponent className="h-10 w-10 text-white" />}
                    </div>
                    <CardTitle className="text-lg font-semibold">{ministry.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <CardDescription className="text-sm leading-relaxed text-muted-foreground">
                      {ministry.description}
                    </CardDescription>
                    <div className="mt-4 pt-4 border-t border-muted">
                      <p className="text-xs text-muted-foreground">
                        <strong>Leader:</strong> {ministry.leader}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        <strong>When:</strong> {ministry.meetingTime}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg" className="px-8 py-3">
              <Link href="/ministries">View All Ministries</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Pastors Section */}
      <PastorsSection />

      {/* Latest Sermon */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12">Latest Sermon</h2>
          <div className="max-w-4xl mx-auto">
            {latestSermon ? (
            <Card className="overflow-hidden">
              <div className="aspect-video bg-muted flex items-center justify-center">
                <div className="text-center">
                  <Play className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Sermon Video</p>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-2xl">{latestSermon.title}</CardTitle>
                <CardDescription className="text-lg">
                    {latestSermon.preacher} • {latestSermon.date} {latestSermon.duration ? `• ${latestSermon.duration}` : ''}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                    {latestSermon.videoUrl && (
                  <Button asChild>
                    <Link href={latestSermon.videoUrl}>Watch Now</Link>
                  </Button>
                    )}
                  <Button asChild variant="outline">
                    <Link href="/sermons">View All Sermons</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
            ) : (
              <p className="text-center text-muted-foreground">No sermons yet.</p>
            )}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
            Upcoming Events
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(events.length ? events : upcomingEvents).map((event) => (
              <Card key={event.id || event._id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl">{event.title}</CardTitle>
                  <CardDescription className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4" />
                      <span>{event.date?.toString?.() ?? event.date}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4" />
                      <span>{event.location}</span>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{event.description}</p>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/events">Learn More</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button asChild size="lg">
              <Link href="/events">View All Events</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Join Us This Sunday
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Experience the warmth of our community and the power of God's presence.
            We can't wait to meet you!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="secondary" size="lg" className="text-lg px-8 py-6">
              <Link href="/contact">Get Directions</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6">
              <Link href="/prayer">Submit Prayer Request</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
