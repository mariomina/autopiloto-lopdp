
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const tenant = await prisma.tenant.findFirst()
    if (!tenant) {
        console.log("No tenant found. Run onboarding first.")
        return
    }

    const email = "admin@lopdp.ec"
    // Hash for "admin123"
    const passwordHash = "$2a$10$EpRnTzVlqHNP0.fkbpo9e.3qauG.RNPBBn7kk8eve1Fzf1I.h5436"

    try {
        const existing = await prisma.staffUser.findUnique({ where: { email } })
        if (existing) {
            console.log("Admin exists")
            return
        }

        await prisma.staffUser.create({
            data: {
                tenantId: tenant.id,
                email,
                passwordHash,
                name: "Admin",
                role: "ADMIN"
            }
        })
        console.log("Admin created successfully")
        console.log("Email: admin@lopdp.ec")
        console.log("Password: admin123")
    } catch (e) {
        console.log("Error creating admin:", e)
    }
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
