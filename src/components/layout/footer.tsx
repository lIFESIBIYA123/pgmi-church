"use client"

import Link from "next/link"
import {
  Church,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Youtube,
} from "lucide-react"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"

interface SocialLinks {
  facebook?: string
  instagram?: string
  youtube?: string
}

interface Address {
  street?: string
  city?: string
  state?: string
  zipCode?: string
  country?: string
}

interface FooterLink {
  label: string
  url?: string
}

interface FooterData {
  name?: string
  description?: string
  social?: SocialLinks
  quickLinks?: FooterLink[]
  services?: FooterLink[]
  address?: string | Address
  phone?: string
  email?: string
}

export function Footer() {
  const [data, setData] = useState<FooterData | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    fetch("/api/footer")
      .then((r) => r.json())
      .then((d: FooterData) => setData(d))
      .catch(() => {})
  }, [])

  if (pathname.startsWith("/admin")) {
    return null
  }

  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Church Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Church className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-foreground">
                {data?.name ?? "PGMI Church"}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              {data?.description ??
                "Spreading God's love and building community through faith, hope, and service."}
            </p>
            <div className="flex space-x-4">
              {data?.social?.facebook &&
              data.social.facebook.trim() !== "" &&
              data.social.facebook !== "#" && (
                <Link
                  href={data.social.facebook}
                  className="text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Facebook className="h-5 w-5" />
                </Link>
              )}
              {data?.social?.instagram &&
              data.social.instagram.trim() !== "" &&
              data.social.instagram !== "#" && (
                <Link
                  href={data.social.instagram}
                  className="text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram className="h-5 w-5" />
                </Link>
              )}
              {data?.social?.youtube &&
              data.social.youtube.trim() !== "" &&
              data.social.youtube !== "#" && (
                <Link
                  href={data.social.youtube}
                  className="text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Youtube className="h-5 w-5" />
                </Link>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Quick Links</h3>
            <ul className="space-y-2">
              {(data?.quickLinks ?? [
                { label: "About Us", url: "/about" },
                { label: "Ministries", url: "/ministries" },
                { label: "Sermons", url: "/sermons" },
                { label: "Events", url: "/events" },
              ]).map((l: FooterLink, index) => (
                <li key={`quick-${index}`}>
                  {l.url && l.url.trim() !== "" && l.url !== "#" ? (
                    <Link
                      href={l.url}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer block py-1"
                    >
                      {l.label}
                    </Link>
                  ) : (
                    <span className="text-sm text-muted-foreground block py-1">
                      {l.label}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Services</h3>
            <ul className="space-y-2">
              {(data?.services ?? [
                { label: "Online Giving", url: "/giving" },
                { label: "Prayer Requests", url: "/prayer" },
                { label: "Contact Us", url: "/contact" },
              ]).map((l: FooterLink, index) => (
                <li key={`service-${index}`}>
                  {l.url && l.url.trim() !== "" && l.url !== "#" ? (
                    <Link
                      href={l.url}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer block py-1"
                    >
                      {l.label}
                    </Link>
                  ) : (
                    <span className="text-sm text-muted-foreground block py-1">
                      {l.label}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">
              Contact Info
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {data?.address ? (
                    typeof data.address === "string" ? (
                      data.address
                    ) : (
                      <>
                        {data.address.street && `${data.address.street}`}
                        {data.address.street && <br />}
                        {data.address.city && data.address.state && data.address.zipCode
                          ? `${data.address.city}, ${data.address.state} ${data.address.zipCode}`
                          : `${data.address.city || ""} ${data.address.state || ""} ${
                              data.address.zipCode || ""
                            }`.trim()}
                        {data.address.country &&
                          data.address.country !== "USA" && (
                            <>
                              <br />
                              {data.address.country}
                            </>
                          )}
                      </>
                    )
                  ) : (
                    <>
                      123 Church Street
                      <br />
                      City, State 12345
                    </>
                  )}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {data?.phone ?? "(555) 123-4567"}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {data?.email ?? "info@pgmichurch.org"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} PGMI Church. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link
                href="/privacy"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
