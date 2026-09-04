import { randomUUID } from "node:crypto"
import type { FastifyInstance } from "fastify"
import type { Job } from "../types/job.js"
import { createJobSchema } from "../schemas/job.schema.js"
import { db } from "../db/index.js"
import { jobs } from "../db/schema.js"
import { eq } from "drizzle-orm"

//const jobs: Job[] = []

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

   const [createdJob] = await db
   .insert(jobs)
   .values({
    id: job.id,
    type: job.type,
    payload: job.payload,
    status: job.status,
    attempts: job.attempts,
    maxAttempts: job.maxAttempts,
    createdAt: new Date(job.createdAt),
   })
   .returning()

   return reply.status(201).send(createdJob)
  })

  app.get("/jobs", async (request, reply) => {
    const allJobs = await db.select().from(jobs)
    return reply.send(allJobs)
  })

 app.get("/jobs/:id", async (request, reply) => {
  const { id } = request.params as { id: string }

  const [job] = await db
    .select()
    .from(jobs)
    .where(eq(jobs.id, id))
    .limit(1)

  if (!job) {
    return reply.status(404).send({
      message: "Job not found",
    })
  }

  return reply.send(job)
})
}