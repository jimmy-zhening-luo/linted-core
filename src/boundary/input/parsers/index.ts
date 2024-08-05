import type { Parsers as Dependencies } from "../../../dependency/index.js";

type Parsers = Readonly<Record<Dependencies, unknown>>;

export type { Dependencies, Parsers, Parsers as default };
