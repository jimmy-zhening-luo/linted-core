import type { Scope } from ".";
import type { RuleEntry } from "./entry";

export type Overrides = Readonly<Partial<Record<Scope, RuleEntry[1]>>>;
