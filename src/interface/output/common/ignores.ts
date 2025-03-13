import type { PickConfig } from "../../shared";

export type CommonIgnores = PickConfig<
  "linted/*/ignores/",
  "ignores"
>;
