"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Menu,
  X,
  Home,
  Users,
  Calendar,
  BookOpen,
  Building2,
  Settings,
  FileText,
  Heart,
  DollarSign,
  LogOut,
} from "lucide-react"

const navigation = [
  { name: "Dashboard", href: "/admin", icon: Home },
  { name: "Pages", href: "/admin/pages", icon: FileText },
  { name: "Navbar", href: "/admin/navbar", icon: BookOpen },
  { name: "Footer", href: "/admin/footer", icon: Building2 },
  { name: "Sermons", href: "/admin/sermons", icon: FileText },
  { name: "Events", href: "/admin/events", icon: Calendar },
  { name: "Ministries", href: "/admin/ministries", icon: Users },
  { name: "Prayer Requests", href: "/admin/prayer-requests", icon: Heart },
  { name: "Contact Messages", href: "/admin/contacts", icon: DollarSign },
  { name: "User Management", href: "/admin/users", icon: Users },
  { name: "Settings", href: "/admin/settings", icon: Settings },
  { name: "Logout", href: "/api/auth/signout", icon: LogOut },
]

export function DashboardSidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  return (
    <>
      {/* Mobile sidebar */}
      <div
        className={cn(
          "fixed inset-0 z-50 lg:hidden",
          sidebarOpen ? "block" : "hidden"
        )}
      >
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-75"
          onClick={() => setSidebarOpen(false)}
        />
        <div className="fixed inset-y-0 left-0 flex w-64 flex-col bg-white shadow-lg">
          <div className="flex h-16 items-center justify-between px-4 border-b">
            <h1 className="text-lg font-semibold">PGMI Admin</h1>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          <nav className="flex-1 space-y-1 px-2 py-4">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  )}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow bg-white border-r border-gray-200">
          <div className="flex h-16 items-center px-4 border-b">
            <h1 className="text-lg font-semibold">PGMI Admin</h1>
          </div>
          <nav className="flex-1 space-y-1 px-2 py-4">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  )}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Mobile menu button */}
      <div className="lg:hidden">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSidebarOpen(true)}
          className="fixed top-4 left-4 z-40"
        >
          <Menu className="h-6 w-6" />
        </Button>
      </div>
    </>
  )
}
