import type Preset from "./preset/index.js";
import type Overrides from "./overrides/index.js";

type Rules = { preset: Preset; overrides: Overrides };

export type {
  Preset,
  Overrides,
  Rules,
  Rules as default,
};
