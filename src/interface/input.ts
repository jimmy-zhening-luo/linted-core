import type { Config, Rule, Imports } from ".";
import type { Scopes } from "..";

export interface Input {
  readonly imports: {
    readonly plugins: Config<Imports.Plugins>["plugins"];
    readonly parsers: Readonly<Record<
      Imports.Parsers,
      unknown
    >>;
  };
  readonly defaults: {
    readonly settings: Config["linterOptions"] & Pick<Config["languageOptions"], "ecmaVersion" | "sourceType">;
    readonly files: Readonly<Record<"*" | Scopes, readonly string[]>>;
    readonly ignores: Input["defaults"]["files"];
    readonly rules: Readonly<Record<Scopes, readonly Rule.Entry[]>>;
  };
  readonly extensions: Partial<
    & Readonly<Record<"*", Partial<Input["defaults"]["settings"] & Pick<Config, "ignores"> & { readonly override?: boolean }>>>
    & Readonly<Record<Scopes, Partial<Pick<Config, "files" | "ignores" | "rules">>>>
  >;
}
