import Parser from "rss-parser";

const parser = new Parser();

const feeds = [
  // General
  {
    source: "BBC News",
    url: "https://feeds.bbci.co.uk/news/rss.xml",
  },

  // Tech
  {
    source: "Ars Technica",
    url: "https://feeds.arstechnica.com/arstechnica/index",
  },
  {
    source: "TechCrunch",
    url: "https://techcrunch.com/feed/",
  },
  {
    source: "The Verge",
    url: "https://www.theverge.com/rss/index.xml",
  },
  {
    source: "WIRED",
    url: "https://www.wired.com/feed/rss",
  },
  {
    source: "Engadget",
    url: "https://www.engadget.com/rss.xml",
  },

  // AI
  {
    source: "OpenAI",
    url: "https://openai.com/news/rss.xml",
  },
  {
    source: "Google AI",
    url: "https://blog.google/innovation-and-ai/technology/ai/rss/",
  },

  // Developer
  {
    source: "GitHub Blog",
    url: "https://github.blog/feed/",
  },
  {
    source: "Mozilla Hacks",
    url: "https://hacks.mozilla.org/feed/",
  },
  {
    source: "Microsoft DevBlogs",
    url: "https://devblogs.microsoft.com/feed/",
  },

  // Science
  {
    source: "NASA News",
    url: "https://www.nasa.gov/news-release/feed/",
  },
  {
    source: "ESA",
    url: "https://www.esa.int/rssfeed/TopNews",
  },

  // Gaming
  {
    source: "PC Gamer",
    url: "https://www.pcgamer.com/rss/",
  },
  {
    source: "Eurogamer",
    url: "https://www.eurogamer.net/feed",
  },

  // Security
  {
    source: "BleepingComputer",
    url: "https://www.bleepingcomputer.com/feed/",
  },
  {
    source: "Krebs on Security",
    url: "https://krebsonsecurity.com/feed/",
  },
];

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
