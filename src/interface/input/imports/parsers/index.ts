export type { Scope } from "..";

import type { Parser } from "./parser";

export type Parsers = Record<
  Parser,
  unknown
>;
