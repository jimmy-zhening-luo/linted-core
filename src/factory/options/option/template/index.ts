import type { LanguageOptions } from "./languageOptions";
import type { Globals } from "./globals";

export type {
  LanguageOptions,
  Globals,
};
export type OptionTemplate<
  ParserOptions extends
  | boolean
  | object,
  GlobalTypes extends Globals | false,
  Processor extends object,
  Language extends object,
> = (
{ languageOptions: LanguageOptions<ParserOptions, GlobalTypes> }
& (
    Processor extends never
      ? object
      : Processor extends { processor: infer P }
        ? string extends P
          ? object
          : { processor: P }
        : object
    )
    & (
    Language extends never
      ? object
      : Language extends { language: infer L }
        ? string extends L
          ? object
          : { language: L }
        : object
    )
);
