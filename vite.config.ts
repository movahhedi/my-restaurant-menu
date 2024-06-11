import { defineConfig } from "vite";

export default defineConfig({
	root: "src",
	base: "",
	build: {
		minify: "terser",
		outDir: "../build",
		rollupOptions: {
			input: {
				main: "src/index.html",
			},
		},
	},
});
