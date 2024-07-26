import type { Scope } from "../../../scopes/Scopes.js";
import type { Rules } from "../input.js";

type Overrides = Readonly<Particord<Scope, Rules.Entry.Object>>;

export type {
  Overrides as default,
  Overrides,
};
