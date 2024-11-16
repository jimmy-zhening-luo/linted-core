import type { PartialConfig } from "../../shared";

export type CommonPlugins<Plugins extends string> = PartialConfig<
  { readonly name: `linted/*/plugins` },
  "plugins",
  Plugins
>;
