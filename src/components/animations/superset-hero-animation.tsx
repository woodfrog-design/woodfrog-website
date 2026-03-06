'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

/* ═══════════════════════════════════════════════════════════════════
   SUPERSET HERO ANIMATION  - v5
   ─────────────────────────────────────────────────────────────────
   Canvas + GSAP.  White bg.  Proper spatial layout.
   
   Story:
   1. Four BI tool cards appear arranged diagonally around a center
   2. Gold $ signs drain FROM the tools INTO a growing vortex
   3. Vortex = "License Costs" - it keeps consuming money
   4. Woodfrog core glides in, pushes toward vortex center
   5. Woodfrog eradicates the vortex - it shrinks and dissolves
   6. Tools fade away
   7. Green $ signs flow OUTWARD from Woodfrog = savings / profit
   8. "License Costs Eliminated." message + mini dashboard
   9. Fade → loop
   ═══════════════════════════════════════════════════════════════════ */

const C = {
    green: '#10B981',
    green2: '#059669',
    gA: 'rgba(16,185,129,',
    gold: '#F59E0B',
    gold2: '#D97706',
    gldA: 'rgba(245,158,11,',
    navy: '#0f172a',
    slate: '#64748b',
    slateL: '#94a3b8',
    bdr: 'rgba(0,0,0,0.06)',
    light: '#f1f5f9',
};

// BI Tools - positioned diagonally around center
// Positions are OFFSETS from center as fraction of W, H
// NW / NE / SW / SE - pushed further to corners
//
// SVG ICON REPLACEMENT:
// Place SVG files in /public/logos/bi-tools/  with these exact names:
//   tableau.svg, powerbi.svg, looker.svg, qlik.svg
// The animation will auto-load them. Until then, colored letter circles show.
const TOOLS = [
    { label: 'Tableau', accent: '#E97627', icon: 'T', price: '$75/user/mo', dx: -0.33, dy: -0.30, svg: '/logos/bi-tools/tableau.svg' },
    { label: 'Power BI', accent: '#F2C811', icon: 'P', price: '$40/user/mo', dx: 0.33, dy: -0.30, svg: '/logos/bi-tools/powerbi.svg' },
    { label: 'Looker', accent: '#4285F4', icon: 'L', price: '$55/user/mo', dx: -0.33, dy: 0.30, svg: '/logos/bi-tools/looker.svg' },
    { label: 'Qlik', accent: '#009845', icon: 'Q', price: '$30/user/mo', dx: 0.33, dy: 0.30, svg: '/logos/bi-tools/qlik.svg' },
];

interface Dollar {
    fromX: number; fromY: number;
    toX: number; toY: number;
    prog: number; speed: number;
    size: number; alpha: number;
    curve: number;
    green: boolean;
    outward: boolean; // true = flying outward from center
}

interface RingDot {
    angle: number; radius: number; speed: number;
    size: number; opacity: number;
}

