import type { Scope } from "../input.js";
import type { Options } from "../../../factory/Factory.js";

type Parsers = { [S in Scope]: ConstructorParameters < typeof Options[S] > [2] };

export type { Parsers as default };
