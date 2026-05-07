export function getOriginFromRequest(request) {
  const forwardedProto = request.headers.get("x-forwarded-proto");
  const forwardedHost = request.headers.get("x-forwarded-host");

  if (forwardedProto && forwardedHost) {
    return `${forwardedProto}://${forwardedHost}`.replace(/\/$/, "");
  }

  if (forwardedHost) {
    return `https://${forwardedHost}`.replace(/\/$/, "");
  }

  try {
    return new URL(request.url).origin;
  } catch {
    const origin = request.headers.get("origin") || request.headers.get("referer");
    if (origin) {
      try {
        return new URL(origin).origin;
      } catch {
        return origin.replace(/\/$/, "");
      }
    }
  }

  return getConfiguredSiteUrl();
}

export function getOriginFromHeaders(headersList) {
  const forwardedProto = headersList.get("x-forwarded-proto");
  const forwardedHost = headersList.get("x-forwarded-host");

  if (forwardedProto && forwardedHost) {
    return `${forwardedProto}://${forwardedHost}`.replace(/\/$/, "");
  }

  if (forwardedHost) {
    return `https://${forwardedHost}`.replace(/\/$/, "");
  }

  const origin = headersList.get("origin") || headersList.get("referer");
  if (origin) {
    try {
      return new URL(origin).origin;
    } catch {
      return origin.replace(/\/$/, "");
    }
  }

  return getConfiguredSiteUrl();
}

export function getConfiguredSiteUrl(fallback = "") {
  return (process.env.NEXT_PUBLIC_BASE_URL || process.env.NEXT_PUBLIC_SITE_URL || process.env.BASE_URL || fallback).replace(/\/$/, "");
}