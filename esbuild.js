import esbuild from "esbuild";
import { GasPlugin } from "esbuild-gas-plugin";
import { config } from "dotenv";

const {parsed: loadedEnvs} = config();

esbuild
  .build({
    entryPoints: ["./src/main.ts"],
    bundle: true,
    // minify: true,
    outfile: "./dist/main.js",
    plugins: [GasPlugin],
      define: {
    // Replace `process.env.FOO` with variables written in `.env` file
    ...Object.fromEntries(
      Object.entries(loadedEnvs ?? {}).map(([key, value]) => [
        `process.env.${key}`,
        JSON.stringify(value),
      ]),
    ),
  },
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
