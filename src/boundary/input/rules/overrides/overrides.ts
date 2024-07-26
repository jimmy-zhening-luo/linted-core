import type { Scope } from "../../../../scopes/Scopes.js";
import type * as Overrides from "../preset/preset.js";

type Overrides = Readonly<Particord<Scope, Overrides.Preset.Entry.Object>>;

export type {
  Overrides as default,
  Overrides,
};
