'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

/* ═══════════════════════════════════════════════════════════════════
   CUSTOM ANALYTICS HERO ANIMATION - "The Data Pipeline"
   ─────────────────────────────────────────────────────────────────
   Canvas + GSAP. 
   
   Story:
   1. INGESTION: Sources (Preset, Superset, SQL) slide in on left.
   2. STREAM: Particles flow from sources to the synthesis core.
   3. SYNTHESIS: Woodfrog core pulses as it consumes data.
   4. INSIGHT: Transition into the multidimensional 3D prism.
   ═══════════════════════════════════════════════════════════════════ */

const C = {
    green: '#10B981',
    green2: '#059669',
    gA: 'rgba(16,185,129,',
    navy: '#0f172a',
    slate: '#64748b',
    slateL: '#94a3b8',
    white: '#ffffff',
    bg: '#ffffff',
    bdr: 'rgba(0,0,0,0.06)',
    preset: '#4285F4',
    superset: '#009845',
    sql: '#64748b'
};

const SOURCES = [
    { id: 'superset', label: 'Apache Superset', icon: 'S', color: '#10B981', dy: -0.22 },
    { id: 'preset', label: 'Preset.io', icon: 'P', color: '#4285F4', dy: 0 },
    { id: 'sql', label: 'SQL / Raw Data', icon: 'D', color: '#64748b', dy: 0.22 },
];

interface Particle {
    x: number; y: number;
    targetX: number; targetY: number;
    srcIdx: number;
    prog: number; speed: number;
    size: number; alpha: number;
}

