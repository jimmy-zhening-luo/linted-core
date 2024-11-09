export type {
  Scope,
  RuleEntry,
  RuleRecord,
} from "..";

import type { InputFiles } from "./files";
import type { InputRules } from "./rules";

export interface InputScoped {
  files: InputFiles;
  rules: InputRules;
}
