import { TRPCError, initTRPC } from '@trpc/server';
import { CreateExpressContextOptions } from '@trpc/server/adapters/express';
import { OpenApiMeta } from 'trpc-openapi';
import { z } from 'zod';
import {initializedTRPC, instance, publicProcedure} from "../helpers/helpers";




export const assetsRouter = initializedTRPC.router({
    assets: publicProcedure
        .meta({
            openapi: {
                method: 'GET',
                path: '/assets',
                tags: ['assets'],
                summary: 'Get the part of assets that starts with the offset and end the offset plus limit'
            },
        })
        .input(z.object({
            offset: z.string(),
            limit: z.string(),
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
                            supply: z.string(),
                            maxSupply: z.string(),
                            marketCapUsd: z.string(),
                            volumeUsd24Hr: z.string(),
                            priceUsd: z.string(),
                            changePercent24Hr: z.string(),
                            vwap24Hr: z.string(),
                            explorer: z.string(),
                        })
                    ),
                    timestamp: z.number()
                }
            )
        )
        .query(async ({input}) => {
            const assets = await instance.get(`assets?offset=${input.offset}&limit=${input.limit}`)
            return assets.data;
        })
})