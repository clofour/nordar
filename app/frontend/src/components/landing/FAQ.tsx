import { Accordion } from "@mantine/core";
import classes from "./FAQ.module.css";
import Module from "./Module";
import Eyebrow from "./Eyebrow";
import SectionTitle from "./SectionTitle";

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
		{
			question: "What's an access code, and how do I get one?",
			answer:
				"Nordar is in early access right now, so sign-ups require an access code. You can request one by contacting us or get one from someone who's already using Nordar. This helps us grow at a pace that does not hinder your experience.",
		},
	];

	return (
		<Module>
			<Eyebrow text="Common questions" />
			<SectionTitle Order="h2">Straight answers</SectionTitle>
			<Accordion w="100%" variant="separated" classNames={{ item: classes.item!, control: classes.control!, panel: classes.panel! }}>
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
