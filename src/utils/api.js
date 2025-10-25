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
    return data.articles;
  } catch (error) {
    console.error("Failed to fetch articles:", error);
    return [];
  }
}
