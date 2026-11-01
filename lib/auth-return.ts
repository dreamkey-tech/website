/** Keep post-auth navigation on this website, including untrusted query input. */
export function safeAuthReturnTo(value?: string | null) {
  if (
    typeof value !== "string" ||
    !value.startsWith("/") ||
    value.startsWith("//") ||
    value.includes("\\")
  )
    return "/buy";
  try {
    const url = new URL(value, "https://dreamkey.local");
    if (
      url.origin !== "https://dreamkey.local" ||
      ["/login", "/register", "/forgot-password"].includes(url.pathname)
    )
      return "/buy";
    return `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return "/buy";
  }
}
export function authPageHref(
  page: "/login" | "/register" | "/forgot-password",
  returnTo?: string,
) {
  return returnTo
    ? `${page}?${new URLSearchParams({ returnTo: safeAuthReturnTo(returnTo) })}`
    : page;
}
