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
            offset: z.string(),
            limit: z.string().max(3, 'Limit cannot be more than 999'),
        }))
        .output(
            z.object(
                {
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
            const response = await instance.get(`assets?offset=${input.offset}&limit=${input.limit}`);
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
            id: z.string(),
            interval:
                z.enum(['m1', 'm5', 'm15', 'm30', 'h1', 'h2', 'h6', 'h12', 'd1'])
        }))
        .output(z.object({
            data: z.array(
                z.object({
                    priceUsd: z.string(),
                    time: z.number()
                })
            )
        }))
        .query(async ({input}) => {
            const response = await instance.get(`assets/${input.id}/history?interval=${input.interval}`);
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
            id: z.string(),
            limit: z.string()
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
            const response = await instance.get(`assets/${input.id}/markets?limit=${input.limit}`);
            return response.data;
        })
})