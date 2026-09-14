import { getRssItems } from "./rssService.js";

export async function search(query, sources) {
  const items = await getRssItems(sources);

  return items.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.info?.toLowerCase().includes(query.toLowerCase()) ||
      item.content?.toLowerCase().includes(query.toLowerCase()),
  );
}
