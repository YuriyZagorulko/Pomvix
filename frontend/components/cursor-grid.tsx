'use client';

/**
 * CursorGrid
 * ----------
 * A lightweight, canvas-based "energy grid" that softly illuminates grid
 * cells around the pointer. Designed as a decorative overlay for hero
 * sections — it layers on top of the existing static grid background
 * without replacing it, and never blocks pointer events on the content
 * beneath it.
 *
 * Behaviour
 *   - Illuminates cells within a small radius of the cursor.
 *   - Uses a smooth falloff curve so brightness fades with distance.
 *   - Cells hold their glow briefly, then fade out gradually, so the
 *     energy appears to flow naturally behind the cursor.
 *   - Automatically disables itself on touch devices (`pointer: coarse`)
 *     and when the user has `prefers-reduced-motion` enabled.
 *
 * Performance
 *   - Draws to a single <canvas> via requestAnimationFrame.
 *   - The rAF loop starts on demand and stops as soon as the last cell
 *     fades out — zero work is done while the grid is idle.
 *   - All animation state lives in refs; no React re-renders are
 *     triggered while the cursor moves.
 *   - Event listeners, the resize observer and the animation frame are
 *     all cleaned up when the component unmounts.
 */

import { useEffect, useRef } from 'react';

type Falloff = 'linear' | 'smooth' | 'sharp';

export interface CursorGridProps {
    /** Width/height of each cell in px. Matches the hero's CSS grid size. */
    cellSize?: number;
    /** Brand palette — each cell borrows a colour for a soft multi-tone glow. */
    colors?: string[];
    /** Radius (px) around the cursor inside which cells light up. */
    radius?: number;
    /** Distance falloff curve used to map cell distance to brightness. */
    falloff?: Falloff;
    /** How long (ms) a cell stays lit before the fade-out begins. */
    holdTime?: number;
    /** How long (ms) a full fade-out takes. */
    fadeDuration?: number;
    /** Stroke width of the cell outlines. */
    lineWidth?: number;
    /** Peak opacity of the cell outlines (0–1). */
    maxOpacity?: number;
    /** Peak opacity of the soft cell fill (0–1). */
    fillOpacity?: number;
    /** Extra classes applied to the wrapper element. */
    className?: string;
}

interface GridConfig {
    cellSize: number;
    colors: Array<[number, number, number]>;
    radius: number;
    falloff: Falloff;
    holdTime: number;
    fadeDuration: number;
    lineWidth: number;
    maxOpacity: number;
    fillOpacity: number;
}

const FALLOFF_CURVES: Record<Falloff, (t: number) => number> = {
    linear: (t) => t,
    smooth: (t) => t * t * (3 - 2 * t),
    sharp: (t) => t * t * t,
};

const hexToRgb = (hex: string): [number, number, number] => {
    const h = hex.replace('#', '');
    const v = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
    const num = parseInt(v.slice(0, 6), 16);
    return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
};

/** Pomvix site-theme accent palette: lavender and mint with soft derived shades. */
const DEFAULT_COLORS = ['#a9b7ff', '#95e4ce', '#8fa3e8', '#7fc9b4'];

