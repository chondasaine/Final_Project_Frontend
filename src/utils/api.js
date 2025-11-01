import fallbackImage from "../../src/assets/fallback.jpg";

const API_Key = "d0d897d1e3164c6faec25c26e3291606";
const BASE_URL = "https://newsapi.org/v2/everything";

export async function fetchArticles(query = "technology") {
  try {
    const response = await fetch(
      `${BASE_URL}?q=${query}&pageSize=10&apiKey=${API_Key}`
    );
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    const data = await response.json();
    return data.articles.map((article) => ({
      url: article.url,
      title: article.title,
      description: article.description,
      image: article.urlToImage || fallbackImage,
      source: article.source.name,
      publishedAt: article.publishedAt,
    }));
  } catch (error) {
    console.error("Failed to fetch articles:", error);
    return [];
  }
}

/*export function saveArticle(article, token) {
  return (fetch("https://api.wtwr.h4ck.me/articles"),
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(article),
  }).then((res) => {
    if (!res.ok) {
      throw new Error(`Save failed: ${res.status}`);
    }
    return res.json();
  });
}*/


