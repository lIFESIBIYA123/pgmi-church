"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, Facebook, Twitter, Instagram } from "lucide-react";
import Image from "next/image";
import { pastors } from "@/lib/data/pastors";
import Link from "next/link";

export function PastorsSection() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
          Meet Our Leadership Team
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
          {pastors.map((pastor) => (
            <Card key={pastor.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48 w-full">
                <Image
                  src={pastor.image}
                  alt={pastor.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, (max-width: 1536px) 33vw, 16vw"
                />
              </div>
              <CardHeader className="text-center pb-3">
                <CardTitle className="text-lg">{pastor.name}</CardTitle>
                <CardDescription className="text-sm font-medium text-gray-700">
                  {pastor.role}
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center space-y-3 pt-0">
                <p className="text-muted-foreground text-xs leading-relaxed">
                  {pastor.bio}
                </p>

                <div className="flex flex-col space-y-1">
                  <div className="flex items-center justify-center space-x-2">
                    <Mail className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{pastor.email}</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <Phone className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{pastor.phone}</span>
                  </div>
                </div>

                {pastor.socialMedia && (
                  <div className="flex justify-center space-x-2 pt-2">
                    {pastor.socialMedia.facebook && (
                      <Button variant="ghost" size="sm" asChild>
                        <a href={pastor.socialMedia.facebook} target="_blank" rel="noopener noreferrer">
                          <Facebook className="h-3 w-3" />
                        </a>
                      </Button>
                    )}
                    {pastor.socialMedia.twitter && (
                      <Button variant="ghost" size="sm" asChild>
                        <a href={pastor.socialMedia.twitter} target="_blank" rel="noopener noreferrer">
                          <Twitter className="h-3 w-3" />
                        </a>
                      </Button>
                    )}
                    {pastor.socialMedia.instagram && (
                      <Button variant="ghost" size="sm" asChild>
                        <a href={pastor.socialMedia.instagram} target="_blank" rel="noopener noreferrer">
                          <Instagram className="h-3 w-3" />
                        </a>
                      </Button>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild variant="outline" size="lg">
            <Link href="/about">Learn More About Our Team</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
