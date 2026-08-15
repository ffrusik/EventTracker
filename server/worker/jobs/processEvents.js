import { saveEventInfo } from "../services/eventService.js";

export async function processEvents(event) {
  const results = await search(event.query);

  for (const result of results) {
    await saveEventInfo({
      eventId: event.id,
      info: result.info,
      source: result.source,
      url: result.url,
    });
  }
}
