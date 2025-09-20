import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import devtools from "solid-devtools/vite";
import tsconfigPlugin from "vite-tsconfig-paths";
// will obfuscate the code to make it harder to reverse engineer
// import obfuscatorPlugin from "vite-plugin-javascript-obfuscator";

export default defineConfig({
  plugins: [devtools(), solidPlugin(), tsconfigPlugin({ root: "./" })],
  server: {
    port: 3000,
  },
  build: {
    target: "esnext",
    sourcemap: false,
    outDir: "dist",
  },
});
