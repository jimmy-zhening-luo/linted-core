import type { PartialConfig } from "../../shared";

export type ScopedRules<Scope extends string> = PartialConfig<
  `linted/${Scope}/${string}/`,
  | "files"
  | "ignores"
  | "rules"
>;
