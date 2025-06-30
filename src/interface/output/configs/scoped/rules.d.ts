import type { Config } from "../../../config";

export type Rules = {
  name: `linted/${string}`;
} & Pick<
  Config,
  | "files"
  | "ignores"
  | "rules"
>;
