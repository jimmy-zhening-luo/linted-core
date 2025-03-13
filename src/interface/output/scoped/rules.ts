import type { Proto } from "../../proto";

export type ScopedRules<Scope extends string> = Proto.PickConfig<
  `linted/${Scope}/${string}/`,
  | "files"
  | "ignores"
  | "rules"
>;
