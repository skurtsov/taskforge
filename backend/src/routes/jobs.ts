import { randomUUID } from "node:crypto"
import type { FastifyInstance } from "fastify"
import type { Job } from "../types/job.js"
import { createJobSchema } from "../schemas/job.schema.js"

const jobs: Job[] = []

export async function jobRoutes(app: FastifyInstance) {
  app.post("/jobs", 
    { schema: { body: createJobSchema } },
     async (request, reply) => {
      // Validate the request body against the schema
    const body = request.body as {
      type: string
      payload: unknown
    }

    const job: Job = {
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
  })

  app.get("/jobs", async (request, reply) => {
    return reply.send(jobs)
  })

  app.get("/jobs/:id", async (request, reply) => {
    const { id } = request.params as { id: string }

    const job = jobs.find((job) => job.id === id)

    if (!job) {
      return reply.status(404).send({
        message: "Job not found",
      })
    }

    return reply.send(job)
  })
}