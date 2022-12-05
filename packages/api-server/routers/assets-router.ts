import {z} from 'zod';
import {initializedTRPC, instance, publicProcedure} from "../helpers/helpers";


export const assetsRouter = initializedTRPC.router({
    assets: publicProcedure
        .meta({
            openapi: {
                method: 'GET',
                path: '/assets',
                tags: ['asset'],
                summary: 'Get the part of assets that starts with the offset and end the offset plus limit'
            },
        })
        .input(z.object({
            offset: z
                .string()
                .optional(),
            limit: z
                .string()
                .max(3, 'Limit cannot be more than 999')
                .optional(),
            search: z
                .string()
                .optional()
                .describe('search by asset id (bitcoin) or symbol (BTC)'),
            ids: z
                .string()
                .optional()
                .describe('query with multiple ids=bitcoin,ethereum,monero')
        }))
        .output(z.object({
                    data: z.array(
                        z.object({
                            id: z.string(),
                            rank: z.string(),
                            symbol: z.string(),
                            name: z.string(),
                            supply: z.string().nullable(),
                            maxSupply: z.string().nullable(),
                            marketCapUsd: z.string().nullable(),
                            volumeUsd24Hr: z.string().nullable(),
                            priceUsd: z.string().nullable(),
                            changePercent24Hr: z.string().nullable(),
                            vwap24Hr: z.string().nullable(),
                            explorer: z.string().nullable(),
                        })
                    ),
                    timestamp: z.number()
                }
            )
        )
        .query(async ({input}) => {
            const response = await instance.get(`assets` +
                `?offset=${input.offset ?? ''}` +
                `&limit=${input.limit ?? ''}` +
                `&search=${input.search ?? ''}` +
                `&ids=${input.ids ?? ''}`
            );
            return response.data;
        }),
    assetById: publicProcedure
        .meta({
            openapi: {
                method: 'GET',
                path: '/asset-by-id',
                tags: ['asset'],
                summary: 'Get asset by id'
            },
        })
        .input(z.object(
            {
                id: z.string()
            }))
        .output(z.object(
            {
                data: z.object({
                    id: z.string(),
                    rank: z.string(),
                    symbol: z.string(),
                    name: z.string(),
                    supply: z.string().nullable(),
                    maxSupply: z.string().nullable(),
                    marketCapUsd: z.string().nullable(),
                    volumeUsd24Hr: z.string().nullable(),
                    priceUsd: z.string().nullable(),
                    changePercent24Hr: z.string().nullable(),
                    vwap24Hr: z.string().nullable(),
                    explorer: z.string().nullable(),
                }),
                timestamp: z.number()
            }
        ))
        .query(async ({input}) => {
            const response = await instance.get(`assets/${input.id}`);
            return response.data;
        }),
    assetHistory: publicProcedure
        .meta({
            openapi: {
                method: 'GET',
                path: '/asset-history',
                tags: ['asset'],
                summary: 'Get asset history by id and interval'
            },
        })
        .input(z.object({
            id: z
                .string(),
            interval: z
                .enum(['m1', 'm5', 'm15', 'm30', 'h1', 'h2', 'h6', 'h12', 'd1']),
            startEnd: z
                .string()
                .optional()
                .describe('UNIX time in milliseconds. ' +
                    'omitting will return the most recent asset history. ' +
                    'If start is supplied, end is required and vice versa')
        }))
        .output(z.object({
            data: z.array(
                z.object({
                    priceUsd: z
                        .string(),
                    time: z
                        .number()
                })
            )
        }))
        .query(async ({input}) => {
            const response = await instance.get(`assets/${input.id}/history`+
                `?interval=${input.interval}` +
                `&startEnd=${input.startEnd ?? ''}`);
            return response.data;
        }),
    assetMarkets: publicProcedure
        .meta({
            openapi: {
                method: 'GET',
                path: '/asset-markets',
                tags: ['asset'],
                summary: 'Get asset markets by id'
            },
        })
        .input(z.object({
            id: z
                .string()
                .describe('asset id'),
            limit: z
                .string()
                .optional(),
            offset: z
                .string()
                .optional()
        }))
        .output(z.object({
            data: z.array(
                z.object({
                    exchangeId: z.string(),
                    baseId: z.string(),
                    quoteId: z.string(),
                    baseSymbol: z.string(),
                    quoteSymbol: z.string(),
                    volumeUsd24Hr: z.string(),
                    priceUsd: z.string(),
                    volumePercent: z.string(),
                })
            )
        }))
        .query(async ({input}) => {
            const response = await instance.get(`assets/${input.id}/markets`+
                `?limit=${input.limit ?? ''}` +
                `&offset=${input.offset ?? ''}`);
            return response.data;
        })
})