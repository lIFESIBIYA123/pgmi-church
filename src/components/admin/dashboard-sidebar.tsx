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
  Mail,
  DollarSign,
  LogOut,
  ChevronRight,
  Shield,
  UserCheck,
  ChevronDown,
} from "lucide-react"
import { useSession } from "next-auth/react"

interface NavigationItem {
  name: string;
  href: string;
  icon: React.ElementType;
  children?: NavigationItem[];
  roles?: string[];
}

const navigation: NavigationItem[] = [
  { name: "Dashboard", href: "/admin", icon: Home },
  {
    name: "Content Management",
    href: "/admin/pages",
    icon: FileText,
    children: [
      { name: "Pages", href: "/admin/pages", icon: FileText },
      { name: "Home Page", href: "/admin/home", icon: Home },
      { name: "About Page", href: "/admin/about", icon: Building2 },
      { name: "Giving Page", href: "/admin/giving", icon: DollarSign},
    ]
  },
  {
    name: "Website Settings",
    href: "/admin/settings",
    icon: Settings,
    children: [
      { name: "General Settings", href: "/admin/settings", icon: Settings },
      { name: "Navigation", href: "/admin/navbar", icon: Menu },
      { name: "Footer", href: "/admin/footer", icon: Building2 },
      { name: "Mission & Vision", href: "/admin/mission-vision", icon: FileText },
    ]
  },
  { name: "Sermons", href: "/admin/sermons", icon: BookOpen, roles: ["admin", "editor"] },
  { name: "Events", href: "/admin/events", icon: Calendar, roles: ["admin", "editor"] },
  {
    name: "Ministries",
    href: "/admin/ministries",
    icon: Users,
    children: [
      { name: "Ministries", href: "/admin/ministries", icon: Users },
      { name: "Board Members", href: "/admin/board-members", icon: Shield },
    ]
  },
  { name: "Go Live", href: "/admin/go-live", icon: BookOpen, roles: ["admin"] },
  { name: "Prayer Requests", href: "/admin/prayer-requests", icon: Heart, roles: ["admin", "editor"] },
  { name: "Contact Messages", href: "/admin/contact", icon: Mail, roles: ["admin", "editor"] },
  { name: "User Management", href: "/admin/users", icon: UserCheck, roles: ["admin"] },
  { name: "Logout", href: "/api/auth/signout", icon: LogOut },
]

export function DashboardSidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())
  const pathname = usePathname()
  const { data: session } = useSession()

  const toggleExpanded = (itemName: string) => {
    const newExpanded = new Set(expandedItems)
    if (newExpanded.has(itemName)) {
      newExpanded.delete(itemName)
    } else {
      newExpanded.add(itemName)
    }
    setExpandedItems(newExpanded)
  }

  const hasAccess = (item: NavigationItem): boolean => {
    if (!item.roles) return true
    if (!session?.user?.role) return false

    // Type assertion to include custom properties
    const user = session.user as {
      id: string;
      role: string;
      isMainAdmin?: boolean;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };

    return item.roles.includes(user.role) || Boolean(user.isMainAdmin)
  }

  const renderNavigationItem = (item: NavigationItem, level: number = 0) => {
    if (!hasAccess(item)) return null

    const isActive = pathname === item.href
    const hasChildren = item.children && item.children.length > 0
    const isExpanded = expandedItems.has(item.name)
    const hasActiveChild = hasChildren && item.children?.some(child => pathname === child.href)

    if (hasChildren) {
      return (
        <div key={item.name}>
          <button
            onClick={() => toggleExpanded(item.name)}
            className={cn(
              "group flex w-full items-center px-2 py-2 text-sm font-medium rounded-md transition-colors",
              (isActive || hasActiveChild)
                ? "bg-primary text-primary-foreground"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            )}
          >
            <item.icon className="mr-3 h-5 w-5" />
            <span className="flex-1 text-left">{item.name}</span>
            {isExpanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </button>
          {isExpanded && (
            <div className="ml-4 space-y-1">
              {item.children?.map(child => renderNavigationItem(child, level + 1))}
            </div>
          )}
        </div>
      )
    }

    return (
      <Link
        key={item.name}
        href={item.href}
        className={cn(
          "group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors",
          level > 0 ? "ml-4" : "",
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
  }

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
          <nav className="flex-1 space-y-1 px-2 py-4 overflow-y-auto">
            {navigation.map(item => renderNavigationItem(item))}
          </nav>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow bg-white border-r border-gray-200">
          <div className="flex h-16 items-center px-4 border-b">
            <h1 className="text-lg font-semibold">PGMI Admin</h1>
          </div>
          <nav className="flex-1 space-y-1 px-2 py-4 overflow-y-auto">
            {navigation.map(item => renderNavigationItem(item))}
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
