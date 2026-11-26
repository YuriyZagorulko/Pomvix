import assert from 'node:assert/strict';
import test from 'node:test';
import vm from 'node:vm';
import {
  OPENAI_PIXEL_SDK_URL,
  configuredOpenAiPixelId,
  measureLeadCreated,
  openAiPixelInstallScript,
  shouldMeasureLeadCreated,
} from './openai-pixel';

const PIXEL_ID = 'Xk3PqR8mZt2vLn7wHs5yBa';

function install(times: number) {
  const script = openAiPixelInstallScript(PIXEL_ID);
  assert.ok(script);
  const inserted: { src?: string }[] = [];
  const sandbox = {
    document: {
      createElement() {
        return { async: false, src: '' };
      },
      getElementsByTagName() {
        return [
          {
            parentNode: {
              insertBefore(node: { src?: string }) {
                inserted.push(node);
              },
            },
          },
        ];
      },
    },
  } as {
    window?: {
      oaiq?: ((...args: unknown[]) => void) & { q?: unknown[][] };
      __pomvixOpenAiPixelInitialized?: boolean;
    };
    document: unknown;
  };
  sandbox.window = sandbox as typeof sandbox.window;
  const context = vm.createContext(sandbox);
  for (let i = 0; i < times; i += 1) vm.runInContext(script, context);
  return { inserted, window: context.window as NonNullable<typeof sandbox.window> };
}

test('pixel id is accepted only as a public alphanumeric id', () => {
  assert.equal(configuredOpenAiPixelId(PIXEL_ID), PIXEL_ID);
  assert.equal(configuredOpenAiPixelId(`  ${PIXEL_ID}  `), PIXEL_ID);
  assert.equal(configuredOpenAiPixelId(''), null);
  assert.equal(configuredOpenAiPixelId('short'), null);
  assert.equal(configuredOpenAiPixelId('bad id with spaces xx'), null);
  assert.equal(configuredOpenAiPixelId('</script>alert(1)'), null);
});

test('the measurement pixel initializes once', () => {
  const once = install(1);
  assert.equal(once.inserted.length, 1);
  assert.equal(once.inserted[0].src, OPENAI_PIXEL_SDK_URL);
  assert.equal(once.window.__pomvixOpenAiPixelInitialized, true);
  assert.equal(
    JSON.stringify(once.window.oaiq?.q?.map((entry) => Array.from(entry as unknown as unknown[]))),
    JSON.stringify([['init', { pixelId: PIXEL_ID }]]),
  );

  const twice = install(2);
  assert.equal(twice.inserted.length, 1);
  assert.equal(
    JSON.stringify(twice.window.oaiq?.q?.map((entry) => Array.from(entry as unknown as unknown[]))),
    JSON.stringify([['init', { pixelId: PIXEL_ID }]]),
  );
});

test('lead_created is emitted once and only after a confirmed submission', () => {
  assert.equal(shouldMeasureLeadCreated({ responseOk: false, alreadyMeasured: false }), false);
  assert.equal(shouldMeasureLeadCreated({ responseOk: true, alreadyMeasured: true }), false);
  assert.equal(shouldMeasureLeadCreated({ responseOk: true, alreadyMeasured: false }), true);

  const calls: unknown[][] = [];
  globalThis.window = { oaiq: (...args: unknown[]) => calls.push(args) } as unknown as Window &
    typeof globalThis;
  assert.equal(shouldMeasureLeadCreated({ responseOk: false, alreadyMeasured: false }), false);
  if (shouldMeasureLeadCreated({ responseOk: true, alreadyMeasured: false })) measureLeadCreated();
  if (shouldMeasureLeadCreated({ responseOk: true, alreadyMeasured: true })) measureLeadCreated();
  assert.deepEqual(calls, [['measure', 'lead_created', { type: 'customer_action' }]]);
  delete (globalThis as { window?: unknown }).window;
});
