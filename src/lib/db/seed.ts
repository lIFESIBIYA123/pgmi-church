import { sermons, events, ministries} from '@/lib/data'
import { connectToDatabase } from '.'
import { SermonModel } from '@/models/Sermon'
import { MinistryModel } from '@/models/Ministry'
import { EventModel } from '@/models/Event'
import { UserModel } from '@/models/User'
import { cwd } from 'process'
import { loadEnvConfig } from '@next/env'
import bcrypt from 'bcryptjs'

loadEnvConfig(cwd())

const main = async () => {
  try {
    console.log('Starting database seeding...')

    await connectToDatabase(process.env.MONGODB_URI)

    // Clear old data
    console.log('Clearing old data...')
    await SermonModel.deleteMany()
    await MinistryModel.deleteMany()
    await EventModel.deleteMany()
    await UserModel.deleteMany({ role: 'admin' })

    // Insert new data
    console.log('Inserting sermons...')
    const createdSermons = await SermonModel.insertMany(sermons)

    console.log('Inserting ministries...')
    const createdMinistries = await MinistryModel.insertMany(ministries)

    console.log('Inserting events...')
    const createdEvents = await EventModel.insertMany(events)

    // Create admin user if environment variables are set
    if (process.env.SEED_ADMIN_EMAIL && process.env.SEED_ADMIN_PASSWORD) {
      console.log('Creating admin user...')
      const passwordHash = await bcrypt.hash(process.env.SEED_ADMIN_PASSWORD, 10)
      const adminUser = await UserModel.create({
        name: process.env.SEED_ADMIN_NAME || 'Main Admin',
        email: process.env.SEED_ADMIN_EMAIL,
        passwordHash,
        role: 'admin',
        isMainAdmin: true,
      })
      console.log('Admin user created:', adminUser.email)
    }

    console.log({
      createdSermons: createdSermons.length,
      createdMinistries: createdMinistries.length,
      createdEvents: createdEvents.length,
      message: 'Church website database seeded successfully',
    })

    process.exit(0)
  } catch (error) {
    console.error('Seeding failed:', error)
    process.exit(1)
  }
}

main()


