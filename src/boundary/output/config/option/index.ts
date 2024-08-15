import type Language from "./language/index.js";
import type Linter from "./linter/index.js";
import type Plugins from "./plugins/index.js";

type IOption<
  PluginId extends string,
  IsEcma extends boolean,
  ParserOptions extends boolean | object,
  GlobalTypes extends string,
  Processor extends object,
> =
  & { linterOptions: Linter }
  & { languageOptions: Language<IsEcma, ParserOptions, GlobalTypes> }
  & (Plugins<PluginId> extends never ? object : { plugins: Plugins<PluginId> })
  & (Interface<Processor> extends never ? object : Interface<Processor> extends { processor: string } ? Interface<Processor> : object)
;

export type {
  Plugins,
  Linter,
  Language,
  IOption,
  IOption as default,
};
