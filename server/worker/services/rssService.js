import Parser from "rss-parser";

import { feeds } from "../../util/feeds.js";

const parser = new Parser();

export async function getRssItems() {
  const results = [];

  for (const feed of feeds) {
    console.log("Parsing feed: ", feed.url);
    const rss = await parser.parseURL(feed.url);

    for (const item of rss.items) {
      results.push({
        title: item.title,
        info: item.contentSnippet || item.content || item.summary,
        content: item.content || item.summary || item.contentSnippet,
        url: item.link,
        pubDate: item.pubDate,
        source: feed.source,
      });
    }
  }

  return results;
}
