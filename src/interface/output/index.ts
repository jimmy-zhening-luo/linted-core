export type {
  Plugins,
  Config,
  ConfigProperty,
} from "..";

import type { GlobalConfigs } from "./global";
import type { ScopedConfig } from "./scoped";

export type Output = [
  ...GlobalConfigs,
  ...ScopedConfig[],
];
