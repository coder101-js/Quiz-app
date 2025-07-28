const IP_REQUESTS = new Map();

export async function rateLimiter(ip, limit = 100, windowMs = 15 * 60 * 1000) {
  const now = Date.now();

  if (!IP_REQUESTS.has(ip)) {
    IP_REQUESTS.set(ip, []);
  }

  const timestamps = IP_REQUESTS.get(ip).filter(t => now - t < windowMs);
  timestamps.push(now);

  IP_REQUESTS.set(ip, timestamps);

  if (timestamps.length > limit) {
    throw new Error('Too many requests. Please try again later.');
  }
}
