import Fastify from "fastify";
import cors from "@fastify/cors"
import { jobRoutes } from "./routes/jobs.js";
import { validatorCompiler, serializerCompiler } from "@fastify/type-provider-zod";
const app = Fastify({ logger: true });
import { connectRedis } from "./redis/index.js";

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

// Enable CORS for VITE frontend
app.register(cors, {
  origin: "http://localhost:5173", 
});

app.register(jobRoutes);
//Connect to Redis
await connectRedis();

app.listen({ port: 3000 }, (err, address) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }

  app.log.info(`Server listening at ${address}`);
});