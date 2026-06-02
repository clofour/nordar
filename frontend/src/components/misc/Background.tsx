import { Box, useComputedColorScheme } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { useEffect, useRef } from "react";
import classes from "@/components/misc/Background.module.css";

type Star = {
    x: number;
    y: number;
    radius: number;
    hue: number;
    saturation: number;
    brightness: number;
    twinkleSpeed: number;
    twinkleOffset : number;
}

export default function Background() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const computedColorScheme = useComputedColorScheme();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;

        let lastTime = 0;

        const alphaMultiplier = computedColorScheme == "light" ? 0.5 : 1;
        const saturationBase = computedColorScheme == "light" ? 20 : 0;
        const lightnessBase = computedColorScheme == "light" ? 35 : 70;
        const lightnessRange = computedColorScheme == "light" ? 15 : 30;

        function resize() {
            if (!canvas || !ctx) return;

            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;

        }
        resize();
        window.addEventListener("resize", resize);

        let stars: Star[] = [];
        const starCount = (width * height) / 1000;
        for (let i = 0; i < starCount; i++) {
            const hues = [
                200 + Math.random() * 60, // Blue
                20 + Math.random() * 30, // Yellow
                270 + Math.random() * 40 // Purple
            ]

            stars.push({
                x: Math.random(),
                y: Math.random(),
                radius: Math.random() * 1.5,
                hue: hues[Math.floor(Math.random() * hues.length)]!,
                saturation: saturationBase + 20 + Math.random() * 40,
                brightness: Math.random(),
                twinkleSpeed: 0.005 + Math.random() * 0.020,
                twinkleOffset: Math.random() * (Math.PI * 2)
            })
        }

        function draw(currentTime: number) {
            if (!canvas || !ctx) return;

            if (lastTime == 0) lastTime = currentTime;
            lastTime = currentTime;

            ctx.clearRect(0, 0, width, height);

            for (const star of stars) {
                const twinkle = 0.4 + 0.6 * (0.5 + 0.5 * Math.sin((currentTime / 1000) * star.twinkleSpeed * 60 + star.twinkleOffset))
                const alpha = star.brightness * twinkle * alphaMultiplier;
                const lightness = lightnessBase + star.brightness * lightnessRange;

                ctx.beginPath();
                ctx.arc(star.x * width, star.y * height, star.radius, 0, Math.PI * 2);
                ctx.fillStyle = `hsla(${star.hue}, ${star.saturation}%, ${lightness}%, ${alpha})`;
                ctx.fill();
            }

            requestAnimationFrame(draw);
        }
        requestAnimationFrame(draw);
    }, [computedColorScheme])

    return (
        <div className={classes.background!}>
            <canvas
                ref={canvasRef}
            />
            <div className={classes.vignette} />
        </div>
    );
}
