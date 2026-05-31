import { postApiAuthSignUp } from "@/api/endpoints/auth/auth.js";
import { PostApiAuthSignUpBody } from "@/api/endpoints/auth/auth.zod.js";
import { getErrorMessage } from "@/data/error";
import { NotificationType, useNotification } from "@/helpers";
import { Button, Checkbox, Group, PasswordInput, Progress, Stack, TextInput } from "@mantine/core";
import { schemaResolver, useForm } from "@mantine/form";
import { useState } from "react";
import { useNavigate } from "react-router";
import zxcvbn from "zxcvbn";

interface SignUpFormProps {
	setLoading: (state: boolean) => void;
	loading: boolean;
}

export default function SignUpForm({ setLoading, loading }: SignUpFormProps) {
	const notify = useNotification();

	const navigate = useNavigate();

	const [strength, setStrength] = useState(0);
	const [passwordColor, setPasswordColor] = useState("red");
	function getStrengthColor(strength: number) {
		switch (strength) {
			case 0:
				return "red";
			case 1:
				return "orange";
			case 2:
				return "yellow";
			case 3:
				return "green";
			case 4:
				return "blue";
			default:
				return "gray";
		}
	}
	function updateStrength(password: string) {
		const newStrength = zxcvbn(password).score;
		setStrength(newStrength);
		setPasswordColor(getStrengthColor(newStrength));
	}

	const formSchema = PostApiAuthSignUpBody.omit({});
	const form = useForm({
		mode: "uncontrolled",
		initialValues: {
			accessCode: "",
			username: "",
			email: "",
			password: "",
			termsOfService: false,
		},
		validate: schemaResolver(formSchema, { sync: true }),
		onValuesChange: (values) => {
			updateStrength(values.password);
		},
	});

	const handleSubmit = async (values: typeof form.values) => {
		setLoading(true);
		const requestData = {
			...values,
		};
		const response = await postApiAuthSignUp(requestData);

		if (response.status === 200) {
			form.reset();
			navigate("/auth/signin");
		} else {
			notify(NotificationType.Error, response.data ?? getErrorMessage(response.status))
		}
		setLoading(false);
	};

	return (
		<form onSubmit={form.onSubmit(handleSubmit)}>
			<Stack gap="sm">
				<TextInput
					withAsterisk
					label="Access Code"
					placeholder="Your access code"
					disabled={loading}
					key={form.key("accessCode")}
					{...form.getInputProps("accessCode")}
				/>

				<TextInput
					withAsterisk
					label="Username"
					placeholder="Your username"
					disabled={loading}
					key={form.key("username")}
					{...form.getInputProps("username")}
				/>

				<TextInput withAsterisk label="Email" placeholder="Your email" disabled={loading} key={form.key("email")} {...form.getInputProps("email")} />

				<PasswordInput
					withAsterisk
					label="Password"
					placeholder="Your password"
					disabled={loading}
					key={form.key("password")}
					{...form.getInputProps("password")}
				/>
				<Group grow gap={5} mt="xs">
					<Progress size="xs" color={passwordColor} value={form.getValues().password.length > 0 ? 100 : 0} transitionDuration={0} />
					<Progress size="xs" color={passwordColor} transitionDuration={0} value={strength >= 1 ? 100 : 0} />
					<Progress size="xs" color={passwordColor} transitionDuration={0} value={strength >= 2 ? 100 : 0} />
					<Progress size="xs" color={passwordColor} transitionDuration={0} value={strength >= 3 ? 100 : 0} />
					<Progress size="xs" color={passwordColor} transitionDuration={0} value={strength >= 4 ? 100 : 0} />
				</Group>

				<Checkbox
					label="I agree to the Terms of Service and Privacy Policy."
					key={form.key("termsOfService")}
					{...form.getInputProps("termsOfService", { type: "checkbox" })}
					disabled={loading}
				/>

				<Group justify="flex-end">
					<Button type="submit" disabled={!form.getValues().termsOfService || loading} loading={loading}>
						Submit
					</Button>
				</Group>
			</Stack>
		</form>
	);
}
