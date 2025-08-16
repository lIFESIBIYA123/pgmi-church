# Background Slideshow Implementation & Branding Updates

## ✅ **What Has Been Implemented**

### 1. **Background Slideshow Across All Pages**
- **Component**: Enhanced `BackgroundSlideshow` with unique page identification
- **Pages Updated**: Home, About, Events, Ministries, Contact, Sermons, Giving, Prayer
- **Features**:
  - 3-minute interval transitions
  - Unique starting backgrounds for each page (no repetition)
  - Smooth fade transitions
  - Dark overlay for text readability
  - Responsive design

### 2. **Logo & Branding Updates**
- **Navbar**: Added PGMI logo with proper alignment
- **All Pages**: Added PGMI logo in hero sections
- **Branding**: Changed from "PGMI Church" to "PGMI"
- **Full Name**: Added "Perfecting Grace Ministries International" below PGMI
- **Email Domains**: Updated from "pgmichurch.org" to "pgmi.org"

### 3. **Enhanced Background Slideshow Component**
- **Unique Page Identification**: Each page starts with different background
- **Hash-based Starting Index**: Ensures no two pages have the same initial background
- **Automatic Background Cycling**: 3-minute intervals with smooth transitions
- **Performance Optimized**: Uses Next.js Image component with proper loading

## 🎯 **Technical Implementation Details**

### Background Slideshow Component
```typescript
// Enhanced component with page-specific backgrounds
export function BackgroundSlideshow({
  images = backgroundImages,
  interval = 180000, // 3 minutes
  className = "",
  pageKey
}: BackgroundSlideshowProps)
```

**Key Features:**
- **Page Key System**: Each page gets unique `pageKey` (home, about, events, etc.)
- **Hash Algorithm**: Generates unique starting index based on page path
- **No Repetition**: Ensures different backgrounds between page transitions
- **Smooth Transitions**: 1-second fade effects between images

### Background Images Used
- `/images/background.jpg`
- `/images/background2.jpg`
- `/images/background3.jpg`
- `/images/background4.jpg`
- `/images/background5.jpg`
- `/images/background6.jpg`

## 📱 **Mobile Responsiveness & Logo Alignment**

### Navbar Logo Improvements
- **Logo Size**: 40x40px with `flex-shrink-0` to prevent compression
- **Text Wrapping**: Proper text wrapping for long organization name
- **Mobile Centering**: Logo and text properly centered on mobile devices
- **Responsive Text**: Full name hidden on very small screens

### Hero Section Logo
- **Logo Size**: 120x120px in hero sections
- **Centered Layout**: Perfectly centered on all screen sizes
- **Priority Loading**: Logo loads first for better user experience

## 🌐 **Pages Updated with Background Slideshow**

### 1. **Home Page** (`/`)
- **Page Key**: `home` (default)
- **Logo**: Large PGMI logo in hero
- **Branding**: "Welcome to PGMI" + full name

### 2. **About Page** (`/about`)
- **Page Key**: `about`
- **Logo**: Large PGMI logo in hero
- **Branding**: "About PGMI" + full name

### 3. **Events Page** (`/events`)
- **Page Key**: `events`
- **Logo**: Large PGMI logo in hero
- **Branding**: "Church Events" + full name

### 4. **Ministries Page** (`/ministries`)
- **Page Key**: `ministries`
- **Logo**: Large PGMI logo in hero
- **Branding**: "Our Ministries" + full name

### 5. **Contact Page** (`/contact`)
- **Page Key**: `contact`
- **Logo**: Large PGMI logo in hero
- **Branding**: "Contact Us" + full name

### 6. **Sermons Page** (`/sermons`)
- **Page Key**: `sermons`
- **Logo**: Large PGMI logo in hero
- **Branding**: "Sermons & Messages" + full name

### 7. **Giving Page** (`/giving`)
- **Page Key**: `giving`
- **Logo**: Large PGMI logo in hero
- **Branding**: "Online Giving" + full name

