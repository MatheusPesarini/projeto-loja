import Fastify from 'fastify';
import fastifyCookie from '@fastify/cookie';
import { fastifyCors } from '@fastify/cors';
import swagger from '@fastify/swagger';
import helmet from '@fastify/helmet';
import authRoutes from './routes/authRoutes';
import productRoutes from './routes/productRoutes';
import fastifySwaggerUi from '@fastify/swagger-ui';

await process.loadEnvFile();
const fastify = Fastify({ logger: true });

await fastify.register(swagger, {
  swagger: {
    info: {
      title: 'API Documentation Loja Marketplace',
      description:
        'API Completa para gerenciar uma loja de marketplace, incluindo autenticação, produtos e pedidos.',
      version: '1.0.0',
      contact: {
        name: 'Matheus Pesarini',
        url: 'https://github.com/MatheusPesarini',
        email: 'mrogeriopesarini@gmail.com',
      },
    },
    host: 'localhost:3001',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
      { name: 'Auth', description: 'Operações de autenticação' },
      { name: 'Products', description: 'Operações relacionadas a produtos' },
    ],
    securityDefinitions: {
      cookieAuth: {
        type: 'apiKey',
        in: 'cookie',
        name: 'session',
        description: 'Cookie de autenticação para sessões de usuário',
      },
    },
  },
});

await fastify.register(fastifySwaggerUi, {
  routePrefix: '/documentation',
  uiConfig: {
    docExpansion: 'full',
    deepLinking: true,
  },
  uiHooks: {
    onRequest: (request, reply, next) => {
      next();
    },
    preHandler: (request, reply, next) => {
      next();
    },
  },
  staticCSP: true,
  transformStaticCSP: (header) => header,
  transformSpecification: (swaggerObject, request, reply) => {
    return swaggerObject;
  },
  transformSpecificationClone: true,
});

fastify.register(fastifyCookie, {
  secret: process.env.JWT_SECRET_KEY,
  hook: 'onRequest',
  parseOptions: {},
});

fastify.register(helmet);
fastify.register(fastifyCors, {
  origin: 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
});

fastify.register(authRoutes);
fastify.register(productRoutes);

const start = async () => {
  try {
    await fastify.listen({ port: 3001 });
    console.log('🚀 Servidor rodando na porta 3001');
    console.log('📚 Documentação Swagger disponível em: http://localhost:3001/documentation');
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};

start();
