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
				mutator: {
					path: "./src/other/cfetch.ts",
					name: "cFetch",
				},
			},
			mode: "tags-split",
			client: "swr",
			target: "src/api/endpoints",
			schemas: "src/api/models",
			mock: true,
			clean: true, // Shared directories
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