export const CustomAnalyticsHeroAnimation: React.FC<{ isActive?: boolean }> = ({ isActive = true }) => {
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

        const logo = new Image();
        logo.src = '/logos/woodfrog-logo2.svg';
        logo.onload = () => { logoRef.current = logo; };

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

        const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

        const cx = () => W * 0.5;
        const cy = () => H * 0.5;

        // ════════════════════════════════════════════════
        //  STATE
        // ════════════════════════════════════════════════
        const s = {
            t: 0,
            // Scene 1: Source Ingestion
            srcOp: [0, 0, 0],
            srcX: [-40, -40, -40],
            srcSc: [0.8, 0.8, 0.8],
            streamActive: 0,

            // Scene 2: Core Ignition / Synthesis
            coreOp: 0,
            coreY: 0,
            coreScale: 1,
            corePulse: 0,

            // Scene 3: Transition/Shatter
            shatterProg: 0,

            // Scene 4: Prism
            prismOp: 0,
            prismRotateX: 0,
            prismRotateY: 0,
            prismScale: 0.8,
            nodeOp: 0,
            lineProg: 0,
            layoutX: 0, // Sliding layout

            // Conclusion
            conclusionOp: 0,
            benefits: [0, 0, 0, 0],
            fade: 0,
        };

        const particles: Particle[] = [];
        const shardCount = 12;
        const shards = Array.from({ length: shardCount }).map(() => ({
            x: 0, y: 0, vx: 0, vy: 0, vr: 0, r: 0, size: 0
        }));

        const resetAll = () => {
            s.t = 0;
            s.srcOp.fill(0); s.srcX.fill(-40); s.srcSc.fill(0.8);
            s.streamActive = 0;
            s.coreOp = 0; s.coreY = 0; s.coreScale = 1; s.corePulse = 0;
            s.shatterProg = 0;
            s.prismOp = 0; s.prismRotateX = 0; s.prismRotateY = 0; s.prismScale = 0.8;
            s.nodeOp = 0; s.lineProg = 0; s.layoutX = 0;
            s.conclusionOp = 0;
            s.benefits.fill(0);
            s.fade = 0;
            particles.length = 0;

            shards.forEach(sh => {
                sh.x = 0; sh.y = 0;
                sh.vx = (Math.random() - 0.5) * 25; // More speed
                sh.vy = (Math.random() - 0.5) * 25 - 8;
                sh.vr = (Math.random() - 0.5) * 0.4;
                sh.r = 0;
                sh.size = 25 + Math.random() * 40; // Larger shards
            });
        };

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

                // ── Scene 1 & 2: Pipeline Ingestion ──
                SOURCES.forEach((_, i) => {
                    tl.to(s.srcOp, { [i]: 1, duration: 0.5 }, 0.5 + i * 0.15);
                    tl.to(s.srcX, { [i]: 0, duration: 0.8, ease: 'power2.out' }, 0.5 + i * 0.15);
                    tl.to(s.srcSc, { [i]: 1, duration: 0.6, ease: 'back.out' }, 0.5 + i * 0.15);
                });

                tl.to(s, { coreOp: 1, duration: 0.8 }, 1.0);
                tl.to(s, { streamActive: 1, duration: 0.1 }, 1.5);

                // ── Scene 3: Synthesis Bloom ──
                tl.to(s, { corePulse: 1, duration: 1.0, repeat: 3, yoyo: true, ease: 'sine.inOut' }, 1.2);

                // Transition to Prism after synthesis
                tl.to(s, { streamActive: 0, duration: 0.4 }, 5.5);
                tl.to(s.srcOp, { 0: 0, 1: 0, 2: 0, duration: 0.6 }, 5.8);

                // Anticipation: Squeeze Core
                tl.to(s, { coreScale: 0.8, duration: 0.15, ease: 'power2.in' }, 6.15);

                // BIG BURST (Keep Core Op for Prism)
                tl.to(s, { shatterProg: 1, coreScale: 1.8, coreOp: 0.1, duration: 0.6, ease: 'expo.out' }, 6.3);
                tl.to(s, { coreOp: 1, coreScale: 0.9, duration: 0.8, ease: 'back.out' }, 6.8);

                // ── Scene 4: Prism & Layout Shift ──
                const endX = isMobile ? W * 0.18 : W * 0.22;
                tl.to(s, { prismOp: 1, prismScale: 1, layoutX: endX, duration: 1.5, ease: 'power3.inOut' }, 6.8);
                tl.to(s, { nodeOp: 1, duration: 0.8, stagger: 0.1 }, 6.8);
                tl.to(s, { lineProg: 1, duration: 2.0, ease: 'power2.inOut' }, 7.2);
                tl.to(s, { prismRotateY: Math.PI, duration: 7, ease: 'none' }, 6.5);

                // ── Conclusion ──
                tl.to(s, { conclusionOp: 1, duration: 1.0 }, 8.5);
                s.benefits.forEach((_, i) => {
                    tl.to(s.benefits, { [i]: 1, duration: 0.6, ease: 'power2.out' }, 9.0 + i * 0.4);
                });

                // Hold and Fade back to Start (Loop exactly at 14s)
                tl.to({}, { duration: 1.5 }, 11.0);
                tl.to(s, { fade: 1, duration: 0.8, ease: 'power1.inOut' }, 12.5);
                tl.to({}, { duration: 0.7 }, 13.3);

                tlRef.current = tl;
                if (!isVisible.current) tl.pause();
            }, wrap);
        };

        const rrect = (x: number, y: number, w: number, h: number, r: number) => {
            ctx.beginPath();
            ctx.moveTo(x + r, y);
            ctx.arcTo(x + w, y, x + w, y + h, r);
            ctx.arcTo(x + w, y + h, x, y + h, r);
            ctx.arcTo(x, y + h, x, y, r);
            ctx.arcTo(x, y, x + w, y, r);
            ctx.closePath();
        };

        const drawSources = () => {
            SOURCES.forEach((src, i) => {
                const op = s.srcOp[i];
                if (op < 0.01) return;
                const sc = s.srcSc[i] * (isMobile ? 0.75 : 1);
                const xOff = isMobile ? W * 0.32 : W * 0.35;
                const x = cx() - xOff + s.srcX[i];
                const y = cy() + src.dy * H * (isMobile ? 1.2 : 1);

                ctx.save();
                ctx.translate(x, y);
                ctx.scale(sc, sc);
                ctx.globalAlpha = op;

                const w = 140, h = 44, r = 8;
                ctx.fillStyle = C.white;
                ctx.shadowColor = 'rgba(0,0,0,0.04)'; ctx.shadowBlur = 10;
                rrect(-w / 2, -h / 2, w, h, r); ctx.fill();
                ctx.shadowBlur = 0;
                ctx.strokeStyle = C.bdr; ctx.stroke();

                // Icon
                ctx.beginPath(); ctx.arc(-w / 2 + 22, 0, 12, 0, Math.PI * 2);
                ctx.fillStyle = src.color; ctx.fill();
                ctx.fillStyle = '#fff'; ctx.font = 'bold 12px system-ui';
                ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
                ctx.fillText(src.icon, -w / 2 + 22, 0.5);

                // Label
                ctx.textAlign = 'left';
                ctx.font = '600 12px system-ui';
                ctx.fillStyle = C.navy;
                ctx.fillText(src.label, -w / 2 + 42, 0.5);

                ctx.restore();
            });
        };

        const tickParticles = (dt: number) => {
            if (s.streamActive > 0.5) {
                // Spawn
                if (Math.random() > (isMobile ? 0.8 : 0.4)) {
                    const srcIdx = Math.floor(Math.random() * SOURCES.length);
                    const src = SOURCES[srcIdx];
                    if (s.srcOp[srcIdx] > 0.8) {
                        const xOff = isMobile ? W * 0.38 : W * 0.35;
                        particles.push({
                            x: cx() - xOff,
                            y: cy() + src.dy * H * (isMobile ? 1.2 : 1),
                            targetX: cx(), targetY: cy(),
                            srcIdx,
                            prog: 0, speed: 0.4 + Math.random() * 0.4,
                            size: (2 + Math.random() * 3) * (isMobile ? 0.7 : 1), alpha: 0.6 + Math.random() * 0.4
                        });
                    }
                }
            }

            for (let i = particles.length - 1; i >= 0; i--) {
                const p = particles[i];
                p.prog += p.speed * dt * 1.5; // Slightly faster for snap
                if (p.prog >= 1) { particles.splice(i, 1); continue; }

                const t2 = p.prog;
                // Power easing for speed-up at core
                const ease = Math.pow(t2, 2.5);
                const px = p.x + (p.targetX - p.x) * ease;
                const py = p.y + (p.targetY - p.y) * ease;

                // Curved path
                const dy = p.targetY - p.y;
                const curve = Math.sin(t2 * Math.PI) * (dy * 0.2);

                const fa = p.alpha * (t2 < 0.1 ? t2 / 0.1 : t2 > 0.8 ? (1 - t2) / 0.2 : 1);
                ctx.fillStyle = SOURCES[p.srcIdx].color;
                ctx.globalAlpha = fa * s.srcOp[p.srcIdx];
                ctx.beginPath();
                ctx.arc(px, py + curve, p.size, 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.globalAlpha = 1;
        };

        const drawShatter = () => {
            if (s.shatterProg < 0.01 || s.shatterProg > 0.99) return;
            const p = s.shatterProg;

            // Optional Core Flash
            if (p < 0.4) {
                const flashR = W * 0.4 * p;
                const g = ctx.createRadialGradient(cx(), cy(), 0, cx(), cy(), flashR);
                g.addColorStop(0, `rgba(255, 255, 255, ${0.8 * (1 - p / 0.4)})`);
                g.addColorStop(1, 'rgba(255, 255, 255, 0)');
                ctx.fillStyle = g;
                ctx.fillRect(0, 0, W, H);
            }

            shards.forEach((sh, i) => {
                const sx = sh.vx * p * 20;
                const sy = sh.vy * p * 20;
                const sr = sh.vr * p * 100;

                ctx.save();
                ctx.translate(cx() + sx, cy() + sy);
                ctx.rotate(sr);
                ctx.globalAlpha = (1 - p) * 0.8;

                // Shard glow
                ctx.shadowBlur = 10; ctx.shadowColor = C.gA + '0.5)';

                ctx.fillStyle = i % 2 === 0 ? C.white : C.gA + '0.4)';
                ctx.beginPath();
                ctx.moveTo(-sh.size / 2, -sh.size / 2);
                ctx.lineTo(sh.size / 2, -sh.size / 2);
                ctx.lineTo(sh.size / 2 * 0.3, sh.size / 2);
                ctx.closePath();
                ctx.fill();
                ctx.restore();
            });
        };

        const drawCore = () => {
            if (s.coreOp < 0.01) return;
            ctx.save();
            ctx.translate(cx() + s.layoutX, cy() + s.coreY);
            const pulseScale = 1 + s.corePulse * 0.12;
            const mobileScl = isMobile ? 0.8 : 1;
            ctx.scale(s.coreScale * pulseScale * mobileScl, s.coreScale * pulseScale * mobileScl);
            ctx.globalAlpha = s.coreOp;

            const coreR = 28;

            // Core glow
            const cg = ctx.createRadialGradient(0, 0, coreR * 0.4, 0, 0, coreR * (1.5 + s.corePulse * 0.5));
            cg.addColorStop(0, C.gA + (0.08 + s.corePulse * 0.12) + ')');
            cg.addColorStop(1, C.gA + '0)');
            ctx.fillStyle = cg; ctx.fillRect(-coreR * 3, -coreR * 3, coreR * 6, coreR * 6);

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
            if (!isMobile) {
                const fs1 = Math.round(Math.min(10, W * 0.017));
                ctx.font = `bold ${fs1 + 1}px system-ui,-apple-system,sans-serif`;
                ctx.fillStyle = C.navy; ctx.textAlign = 'center';
                ctx.fillText('Custom Dashboards', 0, coreR + 14);
                ctx.font = `${Math.round(fs1 * 0.75) + 1}px system-ui,-apple-system,sans-serif`;
                ctx.fillStyle = C.green2;
                ctx.fillText('Tailored by Woodfrog', 0, coreR + 25);
            }

            ctx.restore();
        };

        const drawPrism = () => {
            if (s.prismOp < 0.01) return;
            const r = (isMobile ? 65 : 120) * s.prismScale;
            const rotY = s.prismRotateY;

            // 3D Nodes projection (Perfectly balanced tetrahedron)
            const nodes = [
                { x: 0, y: -r * 1.1, z: 0 }, // Top
                { x: r, y: r * 0.7, z: 0 }, // Base 1 (0 deg)
                { x: -r * 0.5, y: r * 0.7, z: r * 0.866 }, // Base 2 (120 deg)
                { x: -r * 0.5, y: r * 0.7, z: -r * 0.866 }, // Base 3 (240 deg)
            ];

            const projected = nodes.map(n => {
                // Rotate Y
                const x1 = n.x * Math.cos(rotY) + n.z * Math.sin(rotY);
                const z1 = n.z * Math.cos(rotY) - n.x * Math.sin(rotY);
                // Simple perspective
                const p = 400;
                const scl = p / (p + z1);
                return { x: cx() + s.layoutX + x1 * scl, y: cy() + n.y * scl, z: z1, scl };
            });

            ctx.save();
            ctx.globalAlpha = s.prismOp;

            // Lines
            if (s.lineProg > 0.01) {
                ctx.lineWidth = 1;
                for (let i = 0; i < projected.length; i++) {
                    for (let j = i + 1; j < projected.length; j++) {
                        const n1 = projected[i], n2 = projected[j];
                        const lg = ctx.createLinearGradient(n1.x, n1.y, n2.x, n2.y);
                        lg.addColorStop(0, C.gA + (0.4 * s.prismOp) + ')');
                        lg.addColorStop(1, C.gA + '0)');
                        ctx.strokeStyle = lg;
                        ctx.beginPath();
                        ctx.moveTo(n1.x, n1.y);
                        ctx.lineTo(n1.x + (n2.x - n1.x) * s.lineProg, n1.y + (n2.y - n1.y) * s.lineProg);
                        ctx.stroke();
                    }
                }
            }

            // Nodes
            projected.forEach(n => {
                ctx.beginPath();
                ctx.arc(n.x, n.y, 4 * n.scl, 0, Math.PI * 2);
                ctx.fillStyle = C.green;
                ctx.fill();
                // Glow
                ctx.beginPath();
                ctx.arc(n.x, n.y, 10 * n.scl, 0, Math.PI * 2);
                ctx.fillStyle = C.gA + (0.2 * s.nodeOp) + ')';
                ctx.fill();
            });

            // --- LOGO AT HEART ---
            ctx.save();
            ctx.translate(cx() + s.layoutX, cy());
            ctx.scale(s.coreScale * 0.95, s.coreScale * 0.95);
            ctx.globalAlpha = s.prismOp * s.coreOp;

            const coreR = 24;
            // Subtle core glow inside prism
            const cg = ctx.createRadialGradient(0, 0, 0, 0, 0, coreR * 1.5);
            cg.addColorStop(0, C.gA + '0.15)');
            cg.addColorStop(1, C.gA + '0)');
            ctx.fillStyle = cg; ctx.beginPath(); ctx.arc(0, 0, coreR * 1.5, 0, Math.PI * 2); ctx.fill();

            if (logoRef.current) {
                const lsz = coreR * 1.2;
                ctx.drawImage(logoRef.current, -lsz / 2, -lsz / 2, lsz, lsz);
            }
            ctx.restore();

            ctx.restore();
        };

        const BENEFITS = [
            'Connect Any Data Source',
            'Automated Data Synthesis',
            'Tailored for Every User',
            'Instant AI Insights'
        ];

        const drawConclusion = () => {
            if (s.conclusionOp < 0.01) return;
            const mx = isMobile ? 12 : W * 0.08;
            const my = isMobile ? 40 : H * 0.25;
            ctx.save();
            ctx.globalAlpha = s.conclusionOp;

            const titleSize = isMobile ? 18 : 24;
            ctx.font = `bold ${titleSize}px system-ui`;
            ctx.fillStyle = C.navy;
            ctx.fillText('The Architecture of Insight', mx, my);

            ctx.font = `${isMobile ? 12 : 14}px system-ui`;
            ctx.fillStyle = C.slate;
            ctx.fillText('Breaking the boundaries of static data.', mx, my + (isMobile ? 22 : 30));

            BENEFITS.forEach((b, i) => {
                const bOp = s.benefits[i];
                if (bOp < 0.01) return;
                ctx.globalAlpha = bOp * s.conclusionOp;
                const ay = my + (isMobile ? 50 : 70) + i * (isMobile ? 28 : 35);

                // Icon
                ctx.fillStyle = C.green;
                ctx.beginPath(); ctx.arc(mx + (isMobile ? 6 : 10), ay, isMobile ? 3 : 4, 0, Math.PI * 2); ctx.fill();

                // Text
                ctx.font = `600 ${isMobile ? 13 : 15}px system-ui`;
                ctx.fillStyle = C.navy;
                ctx.fillText(b, mx + (isMobile ? 18 : 25), ay + 5);
            });

            ctx.restore();
        };

        const drawFade = () => {
            if (s.fade < 0.01) return;
            ctx.fillStyle = `rgba(255, 255, 255, ${s.fade})`;
            ctx.fillRect(0, 0, W, H);
        };

        let lastW = 0;
        const resize = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            const r = wrap.getBoundingClientRect();
            const newW = r.width;
            const newH = r.height;
            
            W = newW; H = newH;
            canvas.width = W * dpr; canvas.height = H * dpr;
            canvas.style.width = W + 'px'; canvas.style.height = H + 'px';
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

            // Only rebuild timeline if width changed (avoid mobile address bar loop)
            if (Math.abs(newW - lastW) > 2) {
                lastW = newW;
                buildTL();
            }
        };

        resize();
        window.addEventListener('resize', resize);

        let last = performance.now();
        const render = (now: number) => {
            frameId.current = requestAnimationFrame(render);
            if (!isVisible.current || W === 0 || H === 0) return;
            const dt = Math.min((now - last) / 1000, 0.05);
            last = now; s.t += dt;

            ctx.clearRect(0, 0, W, H);

            // Draw backgrounds (optional dot grid)
            ctx.fillStyle = 'rgba(0,0,0,0.02)';
            for (let i = 20; i < W; i += 40) {
                for (let j = 20; j < H; j += 40) {
                    ctx.beginPath(); ctx.arc(i, j, 0.5, 0, Math.PI * 2); ctx.fill();
                }
            }

            drawSources();
            tickParticles(dt);
            drawShatter();
            drawPrism();
            drawCore();
            drawConclusion();
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
