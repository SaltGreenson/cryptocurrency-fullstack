import axios from 'axios';
import keys from "../keys";
import {initTRPC} from "@trpc/server";
import {OpenApiMeta} from "trpc-openapi";

export const instance = axios.create({
    baseURL: keys.COINCAP_BASE_URL,
    headers: {
        "Accept-Encoding": "q=0.01"
    }
});

export const initializedTRPC = initTRPC
    .meta<OpenApiMeta>()
    .create({
        errorFormatter: ({error, shape}) => {
            if (error.code === "INTERNAL_SERVER_ERROR" && process.env.NODE_ENV === 'production') {
                return {...shape, message: 'Internal server error'};
            }
            return shape
        },
    });

export const publicProcedure = initializedTRPC.procedure;
