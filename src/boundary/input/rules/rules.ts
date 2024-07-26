import type { Scope } from "../../../scopes/Scopes.js";
import type * as Rules from "./entry/entry.js";

type Rules = Readonly<Record<Scope, readonly Rules.Entry[]>>;

export type {
  Rules as default,
  Rules,
};
