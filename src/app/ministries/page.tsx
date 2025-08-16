import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Users,
  Play,
  Heart,
  BookOpen,
  Globe,
  Coffee,
  Camera,
  Music,
  Calendar,
  MapPin,
  Clock
} from "lucide-react";
import Link from "next/link";
import { BackgroundSlideshow } from "@/components/ui/background-slideshow";
import Image from "next/image";

const ministries = [
  {
    id: 1,
    name: "Youth Ministry",
    description: "Empowering the next generation through faith, fellowship, and fun activities.",
    longDescription: "Our youth ministry is designed to help teenagers and young adults grow in their faith while building meaningful relationships. We offer weekly Bible studies, fun events, mission trips, and leadership development opportunities.",
    icon: Users,
    color: "bg-blue-500",
    meetingTime: "Every Wednesday at 6:30 PM",
    location: "Youth Center",
    leader: "Pastor Sarah Johnson",
    contact: "youth@pgmichurch.org",
    activities: ["Bible Study", "Worship Nights", "Mission Trips", "Leadership Training", "Social Events"],
    image: "/api/placeholder/400/250",
  },
  {
    id: 2,
    name: "Music Ministry",
    description: "Leading worship through music and creative arts to glorify God.",
    longDescription: "Our music ministry creates an atmosphere of worship through contemporary and traditional music. We have multiple teams including choir, band, and special ensembles that minister during services and special events.",
    icon: Play,
    color: "bg-green-500",
    meetingTime: "Rehearsals: Tuesday & Thursday at 7:00 PM",
    location: "Worship Center",
    leader: "Michael Davis",
    contact: "music@pgmichurch.org",
    activities: ["Sunday Worship", "Choir", "Band", "Special Music", "Recording"],
    image: "/api/placeholder/400/250",
  },
  {
    id: 3,
    name: "Outreach Ministry",
    description: "Serving our community with love, compassion, and practical help.",
    longDescription: "Our outreach ministry reaches beyond our church walls to serve those in need. We provide food assistance, clothing, counseling, and support to families and individuals in our community.",
    icon: Heart,
    color: "bg-red-500",
    meetingTime: "Monthly planning meetings",
    location: "Various locations",
    leader: "David Wilson",
    contact: "outreach@pgmichurch.org",
    activities: ["Food Bank", "Clothing Drive", "Homeless Ministry", "Community Service", "Emergency Assistance"],
    image: "/api/placeholder/400/250",
  },
  {
    id: 4,
    name: "Children's Church",
    description: "Nurturing young hearts in God's love and truth through age-appropriate activities.",
    longDescription: "Children's Church provides a safe, fun, and educational environment where children learn about God through stories, songs, crafts, and interactive activities. We have programs for ages 2-12.",
    icon: BookOpen,
    color: "bg-yellow-500",
    meetingTime: "Every Sunday during service",
    location: "Children's Wing",
    leader: "Lisa Wilson",
    contact: "children@pgmichurch.org",
    activities: ["Sunday School", "Vacation Bible School", "Children's Choir", "Special Events", "Parent Resources"],
    image: "/api/placeholder/400/250",
  },
  {
    id: 5,
    name: "International Missions",
    description: "Supporting global missions and spreading the Gospel worldwide.",
    longDescription: "Our international missions ministry supports missionaries and projects around the world. We focus on church planting, education, healthcare, and humanitarian aid in developing nations.",
    icon: Globe,
    color: "bg-purple-500",
    meetingTime: "Quarterly meetings",
    location: "Conference Room",
    leader: "Robert Chen",
    contact: "missions@pgmichurch.org",
    activities: ["Mission Trips", "Financial Support", "Prayer Support", "Partnership Development", "Cultural Exchange"],
    image: "/api/placeholder/400/250",
  },
  {
    id: 6,
    name: "Fellowship Ministry",
    description: "Building community through social events and relationship building.",
    longDescription: "The fellowship ministry creates opportunities for church members to connect, build relationships, and enjoy community life together. We organize social events, small groups, and special celebrations.",
    icon: Coffee,
    color: "bg-orange-500",
    meetingTime: "Various times",
    location: "Fellowship Hall",
    leader: "Maria Rodriguez",
    contact: "fellowship@pgmichurch.org",
    activities: ["Small Groups", "Social Events", "Holiday Celebrations", "Welcome Team", "Hospitality"],
    image: "/api/placeholder/400/250",
  },
  {
    id: 7,
    name: "Media & Technology",
    description: "Using technology to enhance worship and reach more people.",
    longDescription: "Our media ministry handles all aspects of technology including sound, lighting, video production, live streaming, and social media. We ensure that both in-person and online attendees have an excellent experience.",
    icon: Camera,
    color: "bg-indigo-500",
    meetingTime: "Before and during services",
    location: "Media Booth",
    leader: "Alex Thompson",
    contact: "media@pgmichurch.org",
    activities: ["Live Streaming", "Sound Engineering", "Video Production", "Social Media", "Technical Support"],
    image: "/api/placeholder/400/250",
  },
  {
    id: 8,
    name: "Prayer Ministry",
    description: "Interceding for our church, community, and world through prayer.",
    longDescription: "The prayer ministry is the foundation of all we do. We have dedicated prayer warriors who intercede for specific needs, organize prayer meetings, and maintain a prayer request system.",
    icon: Heart,
    color: "bg-pink-500",
    meetingTime: "Every Friday at 7:00 PM",
    location: "Prayer Room",
    leader: "Grace Kim",
    contact: "prayer@pgmichurch.org",
    activities: ["Prayer Meetings", "Prayer Requests", "Intercessory Prayer", "Prayer Walks", "24/7 Prayer Chain"],
    image: "/api/placeholder/400/250",
  },
];

