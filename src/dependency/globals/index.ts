import type globals from "globals";

type Globals =
  | "mocha"
  & keyof typeof globals
;

export type { Globals as default };
