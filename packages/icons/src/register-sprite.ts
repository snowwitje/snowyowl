/**
 * Injects the SnowyOwl icon sprite into the document body.
 * Call this once at app startup before any <so-icon> elements render.
 *
 * @example
 * import { registerSprite } from '@snowyowl/icons';
 * registerSprite();
 */
export async function registerSprite(spriteUrl = '/icons/sprite.svg'): Promise<void> {
  // Avoid double-injection
  if (document.getElementById('so-icon-sprite')) return;

  try {
    const response = await fetch(spriteUrl);
    const svgText = await response.text();
    const container = document.createElement('div');
    container.id = 'so-icon-sprite';
    container.setAttribute('aria-hidden', 'true');
    container.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden;';
    container.innerHTML = svgText;
    document.body.insertBefore(container, document.body.firstChild);
  } catch (e) {
    console.warn('[SnowyOwl] Could not load icon sprite from', spriteUrl, e);
  }
}

/**
 * Inline sprite injection — use when bundling the sprite directly.
 * Import the sprite as a string and pass it here.
 *
 * @example
 * import spriteContent from '@snowyowl/icons/sprite.svg?raw';
 * import { inlineSprite } from '@snowyowl/icons';
 * inlineSprite(spriteContent);
 */
export function inlineSprite(svgContent: string): void {
  if (document.getElementById('so-icon-sprite')) return;
  const container = document.createElement('div');
  container.id = 'so-icon-sprite';
  container.setAttribute('aria-hidden', 'true');
  container.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden;';
  container.innerHTML = svgContent;
  document.body.insertBefore(container, document.body.firstChild);
}
