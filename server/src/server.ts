import Fastify from "fastify";
import cors from '@fastify/cors'
import { PrismaClient } from '@prisma/client'
import { z } from 'zod'
import ShortUniqueId from 'short-unique-id'

const prisma = new PrismaClient({
    //retorna o log de todas as querys que são realizadas no banco de dados
    log: ['query']
});

async function bootstrap() {
    const fastify = Fastify({
        //retorna logges de tudo que esta acontecendo na aplicação
        logger: true,
    })

    await fastify.register(cors, {
        origin: true
    })

    fastify.get('/users/count', async () => {
        const count = await prisma.user.count();

        return { count }
    });

    fastify.get('/guesses/count', async () => {
        const count = await prisma.guess.count();

        return { count }
    });

    fastify.get('/pools/count', async () => {
        const count = await prisma.pool.count();

        return { count }
    });

    fastify.post('/pools', async (request, response) => {
        const createPoolBody = z.object({
            title: z.string()
        })

        const { title } = createPoolBody.parse(request.body);

        const generetedPoolCode = new ShortUniqueId({ length: 6 })
        const code = String(generetedPoolCode()).toUpperCase();
        await prisma.pool.create({
            data: {
                title,
                code
            }
        });

        return response.status(201).send({ code });
    });

    await fastify.listen({ port:3333, /*host: '0.0.0.0'*/ })
}

bootstrap();