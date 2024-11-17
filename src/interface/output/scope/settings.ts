import type { PartialConfig } from "../../shared";

export type ScopeSettings<Scopes extends string> = PartialConfig<
  `linted/${Scopes}/`,
  | "files"
  | "ignores"
  | "processor"
  | "language"
  | "settings"
  ,
  string,
  { readonly languageOptions: object }
>;

// export type ScopeSettings<Scopes extends string> = {
//   readonly name: `linted/${Scopes}/`;
//   readonly languageOptions: object;
// } & Pick<Config, "files" | "ignores" | "processor" | "language" | "settings">;
