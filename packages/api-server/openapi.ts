import { generateOpenApiDocument } from 'trpc-openapi';
import { appRouter } from './routers';
import keys from "./keys";


export const openApiDocument = generateOpenApiDocument(appRouter, {
    title: 'OpenAPI',
    description: 'CoinCap OpenAPI using tRPC with Express',
    version: '1.0.0',
    baseUrl: `http://localhost:${keys.PORT}/api`,
    tags: ['assets']
});