import type { Rules } from "../rules";

export type GlobalExtension = {
  "*": {
    readonly ignores?: readonly string[];
    readonly override?: boolean;
    readonly rules?: Rules;
  };
};
