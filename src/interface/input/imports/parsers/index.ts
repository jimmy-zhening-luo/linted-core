export type { Scope } from "..";

import type { Parser } from "./parser";

export type InputParsers = Record<
  Parser,
  unknown
>;
