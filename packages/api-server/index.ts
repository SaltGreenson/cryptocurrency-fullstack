import {createExpressMiddleware} from "@trpc/server/adapters/express";
import cors from "cors";
import express from "express";
import swaggerUi from "swagger-ui-express";
import {createOpenApiExpressMiddleware} from "trpc-openapi";

import {openApiDocument} from "./openapi";
import {appRouter} from "./routers";
import keys from "./keys";

const app = express();

app.use(cors());
app.use('/api/trpc', createExpressMiddleware({router: appRouter}));
app.use('/api', createOpenApiExpressMiddleware({router: appRouter}));

app.use('/', swaggerUi.serve);
app.get('/', swaggerUi.setup(openApiDocument));

app.listen(keys.PORT, () => {
    console.log(`Server started on http://localhost:${keys.PORT}`);
})