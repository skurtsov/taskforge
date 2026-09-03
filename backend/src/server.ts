import Fastify from "fastify";
import { jobRoutes } from "./routes/jobs.js";

const app = Fastify({ logger: true });

app.register(jobRoutes);

app.listen({ port: 3000 }, (err, address) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }

  app.log.info(`Server listening at ${address}`);
});