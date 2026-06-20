import { defineConfig } from "orval";

export default defineConfig({
	goalapp: {
		input: {
			target: "http://localhost:5076/openapi/v1.json",
		},
		output: {
			baseUrl: {
				runtime: "import.meta.env.VITE_API_ORIGIN",
			},
			override: {
				query: {
					useOperationIdAsQueryKey: true,
					useInvalidate: true,
					mutationInvalidates: [
						{
							onMutations: ["signUp"],
							invalidates: ["signIn"],
						},
						{
							onMutations: ["signIn", "signOut"],
							invalidates: ["isAuthenticated"],
						},
						{
							onMutations: ["createNorthStar", "createBearing", "createMovement", "updateNorthStar", "updateBearing", "updateMovement", "deleteGoal"],
							invalidates: ["listGoals", "goalStats"],
						},
						{
							onMutations: ["createOnetime", "createRecurring", "updateEvent", "deleteEvent"],
							invalidates: ["listEvents"],
						},
						{
							onMutations: ["setOnetimeInstanceState", "setRecurringInstanceState"],
							invalidates: ["getOnetimeInstanceState", "getRecurringInstanceState"],
						},
						{
							onMutations: ["createReflection", "updateReflection", "deleteReflection"],
							invalidates: ["getReflection", "listReflections"],
						},
						{
							onMutations: ["prompt"],
							invalidates: ["promptData"],
						},
					],
				},
				mutator: {
					path: "./src/other/cfetch.ts",
					name: "cFetch",
				},
			},
			mode: "tags-split",
			client: "react-query",
			target: "src/api/endpoints",
			schemas: "src/api/models",
			mock: true,
			clean: true, // Shared directories
			formatter: "biome",
		},
	},
	goalappZod: {
		input: {
			target: "http://localhost:5076/openapi/v1.json",
		},
		output: {
			mode: "tags-split",
			client: "zod",
			target: "src/api/endpoints",
			fileExtension: ".zod.ts",
		},
	},
});
