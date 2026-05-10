const CTRL = /[\u0000-\u001f\u007f]/;

function allowedExternalHostname(hostname: string): boolean {
  const list = process.env.ALLOWED_EXTERNAL_LINK_HOSTS?.trim();
  if (!list) return true;

  const h = hostname.replace(/^www\./i, "").toLowerCase();
  return list.split(",").some((entry) => {
    const e = entry.trim().replace(/^www\./i, "").toLowerCase();
    if (!e) return false;
    return h === e || h.endsWith(`.${e}`);
  });
}

/** Safe single-segment mailto local-part + domain (no header injection / odd schemes). */
export function sanitizeMailtoEmail(raw: string): string | undefined {
  const e = raw.trim().slice(0, 254);
  if (!e || CTRL.test(e)) return undefined;
  if (/[\s<>'"&`]/.test(e)) return undefined;
  if (!/^[^\s@]{1,64}@[^\s@]{1,253}$/.test(e)) return undefined;
  if (!/^[\x21-\x7E]+$/.test(e)) return undefined;
  return e;
}

/**
 * Absolute https URL only (http allowed only for localhost in development).
 * Rejects javascript:, data:, etc.
 */
export function sanitizeHttpsUrl(raw: string): string | undefined {
  const urlStr = raw.trim();
  if (!urlStr || CTRL.test(urlStr)) return undefined;

  try {
    const u = new URL(urlStr);
    const isProd = process.env.NODE_ENV === "production";
    const localHttp =
      !isProd && u.protocol === "http:" && (u.hostname === "localhost" || u.hostname === "127.0.0.1");

    if (u.protocol === "https:") {
      if (!allowedExternalHostname(u.hostname)) return undefined;
      return u.href;
    }
    if (localHttp) {
      if (!allowedExternalHostname(u.hostname)) return undefined;
      return u.href;
    }
    return undefined;
  } catch {
    return undefined;
  }
}

/** Same-origin path only: `/resume.pdf`, `/blog/foo` — no scheme/host. */
export function sanitizeRelativeAssetPath(raw: string): string | undefined {
  const p = raw.trim();
  if (!p.startsWith("/") || p.startsWith("//")) return undefined;
  if (p.includes("..") || p.includes("\\")) return undefined;
  if (CTRL.test(p)) return undefined;
  const pathOnly = p.split("#")[0] ?? p;
  if (!pathOnly || pathOnly.length > 2048) return undefined;
  return pathOnly;
}

/** Blog / social links: https URL or dev-only localhost http. */
export function sanitizePublicPageUrl(raw: string): string | undefined {
  return sanitizeHttpsUrl(raw);
}

/** Resume: relative path under site or validated https URL (e.g. PDF on CDN). */
export function sanitizeResumeHref(raw: string): string | undefined {
  const t = raw.trim();
  if (!t) return undefined;
  const rel = sanitizeRelativeAssetPath(t);
  if (rel) return rel;
  return sanitizeHttpsUrl(t);
}
