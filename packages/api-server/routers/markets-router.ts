import {initializedTRPC, instance, publicProcedure} from "../helpers/helpers";
import {z} from "zod";

export const marketsRouter = initializedTRPC.router({
    markets: publicProcedure
        .meta({
            openapi: {
                method: 'GET',
                path: '/markets',
                tags: ['markets'],
                summary: 'Getting markets'
            },
        })
        .input(z.object({
            limit: z
                .string()
                .max(3, 'Limit cannot be more than 999')
                .optional(),
            offset: z
                .string()
                .optional(),
            exchangeId: z
                .string()
                .optional()
                .describe('search by exchange id'),
            baseSymbol: z
                .string()
                .optional()
                .describe('returns all containing the base symbol'),
            quoteSymbol: z
                .string()
                .optional()
                .describe('returns all containing the quote symbol'),
            baseId: z
                .string()
                .optional()
                .describe('returns all containing the base id'),
            quoteId: z
                .string()
                .optional()
                .describe('returns all containing the quote id'),
            assetSymbol: z
                .string()
                .optional()
                .describe('returns all assets containing symbol (base and quote)'),
            assetId: z
                .string()
                .optional()
                .describe('returns all assets containing id (base and quote)'),
        }))
        .output(z.object({
            data: z.array(
                z.object({
                    exchangeId: z.string(),
                    rank: z.string(),
                    baseSymbol: z.string(),
                    baseId: z.string(),
                    quoteSymbol: z.string(),
                    quoteId: z.string(),
                    priceQuote: z.string(),
                    priceUsd: z.string(),
                    volumeUsd24Hr: z.string().nullable(),
                    percentExchangeVolume: z.string().nullable(),
                    tradesCount24Hr: z.string().nullable(),
                    updated: z.number()
                })
            ),
            timestamp: z.number()
        }))
        .query(async ({input}) => {
            const response = await instance.get(`markets` +
                `?limit=${input.limit ?? ''}` +
                `&offset=${input.offset ?? ''}` +
                `&exchangeId=${input.exchangeId ?? ''}` +
                `&baseSymbol=${input.baseSymbol ?? ''}` +
                `&quoteSymbol=${input.quoteSymbol ?? ''}` +
                `&baseId=${input.baseId ?? ''}` +
                `&quoteId=${input.quoteId ?? ''}` +
                `&assetSymbol=${input.assetSymbol ?? ''}` +
                `&assetId=${input.assetId ?? ''}`
            );

            return response.data;
        })
})