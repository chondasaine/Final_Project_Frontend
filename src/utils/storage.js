const KEY = "savedArticles";

export function fetchSavedArticlesFromLocal() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveSavedArticlesToLocal(list) {
  try {
    localStorage.setItem(KEY, JSON.stringify(list));
  } catch {}
}
