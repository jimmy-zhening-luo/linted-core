import type { Scope } from "@eslinted/core";
import type { RuleEntry } from "./entry";

export type Preset = Readonly<Record<Scope, readonly RuleEntry[]>>;
