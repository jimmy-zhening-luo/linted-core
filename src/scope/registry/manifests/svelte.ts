export const svelte = {
  languageOptions: {
    parser: "svelte" as const,
  },
  parserOptions: {
    parser: "ts" as const,
    extraFileExtensions: [".svelte"],
  },
  processor: "svelte/svelte",
};
