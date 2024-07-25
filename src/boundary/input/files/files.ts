import type { Scope } from "../../../scopes/scopes.js";
import type FileArray from "./array/filearray.js";

type Files = { readonly [S in Scope]: FileArray };

export type { Files as default };
