import type globals from "globals";

export type Globals = keyof typeof globals & "mocha";
