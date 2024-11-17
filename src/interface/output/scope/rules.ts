import type { PartialConfig } from "../../shared";

export type ScopeRules<Scopes extends string> = PartialConfig<
  `linted/${Scopes}/${string}/`,
  | "files"
  | "ignores"
  | "rules"
>;

// export type ScopeRules<Scopes extends string> = {
//   readonly name: `linted/${Scopes}/${string}/`;
// } & Pick<Config, "files" | "ignores" | "rules">;
