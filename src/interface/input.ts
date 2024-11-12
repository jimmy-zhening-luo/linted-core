import type {
  Scopes,
  Config,
  RuleEntry,
} from "..";
import type { ImportPlugins, ImportParsers } from "./imports";

export interface Input {
  imports: {
    plugins: Config<ImportPlugins>["plugins"];
    parsers: Record<
      ImportParsers & Scopes,
      unknown
    >;
  };
  defaults: {
    settings: Config["linterOptions"] & Pick<Config["languageOptions"], "ecmaVersion" | "sourceType">;
    files: Record<"*" | Scopes, string[]>;
    ignores: Input["defaults"]["files"];
    rules: Record<Scopes, RuleEntry[]>;
  };
  extensions: Partial<
    & Record<"*", Partial<Input["defaults"]["settings"] & Pick<Config, "ignores"> & { override?: boolean }>>
    & Record<Scopes, Partial<Pick<Config, "files" | "ignores" | "rules">>>
  >;
}
