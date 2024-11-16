import type {
  CommonPlugins,
  CommonSettings,
  CommonIgnores,
} from "./common";
import type { Scope } from "./scope";
import type { Plugins, Scopes } from "../../scopes";

export type Output = readonly [
  CommonPlugins<Plugins>,
  CommonSettings,
  CommonIgnores,
  ...readonly Scope<Scopes>[],
];
