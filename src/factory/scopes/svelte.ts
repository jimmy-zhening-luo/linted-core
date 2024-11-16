import { ScopeManifest } from "./manifest";
import type TsManifest from "./ts";

export default class SvelteManifest extends ScopeManifest<
  "svelte" | "ts",
  TsManifest["parserOptions"] & {
    parserOptions: {
      readonly parser: "ts";
      readonly extraFileExtensions: readonly [".svelte"];
    };
  },
  false,
  { readonly processor: "svelte/svelte" }
> {
  public readonly processor = { processor: "svelte/svelte" } as const;
  public readonly language = {} as const;
  public readonly parserOptions = {
    parserOptions: {
      project: "tsconfig.json",
      sourceType: "module",
      ecmaVersion: 2023,
      parser: "ts",
      extraFileExtensions: [".svelte"] as const,
    } as const,
  } as const;
  public readonly languageOptions = {
    parser: "svelte",
  } as const;
}
