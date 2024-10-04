import type * as RuleObject from "./state/index.js";

type RuleObject = Readonly<Record<
  string,
  | RuleObject.RuleLevel
  | readonly [RuleObject.RuleLevel, ...unknown[]]
>>;

export type {
  RuleObject,
  RuleObject as Object,
  RuleObject as default,
};
