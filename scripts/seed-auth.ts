
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    const ruc = "1792948573001"
    let tenant = await prisma.tenant.findUnique({ where: { ruc } })

    if (!tenant) {
        tenant = await prisma.tenant.create({
            data: {
                ruc,
                razonSocial: "Empresa Demo LOPDP",
                sector: "Tecnología",
                portalName: "Portal Demo",
                primaryColor: "#0f172a"
            }
        })
        console.log("Tenant created")
    }

    const email = "admin@lopdp.ec"
    // Hash for "admin123"
    const passwordHash = "$2a$10$EpRnTzVlqHNP0.fkbpo9e.3qauG.RNPBBn7kk8eve1Fzf1I.h5436"

    const admin = await prisma.staffUser.upsert({
        where: { email },
        update: {},
        create: {
            tenantId: tenant.id,
            email,
            passwordHash,
            name: "Admin Demo",
            role: "ADMIN"
        }
    })
    console.log("Admin created: admin@lopdp.ec / admin123")
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect())
