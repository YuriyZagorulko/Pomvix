/**
 * OpenAI ChatGPT Ads Measurement Pixel.
 *
 * The Pixel ID is a public browser identifier from Ads Manager, not an API key.
 * Set it with NEXT_PUBLIC_OPENAI_PIXEL_ID. Pomvix has no consent manager; the
 * SDK treats measurement consent as granted unless it has a stored denial.
 *
 * @see https://developers.openai.com/ads/measurement-pixel
 */

export const OPENAI_PIXEL_SDK_URL = 'https://bzrcdn.openai.com/sdk/oaiq.min.js';

/** Ads Manager pixel IDs are alphanumeric (typically 22 characters). */
const PIXEL_ID_PATTERN = /^[A-Za-z0-9]{8,128}$/;

export type OpenAiPixelCommand = (...args: unknown[]) => void;

declare global {
  interface Window {
    oaiq?: OpenAiPixelCommand;
    __pomvixOpenAiPixelInitialized?: boolean;
  }
}

export function configuredOpenAiPixelId(
  value: string | undefined = process.env.NEXT_PUBLIC_OPENAI_PIXEL_ID,
): string | null {
  const pixelId = value?.trim() ?? '';
  return PIXEL_ID_PATTERN.test(pixelId) ? pixelId : null;
}

/**
 * Official loader, plus a flag so `init` runs once even if this inline script
 * is evaluated again. The SDK URL is injected only when `window.oaiq` is absent.
 */
export function openAiPixelInstallScript(pixelId: string | undefined): string | null {
  const id = configuredOpenAiPixelId(pixelId);
  if (!id) return null;
  const pixelIdLiteral = JSON.stringify(id).replace(/</g, '\\u003c');
  return `(function (w, d, s, u) {
  if (w.oaiq) return;
  var q = function () {
    q.q.push(arguments);
  };
  q.q = [];
  w.oaiq = q;
  var js = d.createElement(s);
  js.async = true;
  js.src = u;
  var f = d.getElementsByTagName(s)[0];
  f.parentNode.insertBefore(js, f);
})(window, document, "script", ${JSON.stringify(OPENAI_PIXEL_SDK_URL)});
if (!window.__pomvixOpenAiPixelInitialized) {
  window.__pomvixOpenAiPixelInitialized = true;
  oaiq("init", { pixelId: ${pixelIdLiteral} });
}`;
}

/** True only for a confirmed submission that has not already been measured. */
export function shouldMeasureLeadCreated(input: {
  responseOk: boolean;
  alreadyMeasured: boolean;
}): boolean {
  return input.responseOk && !input.alreadyMeasured;
}

/** Queue `lead_created` after the contact API has accepted the submission. */
export function measureLeadCreated(): void {
  if (typeof window === 'undefined') return;
  const measure = window.oaiq;
  if (typeof measure !== 'function') return;
  try {
    measure('measure', 'lead_created', { type: 'customer_action' });
  } catch {
    // Tracking must not change a submission the API already accepted.
  }
}
