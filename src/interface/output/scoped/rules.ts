import type { PartialConfig } from "../../shared";

export type ScopedRules<Scope extends string> = PartialConfig<
  `linted/${Scope}/${string}/`,
  | "files"
  | "ignores"
  | "rules"
>;

// export type ScopedRules<Scope extends string> = {
//   readonly name: `linted/${Scope}/${string}/`;
// } & Pick<Config, "files" | "ignores" | "rules">;
