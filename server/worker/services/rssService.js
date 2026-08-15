import Parser from "rss-parser";

const parser = new Parser();

const feeds = [
  {
    source: "Ars Technica",
    url: "https://feeds.arstechnica.com/arstechnica/index",
  },
  {
    source: "TechCrunch",
    url: "https://techcrunch.com/feed/",
  },
  {
    source: "BBC News",
    url: "https://feeds.bbci.co.uk/news/rss.xml",
  },
];

export async function getRssItems() {
  const results = [];

  for (const feed of feeds) {
    const rss = await parser.parseURL(feed.url);

    for (const item of rss.items) {
      results.push({
        title: item.title,
        info: item.contentSnippet || item.content || item.summary,
        url: item.link,
        pubDate: item.pubDate,
        source: feed.source,
      });
    }
  }

  return results;
}
