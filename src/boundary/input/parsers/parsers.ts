import type { Scope } from "../input.js";
import type { Options } from "../../../factory/Factory.js";

type Parsers = {
  readonly [S in Scope]: ConstructorParameters<typeof Options[S]>[2] extends readonly [unknown, ...unknown[]]
    ? unknown
    : null
};

export type { Parsers as default };
