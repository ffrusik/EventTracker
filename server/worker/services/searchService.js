import pool from "../../db/index.js";
import { getRssItems } from "./rssService.js";

export async function search(query) {
  const items = await getRssItems();

  return items.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase()),
  );
}
