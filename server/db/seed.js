import pool from "./index.js";
import { categories } from "../util/categories.js";
import { feeds } from "../util/feeds.js";

async function seed() {
  try {
    await pool.query(`
      TRUNCATE
        category_sources,
        sources,
        categories
      RESTART IDENTITY CASCADE
    `);

    const categoryIds = new Map(); // or maybe object
    const sourceIds = new Map();

    async function insertCategory(category, parentId = null) {
      const result = await pool.query(
        `
        INSERT INTO categories (name, parent_id)
        VALUES ($1, $2)
        RETURNING id
        `,
        [category.name, parentId],
      );

      const categoryId = result.rows[0].id;

      categoryIds.set(category.id, categoryId);

      if (category.children) {
        for (const child of category.children) {
          await insertCategory(child, categoryId);
        }
      }
    }

    // Categories
    for (const category of categories) {
      await insertCategory(category);
    }

    // Sources
    for (const feed of feeds) {
      const result = await pool.query(
        `
        INSERT INTO sources (name, type, url)
        VALUES ($1, $2, $3)
        RETURNING id
        `,
        [feed.source, feed.type, feed.url],
      );

      const sourceId = result.rows[0].id;

      sourceIds.set(feed.id, sourceId);
    }

    // Category_Sources
    for (const feed of feeds) {
      const categoryId = categoryIds.get(feed.id);
      const sourceId = sourceIds.get(feed.id);

      if (categoryId && sourceId) {
        await pool.query(
          `
          INSERT INTO category_sources (category_id, source_id)
          VALUES ($1, $2)
          `,
          [categoryId, sourceId],
        );
      }
    }

    console.log("Database seeded successfully.");
  } catch (error) {
    console.error("Seed failed:", error);
  }
}

seed();
