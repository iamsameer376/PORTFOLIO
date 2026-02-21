import { useEffect, useRef } from "react";

// Professional subtle 3D background — slower, fewer, dimmer particles
const Scene3D = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animId: number;
        let W = window.innerWidth;
        let H = window.innerHeight;

        canvas.width = W;
        canvas.height = H;

        const isMobile = W < 768;

        // ─── Stars — fewer, much slower, dimmer ─────────────────────────────────
        const STAR_COUNT = isMobile ? 250 : 700;

        type Star = { x: number; y: number; z: number; r: number; opacity: number };

        const stars: Star[] = Array.from({ length: STAR_COUNT }, () => ({
            x: (Math.random() - 0.5) * 2000,
            y: (Math.random() - 0.5) * 2000,
            z: Math.random() * 2000,
            r: Math.random() * 1.2 + 0.2,
            opacity: Math.random() * 0.5 + 0.2,
        }));

        // ─── Floating Shapes — fewer, much more transparent ─────────────────────
        type Shape = {
            x: number; y: number;
            ry: number; dRy: number;
            size: number; color: string;
            floatOffset: number;
        };

        const SHAPE_COLORS = [
            "rgba(56,189,248,0.18)",   // cyan — very subtle
            "rgba(168,85,247,0.14)",   // purple — very subtle
            "rgba(6,182,212,0.14)",    // teal — very subtle
        ];

        const SHAPES: Shape[] = isMobile ? [] : Array.from({ length: 3 }, (_, i) => ({
            x: [0.15, 0.85, 0.5][i] * W,
            y: [0.22, 0.65, 0.12][i] * H,
            ry: 0,
            dRy: 0.003 + Math.random() * 0.003,    // very slow rotation
            size: 55 + Math.random() * 30,
            color: SHAPE_COLORS[i],
            floatOffset: Math.random() * Math.PI * 2,
        }));

        // ─── Input handling (Mouse + Gyroscope) ────────────────────────────────
        let mouseX = 0;
        let mouseY = 0;
        let targetMouseX = 0;
        let targetMouseY = 0;

        const onMouse = (e: MouseEvent) => {
            targetMouseX = (e.clientX / W - 0.5) * 2;
            targetMouseY = (e.clientY / H - 0.5) * 2;
        };

        const onDeviceOrientation = (event: DeviceOrientationEvent) => {
            if (event.gamma === null || event.beta === null) return;
            // event.gamma is left-to-right tilt in degrees, where right is positive (-90 to 90)
            // event.beta is front-to-back tilt in degrees, where front is positive (-180 to 180)

            // Normalize clamp to [-1, 1] range for smooth parallax
            let x = event.gamma / 45; // max tilt 45deg
            let y = (event.beta - 45) / 45; // assume holding phone at 45deg angle naturally

            x = Math.max(-1, Math.min(1, x));
            y = Math.max(-1, Math.min(1, y));

            targetMouseX = x;
            targetMouseY = y;
        };

        const requestGyroPermission = () => {
            // @ts-expect-error - DeviceOrientationEvent.requestPermission is non-standard iOS 13+
            if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
                // @ts-expect-error
                DeviceOrientationEvent.requestPermission()
                    .then((permissionState: string) => {
                        if (permissionState === 'granted') {
                            window.addEventListener('deviceorientation', onDeviceOrientation);
                        }
                    })
                    .catch(console.error);
            } else {
                // Non-iOS 13+ devices
                window.addEventListener('deviceorientation', onDeviceOrientation);
            }
        };

        // Try binding gyro immediately for Android, wait for click for iOS 13+
        requestGyroPermission();
        // Fallback for iOS: first touch anywhere will try to request permission
        window.addEventListener('touchstart', requestGyroPermission, { once: true });

        window.addEventListener("mousemove", onMouse);
        const onResize = () => {
            W = window.innerWidth;
            H = window.innerHeight;
            canvas.width = W;
            canvas.height = H;
        };
        window.addEventListener("resize", onResize);

        // ─── Draw helper — subtle wireframe polygon ──────────────────────────────
        function drawWire(gx: number, gy: number, size: number, ry: number, color: string) {
            const n = 5;
            const pts: [number, number][] = [];
            for (let i = 0; i < n; i++) {
                const a = (i / n) * Math.PI * 2 + ry;
                pts.push([gx + Math.cos(a) * size, gy + Math.sin(a) * size * 0.65]);
            }
            const top: [number, number] = [gx, gy - size * 0.72];
            const bot: [number, number] = [gx, gy + size * 0.6];

            ctx.strokeStyle = color;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            pts.forEach((p, i) => {
                const next = pts[(i + 1) % n];
                ctx.moveTo(p[0], p[1]);
                ctx.lineTo(next[0], next[1]);
                ctx.moveTo(p[0], p[1]);
                ctx.lineTo(top[0], top[1]);
                ctx.moveTo(p[0], p[1]);
                ctx.lineTo(bot[0], bot[1]);
            });
            ctx.stroke();
        }

        // ─── Render loop ─────────────────────────────────────────────────────────
        let t = 0;

        const render = () => {
            t += 0.004;   // much slower overall tick
            ctx.clearRect(0, 0, W, H);

            const focalLen = 500;
            // Smooth lerp mouse/gyro coordinates
            mouseX += (targetMouseX - mouseX) * 0.05;
            mouseY += (targetMouseY - mouseY) * 0.05;

            // Very gentle parallax — barely perceptible
            const baseOfsX = mouseX * 8; // Slightly increased for mobile gyro feel
            const baseOfsY = mouseY * 6;

            // Stars — drift very slowly
            for (const star of stars) {
                star.z -= 0.35;    // was 1.5 — now 4× slower
                if (star.z <= 0) {
                    star.z = 2000;
                    star.x = (Math.random() - 0.5) * 2000;
                    star.y = (Math.random() - 0.5) * 2000;
                }
                const scale = focalLen / star.z;
                const sx = star.x * scale + W / 2 + baseOfsX;
                const sy = star.y * scale + H / 2 + baseOfsY;
                const radius = Math.max(0.2, star.r * scale * 0.7);
                const depthAlpha = (1 - star.z / 2000);
                const alpha = Math.min(0.6, depthAlpha * star.opacity);

                // Uniform white-ish color — no strong hue
                ctx.beginPath();
                ctx.arc(sx, sy, radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(200, 220, 240, ${alpha})`;
                ctx.fill();
            }

            // Floating wireframe shapes — very subtle, slow
            if (!isMobile) {
                for (const s of SHAPES) {
                    s.ry += s.dRy;
                    const floatY = Math.sin(t + s.floatOffset) * 10;   // less float amplitude
                    ctx.globalAlpha = 1;
                    drawWire(s.x + baseOfsX * 0.3, s.y + floatY + baseOfsY * 0.3, s.size, s.ry, s.color);
                }
            }

            animId = requestAnimationFrame(render);
        };

        render();

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener("mousemove", onMouse);
            window.removeEventListener("resize", onResize);
            window.removeEventListener("deviceorientation", onDeviceOrientation);
            window.removeEventListener("touchstart", requestGyroPermission);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-0 pointer-events-none"
            style={{ opacity: 0.65 }}
        />
    );
};

export default Scene3D;
