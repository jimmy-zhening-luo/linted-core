import type { Config } from "../../../proto";

export type Rules<Scope extends string> = Config.PickConfig<
  `linted/${Scope}/${string}/`,
  | "files"
  | "ignores"
  | "rules"
>;
