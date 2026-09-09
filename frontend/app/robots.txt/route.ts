import { siteConfig } from '@/lib/site';

/**
 * Serves /robots.txt.
 *
 * Implemented as a route handler (instead of app/robots.ts) so the file can
 * carry Content-Signal directives, which Next.js' MetadataRoute.Robots cannot
 * express. This keeps the policy the site previously published through
 * Cloudflare's "Managed robots.txt" feature:
 *
 *   - `search=yes, ai-train=no, use=reference` — AI crawlers may crawl,
 *     retrieve, and reference public content (search indexes, RAG/AI answers),
 *     but must not use it for model training. Allowing crawling and
 *     restricting training are independent declarations, so there are no
 *     `Disallow` blocks for AI crawlers such as GPTBot, ClaudeBot,
 *     Google-Extended, Applebot-Extended, or Amazonbot.
 *   - `/api/` and `/health` stay closed to all crawlers.
 *
 * The file is prerendered at build time; `NEXT_PUBLIC_SITE_URL` (inlined by
 * Next.js during the build, see docker-compose.prod.yml) drives the sitemap
 * URL and falls back to the canonical production domain.
 */
export const dynamic = 'force-static';

export function GET(): Response {
  const body = `# As a condition of accessing this website, you agree to abide by the
# following content signals:

# (a)  If a Content-Signal = yes, you may collect content for the corresponding
#      use.
# (b)  If a Content-Signal = no, you may not collect content for the
#      corresponding use.
# (c)  If the website operator does not include a Content-Signal for a
#      corresponding use, the website operator neither grants nor restricts
#      permission via Content-Signal with respect to the corresponding use.

# The content signals and their meanings are:

# search:   building a search index and providing search results (e.g., returning
#           hyperlinks and short excerpts from your website's contents). Search does not
#           include providing AI-generated search summaries.
# ai-input: inputting content into one or more AI models (e.g., retrieval
#           augmented generation, grounding, or other real-time taking of content for
#           generative AI search answers).
# ai-train: training or fine-tuning AI models.
# use:      how AI systems may consume the content (immediate, reference, or full).

# ANY RESTRICTIONS EXPRESSED VIA CONTENT SIGNALS ARE EXPRESS RESERVATIONS OF
# RIGHTS UNDER ARTICLE 4 OF THE EUROPEAN UNION DIRECTIVE 2019/790 ON COPYRIGHT
# AND RELATED RIGHTS IN THE DIGITAL SINGLE MARKET.

User-agent: *
Content-Signal: search=yes,ai-train=no,use=reference
Allow: /
Disallow: /api/
Disallow: /health

Sitemap: ${siteConfig.url}/sitemap.xml
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
