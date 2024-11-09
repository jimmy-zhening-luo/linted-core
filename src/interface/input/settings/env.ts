import type { GlobalConfigSystem } from ".";

export type InputEnvironment = Required<
  & GlobalConfigSystem["linterOptions"]
  & GlobalConfigSystem["languageOptions"]
>;
