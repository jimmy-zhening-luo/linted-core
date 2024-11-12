export type {
  Scope,
  RuleEntry,
  RuleRecord,
} from "..";

import type { InputFiles } from "./files";
import type { InputScopedIgnores } from "./ignores";
import type { InputRules } from "./rules";

export interface InputScoped {
  files: InputFiles;
  ignores: InputScopedIgnores;
  rules: InputRules;
}
