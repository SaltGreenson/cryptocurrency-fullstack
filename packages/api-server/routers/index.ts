import {assetsRouter} from "./assets-router";
import {initializedTRPC} from "../helpers/helpers";
import {marketsRouter} from "./markets-router";

export const appRouter = initializedTRPC.router({
    asset: assetsRouter,
    markets: marketsRouter
})