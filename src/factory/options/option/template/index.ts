export type { Scope, Input, Output } from "../..";

import type { LanguageOptions } from "./languageOptions";
import type { Linter } from "./linter";
import type { Plugins } from "./plugins";
import type { Globals } from "./globals";

export type {
  LanguageOptions,
  Linter,
  Plugins,
  Globals,
};
export type OptionTemplate<
  PluginId extends string,
  IsEcma extends boolean,
  ParserOptions extends boolean | object,
  GlobalTypes extends Globals,
  Processor extends object,
  Language extends object,
> =
  & {
    linterOptions: Linter;
    languageOptions: LanguageOptions<IsEcma, ParserOptions, GlobalTypes>;
  }
  & (Plugins<PluginId> extends never ? object : { plugins: Plugins<PluginId> })
  & (Interface<Processor> extends never ? object : Interface<Processor> extends { processor: string } ? Interface<Processor> : object)
  & (Interface<Language> extends never ? object : Interface<Language> extends { language: string } ? Interface<Language> : object);
