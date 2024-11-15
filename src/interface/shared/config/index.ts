import type * as Rule from "./rule";

export type { Rule };
export interface Config<Plugins extends string = string> {
  readonly name: `linted/${string}`;
  readonly plugins: Readonly<Record<
    Plugins,
    { readonly configs: unknown }
  >>;
  readonly files: readonly string[];
  readonly ignores: readonly string[];
  readonly rules: Rule.Bag;
  readonly linterOptions: {
    readonly noInlineConfig: boolean;
    readonly reportUnusedDisableDirectives:
      | "error"
      | "warn"
      | "off"
    ;
  };
  readonly languageOptions: {
    readonly sourceType:
      | "module"
      | "script"
    ;
    readonly ecmaVersion:
      | "latest"
      | 3
      | 5
      | 2015
      | 2016
      | 2017
      | 2018
      | 2019
      | 2020
      | 2021
      | 2022
      | 2023
      | 2024
    ;
  } /* common language options -- not including extra language options for each scope */;
  readonly processor?: string;
  readonly language?: string;
  readonly settings?: Readonly<Record<string, unknown>>;
}
export type PartialConfig<
  This extends object,
  Picks extends Exclude<keyof Config, keyof This>,
  Plugins extends string = string,
> = (
  & This
  & Pick<Config<Plugins>, Picks>
  & Readonly<Partial<Record<
    Exclude<keyof Config, Picks | keyof This>,
    never
  >>>
);
