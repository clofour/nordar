import { Box } from "@mantine/core";
import { useEffect, useRef } from "react";

export default function Background() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const height = canvas.width = window.innerWidth;
        const width = canvas.height = window.innerHeight;

        let stars = [];
        for (let i = 0; i < 100; i++) {
            stars.push({
                x: Math.random() * height,
                y: Math.random() * width
            })
        }

        for (const star of stars) {
            ctx.beginPath();
            ctx.arc(star.x, star.y, 3, 0, Math.PI * 2);
            ctx.fillStyle = "blue";
            ctx.fill();
        }
    }, [])

    return (
        <Box w="100%" h="100%" pos="fixed" top={0} left={0} style={{ zIndex: -1 }}>
            <canvas
                ref={canvasRef}
            />
        </Box>
    );
}
