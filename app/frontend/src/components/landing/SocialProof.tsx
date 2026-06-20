import { SimpleGrid } from "@mantine/core";
import TestimonyCard from "./TestimonyCard";
import Eyebrow from "./Eyebrow";
import Module from "./Module";
import SectionTitle from "./SectionTitle";
import SectionIntroduction from "./SectionIntroduction";

export default function SocialProof() {
	const testimonies = [
		{
			testimony:
				"I'd set the same five New Year's Resolutions for a decade, and give up halfway through January. Understanding why I set my goals motivated me to actually achieve them.",
			image: "https://i.pravatar.cc/80?img=8",
			name: "Jonas Weber",
			description: "Software Engineer",
		},
		{
			testimony:
				"Who would have guessed that reflections could be this effective? Contrary to what one might expect, they don't make me feel bad about myself; instead, they reinforce a growth mindset. Goal-setting, done right!",
			image: "https://i.pravatar.cc/80?img=48",
			name: "Priya Raman",
			description: "WIP Bodybuilder",
		},
		{
			testimony:
				"I built Nordar because I was struggling to keep up with my goals, and I'm glad I did. It took 200 hours and it changed my life. It'll take you 5 minutes.",
			image: "https://i.pravatar.cc/80?img=20",
			name: "Amara Okafor",
			description: "Founder",
		},
	];

	return (
		<Module>
			<SectionIntroduction>
				<Eyebrow text="Stories from the sky" />
				<SectionTitle Order="h2">Charted, not wished</SectionTitle>
			</SectionIntroduction>

			<SimpleGrid w="100%" cols={{ base: 1, sm: 3 }}>
				{testimonies.map((testimony) => (
					<TestimonyCard {...testimony} />
				))}
			</SimpleGrid>
		</Module>
	);
}
