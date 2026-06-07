import { useComputedColorScheme } from "@mantine/core";
import { useEffect, useRef, type ReactElement } from "react";
import classes from "@/components/misc/Background.module.css";

interface BackgroundProps {
	starDensity: number;
	background?: ReactElement;
}

type Star = {
	x: number;
	y: number;
	radius: number;
	hue: number;
	saturation: number;
	brightness: number;
	twinkleSpeed: number;
	twinkleOffset: number;
	unique: boolean;
};

type ShootingStar = {
	x: number;
	y: number;
	vx: number;
	vy: number;
	length: number;
	lifetime: number;
	life: number;
};

export default function Background({ starDensity = 0.001, background }: BackgroundProps) {
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
		const starCount = width * height * starDensity;
		for (let i = 0; i < starCount; i++) {
			const hues = [
				200 + Math.random() * 60, // Blue
				20 + Math.random() * 30, // Yellow
				270 + Math.random() * 40, // Purple
			];
			const brightness = Math.random();
			const unique = brightness > 0.995;

			stars.push({
				x: Math.random(),
				y: Math.random(),
				radius: unique ? 1 + Math.random() : Math.random() * 1.5,
				hue: hues[Math.floor(Math.random() * hues.length)]!,
				saturation: saturationBase + 20 + Math.random() * 40,
				brightness: brightness,
				twinkleSpeed: 0.005 + Math.random() * 0.02,
				twinkleOffset: Math.random() * (Math.PI * 2),
				unique: unique,
			});
		}

		let shootingStars: ShootingStar[] = [];

		function draw(currentTime: number) {
			if (!canvas || !ctx) return;

			if (lastTime == 0) lastTime = currentTime;
			const deltaTime = (currentTime - lastTime) / 1000;
			lastTime = currentTime;

			ctx.clearRect(0, 0, width, height);

			for (const star of stars) {
				const x = star.x * width;
				const y = star.y * height;
				const twinkle = 0.4 + 0.6 * (0.5 + 0.5 * Math.sin((currentTime / 1000) * star.twinkleSpeed * 60 + star.twinkleOffset));
				const alpha = star.brightness * twinkle * alphaMultiplier;
				const lightness = lightnessBase + star.brightness * lightnessRange;

				ctx.beginPath();
				ctx.arc(x, y, star.radius, 0, Math.PI * 2);
				ctx.fillStyle = `hsla(${star.hue}, ${star.saturation}%, ${lightness}%, ${alpha})`;
				ctx.fill();

				if (star.unique) {
					const haloRadius = star.radius * 3;

					ctx.beginPath();
					ctx.arc(x, y, haloRadius, 0, Math.PI * 2);
					const gradient = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, haloRadius);
					gradient.addColorStop(0, `hsla(${star.hue}, ${star.saturation}%, ${50}%, ${alpha * 0.3})`);
					gradient.addColorStop(1, `transparent`);
					ctx.fillStyle = gradient;
					ctx.fill();
				}
			}

			if (Math.random() < deltaTime / 40 && shootingStars.length < 2) {
				shootingStars.push({
					x: Math.random() * 0.8 * width,
					y: Math.random() * 0.4 * height,
					vx: 220 + Math.random() * 160,
					vy: 90 + Math.random() * 60,
					length: 30 + Math.random() * 30,
					lifetime: 1 + Math.random(),
					life: 0,
				});
			}

			for (const shootingStar of shootingStars) {
				shootingStar.x += shootingStar.vx * deltaTime;
				shootingStar.y += shootingStar.vy * deltaTime;
				shootingStar.life += deltaTime;

				const endX = shootingStar.x;
				const endY = shootingStar.y;
				const startX = endX - shootingStar.length;
				const startY = endY - shootingStar.length * (shootingStar.vy / shootingStar.vx);

				ctx.beginPath();
				ctx.moveTo(endX, endY);
				ctx.lineTo(startX, startY);
				const gradient = ctx.createLinearGradient(shootingStar.x, shootingStar.y, startX, startY);
				gradient.addColorStop(0, "rgba(190, 205, 255, 0.9)");
				gradient.addColorStop(1, "rgba(190, 205, 255, 0)");
				ctx.strokeStyle = gradient;
				ctx.lineWidth = 1.6;
				ctx.globalAlpha = Math.max(0, 1 - shootingStar.life / 1.1);
				ctx.stroke();

				ctx.globalAlpha = 1;
			}

			shootingStars = shootingStars.filter((shootingStar) => shootingStar.life < shootingStar.lifetime && shootingStar.x <= width + 100);

			requestAnimationFrame(draw);
		}
		requestAnimationFrame(draw);
	}, [computedColorScheme]);

	return (
		<div className={classes.background}>
			<div className={classes.dust} />
			<canvas ref={canvasRef} />
			<div className={classes.vignette} />
			<div className={classes.grid} />
			{background ? background : <div className={classes.color} />}
		</div>
	);
}
