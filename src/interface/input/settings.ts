import type {
  LinterOptions,
  BaseLanguageOptions,
} from ".";

export interface InputSettings {
  settings: Required<
    & LinterOptions
    & BaseLanguageOptions
  >;
}
