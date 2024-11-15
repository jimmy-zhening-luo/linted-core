import type { PartialConfig } from "../../shared";

export type Plugins<Plugins extends string> = PartialConfig<
  { readonly name: `linted/*/plugins` },
  "plugins",
  Plugins
>;
