import type RuleBase from "./preset/index.js";
import type Overrides from "./overrides/index.js";

type Rules = {
  rules: RuleBase;
  overrides: Overrides;
};

export type {
  RuleBase,
  Overrides,
  Rules,
  Rules as default,
};
