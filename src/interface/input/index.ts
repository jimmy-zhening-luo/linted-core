export type {
  Scope,
  Plugins,
  LinterOptions,
  BaseLanguageOptions,
  RuleEntry,
  RuleRecord,
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
