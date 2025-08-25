import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from  '@/components/ui/card' ;
import { PastorsSection } from  '@/components/ui/pastors-section' ;
import Link from  'next/link' ;

export default function AboutPage() {
  return (
    <div className= 'min-h-screen bg-background' >
      {/* Hero Section */}
      <section className= 'relative py-20 lg:py-32 bg-gradient-to-br from-primary/10 to-secondary/10 '>
        <div className= 'container mx-auto px-4 sm:px-6 lg:px-8 text-center' >
          <h1 className= 'text-4xl md:text-6xl font-bold text-foreground mb-6 '>
            About PGMI Church
          </h1>
          <p className= 'text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto' >
            Perfecting Grace Ministries International - A place where faith comes alive,
            community thrives, and the love of God transforms lives.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className= 'py-16 bg-background' >
        <div className= 'container mx-auto px-4 sm:px-6 lg:px-8' >
          <div className= 'grid grid-cols-1 lg:grid-cols-2 gap-12' >
            <div>
              <h2 className= 'text-3xl md:text-4xl font-bold text-foreground mb-6' >
                Our Mission
              </h2>
              <p className= 'text-lg text-muted-foreground leading-relaxed mb-6' >
                At PGMI, we are committed to spreading the Gospel of Jesus Christ,
                building a strong community of believers, and serving our local and
                global community with the love of God and grace.
              </p>
              <p className= 'text-lg text-muted-foreground leading-relaxed' >
                We believe in creating an environment where everyone can experience
                the transformative power of the love of God and grow in their faith journey.
              </p>
            </div>
            <div>
              <h2 className= 'text-3xl md:text-4xl font-bold text-foreground mb-6 '>
                Our Vision
              </h2>
              <p className= 'text-lg text-muted-foreground leading-relaxed mb-6'>
                To be a beacon of hope and transformation in our community,
                leading people to Christ and equipping them to live out their
                God-given purpose.
              </p>
              <p className= 'text-lg text-muted-foreground leading-relaxed'>
                We envision a church where every member is actively involved in
                ministry, growing in discipleship, and making a positive impact
                in the world around them.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className= 'py-16 bg-muted/30' >
        <div className= 'container mx-auto px-4 sm:px-6 lg:px-8' >
          <h2 className= 'text-3xl md:text-4xl font-bold text-foreground text-center mb-12' >
            Our Core Values
          </h2>
          <div className= 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 '>
            <Card>
              <CardHeader>
                <CardTitle className= 'text-xl' >Biblical Teaching</CardTitle>
              </CardHeader>
              <CardContent>
                <p className= 'text-muted-foreground' >
                  We are committed to teaching the Word of God faithfully and
                  applying biblical principles to our daily lives.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className= 'text-xl '>Community</CardTitle>
              </CardHeader>
              <CardContent>
                <p className= 'text-muted-foreground' >
                  We believe in building authentic relationships and supporting
                  one another in our faith journey.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className= 'text-xl' >Service</CardTitle>
              </CardHeader>
              <CardContent>
                <p className= 'text-muted-foreground' >
                  We are called to serve God and others with humility,
                  compassion, and excellence.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className= 'text-xl' >Worship</CardTitle>
              </CardHeader>
              <CardContent>
                <p className= 'text-muted-foreground' >
                  We worship God with our whole hearts, celebrating His
                  goodness and responding to His love.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className= 'text-xl' >Outreach</CardTitle>
              </CardHeader>
              <CardContent>
                <p className= 'text-muted-foreground' >
                  We reach out to our community and world with the love
                  of Christ and the message of hope.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className= 'text-xl' >Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <p className= 'text-muted-foreground' >
                  We encourage continuous spiritual growth and development
                  in every area of life.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className= 'py-16 bg-background' >
        <div className= 'container mx-auto px-4 sm:px-6 lg:px-8' >
          <h2 className= 'text-3xl md:text-4xl font-bold text-foreground text-center mb-12' >
            Our Leadership Team
          </h2>
          <PastorsSection />
        </div>
      </section>

      {/* Call to Action */}
      <section className= 'py-16 bg-primary text-primary-foreground' >
        <div className= 'container mx-auto px-4 sm:px-6 lg:px-8 text-center' >
          <h2 className= 'text-3xl md:text-4xl font-bold mb-6' >
            Join Us This Sunday
          </h2>
          <p className= 'text-xl mb-8 max-w-2xl mx-auto' >
            Experience the love of Christ and become part of our growing community.
            We would love to meet you!
          </p>
          <div className= 'flex flex-col sm:flex-row gap-4 justify-center' >
            <Button asChild size= 'lg' variant= 'secondary' >
              <Link href= '/contact' >Get in Touch</Link>
            </Button>
            <Button asChild size= 'lg' variant= 'outline' >
              <Link href= '/events' >View Events</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
