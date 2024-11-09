export type {
  Scope,
  Plugins,
  RuleEntry,
  RuleRecord,
  GlobalConfigSystem,
  GlobalConfigIgnores,
} from "..";

import type { InputImports } from "./imports";
import type { InputSettings } from "./settings";
import type { InputGlobal } from "./global";
import type { InputScoped } from "./scoped";

export type Input = (
  & InputImports
  & InputSettings
  & InputGlobal
  & InputScoped
);
