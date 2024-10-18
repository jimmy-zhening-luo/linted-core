import type { Base } from "./base";
import type { Includes } from "./includes";

export type { Scope } from "..";
export interface Files {
  files: Base;
  includes: Includes;
}
