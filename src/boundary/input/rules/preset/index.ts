import type { Scope } from "../../../../scopes/index.js";
import type * as Preset from "./entry/index.js";

type Preset = Readonly<Record<Scope, readonly Preset.Entry[]>>;

export type { Preset, Preset as default };
