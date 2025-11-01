const stopWords = new Set([
  "the",
  "is",
  "on",
  "and",
  "a",
  "of",
  "to",
  "in",
  "for",
  "with",
  "at",
  "by",
  "an",
  "be",
  "this",
  "that",
  "from",
  "as",
]);

export function getKeywords(savedArticles) {
  const wordCounts = {};

  savedArticles.forEach((article) => {
    const words = article.title
      .split(/\W+/)
      .map((w) => w.toLowerCase())
      .filter((w) => w.length > 3 && !stopWords.has(w));
    words.forEach((word) => {
      wordCounts[word] = (wordCounts[word] || 0) + 1;
    });
  });

  return Object.entries(wordCounts)
    .filter(([word, count]) => count > 1)
    .sort((a, b) => b[1] - a[1])
    .map(([word]) => word);
}
