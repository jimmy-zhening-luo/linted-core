export type {
  Plugins,
  ConfigProperty,
} from "..";

import type { GlobalConfigIgnores } from "./ignores";
import type { GlobalConfigSystem } from "./system";

export type GlobalConfigs = readonly [
  GlobalConfigIgnores,
  GlobalConfigSystem,
];
