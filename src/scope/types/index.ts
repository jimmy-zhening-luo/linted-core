import type { scopes } from "..";

export type Scope = typeof scopes[number];
export namespace Import {
  export type Plugin = (
    | "@stylistic"
    | "@typescript-eslint"
    | "mocha"
    | "chai-friendly"
    | "chai-expect"
    | "svelte"
    | "@html-eslint"
    | "css"
    | "jsonc"
    | "yml"
  );
  export type Parser = Scope & (
    | "ts"
    | "svelte"
    | "html"
    | "jsonc"
    | "yml"
  );
}
