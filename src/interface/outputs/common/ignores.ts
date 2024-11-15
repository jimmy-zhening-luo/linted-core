import type { PartialConfig } from "../../shared";

export type Ignores = PartialConfig<
  { readonly name: "linted/*/ignores" },
  "ignores"
>;
