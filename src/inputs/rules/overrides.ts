import type { Scope } from "@eslinted/core/scopes";
import type { Preset } from "./preset";

export type Overrides = Readonly<Partial<Record<Scope, Preset[Scope][number][1]>>>;
