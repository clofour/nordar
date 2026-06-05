import { Accordion, Button, type ButtonVariant } from "@mantine/core";
import { IconMoon, IconSun } from "@tabler/icons-react";
import { Link } from "react-router";

export default function FAQ() {
    const faqs = [
        {
            question: "Hello1",
            answer: "Hi!"
        },
        {
            question: "Hello2",
            answer: "Hi!"
        },
        {
            question: "Hello3",
            answer: "Hi!"
        },
        {
            question: "Hello4",
            answer: "Hi!"
        },
    ];

    return (
        <Accordion variant="separated" >
            {faqs.map((faq) => (
                <Accordion.Item key={faq.question} value={faq.question}>
                    <Accordion.Control>{faq.question}</Accordion.Control>
                    <Accordion.Panel>{faq.answer}</Accordion.Panel>
                </Accordion.Item>
            ))}
        </Accordion>
    );
}
