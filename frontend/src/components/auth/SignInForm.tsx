import { postApiAuthSignIn } from "@/api/endpoints/auth/auth.js";
import { PostApiAuthSignInBody } from "@/api/endpoints/auth/auth.zod.js";
import { getErrorMessage } from "@/data/error";
import { Button, Group, PasswordInput, Stack, TextInput } from "@mantine/core";
import { schemaResolver, useForm } from "@mantine/form";
import { useNavigate } from "react-router";

interface SignInFormProps {
	setAlert: (alert: string) => void;
	setLoading: (state: boolean) => void;
	loading: boolean;
}

export default function SignInForm({ setAlert, setLoading, loading }: SignInFormProps) {
	const navigate = useNavigate();

	const formSchema = PostApiAuthSignInBody.omit({});
	const form = useForm({
		mode: "uncontrolled",
		validate: schemaResolver(formSchema, { sync: true }),
	});

	const handleSubmit = async (values: typeof form.values) => {
		setLoading(true);
		const requestData = {
			...values,
		};
		const response = await postApiAuthSignIn(requestData);

		if (response.status === 200) {
			navigate("/app/dashboard");
		} else {
			setAlert(response.data ?? getErrorMessage(response.status));
		}
		setLoading(false);
	};

	return (
		<form onSubmit={form.onSubmit(handleSubmit)}>
			<Stack gap="sm">
				<TextInput
					withAsterisk
					label="Username"
					placeholder="Your username"
					disabled={loading}
					key={form.key("username")}
					{...form.getInputProps("username")}
				/>

				<PasswordInput
					withAsterisk
					label="Password"
					placeholder="Your password"
					disabled={loading}
					key={form.key("password")}
					{...form.getInputProps("password")}
				/>

				<Group justify="flex-end" mt="md">
					<Button type="submit" disabled={loading}>
						Submit
					</Button>
				</Group>
			</Stack>
		</form>
	);
}
