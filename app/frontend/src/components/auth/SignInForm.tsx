import { postApiAuthSignIn } from "@/api/endpoints/auth/auth.js";
import { PostApiAuthSignInBody } from "@/api/endpoints/auth/auth.zod.js";
import { useAuth } from "@/contexts/AuthContext";
import { getErrorMessage } from "@/data/error";
import { NotificationType, useNotification } from "@/helpers";
import { Button, Group, PasswordInput, Stack, TextInput } from "@mantine/core";
import { schemaResolver, useForm } from "@mantine/form";
import { useNavigate } from "react-router";

interface SignInFormProps {
	setLoading: (state: boolean) => void;
	loading: boolean;
}

export default function SignInForm({ setLoading, loading }: SignInFormProps) {
	const notify = useNotification();

	const { setAuthenticationState } = useAuth();

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
			setAuthenticationState(true);
		} else {
			notify(NotificationType.Error, response.data ?? getErrorMessage(response.status));
		}
		setLoading(false);
	};

	return (
		<form onSubmit={form.onSubmit(handleSubmit)}>
			<Stack gap="sm">
				<TextInput
					withAsterisk
					label="Username"
					placeholder="johndoe"
					disabled={loading}
					key={form.key("username")}
					{...form.getInputProps("username")}
				/>

				<PasswordInput
					withAsterisk
					label="Password"
					placeholder="••••••••••••••••"
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
