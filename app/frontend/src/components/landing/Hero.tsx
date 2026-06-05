import { Group } from "@mantine/core";
import classes from "./Hero.module.css";
import LinkButton from "./LinkButton";

export default function Hero() {
    return (
        <div className={classes.hero}>
            <small>Placeholder</small>
            <h1>Placeholder</h1>
            <p>Placeholder</p>

            <div className={classes.heroCTA}>
                <LinkButton
                    variant="default"
                    label="Learn more"
                    to="#tbd"
                />
                <LinkButton
                    variant="filled"
                    label="Sign Up"
                    to="/auth/signup"
                />
            </div>

        </div>
    );
}
