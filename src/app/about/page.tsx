import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Church, Heart, Target, Users, Award, Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BackgroundSlideshow } from "@/components/ui/background-slideshow";
import Image from "next/image";

const leadership = [
  {
    name: "Pastor John Smith",
    role: "Senior Pastor",
    image: "/api/placeholder/150/150",
    bio: "Pastor John has been serving at PGMI Church for over 15 years. He has a passion for teaching God's Word and building community.",
    email: "pastor@pgmichurch.org",
    phone: "(555) 123-4567",
  },
  {
    name: "Sarah Johnson",
    role: "Associate Pastor",
    image: "/api/placeholder/150/150",
    bio: "Pastor Sarah leads our youth and family ministries with energy and creativity.",
    email: "sarah@pgmichurch.org",
    phone: "(555) 123-4568",
  },
  {
    name: "Michael Davis",
    role: "Worship Leader",
    image: "/api/placeholder/150/150",
    bio: "Michael leads our worship team and creates an atmosphere of praise and worship.",
    email: "michael@pgmichurch.org",
    phone: "(555) 123-4569",
  },
  {
    name: "Lisa Wilson",
    role: "Children's Ministry Director",
    image: "/api/placeholder/150/150",
    bio: "Lisa creates engaging programs that help children grow in their faith and understanding of God.",
    email: "lisa@pgmichurch.org",
    phone: "(555) 123-4570",
  },
];

const values = [
  {
    title: "Biblical Teaching",
    description: "We are committed to teaching God's Word faithfully and applying it to our daily lives.",
    icon: Church,
  },
  {
    title: "Community",
    description: "We believe in building authentic relationships and supporting one another in our faith journey.",
    icon: Users,
  },
  {
    title: "Service",
    description: "We are called to serve our community with love, compassion, and practical help.",
    icon: Heart,
  },
  {
    title: "Excellence",
    description: "We strive for excellence in everything we do, honoring God with our best efforts.",
    icon: Award,
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20">
        <BackgroundSlideshow
          pageKey="about"
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
            About PGMI
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
            Discover our story, mission, and the amazing people who make our church community special.
          </p>
        </div>
      </section>

      {/* Church History */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
              Our Story
            </h2>
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                PGMI was founded in 1985 with a vision to create a welcoming community
                where people could experience God's love and grow in their faith. What started
                as a small gathering of 20 people has grown into a vibrant congregation of over
                500 members.
              </p>
              <p>
                Over the years, we've seen countless lives transformed through the power of
                God's Word and the love of our community. We've weathered challenges together,
                celebrated victories, and grown stronger in our faith and relationships.
              </p>
              <p>
                Today, we continue to build on the strong foundation laid by our founders,
                embracing new opportunities to serve our community and share the Gospel with
                those who need hope and healing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Mission */}
            <Card className="text-center">
              <CardHeader>
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-10 w-10 text-primary" />
                </div>
                <CardTitle className="text-2xl">Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  To spread God's love, build meaningful relationships, and help each person
                  discover their purpose in God's plan. We are committed to making disciples
                  who make disciples, transforming lives through the Gospel of Jesus Christ.
                </p>
              </CardContent>
            </Card>

            {/* Vision */}
            <Card className="text-center">
              <CardHeader>
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="h-10 w-10 text-primary" />
                </div>
                <CardTitle className="text-2xl">Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  To be a beacon of hope in our community, known for our love, service, and
                  commitment to God's Word. We envision a church where every person feels
                  valued, every family is strengthened, and every life is transformed by God's grace.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <Card key={value.title} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{value.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
            Our Leadership Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {leadership.map((leader) => (
              <Card key={leader.name} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Avatar className="w-24 h-24 mx-auto mb-4">
                    <AvatarImage src={leader.image} alt={leader.name} />
                    <AvatarFallback>{leader.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <CardTitle className="text-xl">{leader.name}</CardTitle>
                  <CardDescription className="text-lg font-semibold text-primary">
                    {leader.role}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{leader.bio}</p>
                  <div className="space-y-2 text-sm">
                    <p className="text-muted-foreground">{leader.email}</p>
                    <p className="text-muted-foreground">{leader.phone}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Church Info */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
              Church Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Service Times</h3>
                <p className="text-muted-foreground">
                  Sunday Worship: 10:00 AM<br />
                  Wednesday Bible Study: 7:00 PM<br />
                  Friday Prayer: 7:00 PM
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Location</h3>
                <p className="text-muted-foreground">
                  123 Church Street<br />
                  City, State 12345<br />
                  United States
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Community</h3>
                <p className="text-muted-foreground">
                  Over 500 members<br />
                  Multi-generational<br />
                  Diverse backgrounds
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Join Our Community
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            We'd love to have you join us this Sunday. Experience the warmth of our community
            and discover how you can be part of our mission.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="secondary" size="lg" className="text-lg px-8 py-6">
              <Link href="/contact">Get in Touch</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6">
              <Link href="/events">View Events</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
