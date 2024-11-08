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
  GlobalTypes extends Globals,
  Processor extends object,
  Language extends object,
> =
  & {
    languageOptions: LanguageOptions<ParserOptions, GlobalTypes>;
  }
  & (Interface<Processor> extends never ? object : Interface<Processor> extends { processor: string } ? Interface<Processor> : object)
  & (Interface<Language> extends never ? object : Interface<Language> extends { language: string } ? Interface<Language> : object);
