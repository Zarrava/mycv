type Bucket = { count: number; reset: number };

const buckets = new Map<string, Bucket>();

/**
 * In-memory limit. On a multi-instance host each instance keeps its own map,
 * so this is a basic guard, not a global quota.
 */
export function rateLimit(key: string, limit = 5, windowMs = 10 * 60 * 1000) {
  const now = Date.now();

  if (buckets.size > 5000) {
    for (const [storedKey, bucket] of buckets) {
      if (bucket.reset < now) buckets.delete(storedKey);
    }
  }

  const current = buckets.get(key);
  if (!current || current.reset < now) {
    buckets.set(key, { count: 1, reset: now + windowMs });
    return { ok: true, retryAfter: 0 };
  }

  if (current.count >= limit) {
    return { ok: false, retryAfter: Math.ceil((current.reset - now) / 1000) };
  }

  current.count += 1;
  return { ok: true, retryAfter: 0 };
}
