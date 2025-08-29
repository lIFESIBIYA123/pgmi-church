'use client'

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Play,
  Download,
  Search,
  Youtube,
  Facebook,
  Headphones,
  Video,
  FileText,
  Image as ImageIcon
} from "lucide-react";
import Link from "next/link";
import { BackgroundSlideshow } from "@/components/ui/background-slideshow";
import Image from "next/image";

interface Sermon {
  _id: string;
  id: string;
  title: string;
  preacher: string;
  date: string;
  duration?: string;
  description?: string;
  videoUrl?: string;
  audioUrl?: string;
  downloadUrl?: string;
  thumbnail?: string;
  category?: string;
  tags?: string[];
}

export default function SermonsPage() {
  const [sermons, setSermons] = useState<Sermon[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTab, setSelectedTab] = useState('all');

  useEffect(() => {
    const fetchSermons = async () => {
      try {
        const response = await fetch('/api/sermons');
        const data = await response.json();
        setSermons(data);
      } catch (error) {
        console.error('Error fetching sermons:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSermons();
  }, []);

  const filteredSermons = sermons.filter(sermon => {
    const matchesSearch = sermon.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sermon.preacher.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || sermon.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // This is part of the old static data structure and is no longer needed.
  // const getServiceImages = (sermonId: string) => {
  //   return [];
  // };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20">
        <BackgroundSlideshow
          pageKey="sermons"
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
            Sermons & Messages
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
            Listen to inspiring messages, powerful teachings, and life-changing sermons from our pastors and guest speakers.
          </p>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-background border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search sermons..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filters */}
            <div className="flex gap-4 w-full lg:w-auto">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-border rounded-md bg-background text-foreground"
              >
                {["All", "Faith", "Prayer", "Relationships", "Encouragement", "Stewardship", "Purpose"].map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Sermons Content */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="all">All Sermons</TabsTrigger>
              <TabsTrigger value="video">Video</TabsTrigger>
              <TabsTrigger value="audio">Audio</TabsTrigger>
              <TabsTrigger value="downloads">Downloads</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-8">
              {filteredSermons.map((sermon) => (
                <Card key={sermon.id} className="overflow-hidden">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Sermon Info */}
                    <div className="lg:col-span-2 p-6">
                      <div className="space-y-4">
                        <div>
                          <h2 className="text-2xl font-bold mb-2">{sermon.title}</h2>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                            <span className="font-medium text-foreground">{sermon.preacher}</span>
                            <span>•</span>
                            <span>{formatDate(sermon.date)}</span>
                            <span>•</span>
                            <span>{sermon.duration}</span>
                          </div>
                          <p className="text-muted-foreground leading-relaxed">{sermon.description}</p>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {sermon.tags.slice(0, 3).map((tag, index) => (
                            <Badge key={index} variant="outline">{tag}</Badge>
                          ))}
                        </div>

                        <div className="flex gap-3">
                          <Button asChild>
                            <Link href={sermon.videoUrl || '#'}>
                              <Play className="h-4 w-4 mr-2" />
                              Watch
                            </Link>
                          </Button>
                          <Button asChild variant="outline">
                            <Link href={sermon.audioUrl || '#'}>
                              <Headphones className="h-4 w-4 mr-2" />
                              Listen
                            </Link>
                          </Button>
                          <Button asChild variant="outline">
                            <Link href={sermon.downloadUrl || '#'}>
                              <Download className="h-4 w-4 mr-2" />
                              Download
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Sermon Thumbnail */}
                    <div className="p-6 flex items-center justify-center bg-muted">
                      {sermon.thumbnail ? (
                        <Image src={sermon.thumbnail} alt={sermon.title} width={1280} height={720} className="w-full h-auto object-cover rounded-lg" />
                      ) : (
                        <div className="aspect-video w-full bg-muted rounded-lg flex items-center justify-center">
                          <div className="text-center">
                            <Play className="h-16 w-16 text-muted-foreground mx-auto mb-2" />
                            <p className="text-muted-foreground">No Thumbnail</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              ))}

              {loading && <p>Loading sermons...</p>}

              {!loading && filteredSermons.length === 0 && (
                <div className="text-center py-12">
                  <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No sermons found</h3>
                  <p className="text-muted-foreground">Try adjusting your search terms or filters.</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="video" className="space-y-6">
              <div className="text-center py-12">
                <Video className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Video Sermons</h3>
                <p className="text-muted-foreground">Watch our latest video sermons and messages.</p>
              </div>
            </TabsContent>

            <TabsContent value="audio" className="space-y-6">
              <div className="text-center py-12">
                <Headphones className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Audio Sermons</h3>
                <p className="text-muted-foreground">Listen to our audio sermons on the go.</p>
              </div>
            </TabsContent>

            <TabsContent value="downloads" className="space-y-6">
              <div className="text-center py-12">
                <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Sermon Downloads</h3>
                <p className="text-muted-foreground">Download sermon notes and transcripts.</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Live Streaming Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
            Live Streaming
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Youtube className="h-6 w-6 text-red-600" />
                  YouTube Live
                </CardTitle>
                <CardDescription>
                  Watch our Sunday services live on YouTube
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-muted flex items-center justify-center">
                  <div className="text-center">
                    <Youtube className="h-16 w-16 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground">Live Stream</p>
                  </div>
                </div>
                <Button asChild className="w-full mt-4">
                  <Link href="#">Watch Live</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Facebook className="h-6 w-6 text-blue-600" />
                  Facebook Live
                </CardTitle>
                <CardDescription>
                  Join us live on Facebook for special events
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-muted flex items-center justify-center">
                  <div className="text-center">
                    <Facebook className="h-16 w-16 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground">Live Stream</p>
                  </div>
                </div>
                <Button asChild className="w-full mt-4">
                  <Link href="#">Watch Live</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Never Miss a Message
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Subscribe to our channel and get notified when new sermons are available.
            Stay connected and grow in your faith.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="secondary" size="lg" className="text-lg px-8 py-6">
              <Link href="/events">View Events</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
