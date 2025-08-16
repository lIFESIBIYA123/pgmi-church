# PGMI Church Website

A modern, dynamic church website built with Next.js 15, featuring a professional admin dashboard for content management.

## Features

### 🏠 Public Website
- **Dynamic Homepage** - Latest sermons, upcoming events, ministries
- **Sermon Library** - YouTube integration, live streaming support
- **Events Calendar** - Church events and activities
- **Ministries Section** - Church programs and groups
- **Contact Form** - Easy communication with the church
- **Prayer Requests** - Private prayer request submission
- **Dynamic Pages** - Custom pages created from admin dashboard
- **Responsive Design** - Works on all devices

### 🔐 Admin Dashboard
- **Role-Based Access Control** - Main admin, secondary users, pastors
- **Sermon Management** - Add/edit/delete sermons, YouTube links, live streaming
- **Event Management** - Create and manage church events
- **Ministry Management** - Manage church ministries and programs
- **Page Management** - Create custom pages (main admin only)
- **Prayer Requests** - View and manage requests (pastors only)
- **Contact Messages** - View contact form submissions
- **User Management** - Manage admin users (main admin only)
- **Settings** - Church information, mission, vision, contact details
- **Navbar/Footer Management** - Dynamic navigation and footer

### 🔧 Technical Features
- **Next.js 15** with App Router
- **MongoDB** with Mongoose ODM
- **NextAuth.js** - Email/password and Google authentication
- **TailwindCSS** - Modern, responsive styling
- **Role-Based Security** - Protected routes and APIs
- **File Uploads** - Image and audio upload support
- **Real-time Updates** - Dynamic content updates

## Prerequisites

- Node.js 18+
- MongoDB Atlas account (free tier works)
- Google OAuth credentials (optional)

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd pgmi-church
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   # Database
   MONGODB_URI=your_mongodb_atlas_connection_string

   # NextAuth
   NEXTAUTH_SECRET=your_random_secret_key
   NEXTAUTH_URL=http://localhost:3000

   # Google OAuth (optional)
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret

   # Main Admin Seeding
   SEED_ADMIN_EMAIL=sibiyalife221@gmail.com
   SEED_ADMIN_PASSWORD=Life@sibiya123
   SEED_ADMIN_NAME=Main Admin

   # Email (optional - for prayer request notifications)
   GMAIL_USER=your_gmail@gmail.com
   GMAIL_PASS=your_app_password

   # Cloudinary (optional - for image uploads)
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

4. **Seed the database**
   ```bash
   # Start the development server first
   npm run dev

   # In another terminal, seed the main admin user
   curl -X POST http://localhost:3000/api/seed
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Access the application**
   - Public website: http://localhost:3000
   - Admin dashboard: http://localhost:3000/admin
   - Login with: sibiyalife221@gmail.com / Life@sibiya123

## User Roles & Permissions

### Main Admin (isMainAdmin: true)
- Full access to all features
- Can add/delete pages
- Can manage all users
- Can access all sections

### Secondary Users (admin/editor roles)
- Can manage sermons, events, ministries
- Can edit pages (but not add/delete)
- Cannot manage users
- Cannot access prayer requests

### Pastor Role
- Can view and manage prayer requests
- Can manage sermons, events, ministries
- Cannot manage users or pages

## API Endpoints

### Public APIs
- `GET /api/sermons` - Get all sermons
- `GET /api/sermons/latest` - Get latest sermon
- `GET /api/events` - Get all events
- `GET /api/ministries` - Get all ministries
- `GET /api/navbar` - Get navigation items
- `GET /api/footer` - Get footer content
- `GET /api/settings` - Get church settings
- `GET /api/pages` - Get all pages
- `POST /api/contacts` - Submit contact form
- `POST /api/prayer-requests` - Submit prayer request

### Protected APIs (require authentication)
- `POST/PUT/DELETE /api/sermons` - Manage sermons
- `POST/PUT/DELETE /api/events` - Manage events
- `POST/PUT/DELETE /api/ministries` - Manage ministries
- `PUT /api/navbar` - Update navigation
- `PUT /api/footer` - Update footer
- `PUT /api/settings` - Update settings
- `POST/PUT/DELETE /api/pages` - Manage pages (main admin only)
- `GET /api/prayer-requests` - View prayer requests (pastor only)
- `GET /api/contacts` - View contact messages
- `GET/POST /api/admin/users` - Manage users (admin only)

## Database Schema

### Collections
- **users** - Admin users with roles
- **sermons** - Sermon recordings and live streams
- **events** - Church events and activities
- **ministries** - Church ministries and programs
- **pages** - Custom website pages
- **prayerRequests** - Prayer request submissions
- **contacts** - Contact form submissions
- **navbar** - Navigation menu items
- **footer** - Footer content
- **settings** - Church information and configuration

## Deployment

### Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Connect your GitHub repository to Vercel
   - Add environment variables in Vercel dashboard
   - Deploy

3. **Seed the database**
   ```bash
   # After deployment, seed the main admin
   curl -X POST https://your-domain.vercel.app/api/seed
   ```

### Other Platforms
The application can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## File Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── admin/             # Admin dashboard pages
│   ├── api/               # API routes
│   ├── p/                 # Dynamic page routes
│   └── ...                # Public pages
├── components/            # React components
│   ├── admin/            # Admin dashboard components
│   ├── layout/           # Layout components
│   └── ui/               # UI components
├── lib/                  # Utility functions
│   ├── auth.ts          # Authentication helpers
│   ├── db.ts            # Database connection
│   └── utils.ts         # General utilities
├── models/               # Mongoose models
└── types/                # TypeScript type definitions
```

## Customization

### Styling
- Modify `src/app/globals.css` for global styles
- Update TailwindCSS configuration in `tailwind.config.ts`
- Customize UI components in `src/components/ui/`

### Content
- Update church information in Settings
- Modify navigation in Navbar management
- Customize footer content in Footer management

### Features
- Add new API routes in `src/app/api/`
- Create new admin pages in `src/app/admin/`
- Add new public pages in `src/app/`

## Support

For support and questions:
- Check the documentation
- Review the code comments
- Create an issue in the repository

## License

This project is licensed under the MIT License.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

**Built with ❤️ for PGMI Church**
