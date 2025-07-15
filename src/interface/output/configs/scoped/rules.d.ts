import type { IConfig } from "../../../config";

export type ScopeRules = {
  name: `linted/${string}`;
} & Pick<
  IConfig,
  (
    | "files"
    | "ignores"
    | "rules"
  )
>;
