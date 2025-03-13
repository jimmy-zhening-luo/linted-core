import type { Proto } from "../../proto";

export type CommonIgnores = Proto.PickConfig<
  "linted/*/ignores/",
  "ignores"
>;
