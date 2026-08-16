import { saveEventInfo, hasSameEventInfo } from "../services/eventService.js";
import { search } from "../services/searchService.js";

export async function processEvents(event) {
  const results = await search(event.query);
  console.log(`Found ${results.length} results for event "${event.query}"`);

  for (const result of results) {
    const exists = await hasSameEventInfo(event.id, result.info);
    if (exists) {
      console.log(`Skipping duplicate event info for event "${event.query}"`);
      continue;
    }

    await saveEventInfo({
      eventId: event.id,
      info: result.info,
      source: result.source,
      url: result.url,
      title: result.title,
    });
  }
}
