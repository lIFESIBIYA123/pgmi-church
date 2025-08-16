# Environment Setup and Configuration

## Environment Variables
Create a `.env.local` file in the root directory with the following variables:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/pgmi-church
# or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/pgmi-church

# NextAuth Configuration
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://localhost:3000

# Google OAuth (if using Google sign-in)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Admin User for Seeding
SEED_ADMIN_EMAIL=admin@pgmichurch.com
SEED_ADMIN_PASSWORD=secure-password-here
SEED_ADMIN_NAME=Main Administrator

# Cloudinary (for image uploads)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

## Environment Variable Validation
The project should include proper environment variable validation. Create a validation schema in `src/lib/env.ts`:

```typescript
import { z } from 'zod'

const envSchema = z.object({
  MONGODB_URI: z.string().min(1, 'MONGODB_URI is required'),
  NEXTAUTH_SECRET: z.string().min(1, 'NEXTAUTH_SECRET is required'),
  NEXTAUTH_URL: z.string().url('NEXTAUTH_URL must be a valid URL'),
  GOOGLE_CLIENT_ID: z.string().optional(),
  GOOGLE_CLIENT_SECRET: z.string().optional(),
  SEED_ADMIN_EMAIL: z.string().email().optional(),
  SEED_ADMIN_PASSWORD: z.string().min(8).optional(),
  SEED_ADMIN_NAME: z.string().optional(),
  CLOUDINARY_CLOUD_NAME: z.string().optional(),
  CLOUDINARY_API_KEY: z.string().optional(),
  CLOUDINARY_API_SECRET: z.string().optional(),
})

export const env = envSchema.parse(process.env)
```

## Database Setup
1. Install MongoDB locally or set up MongoDB Atlas
2. Create a database named `pgmi-church`
3. Set up proper indexes for performance
4. Configure backup and monitoring

## Development Tools
- Install VS Code extensions for TypeScript, Tailwind CSS, and MongoDB
- Set up ESLint and Prettier for code formatting
- Configure Git hooks for pre-commit linting

## Testing Environment
- Set up separate test database
- Configure test environment variables
- Set up testing framework (Jest/Vitest recommended)
