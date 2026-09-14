import pool from "../../db/index.js";

export async function getEvents() {
  const result = await pool.query(`
    SELECT
      e.id,
      e.query,
      JSON_AGG(
        JSON_BUILD_OBJECT(
          'id', s.id,
          'name', s.name,
          'type', s.type,
          'url', s.url
        )
      ) AS sources
    FROM events e
    JOIN event_categories ec
      ON ec.event_id = e.id
    JOIN category_sources cs
      ON cs.category_id = ec.category_id
    JOIN sources s
      ON s.id = cs.source_id
    GROUP BY e.id, e.query
  `);

  return result.rows;
}

export async function saveEventInfo(data) {
  await pool.query(
    "INSERT INTO events_info (event_id, source_id, title, info, url) VALUES ($1, $2, $3, $4, $5)",
    [data.eventId, data.source_id, data.title, data.info, data.url],
  );
}

export async function hasSameEventInfo(eventId, info) {
  const result = await pool.query(
    "SELECT * FROM events_info WHERE event_id = $1 AND info = $2",
    [eventId, info],
  );
  return result.rows.length > 0;
}