export default function MinistriesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20">
        <BackgroundSlideshow
          pageKey="ministries"
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
            Our Ministries
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
            Discover how you can get involved and use your gifts to serve God and others in our church community.
          </p>
        </div>
      </section>

      {/* Ministries Grid */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ministries.map((ministry) => (
              <Card key={ministry.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="aspect-video bg-muted flex items-center justify-center">
                  <div className="text-center">
                    <div className={`w-20 h-20 ${ministry.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <ministry.icon className="h-10 w-10 text-white" />
                    </div>
                    <p className="text-muted-foreground">Ministry Image</p>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <div className={`w-4 h-4 ${ministry.color} rounded-full`}></div>
                    {ministry.name}
                  </CardTitle>
                  <CardDescription className="text-base">
                    {ministry.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{ministry.meetingTime}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{ministry.location}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm">
                      <span className="font-semibold">Leader:</span> {ministry.leader}
                    </p>
                    <p className="text-sm">
                      <span className="font-semibold">Contact:</span> {ministry.contact}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-semibold">Activities:</p>
                    <div className="flex flex-wrap gap-1">
                      {ministry.activities.slice(0, 3).map((activity, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {activity}
                        </Badge>
                      ))}
                      {ministry.activities.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{ministry.activities.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  <Button asChild className="w-full">
                    <Link href={`/ministries/${ministry.id}`}>Learn More</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Get Involved Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Get Involved Today
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              There's a place for everyone in our church family. Whether you're interested in music,
              working with children, serving the community, or using your technical skills, we have
              opportunities that match your gifts and interests.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg px-8 py-6">
                <Link href="/contact">Contact Us</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6">
                <Link href="/events">View Events</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Ministry Values */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
            Why Serve in Ministry?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Build Community</h3>
              <p className="text-muted-foreground">
                Connect with like-minded believers and form lasting friendships while serving together.
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Grow Spiritually</h3>
              <p className="text-muted-foreground">
                Serving others helps you grow in your faith and develop a deeper relationship with God.
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Make a Difference</h3>
              <p className="text-muted-foreground">
                Use your gifts and talents to impact lives and advance God's kingdom in our community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Serve?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Take the first step toward getting involved in ministry. We'll help you find the perfect
            opportunity to use your gifts and serve God.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="secondary" size="lg" className="text-lg px-8 py-6">
              <Link href="/contact">Get Started</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6">
              <Link href="/prayer">Pray About It</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
