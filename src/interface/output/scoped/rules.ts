import type { PickConfig } from "../../shared";

export type ScopedRules<Scope extends string> = PickConfig<
  `linted/${Scope}/${string}/`,
  | "files"
  | "ignores"
  | "rules"
>;
