import type { PartialConfig } from "../../shared";

export type CommonIgnores = PartialConfig<
  { readonly name: "linted/*/ignores" },
  "ignores"
>;
