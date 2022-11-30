import {assetsRouter} from "./assets-router";
import {initializedTRPC} from "../helpers/helpers";

export const appRouter = initializedTRPC.router({
    assets: assetsRouter
})