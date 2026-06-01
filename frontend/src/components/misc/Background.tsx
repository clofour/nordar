import { Box } from "@mantine/core";
import { useEffect, useRef } from "react";

type Star = {
    x: number;
    y: number;
    radius: number;
    hue: number;
    saturation: number;
    lightness: number;
    alpha: number;
}

export default function Background() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const width = canvas.width = window.innerWidth;
        const height = canvas.height = window.innerHeight;

        let stars: Star[] = [];
        const starCount = (width * height) / 1000;
        for (let i = 0; i < starCount; i++) {
            stars.push({
                x: Math.random() * height,
                y: Math.random() * width,
                radius: Math.random() * 1.5,
                hue: 190 + Math.random() * 80,
                saturation: 10 + Math.random() * 30,
                lightness: Math.random(),
                alpha: Math.random()
            })
        }

        function draw() {
            if (!canvas || !ctx) return;

            ctx.clearRect(0, 0, width, height);

            for (const star of stars) {
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
                ctx.fillStyle = `hsla(${star.hue}, ${star.saturation}, ${star.lightness}, ${star.alpha})`;
                ctx.fill();
            }

            requestAnimationFrame(draw);
        }

        draw();
    }, [])

    return (
        <Box w="100%" h="100%" pos="fixed" top={0} left={0} style={{ zIndex: -1 }}>
            <canvas
                ref={canvasRef}
            />
        </Box>
    );
}