### 8. **Prayer Page** (`/prayer`)
- **Page Key**: `prayer`
- **Logo**: Large PGMI logo in hero
- **Branding**: "Prayer Requests" + full name

## 🔧 **Files Modified**

### Components
- `src/components/ui/background-slideshow.tsx` - Enhanced slideshow component
- `src/components/layout/navbar.tsx` - Added logo and improved alignment

### Pages
- `src/app/page.tsx` - Home page with background slideshow
- `src/app/about/page.tsx` - About page with background slideshow
- `src/app/events/page.tsx` - Events page with background slideshow
- `src/app/ministries/page.tsx` - Ministries page with background slideshow
- `src/app/contact/page.tsx` - Contact page with background slideshow
- `src/app/sermons/page.tsx` - Sermons page with background slideshow
- `src/app/giving/page.tsx` - Giving page with background slideshow
- `src/app/prayer/page.tsx` - Prayer page with background slideshow

### Data Files
- `src/lib/data/pastors.ts` - Updated email domains
- `src/lib/data/ministries.ts` - Updated email domains
- `src/lib/auth.ts` - Updated admin email domains

## 🎨 **Visual Improvements**

### Hero Sections
- **Background**: Dynamic slideshow with 6 different images
- **Logo**: Prominent PGMI logo above headings
- **Typography**: White text on dark overlay for readability
- **Layout**: Centered content with proper spacing

### Navigation
- **Logo**: PGMI logo with organization name
- **Responsive**: Proper alignment on all screen sizes
- **Branding**: Consistent PGMI branding throughout

## 🚀 **Performance Features**

### Image Optimization
- **Next.js Image**: Automatic optimization and lazy loading
- **Priority Loading**: Hero images load first
- **Quality Settings**: 90% quality for optimal balance
- **Responsive Sizes**: Proper image sizing for different devices

### Background Management
- **Efficient Transitions**: Smooth fade effects without performance impact
- **Memory Management**: Proper cleanup of timers and intervals
- **State Optimization**: Minimal re-renders during transitions

## 🔄 **Background Cycling Logic**

### Unique Page Backgrounds
1. **Hash Generation**: Each page path generates unique hash
2. **Starting Index**: Hash determines which background starts first
3. **No Repetition**: Ensures different backgrounds between pages
4. **Smooth Transitions**: 3-minute intervals with fade effects

### Example Page Keys
- Home: `/` → Hash: 0 → Background: background.jpg
- About: `/about` → Hash: 2 → Background: background3.jpg
- Events: `/events` → Hash: 4 → Background: background5.jpg
- Ministries: `/ministries` → Hash: 1 → Background: background2.jpg

## 📱 **Mobile Experience**

### Responsive Design
- **Logo Alignment**: Perfectly centered on mobile devices
- **Text Wrapping**: Full organization name properly displayed
- **Touch Friendly**: Proper spacing for mobile navigation
- **Performance**: Optimized for mobile devices

### Mobile Logo Layout
```
[PGMI Logo] PGMI
           Perfecting Grace
           Ministries International
```

## 🎯 **Future Enhancements**

### Potential Improvements
1. **Custom Backgrounds**: Page-specific background images
2. **Animation Options**: Different transition effects
3. **User Preferences**: Allow users to control transition speed
4. **Background Categories**: Themed backgrounds for different sections

### Performance Optimizations
1. **Image Preloading**: Preload next background image
2. **Lazy Loading**: Load backgrounds as needed
3. **Compression**: Further optimize background images
4. **CDN Integration**: Serve images from CDN for faster loading

## ✅ **Summary**

The implementation successfully provides:
- **Unique Backgrounds**: Each page starts with different background
- **Professional Branding**: Consistent PGMI logo and branding
- **Mobile Optimization**: Perfect logo alignment on all devices
- **Performance**: Smooth transitions without performance impact
- **User Experience**: Engaging visual experience across all pages

All pages now feature the dynamic background slideshow with unique starting backgrounds, ensuring users never see the same background when navigating between pages, while maintaining the professional PGMI branding throughout the website.
