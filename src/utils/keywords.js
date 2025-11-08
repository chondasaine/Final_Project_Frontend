export function getTopKeywords(savedArticles) {
  const count = {};

  savedArticles.forEach((article) => {
    const keyword = article?._search?.keyword.toLowerCase();
    if (!keyword) return;
    count[keyword] = (count[keyword] || 0) + 1;
  });

  const sorted = Object.entries(count).sort((a, b) => b[1] - a[1]);
  const topTwoKeywords = sorted
    .slice(0, 2)
    .map(([word]) => word.charAt(0).toUpperCase() + word.slice(1));
  const otherCount = Math.max(sorted.length - 2, 0);

  return { topTwoKeywords, otherCount };
}
