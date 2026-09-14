import Parser from "rss-parser";

const parser = new Parser();

export async function getRssItems(sources) {
  const results = [];

  for (const source of sources) {
    console.log("Parsing feed: ", source.url);
    const rss = await parser.parseURL(source.url);

    for (const item of rss.items) {
      results.push({
        title: item.title,
        info: item.contentSnippet || item.content || item.summary,
        content: item.content || item.summary || item.contentSnippet,
        url: item.link,
        pubDate: item.pubDate,
        sourceId: source.id,
        source: source.name,
      });
    }
  }

  return results;
}
