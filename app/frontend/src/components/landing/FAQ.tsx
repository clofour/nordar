import { Accordion } from "@mantine/core";
import classes from "./FAQ.module.css";
import Module from "./Module";
import Eyebrow from "./Eyebrow";
import SectionTitle from "./SectionTitle";
import SectionIntroduction from "./SectionIntroduction";

export default function FAQ() {
	const faqs = [
		{
			question: "How is Nordar different from a to-do list or habit tracker?",
			answer:
				"To-do lists track tasks, whereas habit trackers track streaks. Nordar helps you set and track meaningful goals, while also doing all of the above.",
		},
		{
			question: "What are North Stars, Bearings, and Movements?",
			answer:
				"A North Star is a life ambition, such as being healthy. Bearings are the strategies that lead to the North Star, such as sleeping early or exercising regularly. Movements are the concrete actions associated with Bearings, such as turning off the lights at 11 PM or placing your phone far away from your bedroom.",
		},
		{
			question: "What if I don't know what my North Star is yet?",
			answer: "Nordar can help! The onboarding process will help you understand what matters to you, why it matters and what it looks like.",
		},
		{
			question: "Is Nordar free?",
			answer:
				"Yes. You can sign up and start for free — no credit card needed. We'll share more about future plans as they develop, but for now there is no price tag!",
		},
		{
			question: "Is my data private?",
			answer:
				"Yes. Your goals, reflections, and schedule are yours. Nordar doesn't sell your data or run advertisement. Ambitions are a sensitive topic, and we treat them that way.",
		},
	];

	return (
		<Module>
			<SectionIntroduction>
				<Eyebrow text="Common questions" />
				<SectionTitle Order="h2">Straight answers</SectionTitle>
			</SectionIntroduction>

			<Accordion w="100%" variant="separated" classNames={{ item: classes.item!, control: classes.control!, panel: classes.panel! }} ta="left">
				{faqs.map((faq) => (
					<Accordion.Item key={faq.question} value={faq.question}>
						<Accordion.Control>{faq.question}</Accordion.Control>
						<Accordion.Panel>{faq.answer}</Accordion.Panel>
					</Accordion.Item>
				))}
			</Accordion>
		</Module>
	);
}
