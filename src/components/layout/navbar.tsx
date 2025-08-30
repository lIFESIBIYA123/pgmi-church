'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu, Shield } from 'lucide-react'
import { useSession } from 'next-auth/react'

// ---- Types ----
interface NavItem {
  name: string
  href?: string
  visible?: boolean
  order?: number
}

interface ApiNavItem {
  label: string
  url?: string
  visible?: boolean
  order?: number
}

interface UserWithRole {
  role?: string
}

// ---- Default navigation ----
const defaultNav: NavItem[] = [
  { name: 'Home', href: '/' },
  { name: 'About Us', href: '/about' },
  { name: 'Ministries', href: '/ministries' },
  { name: 'Sermons', href: '/sermons' },
  { name: 'Events', href: '/events' },
  { name: 'Contact', href: '/contact' },
  { name: 'Giving', href: '/giving' },
  { name: 'Prayer', href: '/prayer' },
]

export function Navbar({ live }: { live?: { isLive: boolean; url?: string; title?: string } }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [items, setItems] = useState<NavItem[]>(defaultNav)
  const { data: session } = useSession()

  useEffect(() => {
    fetch('/api/navbar')
      .then((res) => res.json())
      .then((data: { items?: ApiNavItem[] }) => {
        if (Array.isArray(data?.items) && data.items.length > 0) {
          const mappedItems: NavItem[] = data.items
            .filter((i) => i.visible !== false && (i.label?.trim?.() ?? '') !== '') // only visible items with label and url
            .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
            .map((i) => ({ name: i.label, href: i.url }))
          setItems(mappedItems)
        }
      })
      .catch(() => {
        // fail silently, fallback stays
      })
  }, [])

  const user = session?.user as UserWithRole | undefined

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              <Image
                src="/images/pgmi logo.png"
                alt="PGMI Logo"
                width={40}
                height={40}
                className="h-10 w-10 flex-shrink-0"
                priority
              />

            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:space-x-8">
            {items.map((item) =>
              item.href ? (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.name}
                </Link>
              ) : (
                <span
                  key={item.name}
                  className="text-sm font-medium text-muted-foreground"
                >
                  {item.name}
                </span>
              )
            )}

            {live?.isLive && live.url && (
              <Link
                href={live.url}
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-xs font-semibold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-red-600 text-white hover:bg-red-700 px-2.5 py-1"
            >
              Live
            </Link>
            )}

            {user?.role && (
              <Link
                href="/admin"
                className="flex items-center space-x-2 text-sm font-medium text-primary transition-colors hover:text-primary/80"
              >
                <Shield className="h-4 w-4" />
                <span>Admin</span>
              </Link>
            )}

            <Link
              href="/giving"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
            >
              Give Now
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col space-y-4 mt-8">
                  {items.map((item) =>
                    item.href ? (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="text-lg font-medium text-foreground transition-colors hover:text-primary"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ) : (
                      <span
                        key={item.name}
                        className="text-lg font-medium text-muted-foreground"
                      >
                        {item.name}
                      </span>
                    )
                  )}

                  {live?.isLive && live.url && (
                  <Link
                    href={live.url}
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-xs font-semibold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-red-600 text-white hover:bg-red-700 px-2.5 py-1"
                    rel="_blank"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Live
                  </Link>
                  )}

                  {user?.role && (
                    <Link
                      href="/admin"
                      className="flex items-center space-x-2 text-lg font-medium text-primary transition-colors hover:text-primary/80"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Shield className="h-4 w-4" />
                      <span>Admin</span>
                    </Link>
                  )}

                  <Link
                    href="/giving"
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 mt-4"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Give Now
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  )
}
