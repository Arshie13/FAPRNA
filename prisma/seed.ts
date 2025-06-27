import { PrismaClient } from '../src/generated/prisma'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Hash password for security
  const hashedPassword = await bcrypt.hash('admin123', 10)

  // Create admin user
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@faprna.org' },
    update: {
      password: hashedPassword, // Update password to hashed version
    },
    create: {
      email: 'admin@faprna.org',
      name: 'Admin User',
      password: hashedPassword,
    },
  })

  console.log('Users created:', { adminUser })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })