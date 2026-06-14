import { useComputedColorScheme, useMantineTheme } from "@mantine/core";

type IconProps = {
	size: string;
};

export default function Icon({ size }: IconProps) {
	const theme = useMantineTheme();
	const computedColorScheme = useComputedColorScheme();

	const sizeValue = size in theme.spacing ? theme.spacing[size] : size;

	return (
		<svg viewBox="0 0 53.455975 51.002312" version="1.1" width={sizeValue} height={sizeValue}>
			<defs id="defs3">
				{computedColorScheme == "light" ? (
					<linearGradient gradientTransform="rotate(25)" id="star-gradient" x1="0" y1="0" x2="1" y2="0">
						<stop offset="0%" stopColor="#5106FF" stopOpacity="1" />
						<stop offset="100%" stopColor="#61CBF2" stopOpacity="1" id="stop3" />
					</linearGradient>
				) : (
					<linearGradient gradientTransform="rotate(25)" id="star-gradient" x1="0" y1="0" x2="1" y2="0">
						<stop offset="0%" stopColor="#FFD27A" stopOpacity="1" />
						<stop offset="100%" stopColor="#FFFFFF" stopOpacity="1" id="stop3" />
					</linearGradient>
				)}
			</defs>
			<g stroke="none" fill="url(#star-gradient)" transform="matrix(0.53880417,0,0,0.53880417,-0.21070756,-1.4391541)">
				<path
					d="m 99.453,38.603 a 3.08,3.08 0 0 0 -2.93,-2.129 H 66.029 C 64.777,36.142 62.972,35.262 62.082,32.978 L 52.927,4.8 a 3.08,3.08 0 0 0 -5.859,0 l -9.319,28.679 c -1.221,2.3 -3.446,2.861 -4.454,2.995 H 3.471 a 3.08,3.08 0 0 0 -1.81,5.572 L 26.125,59.82 c 0.842,0.954 2.123,2.972 1.184,5.753 a 7,7 0 0 0 -0.149,0.498 l -8.846,27.227 a 3.078,3.078 0 0 0 2.93,4.031 c 0.636,0 1.271,-0.196 1.811,-0.588 L 46.819,79.474 c 1.242,-0.731 3.69,-1.614 6.638,0.202 L 76.941,96.74 a 3.08,3.08 0 0 0 4.741,-3.443 L 72.448,64.876 C 72.3,63.933 72.146,61.388 74.304,59.505 l 24.03,-17.46 a 3.08,3.08 0 0 0 1.119,-3.442 M 60.98,42.635 H 77.8 c 0.555,0.111 1.109,0.409 1.24,1.142 0.185,1.029 -0.889,1.739 -1.575,2.081 l -23.466,7.72 a 1.398,1.398 0 0 0 -0.098,2.623 l 8.376,3.469 c 0.787,0.398 2.555,1.481 3.038,3.34 0.067,0.257 0.145,0.437 0.226,0.551 l 4.46,13.726 c 0.079,0.646 -0.012,1.459 -0.849,1.793 -0.778,0.311 -1.521,-0.214 -2.027,-0.746 L 52.272,58.044 a 1.41,1.41 0 0 0 -1.512,-0.521 1.4,1.4 0 0 0 -1.013,1.238 l -0.745,9.474 c -0.146,0.745 -0.546,2.154 -1.556,3.168 L 32.81,82.038 c -0.583,0.32 -1.423,0.568 -2.053,-0.132 -0.475,-0.525 -0.38,-1.232 -0.146,-1.835 L 46.004,55.968 c 0.195,-0.253 0.306,-0.568 0.294,-0.902 a 1.39,1.39 0 0 0 -0.85,-1.233 L 45.416,53.818 Q 45.384,53.803 45.35,53.79 L 21.256,45.577 C 20.66,45.25 19.873,44.612 20.2,43.634 c 0.203,-0.607 0.763,-0.882 1.342,-0.999 h 16.035 c 0.938,0.073 2.497,0.371 3.58,1.465 l 6.318,7.347 a 1.402,1.402 0 0 0 2.462,-0.913 V 25.765 c 0.049,-0.673 0.297,-1.775 1.395,-1.86 0.979,-0.077 1.565,0.922 1.859,1.638 l 4.861,14.964 a 3.08,3.08 0 0 0 2.928,2.128"
					id="path3"
				/>
			</g>
		</svg>
	);
}
