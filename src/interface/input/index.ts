export type {
  Scope,
  Plugins,
  RuleEntry,
  RuleRecord,
} from "..";

import type { Imports } from "./imports";
import type { User } from "./user";

export type Input = Imports & User;
