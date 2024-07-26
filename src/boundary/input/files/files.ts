import type { Scope } from "../../../scopes/Scopes.js";
import type * as Files from "./list/list.js";

type Files = Readonly<Record<Scope, Files.List>>;

export type {
  Files as default,
  Files,
};
