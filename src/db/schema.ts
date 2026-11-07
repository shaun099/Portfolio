
import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
  integer,
  boolean,
} from "drizzle-orm/pg-core";

export const projects = pgTable("projects", {
  id: uuid("id").defaultRandom().primaryKey(),

  title: varchar("title", { length: 255 }).notNull(),

  shortDescription: text("short_description").notNull(),

  longDescription: text("long_description").notNull(),

  thumbnailUrl: text("thumbnail_url").notNull(),

  tags: text("tags").array().default([]).notNull(),

  techStack: text("tech_stack").array().default([]).notNull(),

  githubUrl: text("github_url"),

  liveProjectUrl: text("live_project_url"),

  isPublished: boolean("is_published").default(false).notNull(),
  
  createdAt: timestamp("created_at", {
    withTimezone: true,
  }).defaultNow().notNull(),

  updatedAt: timestamp("updated_at", {
    withTimezone: true,
  }).defaultNow().notNull(),
});

export const projectImages = pgTable("project_images", {
  id: uuid("id").defaultRandom().primaryKey(),

  projectId: uuid("project_id")
    .notNull()
    .references(() => projects.id, {
      onDelete: "cascade",
    }),

  imageUrl: text("image_url").notNull(),

  sortOrder: integer("sort_order").default(0).notNull(),

  createdAt: timestamp("created_at", {
    withTimezone: true,
  }).defaultNow().notNull(),
});
