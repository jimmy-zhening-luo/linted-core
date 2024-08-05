import type { Scope } from "../../../../scopes/index.js";
import type * as Overrides from "../preset/index.js";

type Overrides = Readonly<Partial<Record<Scope, Overrides.Preset.Entry.Object>>>;

export type { Overrides, Overrides as default };
