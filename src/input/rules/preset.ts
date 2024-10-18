import type { Scope } from ".";
import type { RuleEntry } from "./entry";

export type Preset = Readonly<Record<Scope, readonly RuleEntry[]>>;
