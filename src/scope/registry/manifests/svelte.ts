import { ts } from "./ts";

export const svelte = {
  languageOptions: {
    parser: "svelte" as const,
  },
  parserOptions: {
    parser: "ts" as const,
    extraFileExtensions: [".svelte"],
    ...ts.parserOptions,
  },
  processor: "svelte/svelte",
};
