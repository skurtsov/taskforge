import {
  pgTable,
  uuid,
  varchar,
  jsonb,
  integer,
  timestamp,
} from "drizzle-orm/pg-core"

export const jobs = pgTable("jobs", {
  id: uuid("id").primaryKey(),

  type: varchar("type", { length: 255 }).notNull(),

  payload: jsonb("payload").notNull(),

  status: varchar("status", { length: 50 })
    .notNull()
    .default("queued"),

  attempts: integer("attempts")
    .notNull()
    .default(0),

  maxAttempts: integer("max_attempts")
    .notNull()
    .default(3),

  error: varchar("error", { length: 1000 }),

  workerId: uuid("worker_id"),

  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),

  startedAt: timestamp("started_at", { withTimezone: true }),

  completedAt: timestamp("completed_at", { withTimezone: true }),
})