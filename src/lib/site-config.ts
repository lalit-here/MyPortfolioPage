import {
  sanitizeMailtoEmail,
  sanitizePublicPageUrl,
  sanitizeResumeHref,
} from "@/lib/url-policy";

function envTrim(key: string): string | undefined {
  const v = process.env[key]?.trim();
  return v || undefined;
}

/**
 * Preferred canonical origin for metadata & OG. Server-only at runtime (not NEXT_PUBLIC).
 * On Vercel, falls back to https://VERCEL_URL when SITE_URL is unset.
 */
export function getCanonicalSiteUrl(): URL {
  const explicit = envTrim("SITE_URL");
  if (explicit) {
    try {
      return new URL(explicit);
    } catch {
      // fall through
    }
  }
  const vercel = envTrim("VERCEL_URL");
  if (vercel) {
    const base = /^https?:\/\//i.test(vercel) ? vercel : `https://${vercel}`;
    try {
      return new URL(base);
    } catch {
      // fall through
    }
  }
  return new URL("http://localhost:3000");
}

/** Footer line on OG image: hostname without www */
export function getSiteHostnameLabel(): string {
  const host = getCanonicalSiteUrl().hostname.replace(/^www\./i, "");
  return host || "localhost";
}

export type SiteContactLink = {
  label: string;
  href: string;
  value: string;
};

function urlDisplayValue(url: string): string {
  try {
    const u = new URL(url);
    const path = u.pathname.replace(/\/$/, "");
    const host = u.hostname.replace(/^www\./i, "");
    return (path && path !== "/" ? `${host}${path}` : host) || url;
  } catch {
    return url;
  }
}

/** Built from env on the server and passed into client sections — values never use NEXT_PUBLIC_. */
export function getContactLinks(): SiteContactLink[] {
  const links: SiteContactLink[] = [];

  const email = sanitizeMailtoEmail(envTrim("CONTACT_EMAIL") ?? "");
  if (email) {
    links.push({ label: "Email", href: `mailto:${email}`, value: email });
  }

  const linkedinRaw = envTrim("LINKEDIN_URL");
  const linkedin = linkedinRaw ? sanitizePublicPageUrl(linkedinRaw) : undefined;
  if (linkedin) {
    links.push({
      label: "LinkedIn",
      href: linkedin,
      value: envTrim("LINKEDIN_LABEL") ?? urlDisplayValue(linkedin),
    });
  }

  const githubRaw = envTrim("GITHUB_URL");
  const github = githubRaw ? sanitizePublicPageUrl(githubRaw) : undefined;
  if (github) {
    links.push({
      label: "GitHub",
      href: github,
      value: envTrim("GITHUB_LABEL") ?? urlDisplayValue(github),
    });
  }

  const instagramRaw = envTrim("INSTAGRAM_URL");
  const instagram = instagramRaw ? sanitizePublicPageUrl(instagramRaw) : undefined;
  if (instagram) {
    links.push({
      label: "Instagram",
      href: instagram,
      value: envTrim("INSTAGRAM_LABEL") ?? urlDisplayValue(instagram),
    });
  }

  return links;
}

export function getBlogFeaturedUrl(): string | undefined {
  const raw = envTrim("BLOG_FEATURED_URL");
  return raw ? sanitizePublicPageUrl(raw) : undefined;
}

export function getResumeUrl(): string | undefined {
  const raw = envTrim("RESUME_URL");
  return raw ? sanitizeResumeHref(raw) : undefined;
}
