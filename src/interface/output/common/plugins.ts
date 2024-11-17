import type { PartialConfig } from "../../shared";

export type CommonPlugins<Plugins extends string> = PartialConfig<
  "linted/*/plugins/",
  "plugins",
  Plugins
>;
