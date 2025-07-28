export function isBot(req) {
  const userAgent = req.headers.get('user-agent') || '';

  return /bot|crawl|spider|curl|wget|python|go-http/i.test(userAgent);
}
