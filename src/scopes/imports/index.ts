export namespace Imports {
  export type Plugin = (
    | "@stylistic"
    | "@typescript-eslint"
    | "mocha"
    | "chai-friendly"
    | "chai-expect"
    | "svelte"
    | "@html-eslint"
    | "css"
    | "json"
    | "jsonc"
    | "yml"
  );
  export type Parser = (
    | "ts"
    | "svelte"
    | "html"
    | "yml"
  );
}
