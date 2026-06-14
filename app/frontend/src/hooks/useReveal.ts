import classes from "./useReveal.module.css";
import clsx from "clsx";
import { useIntersection } from "@mantine/hooks";
import { useRef } from "react";

type Order = 1 | 2 | 3 | 4;

interface UseRevealReturn {
    ref: (node: HTMLElement | null) => void;
    className: string;
}

export function useReveal(order: Order = 1): UseRevealReturn {
    const revealed = useRef(false);
    const { ref, entry } = useIntersection({
        threshold: 0.1,
    });

    if (entry?.isIntersecting) {
        revealed.current = true;
    }

    return {
        ref,
        className: clsx(classes.reveal, classes[`order${order}`], revealed.current ? classes.revealed : "")
    }
}