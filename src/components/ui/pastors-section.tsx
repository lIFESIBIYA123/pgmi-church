"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Phone, Facebook, Twitter, Instagram, User } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";

interface PastorItem {
  _id: string;
  name: string;
  title?: string;
  role?: string;
  bio?: string;
  image?: string;
  email?: string;
  phone?: string;
  socialMedia?: { facebook?: string; twitter?: string; instagram?: string };
}

export function PastorsSection() {
  const [pastors, setPastors] = useState<PastorItem[]>([]);
  const [max, setMax] = useState<number>(4);

  useEffect(() => {
    fetch("/api/home-settings")
      .then(r => r.json())
      .then(s => {
        if (typeof s?.pastorsCount === "number") setMax(s.pastorsCount);
      })
      .catch(() => {});

    fetch("/api/pastors")
      .then(r => r.json())
      .then(d => setPastors(Array.isArray(d?.pastors) ? d.pastors : []))
      .catch(() => {});
  }, []);

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
          Meet Our Leadership Team
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {pastors.slice(0, max).map((pastor) => (
            <Card key={pastor._id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48 w-full bg-muted flex items-center justify-center">
                {pastor.image ? (
                  <Image
                    src={pastor.image}
                    alt={pastor.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, (max-width: 1536px) 33vw, 16vw"
                  />
                ) : (
                  <User className="h-16 w-16 text-muted-foreground" />
                )}
              </div>
              <CardHeader className="text-center pb-3">
                <CardTitle className="text-lg">{pastor.name}</CardTitle>
                {pastor.role && (
                  <CardDescription className="text-sm font-medium text-gray-700">
                    {pastor.role}
                  </CardDescription>
                )}
              </CardHeader>
              <CardContent className="text-center space-y-3 pt-0">
                {pastor.bio && (
                  <p className="text-muted-foreground text-xs leading-relaxed">
                    {pastor.bio}
                  </p>
                )}

                <div className="flex flex-col space-y-1">
                  {pastor.email && (
                    <div className="flex items-center justify-center space-x-2">
                      <Mail className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{pastor.email}</span>
                    </div>
                  )}
                  {pastor.phone && (
                    <div className="flex items-center justify-center space-x-2">
                      <Phone className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{pastor.phone}</span>
                    </div>
                  )}
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
