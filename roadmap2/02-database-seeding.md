# Database Seeding and Initial Data

## Overview
Database seeding populates the church website with initial data including sermons, events, ministries, and pastors.

## Seed Data Structure
The seeding process will create:
- **Sermons**: Sample sermon entries with titles, descriptions, and metadata
- **Events**: Church events and activities
- **Ministries**: Different ministry areas and their descriptions
- **Pastors**: Church leadership information
- **Admin User**: Initial administrator account

## Running the Seed Script
```bash
npm run seed
```

## Seed Data Sources
Data is sourced from `src/lib/data/` directory:
- `sermons.ts` - Sample sermon data
- `events.ts` - Church events and activities
- `ministries.ts` - Ministry information
- `pastors.ts` - Pastor and leadership data

## Environment Variables Required
```env
MONGODB_URI=mongodb://localhost:27017/pgmi-church
SEED_ADMIN_EMAIL=admin@pgmichurch.com
SEED_ADMIN_PASSWORD=secure-password-here
SEED_ADMIN_NAME=Main Administrator
```

## Seed Process
1. **Connect to Database**: Establishes MongoDB connection
2. **Clear Existing Data**: Removes old data to prevent duplicates
3. **Insert Seed Data**: Populates collections with sample data
4. **Create Admin User**: Sets up initial administrator account
5. **Log Results**: Reports on created records

## Troubleshooting
- Ensure MongoDB is running and accessible
- Check environment variables are properly set
- Verify database connection string format
- Check for any TypeScript compilation errors

## Customizing Seed Data
To modify seed data:
1. Edit the respective data files in `src/lib/data/`
2. Update the data structure to match your needs
3. Re-run the seed script

## Data Validation
Seed data should include:
- Realistic church information
- Proper formatting and structure
- Required fields for each model
- Consistent naming conventions
