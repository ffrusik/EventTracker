import { getEvents } from "./services/eventService.js";
import { processEvents } from "./jobs/processEvents.js";

async function main() {
  console.log("Starting worker...");

  const events = await getEvents();

  for (const event of events) {
    await processEvents(event);
  }
}

while (true) {
  const response = await fetch(
    "https://www.irishimmigration.ie/news-and-updates/",
  );

  console.log(response.status);

  const html = await response.text();

  console.log(html.length);

  console.log("MAIN START", new Date().toLocaleTimeString());
  await main().catch(console.error);
  console.log("MAIN FINISHED", new Date().toLocaleTimeString());
  console.log("Waiting for 15 minutes before next run...");
  await new Promise((resolve) => setTimeout(resolve, 15 * 60 * 1000));
}
