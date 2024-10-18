import type { LanguageOptions } from "./params/language";
import type { Linter } from "./params/linter";
import type { Plugins } from "./params/plugins";
import type { Globals } from "./params/globals";

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
> =
  & {
    linterOptions: Linter;
    languageOptions: LanguageOptions<IsEcma, ParserOptions, GlobalTypes>;
  }
  & (Plugins<PluginId> extends never ? object : { plugins: Plugins<PluginId> })
  & (Interface<Processor> extends never ? object : Interface<Processor> extends { processor: string } ? Interface<Processor> : object);
