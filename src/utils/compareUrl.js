export function compareUrl(u) {
  if (!u) return "";
  try {
    const url = new URL(u.trim());
    url.hostname = url.hostname.toLowerCase();

    if (url.pathname.endsWith("/") && url.pathname !== "/") {
      url.pathname = url.pathname.slice(0, -1);
    }
    return `${url.protocol}//${url.hostname}${url.pathname}`;
  } catch {
    return u.trim().toLowerCase();
  }
}