export const SupersetHeroAnimation: React.FC<{ isActive?: boolean }> = ({ isActive = true }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const wrapRef = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLImageElement | null>(null);
    const frameId = useRef(0);
    const tlRef = useRef<gsap.core.Timeline | null>(null);
    const isVisible = useRef(true);

    useEffect(() => {
        if (!isActive) return;
        const wrap = wrapRef.current!;
        if (!wrap) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                isVisible.current = entry.isIntersecting;
                if (tlRef.current) {
                    if (isVisible.current) tlRef.current.resume();
                    else tlRef.current.pause();
                }
            },
            { threshold: 0.1 }
        );

        observer.observe(wrap);
        return () => observer.disconnect();
    }, [isActive]);

    useEffect(() => {
        if (!isActive) return;
        const canvas = canvasRef.current!;
        const wrap = wrapRef.current!;
        if (!canvas || !wrap) return;
        const ctx = canvas.getContext('2d')!;
        let W = 0, H = 0;

        const logo = new Image();
        logo.src = '/logos/woodfrog-logo2.svg';
        logo.onload = () => { logoRef.current = logo; };

        // Load BI tool SVG icons
        const toolIcons: (HTMLImageElement | null)[] = [null, null, null, null];
        TOOLS.forEach((t, i) => {
            const img = new Image();
            img.src = t.svg;
            img.onload = () => { toolIcons[i] = img; };
            // If SVG doesn't exist, onload won't fire - fallback to letter circle
        });

        const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;


        // Center of the animation - true center for equal spacing
        const cx = () => W * 0.50;
        const cy = () => H * 0.50;

        // ════════════════════════════════════════════════
        //  STATE
        // ════════════════════════════════════════════════
        const s = {
            t: 0,
            tOp: [0, 0, 0, 0], tSc: [0, 0, 0, 0], tShake: [0, 0, 0, 0],
            vOp: 0, vSc: 0, vLabel: 0,
            dFlow: 0,
            // Woodfrog
            wOp: 0, wPx: 0, wPy: 0, wSc: 0,
            sOp: 0, sSc: 0,
            // Savings outward flow
            savFlow: 0,
            // Victory
            msgOp: 0, eOp: 0,
            // Advantages: $0 Licenses, Unlimited Users, Open Source, No Lock-In
            advOp: [0, 0, 0, 0],
            fade: 0,
        };

        const dollars: Dollar[] = [];
        let ringDots: RingDot[] = [];

        const makeRings = () => {
            const out: RingDot[] = [];
            const dotCount = isMobile ? 30 : 60;
            for (let i = 0; i < dotCount; i++) {
                out.push({
                    angle: Math.random() * Math.PI * 2,
                    radius: 0.4 + Math.random() * 0.6,
                    speed: 0.4 + Math.random() * 1.4,
                    size: 0.7 + Math.random() * 1.8,
                    opacity: 0.1 + Math.random() * 0.3,
                });
            }
            return out;
        };

        const resetAll = () => {
            s.t = 0;
            for (let i = 0; i < 4; i++) {
                s.tOp[i] = 0;
                s.tSc[i] = 0;
                s.tShake[i] = 0;
                s.advOp[i] = 0;
            }
            s.vOp = 0; s.vSc = 0; s.vLabel = 0;
            s.dFlow = 0;
            s.wOp = 0; s.wPx = W + 80; s.wPy = cy(); s.wSc = 0.5;
            s.sOp = 0; s.sSc = 0;
            s.savFlow = 0;
            s.msgOp = 0; s.eOp = 0;
            s.fade = 0;
            dollars.length = 0;
            const newRings = makeRings();
            ringDots.length = 0;
            ringDots.push(...newRings);
        };

        // ════════════════════════════════════════════════
        //  GSAP TIMELINE
        // ════════════════════════════════════════════════
        // ════════════════════════════════════════════════
        //  GSAP TIMELINE
        // ════════════════════════════════════════════════
        let ctxGsap: gsap.Context;

        const buildTL = () => {
            if (tlRef.current) {
                tlRef.current.kill();
                tlRef.current = null;
            }

            if (ctxGsap) ctxGsap.revert();

            ctxGsap = gsap.context(() => {
                resetAll();

                const tl = gsap.timeline({
                    repeat: -1,
                    onRepeat: resetAll
                });

                tl.set(s, { fade: 0 });

                // ── 1. BI tools appear around center ──────────────
                TOOLS.forEach((_, i) => {
                    tl.to(s.tOp, { [i]: 1, duration: 0.5, ease: 'power2.out' }, 0.3 + i * 0.15);
                    tl.to(s.tSc, { [i]: 1, duration: 0.6, ease: 'back.out(1.6)' }, 0.3 + i * 0.15);
                });

                // ── 2. Vortex appears at center ───────────────────
                tl.to(s, { vOp: 1, duration: 0.7, ease: 'power2.out' }, 1.3);
                tl.to(s, { vSc: 1, duration: 1.0, ease: 'elastic.out(1, 0.8)' }, 1.3);
                tl.to(s, { vLabel: 1, duration: 0.5 }, 1.8);

                // ── 3. Dollar drain: tools → vortex ───────────────
                tl.to(s, { dFlow: 1, duration: 0.4 }, 2.4);
                tl.to(s, { vSc: 1.3, duration: 4, ease: 'power1.inOut' }, 2.8);

                // Cards shake + dim
                TOOLS.forEach((_, i) => {
                    tl.to(s.tShake, { [i]: 1, duration: 2.5, ease: 'power1.in' }, 3.2 + i * 0.1);
                    tl.to(s.tOp, { [i]: 0.4, duration: 2.5, ease: 'power1.in' }, 3.5);
                });

                // ── 4. Woodfrog glides in from right toward center ─
                tl.to(s, { dFlow: 0, duration: 0.5 }, 6.8);
                tl.to(s, {
                    wOp: 1, wPx: cx(), wPy: cy(), wSc: 1,
                    duration: 1.6, ease: 'power3.out',
                }, 7.0);

                // ── 5. Shield expands - pushes back the vortex ────
                tl.to(s, { sOp: 1, sSc: 1, duration: 0.8, ease: 'back.out(2.5)' }, 8.2);

                // Vortex shrinks and dies under the shield
                tl.to(s, { vSc: 0, vOp: 0, duration: 1.8, ease: 'power3.in' }, 8.8);
                tl.to(s, { vLabel: 0, duration: 0.4 }, 8.8);

                // Tools vanish
                TOOLS.forEach((_, i) => {
                    tl.to(s.tOp, { [i]: 0, duration: 0.5 }, 9.5 + i * 0.08);
                    tl.to(s.tShake, { [i]: 0, duration: 0.3 }, 9.5);
                });

                // ── 6. Woodfrog slides to the RIGHT side ──────────
                tl.to(s, { wPx: W * 0.78, duration: 1.2, ease: 'power3.inOut' }, 10.2);
                tl.to(s, { sSc: 1.2, sOp: 0.25, duration: 1.5, ease: 'power2.out' }, 10.5);

                // ── 7. Savings: green $ flow OUTWARD ──────────────
                tl.to(s, { savFlow: 1, duration: 0.5 }, 11.0);
                tl.to(s, { eOp: 1, duration: 0.8 }, 11.2);

                // ── 8. Victory message + advantages one by one ────
                tl.to(s, { msgOp: 1, duration: 1.0, ease: 'power2.out' }, 11.5);

                // Stagger the four advantages
                tl.to(s.advOp, { 0: 1, duration: 0.5, ease: 'power2.out' }, 12.2);
                tl.to(s.advOp, { 1: 1, duration: 0.5, ease: 'power2.out' }, 12.6);
                tl.to(s.advOp, { 2: 1, duration: 0.5, ease: 'power2.out' }, 13.0);
                tl.to(s.advOp, { 3: 1, duration: 0.5, ease: 'power2.out' }, 13.4);

                // Hold
                tl.to({}, { duration: 3.5 }, 14.0);

                // Stop savings flow
                tl.to(s, { savFlow: 0, duration: 0.5 }, 17.0);

                // Fade out (using internal fade instead of manual tween)
                tl.to(s, {
                    msgOp: 0, eOp: 0, wOp: 0, sOp: 0,
                    duration: 1.2, ease: 'power2.inOut',
                }, 17.5);
                tl.to(s.advOp, { 0: 0, 1: 0, 2: 0, 3: 0, duration: 0.8 }, 17.5);

                // Final white overlap at the very end of the loop
                tl.to(s, { fade: 1, duration: 0.8 }, 18.2);

                tlRef.current = tl;
                if (!isVisible.current) tl.pause();
            }, wrap);
        };

        // ════════════════════════════════════════════════
        //  DRAW HELPERS
        // ════════════════════════════════════════════════

        const rrect = (x: number, y: number, w: number, h: number, r: number) => {
            ctx.beginPath();
            ctx.moveTo(x + r, y);
            ctx.arcTo(x + w, y, x + w, y + h, r);
            ctx.arcTo(x + w, y + h, x, y + h, r);
            ctx.arcTo(x, y + h, x, y, r);
            ctx.arcTo(x, y, x + w, y, r);
            ctx.closePath();
        };

        // BG
        const drawBg = () => {
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, W, H);
            const g = ctx.createRadialGradient(cx(), cy(), 0, cx(), cy(), W * 0.55);
            g.addColorStop(0, 'rgba(241,245,249,0.6)');
            g.addColorStop(1, 'rgba(255,255,255,0)');
            ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);

            // Dot grid
            ctx.fillStyle = 'rgba(0,0,0,0.03)';
            const gap = Math.max(18, Math.round(W / 28));
            for (let x = gap; x < W; x += gap)
                for (let y = gap; y < H; y += gap) {
                    ctx.beginPath(); ctx.arc(x, y, 0.6, 0, Math.PI * 2); ctx.fill();
                }
        };

        // Tool card
        const drawCard = (i: number) => {
            const t = TOOLS[i];
            const op = s.tOp[i], sc = s.tSc[i], shake = s.tShake[i];
            if (op < 0.005) return;

            const cardCx = cx() + t.dx * W;
            const cardCy = cy() + t.dy * H;
            const cw = Math.min(125, W * 0.20);
            const ch = cw * 0.38;
            const r = Math.min(11, cw * 0.09);
            const hover = Math.sin(s.t * 1.1 + i * 1.8) * 2;
            const sx = shake * Math.sin(s.t * 13 + i * 2) * 2;
            const sy = shake * Math.cos(s.t * 15 + i) * 1;

            ctx.save();
            ctx.translate(cardCx + sx, cardCy + hover + sy);
            ctx.scale(sc, sc);
            ctx.globalAlpha = op;

            ctx.shadowColor = 'rgba(0,0,0,0.07)'; ctx.shadowBlur = 12; ctx.shadowOffsetY = 3;
            ctx.fillStyle = '#ffffff';
            rrect(-cw / 2, -ch / 2, cw, ch, r); ctx.fill();

            ctx.shadowColor = 'transparent'; ctx.shadowBlur = 0; ctx.shadowOffsetY = 0;
            ctx.strokeStyle = C.bdr; ctx.lineWidth = 1;
            rrect(-cw / 2, -ch / 2, cw, ch, r); ctx.stroke();

            const iconR = ch * 0.3;
            const iconX = -cw / 2 + iconR + 10;

            // Try SVG icon first, fall back to colored letter circle
            const svgImg = toolIcons[i];
            if (svgImg) {
                const iSize = iconR * 2;
                ctx.drawImage(svgImg, iconX - iconR, -iconR, iSize, iSize);
            } else {
                ctx.beginPath(); ctx.arc(iconX, 0, iconR, 0, Math.PI * 2);
                ctx.fillStyle = t.accent; ctx.fill();
                ctx.fillStyle = '#fff';
                ctx.font = `bold ${Math.round(iconR * 0.95)}px system-ui,-apple-system,sans-serif`;
                ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
                ctx.fillText(t.icon, iconX, 0.5);
            }

            const tx = iconX + iconR + 7;
            ctx.textAlign = 'left';
            ctx.font = `600 ${Math.round(cw * 0.078)}px system-ui,-apple-system,sans-serif`;
            ctx.fillStyle = C.navy; ctx.fillText(t.label, tx, -ch * 0.12);
            ctx.font = `${Math.round(cw * 0.062)}px system-ui,-apple-system,sans-serif`;
            ctx.fillStyle = C.slateL; ctx.fillText(t.price, tx, ch * 0.17);

            ctx.globalAlpha = 1; ctx.restore();
        };

        // Vortex
        const drawVortex = () => {
            if (s.vOp < 0.005) return;
            const vx = cx(), vy = cy();
            const baseR = Math.min(W, H) * 0.09 * s.vSc;  // smaller: 9% of min dim

            ctx.save(); ctx.globalAlpha = s.vOp;

            // Ring dots
            ringDots.forEach(d => {
                d.angle += d.speed * 0.016;
                const dr = d.radius * baseR * 1.8;
                ctx.beginPath();
                ctx.arc(
                    vx + Math.cos(d.angle) * dr,
                    vy + Math.sin(d.angle) * dr * 0.4,
                    d.size * Math.min(s.vSc, 1), 0, Math.PI * 2
                );
                ctx.fillStyle = `rgba(139,92,246,${d.opacity * s.vOp * 0.5})`;
                ctx.fill();
            });

            // Glow
            const og = ctx.createRadialGradient(vx, vy, baseR * 0.15, vx, vy, baseR * 2.2);
            og.addColorStop(0, 'rgba(139,92,246,0.07)');
            og.addColorStop(0.5, 'rgba(220,38,38,0.03)');
            og.addColorStop(1, 'rgba(0,0,0,0)');
            ctx.fillStyle = og;
            ctx.fillRect(vx - baseR * 3, vy - baseR * 3, baseR * 6, baseR * 6);

            // Rings
            [1.8, 1.3, 1.0].forEach((m, i) => {
                ctx.beginPath();
                ctx.ellipse(vx, vy, baseR * m, baseR * m * 0.4, 0, 0, Math.PI * 2);
                ctx.strokeStyle = `rgba(139,92,246,${0.05 + i * 0.04})`;
                ctx.lineWidth = 0.7; ctx.stroke();
            });

            // Core
            const cg = ctx.createRadialGradient(vx, vy, 0, vx, vy, baseR);
            cg.addColorStop(0, 'rgba(0,0,0,0.85)');
            cg.addColorStop(0.65, 'rgba(15,23,42,0.7)');
            cg.addColorStop(1, 'rgba(15,23,42,0.1)');
            ctx.beginPath(); ctx.arc(vx, vy, baseR, 0, Math.PI * 2);
            ctx.fillStyle = cg; ctx.fill();

            // Photon ring
            ctx.beginPath(); ctx.arc(vx, vy, baseR * 1.02, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(168,85,247,${0.28 + Math.sin(s.t * 4) * 0.1})`;
            ctx.lineWidth = 1.5; ctx.stroke();

            // Label
            if (s.vLabel > 0.01) {
                ctx.globalAlpha = s.vOp * s.vLabel;
                const fs = Math.round(Math.min(10, W * 0.018));
                ctx.font = `bold ${fs}px system-ui,-apple-system,sans-serif`;
                ctx.fillStyle = C.slate;
                ctx.textAlign = 'center'; ctx.textBaseline = 'top';
                ctx.fillText('License Costs', vx, vy + baseR + 10);
            }

            ctx.globalAlpha = 1; ctx.restore();
        };

        // Dollar spawning + drawing
        let spawnAcc = 0;
        const tickDollars = (dt: number) => {
            spawnAcc += dt;

            // DRAIN: Tools → vortex center  (gold $)
            const spawnFreq = isMobile ? 0.3 : 0.16;
            if (s.dFlow > 0.5 && spawnAcc > spawnFreq) {
                spawnAcc = 0;
                TOOLS.forEach((t, i) => {
                    if (s.tOp[i] < 0.2 || Math.random() > 0.55) return;
                    dollars.push({
                        fromX: cx() + t.dx * W, fromY: cy() + t.dy * H,
                        toX: cx(), toY: cy(),
                        prog: 0, speed: 0.3 + Math.random() * 0.2,
                        size: 9 + Math.random() * 5, alpha: 0.6 + Math.random() * 0.35,
                        curve: 14 + Math.random() * 14, green: false, outward: false,
                    });
                });
            }

            // SAVINGS: $ flow OUTWARD from Woodfrog (green $)
            const savFreq = isMobile ? 0.35 : 0.2;
            if (s.savFlow > 0.5 && spawnAcc > savFreq) {
                spawnAcc = 0;
                for (let k = 0; k < 3; k++) {
                    const angle = Math.random() * Math.PI * 2;
                    const dist = 100 + Math.random() * 80;
                    dollars.push({
                        fromX: s.wPx, fromY: s.wPy,
                        toX: s.wPx + Math.cos(angle) * dist,
                        toY: s.wPy + Math.sin(angle) * dist,
                        prog: 0, speed: 0.25 + Math.random() * 0.15,
                        size: 9 + Math.random() * 4, alpha: 0.7 + Math.random() * 0.3,
                        curve: 8 + Math.random() * 8, green: true, outward: true,
                    });
                }
            }

            // Update + draw
            for (let i = dollars.length - 1; i >= 0; i--) {
                const d = dollars[i];
                d.prog += d.speed * dt;
                if (d.prog >= 1) { dollars.splice(i, 1); continue; }

                const t2 = d.prog;
                const ease = t2 < 0.5 ? 2 * t2 * t2 : 1 - Math.pow(-2 * t2 + 2, 2) / 2;
                let px = d.fromX + (d.toX - d.fromX) * ease;
                let py = d.fromY + (d.toY - d.fromY) * ease;

                // Curve
                const ddx = d.toX - d.fromX, ddy = d.toY - d.fromY;
                const len = Math.sqrt(ddx * ddx + ddy * ddy) || 1;
                const nx = -ddy / len, ny = ddx / len;
                const curveOff = Math.sin(t2 * Math.PI) * d.curve;
                px += nx * curveOff; py += ny * curveOff;

                const fa = d.alpha * (t2 < 0.08 ? t2 / 0.08 : t2 > 0.85 ? (1 - t2) / 0.15 : 1);
                const col = d.green ? C.green : C.gold2;
                const glow = d.green ? C.gA + '0.2)' : C.gldA + '0.2)';

                ctx.save(); ctx.globalAlpha = fa;
                ctx.font = `bold ${Math.round(d.size)}px system-ui,-apple-system,sans-serif`;
                ctx.fillStyle = col;
                ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
                ctx.shadowColor = glow; ctx.shadowBlur = 6;
                ctx.fillText('$', px, py);
                ctx.shadowBlur = 0; ctx.restore();
            }
        };

        // Woodfrog + Shield
        const drawWoodfrog = () => {
            if (s.wOp < 0.005) return;
            const coreR = Math.min(28, W * 0.048);

            ctx.save();
            ctx.translate(s.wPx, s.wPy);
            ctx.scale(s.wSc, s.wSc);
            ctx.globalAlpha = s.wOp;

            // Shield
            if (s.sOp > 0.01) {
                const sr = coreR * 2.8 * s.sSc;
                const pulse = Math.sin(s.t * 2.2) * 3;

                [3, 2, 1].forEach(n => {
                    ctx.beginPath();
                    ctx.arc(0, 0, sr + pulse + n * 10, 0, Math.PI * 2);
                    ctx.fillStyle = C.gA + (s.sOp * 0.015 / n) + ')';
                    ctx.fill();
                });

                ctx.beginPath();
                ctx.arc(0, 0, sr + pulse, 0, Math.PI * 2);
                ctx.strokeStyle = C.gA + (s.sOp * 0.3) + ')';
                ctx.lineWidth = 1.5; ctx.setLineDash([5, 5]); ctx.stroke(); ctx.setLineDash([]);

                for (let d = 0; d < 8; d++) {
                    const a = (Math.PI * 2 / 8) * d + s.t * 0.7;
                    ctx.beginPath();
                    ctx.arc(Math.cos(a) * (sr + pulse), Math.sin(a) * (sr + pulse), 2, 0, Math.PI * 2);
                    ctx.fillStyle = C.gA + (s.sOp * 0.4) + ')';
                    ctx.fill();
                }
            }

            // Energy lines (victory)
            if (s.eOp > 0.01) {
                for (let i = 0; i < 10; i++) {
                    const a = (Math.PI * 2 / 10) * i + s.t * 0.35;
                    const inner = coreR + 4;
                    const outer = inner + 25 + Math.sin(s.t * 2 + i) * 8;
                    const x1 = Math.cos(a) * inner, y1 = Math.sin(a) * inner;
                    const x2 = Math.cos(a) * outer, y2 = Math.sin(a) * outer;
                    const lg = ctx.createLinearGradient(x1, y1, x2, y2);
                    lg.addColorStop(0, C.gA + (0.3 * s.eOp) + ')');
                    lg.addColorStop(1, C.gA + '0)');
                    ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2);
                    ctx.strokeStyle = lg; ctx.lineWidth = 1.5; ctx.stroke();
                }
            }

            // Core glow
            const cg = ctx.createRadialGradient(0, 0, coreR * 0.4, 0, 0, coreR * 1.5);
            cg.addColorStop(0, C.gA + '0.08)');
            cg.addColorStop(1, C.gA + '0)');
            ctx.fillStyle = cg; ctx.fillRect(-coreR * 2, -coreR * 2, coreR * 4, coreR * 4);

            // White core
            ctx.beginPath(); ctx.arc(0, 0, coreR, 0, Math.PI * 2);
            ctx.fillStyle = '#fff';
            ctx.shadowColor = C.gA + '0.18)'; ctx.shadowBlur = 16;
            ctx.fill(); ctx.shadowBlur = 0;

            // Green ring
            ctx.beginPath(); ctx.arc(0, 0, coreR, 0, Math.PI * 2);
            ctx.strokeStyle = C.green; ctx.lineWidth = 2.5; ctx.stroke();

            // Logo
            if (logoRef.current) {
                const lsz = coreR * 1.2;
                ctx.drawImage(logoRef.current, -lsz / 2, -lsz / 2, lsz, lsz);
            } else {
                ctx.font = `bold ${Math.round(coreR * 0.5)}px system-ui`;
                ctx.fillStyle = C.green; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
                ctx.fillText('WF', 0, 0);
            }

            // Labels
            const fs1 = Math.round(Math.min(10, W * 0.017));
            ctx.font = `bold ${fs1}px system-ui,-apple-system,sans-serif`;
            ctx.fillStyle = C.navy; ctx.textAlign = 'center';
            ctx.fillText('Apache Superset', 0, coreR + 14);
            ctx.font = `${Math.round(fs1 * 0.75)}px system-ui,-apple-system,sans-serif`;
            ctx.fillStyle = C.green2;
            ctx.fillText('Tailored by Woodfrog', 0, coreR + 25);

            ctx.globalAlpha = 1; ctx.restore();
        };

        // Victory text + advantages
        const ADVANTAGES = ['$0 Licenses', 'Unlimited Users', 'Open Source', 'No Lock-In'];
        const ADV_ICONS = ['💰', '👥', '🔓', '🚀'];

        const drawVictory = () => {
            if (s.msgOp < 0.005) return;
            const mx = W * 0.06;
            const my = H * 0.28;
            const fs = Math.min(14, W * 0.026);
            const fsSmall = Math.round(fs * 0.72);

            ctx.save(); ctx.globalAlpha = s.msgOp;

            // Main tagline
            ctx.font = `600 ${Math.round(fs)}px system-ui,-apple-system,sans-serif`;
            ctx.fillStyle = C.navy;
            ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
            ctx.fillText('We help organizations move to', mx, my);

            ctx.font = `bold ${Math.round(fs)}px system-ui,-apple-system,sans-serif`;
            ctx.fillStyle = C.green;
            ctx.fillText('Apache Superset', mx, my + fs * 1.5);

            ctx.font = `600 ${Math.round(fs)}px system-ui,-apple-system,sans-serif`;
            ctx.fillStyle = C.navy;
            ctx.fillText('& save thousands on license costs.', mx, my + fs * 3.0);

            // Green accent bar
            ctx.fillStyle = C.green;
            rrect(mx, my + fs * 3.0 + fs * 0.85, Math.min(50, W * 0.08), 2, 1);
            ctx.fill();

            // ── Four advantages, one by one ──
            const advStartY = my + fs * 3.0 + fs * 2.2;
            const advGap = Math.min(28, H * 0.06);

            ADVANTAGES.forEach((adv, i) => {
                const aOp = s.advOp[i];
                if (aOp < 0.01) return;

                ctx.save();
                ctx.globalAlpha = s.msgOp * aOp;

                const ay = advStartY + i * advGap;

                // Slide-in offset
                const slideX = (1 - aOp) * 15;

                // Icon
                ctx.font = `${fsSmall}px system-ui`;
                ctx.fillText(ADV_ICONS[i], mx + slideX, ay);

                // Green check dot
                ctx.beginPath();
                ctx.arc(mx + slideX + fsSmall + 8, ay, 3.5, 0, Math.PI * 2);
                ctx.fillStyle = C.green;
                ctx.fill();
                ctx.fillStyle = '#fff';
                ctx.font = `bold 5px system-ui`;
                ctx.textAlign = 'center';
                ctx.fillText('✓', mx + slideX + fsSmall + 8, ay + 0.5);

                // Text
                ctx.textAlign = 'left';
                ctx.font = `600 ${fsSmall}px system-ui,-apple-system,sans-serif`;
                ctx.fillStyle = C.navy;
                ctx.fillText(adv, mx + slideX + fsSmall + 18, ay);

                ctx.restore();
            });

            ctx.globalAlpha = 1; ctx.restore();
        };

        // Fade
        const drawFade = () => {
            if (s.fade > 0.005) {
                ctx.fillStyle = `rgba(255,255,255,${s.fade})`;
                ctx.fillRect(0, 0, W, H);
            }
        };

        const resize = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2);
            const r = wrap.getBoundingClientRect();
            const newW = r.width;
            const newH = r.height;
            if (newW === 0 || newH === 0) return;

            // Update dims if changed
            if (Math.abs(newW - W) > 2 || Math.abs(newH - H) > 2) {
                W = newW; H = newH;
                canvas.width = W * dpr; canvas.height = H * dpr;
                canvas.style.width = W + 'px'; canvas.style.height = H + 'px';
                ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
                buildTL();
            }
        };
        resize();
        window.addEventListener('resize', resize);
        // Initial build
        buildTL();

        // ════════════════════════════════════════════════
        //  RENDER LOOP
        // ════════════════════════════════════════════════
        let last = performance.now();
        const render = (now: number) => {
            frameId.current = requestAnimationFrame(render);
            if (!isVisible.current || W === 0 || H === 0) return;

            const dt = Math.min((now - last) / 1000, 0.05);
            last = now; s.t += dt;

            ctx.clearRect(0, 0, W, H);
            drawBg();
            TOOLS.forEach((_, i) => drawCard(i));
            drawVortex();
            tickDollars(dt);
            drawWoodfrog();
            drawVictory();
            drawFade();
        };
        frameId.current = requestAnimationFrame(render);

        return () => {
            cancelAnimationFrame(frameId.current);
            ctxGsap.revert();
            window.removeEventListener('resize', resize);
        };
    }, [isActive]);

    return (
        <div ref={wrapRef} className="relative w-full h-full overflow-hidden bg-white">
            <canvas ref={canvasRef} className="absolute inset-0" style={{ display: 'block' }} />
        </div>
    );
};
