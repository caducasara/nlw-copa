import Fastify from "fastify";
import cors from '@fastify/cors'
import { PrismaClient } from '@prisma/client'

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

    fastify.get('/pools/count', async () => {
        const count = await prisma.pool.count();

        return { count }
    });

    await fastify.listen({ port:3333, /*host: '0.0.0.0'*/ })
}

bootstrap();