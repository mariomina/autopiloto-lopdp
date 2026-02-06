import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Iniciando la siembra de datos...');

    // 1. Obtener el último Tenant creado (el que acaba de registrar el usuario)
    const tenant = await prisma.tenant.findFirst({
        orderBy: { createdAt: 'desc' },
    });

    if (!tenant) {
        console.error('❌ No se encontró ningún Tenant. Por favor regístrate primero en la app.');
        return;
    }

    console.log(`🏢 Sembrando datos para la empresa: ${tenant.razonSocial} (${tenant.id})`);

    // 2. Generar Identidades Digitales (Empleados/Clientes ficticios)
    const names = ['Ana', 'Carlos', 'Lucía', 'Jorge', 'María', 'Pedro', 'Sofía', 'Luis', 'Elena', 'Miguel'];
    const lastNames = ['Silva', 'Vega', 'Morales', 'Castro', 'Ortiz', 'Gómez', 'Vargas', 'Ríos', 'Mendoza', 'Pérez'];
    const identities = [];

    for (let i = 0; i < 50; i++) {
        const name = names[Math.floor(Math.random() * names.length)];
        const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
        const fullName = `${name} ${lastName}`;
        const idNumber = `17${Math.floor(10000000 + Math.random() * 90000000)}`; // RUC/Cédula ficticia

        const identity = await prisma.digitalIdentity.create({
            data: {
                tenantId: tenant.id,
                fullName,
                idNumber,
                biometricToken: `token_bio_${Math.random().toString(36).substring(7)}`,
                createdAt: new Date(new Date().setDate(new Date().getDate() - Math.floor(Math.random() * 30))) // Fecha aleatoria en el último mes
            }
        });
        identities.push(identity);
    }
    console.log(`✅ Creadas ${identities.length} Identidades Digitales.`);

    // 3. Generar Eventos de Consentimiento (Logs de aceptación)
    let consentCount = 0;
    for (const identity of identities) {
        const eventsCount = Math.floor(Math.random() * 3) + 1; // 1 a 3 eventos por persona
        for (let j = 0; j < eventsCount; j++) {
            await prisma.consentEvent.create({
                data: {
                    identityId: identity.id,
                    purpose: Math.random() > 0.5 ? 'Uso de Imagen Corporativa' : 'Tratamiento de Datos BiomÃ©tricos',
                    status: Math.random() > 0.1 ? 'ACCEPTED' : 'REVOKED', // 90% aceptación
                    ipAddress: `192.168.1.${Math.floor(Math.random() * 255)}`,
                    timestamp: new Date(new Date().getTime() - Math.floor(Math.random() * 1000000000))
                }
            });
            consentCount++;
        }
    }
    console.log(`✅ Creados ${consentCount} Eventos de Consentimiento.`);

    // 4. Generar Contratos Firmados
    let contractCount = 0;
    for (const identity of identities) {
        if (Math.random() > 0.6) { // 40% tiene contrato firmado
            await prisma.signatureContract.create({
                data: {
                    identityId: identity.id,
                    fileUrl: `https://storage.enext.com/contracts/${identity.idNumber}_signed.pdf`,
                    status: 'SIGNED',
                    createdAt: new Date()
                }
            });
            contractCount++;
        }
    }
    console.log(`✅ Creados ${contractCount} Contratos Firmados.`);

    // 5. Generar Solicitudes ARCO (Algunas quejas/solicitudes)
    let arcoCount = 0;
    for (let k = 0; k < 5; k++) { // Solo unas pocas
        const identity = identities[Math.floor(Math.random() * identities.length)];
        await prisma.arcoRequest.create({
            data: {
                identityId: identity.id,
                type: Math.random() > 0.5 ? 'ACCESO' : 'ELIMINACION',
                status: Math.random() > 0.5 ? 'PENDING' : 'RESOLVED',
                createdAt: new Date()
            }
        });
        arcoCount++;
    }
    console.log(`✅ Creadas ${arcoCount} Solicitudes ARCO.`);

    // 6. Generar Cadena de Auditoría (AuditChain - Blockchain simulado)
    const auditEvents = ['LOGIN_SUCCESS', 'CONTRACT_SIGNED', 'CONSENT_GRANTED', 'DATA_EXPORTED'];
    let prevHash = "00000000000000000000000000000000";

    for (let m = 0; m < 20; m++) {
        const eventType = auditEvents[Math.floor(Math.random() * auditEvents.length)];
        const payloadHash = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        const combinedHash = `hash_${prevHash}_${payloadHash}`.substring(0, 32); // Simulación simple

        await prisma.auditChain.create({
            data: {
                tenantId: tenant.id,
                eventType,
                payloadHash,
                prevHash,
                combinedHash,
                timestamp: new Date(new Date().getTime() - m * 3600000) // 1 evento cada hora hacia atrás
            }
        });
        prevHash = combinedHash;
    }
    console.log(`✅ Generados 20 bloques en la Cadena de Auditoría.`);

    console.log('🚀 Siembra de datos completada con éxito.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
