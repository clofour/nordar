import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Tabs, Paper, Container, Center } from "@mantine/core";
import { IconLogin2, IconUserPlus } from "@tabler/icons-react";
import Logo, { LogoLayout } from "@/components/shared/Logo/Logo";
import SignInForm from "@/components/auth/SignInForm";
import SignUpForm from "@/components/auth/SignUpForm";

function Authentication() {
	const navigate = useNavigate();
	const { tabValue } = useParams();
	const [loading, setLoading] = useState(false);

	return (
		<Container size={420} my={40}>
			<Paper withBorder shadow="sm" p={22} mt={30} radius="md">
				<Center>
					<Logo layout={LogoLayout.Vertical} size="xl" />
				</Center>
				<Tabs value={tabValue ?? null} onChange={(value) => navigate(`/auth/${value}`)}>

					<Tabs.List grow>
						<Tabs.Tab value="signin" leftSection={<IconLogin2 size={12} />} disabled={loading}>
							Sign In
						</Tabs.Tab>
						<Tabs.Tab value="signup" leftSection={<IconUserPlus size={12} />} disabled={loading}>
							Sign Up
						</Tabs.Tab>
					</Tabs.List>

					<Tabs.Panel value="signin" pt="sm">
						<SignInForm setLoading={setLoading} loading={loading} />
					</Tabs.Panel>

					<Tabs.Panel value="signup" pt="sm">
						<SignUpForm setLoading={setLoading} loading={loading} />
					</Tabs.Panel>
				</Tabs>
			</Paper>
		</Container>
	);
}

export default Authentication;
