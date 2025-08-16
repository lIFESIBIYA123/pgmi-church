# PGMI Church Website - Development Roadmap

## Project Overview
Building a modern, mobile-responsive church website using Next.js 15, Tailwind CSS v4, and shadcn/ui components.

## Technology Stack
- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Forms**: React Hook Form
- **Deployment**: Vercel (recommended)

## Development Sequence

### Phase 1: Project Foundation ✅
- [x] 01-project-setup - Initialize Next.js with shadcn/ui
- [x] 02-tailwind-config - Configure Tailwind CSS v4
- [x] 03-ui-components - Install shadcn/ui components
- [ ] 04-layout-components - Create base layout, navbar, and footer
- [ ] 05-utility-functions - Set up utility functions and helpers

### Phase 2: Core Pages
- [ ] 06-homepage - Hero section, welcome message, upcoming events
- [ ] 07-about-us - Church history, mission, vision, leadership
- [ ] 08-ministries - List all church ministries with descriptions
- [ ] 09-sermons - Audio/video sermons with filtering and downloads
- [ ] 10-events - Event calendar and upcoming activities
- [ ] 11-contact - Contact form, address, and Google Maps integration
- [ ] 12-giving - Online giving with payment gateway
- [ ] 13-prayer-requests - Prayer request submission system

### Phase 3: Advanced Features
- [ ] 14-search-system - Global search functionality
- [ ] 15-live-streaming - YouTube/Facebook Live integration
- [ ] 16-seo-optimization - Meta tags and social sharing
- [ ] 17-responsive-design - Mobile-first responsive design

### Phase 4: Deployment & Testing
- [ ] 18-testing - Component and integration testing
- [ ] 19-performance - Optimization and performance improvements
- [ ] 20-deployment - Production deployment instructions

## File Structure
```
src/
├── app/                    # Next.js 15 app directory
│   ├── (routes)/          # Route groups
│   │   ├── about/         # About Us page
│   │   ├── ministries/    # Ministries page
│   │   ├── sermons/       # Sermons page
│   │   ├── events/        # Events page
│   │   ├── contact/       # Contact page
│   │   ├── giving/        # Giving page
│   │   └── prayer/        # Prayer requests page
│   ├── api/               # API routes
│   ├── globals.css        # Global styles with CSS variables
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/             # Reusable components
│   ├── layout/            # Layout components (navbar, footer)
│   ├── ui/                # shadcn/ui components ✅
│   ├── sections/          # Page sections (hero, about, etc.)
│   └── forms/             # Form components
├── lib/                   # Utility functions ✅
├── types/                 # TypeScript types
├── data/                  # Static data and content
└── hooks/                 # Custom React hooks
```

## Design System
- **Primary Colors**: Warm church-themed palette (browns, golds, deep blues)
- **Typography**: Readable, welcoming fonts
- **Spacing**: Consistent 4px grid system
- **Breakpoints**: Mobile-first responsive design
- **Components**: Accessible, reusable UI components from shadcn/ui

## Next Steps
1. ✅ Project setup complete
2. ✅ shadcn/ui components installed
3. Create base layout components
4. Implement homepage
5. Build remaining pages sequentially
6. Add advanced features
7. Deploy to production
