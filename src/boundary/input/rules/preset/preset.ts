import type { Scope } from "../../../../scopes/Scopes.js";
import type * as Preset from "./entry/entry.js";

type Preset = Readonly<Record<Scope, readonly Preset.Entry[]>>;

export type {
  Preset as default,
  Preset,
};
