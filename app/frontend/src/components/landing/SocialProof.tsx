import classes from "./SocialProof.module.css";
import { SimpleGrid } from "@mantine/core";
import TestimonyCard from "./TestimonyCard";
import Eyebrow from "./Eyebrow";
import Module from "./Module";

export default function SocialProof() {
	const testimonies = [
		{
			testimony: "I'd set the same five New Year's Resolutions for a decade, and give up halfway through January. Understanding why I set my goals motivated me to actually achieve them.",
			image: "https://i.pravatar.cc/80?img=8",
			name: "Jonas Weber",
			description: "Software Engineer"
		},
		{
			testimony: "I'd set the same five New Year's Resolutions for a decade, and give up halfway through January. Understanding why I set my goals motivated me to actually achieve them.",
			image: "https://i.pravatar.cc/80?img=8",
			name: "Jonas Weber",
			description: "Software Engineer"
		},
		{
			testimony: "I'd set the same five New Year's Resolutions for a decade, and give up halfway through January. Understanding why I set my goals motivated me to actually achieve them.",
			image: "https://i.pravatar.cc/80?img=8",
			name: "Jonas Weber",
			description: "Software Engineer"
		},
	];

	return (
		<Module>
			<Eyebrow text="Stories from the sky" />
			<h1 className={classes.title}>Charted, not wished</h1>
			<SimpleGrid w="100%" cols={{ base: 1, sm: 3 }}>
				{testimonies.map((testimony) =>
					<TestimonyCard {...testimony} />
				)}
			</SimpleGrid>
		</Module>
	);
}
