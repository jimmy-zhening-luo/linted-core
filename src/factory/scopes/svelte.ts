import { ScopeManifest } from "./manifest";
import type TsManifest from "./ts";

export default class SvelteManifest extends ScopeManifest<
  "svelte" | "ts",
  Omit<TsManifest["parserOptions"], "parser"> & {
    readonly parser: "ts";
    readonly extraFileExtensions: readonly [".svelte"];
  },
  { readonly processor: "svelte/svelte" }
> {
  public readonly processor = { processor: "svelte/svelte" } as const;
  public readonly language = {} as const;
  public readonly parserOptions = {
    parser: "ts",
    extraFileExtensions: [".svelte"] as const,
    project: "tsconfig.json",
    sourceType: "module",
    ecmaVersion: 2023,
  } as const;
  public readonly languageOptions = {
    parser: "svelte",
    globals: null,
  } as const;
}
