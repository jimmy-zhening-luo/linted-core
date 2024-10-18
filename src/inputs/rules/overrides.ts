import type { Scope } from "@eslinted/core";
import type { Preset } from "./preset";

export type Overrides = Readonly<Partial<Record<Scope, Preset[Scope][number][1]>>>;
