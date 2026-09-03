import { randomUUID } from "node:crypto"
import type {FastifyInstance} from "fastify"
import type {Job} from "../types/job.js"

const jobs: Job[] = []

export  async function jobRoutes(app: FastifyInstance) {
  app.post("/jobs", async (request, reply) => {
    const body = request.body as {
        type: string;
         payload: unknown
        }
        const job : Job = {
            id: randomUUID(),
            type: body.type,
            payload: body.payload,
            status: "queued",
            attempts: 0,
            maxAttempts: 3,
            createdAt: new Date().toISOString(),
        }
        jobs.push(job)
        return reply.status(201).send(job)
  })}