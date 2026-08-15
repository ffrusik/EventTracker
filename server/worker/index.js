import { getEvents } from "./services/eventService.js";
import { processEvents } from "./jobs/processEvents.js";

async function main() {
  console.log("Starting worker...");

  const events = await getEvents();

  for (const event of events) {
    await processEvents(event);
  }
}

main().catch(console.error);
