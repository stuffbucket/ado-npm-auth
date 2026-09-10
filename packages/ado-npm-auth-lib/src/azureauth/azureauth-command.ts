import { createRequire } from "node:module";
import { isWsl } from "../utils/is-wsl.js";

let memo: string[] | undefined = undefined;

export const clearMemo = () => {
  memo = void 0;
};

/**
 * Get the executable path of azureauth command
 * @returns the string of the executable command to run azureauth
 */
export const azureAuthCommand = (): {
  command: string[];
  env: NodeJS.ProcessEnv;
} => {
  if (!memo) {
    const require = createRequire(
      typeof __filename === "string" ? __filename : import.meta.url,
    );
    memo = isWsl()
      ? ["azureauth.exe"]
      : [
          JSON.stringify(process.execPath),
          JSON.stringify(require.resolve("azureauth/scripts/azureauth.cjs")),
        ];
  }

  return { command: memo, env: { ...process.env } };
};
