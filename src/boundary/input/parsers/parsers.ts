import type { Parsers as Dependencies } from "../../../dependency/dependency.js";

type Parsers = Readonly<Record<Dependencies, unknown>>;

export type {
  Parsers as default,
  Parsers,
  Dependencies,
};