export default function CursorGrid({
    cellSize = 50,
    colors = DEFAULT_COLORS,
    radius = 110,
    falloff = 'smooth',
    holdTime = 450,
    fadeDuration = 1000,
    lineWidth = 1,
    maxOpacity = 0.6,
    fillOpacity = 0.06,
    className = '',
}: CursorGridProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const propsRef = useRef<GridConfig>({} as GridConfig);

    propsRef.current = {
        cellSize,
        colors: colors.map(hexToRgb),
        radius,
        falloff,
        holdTime,
        fadeDuration,
        lineWidth,
        maxOpacity,
        fillOpacity,
    };

    useEffect(() => {
        // Respect accessibility and device constraints — the effect is purely
        // decorative, so it should never run for reduced-motion or touch users.
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        if (!window.matchMedia('(pointer: fine)').matches) return;

        const container = containerRef.current;
        const canvas = canvasRef.current;
        if (!container || !canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);

        // Grid state: one alpha + timestamp pair per cell, indexed row-major.
        let cols = 0;
        let rows = 0;
        let offX = 0;
        let offY = 0;
        let alphas = new Float32Array(0);
        let touched = new Float64Array(0);
        let w = 0;
        let h = 0;
        let raf = 0;
        let running = false;
        let lastFrame = 0;

        const rebuild = () => {
            const p = propsRef.current;
            w = container.offsetWidth;
            h = container.offsetHeight;
            canvas.width = Math.max(1, Math.round(w * dpr));
            canvas.height = Math.max(1, Math.round(h * dpr));
            canvas.style.width = `${w}px`;
            canvas.style.height = `${h}px`;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            cols = Math.ceil(w / p.cellSize) + 1;
            rows = Math.ceil(h / p.cellSize) + 1;
            // Center the lattice so edge cells crop evenly on both sides.
            offX = (w - cols * p.cellSize) / 2;
            offY = (h - rows * p.cellSize) / 2;
            alphas = new Float32Array(cols * rows);
            touched = new Float64Array(cols * rows);
        };

        const cellCenter = (i: number): [number, number] => {
            const p = propsRef.current;
            const cx = offX + (i % cols) * p.cellSize + p.cellSize / 2;
            const cy = offY + Math.floor(i / cols) * p.cellSize + p.cellSize / 2;
            return [cx, cy];
        };

        // Light up every cell whose center falls inside the radius, with the
        // configured falloff curve mapping distance to brightness.
        const energize = (x: number, y: number) => {
            const p = propsRef.current;
            const r = Math.max(p.radius, 1);
            const ease = FALLOFF_CURVES[p.falloff] ?? FALLOFF_CURVES.linear;
            const now = performance.now();
            const minCol = Math.max(0, Math.floor((x - r - offX) / p.cellSize));
            const maxCol = Math.min(cols - 1, Math.floor((x + r - offX) / p.cellSize));
            const minRow = Math.max(0, Math.floor((y - r - offY) / p.cellSize));
            const maxRow = Math.min(rows - 1, Math.floor((y + r - offY) / p.cellSize));
            for (let cRow = minRow; cRow <= maxRow; cRow++) {
                for (let cCol = minCol; cCol <= maxCol; cCol++) {
                    const i = cRow * cols + cCol;
                    const [cx, cy] = cellCenter(i);
                    const dist = Math.hypot(cx - x, cy - y);
                    if (dist > r) continue;
                    const level = ease(1 - dist / r) * p.maxOpacity;
                    if (level > alphas[i]) {
                        alphas[i] = level;
                        touched[i] = now;
                    } else if (level > 0) {
                        touched[i] = now;
                    }
                }
            }
        };

        const draw = (now: number) => {
            const p = propsRef.current;
            const dt = Math.min(now - lastFrame, 50);
            lastFrame = now;
            ctx.clearRect(0, 0, w, h);

            let anyVisible = false;
            const fadeStep = dt / Math.max(p.fadeDuration, 16);
            const half = p.cellSize / 2;

            for (let i = 0; i < alphas.length; i++) {
                let a = alphas[i];
                if (a <= 0) continue;
                if (now - touched[i] > p.holdTime) {
                    a = Math.max(0, a - fadeStep);
                    alphas[i] = a;
                    if (a <= 0) continue;
                }
                anyVisible = true;

                const [cx, cy] = cellCenter(i);
                const [cr, cg, cb] = p.colors[i % p.colors.length];
                const gradient = ctx.createRadialGradient(cx, cy, half * 0.1, cx, cy, p.cellSize);
                gradient.addColorStop(0, `rgba(${cr}, ${cg}, ${cb}, ${a})`);
                gradient.addColorStop(1, `rgba(${cr}, ${cg}, ${cb}, 0)`);

                const x = cx - half + 0.5;
                const y = cy - half + 0.5;
                const s = p.cellSize - 1;

                ctx.beginPath();
                ctx.rect(x, y, s, s);
                if (p.fillOpacity > 0) {
                    ctx.fillStyle = `rgba(${cr}, ${cg}, ${cb}, ${a * p.fillOpacity})`;
                    ctx.fill();
                }
                ctx.strokeStyle = gradient;
                ctx.lineWidth = p.lineWidth;
                ctx.stroke();
            }

            if (anyVisible) {
                raf = requestAnimationFrame(draw);
            } else {
                running = false;
                ctx.clearRect(0, 0, w, h);
            }
        };

        const wake = () => {
            if (running) return;
            running = true;
            lastFrame = performance.now();
            raf = requestAnimationFrame(draw);
        };

        // Listen on `window` (with `pointer-events: none` on the wrapper) so
        // the overlay never intercepts clicks on the hero content below.
        const onPointerMove = (e: PointerEvent) => {
            if (e.pointerType === 'touch') return;
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            energize(x, y);
            wake();
        };

        const ro = new ResizeObserver(() => {
            rebuild();
        });
        ro.observe(container);
        rebuild();

        window.addEventListener('pointermove', onPointerMove, { passive: true });

        return () => {
            cancelAnimationFrame(raf);
            ro.disconnect();
            window.removeEventListener('pointermove', onPointerMove);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cellSize]);

    return (
        <div
            ref={containerRef}
            className={`cursor-grid${className ? ` ${className}` : ''}`}
            aria-hidden="true"
        >
            <canvas ref={canvasRef} className="cursor-grid__canvas" />
        </div>
    );
}