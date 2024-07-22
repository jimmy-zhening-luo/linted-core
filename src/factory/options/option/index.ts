import JsOption from "./js/index.js";
import TsOption from "./ts/index.js";
import SvelteOption from "./svelte/index.js";
import HtmlOption from "./html/index.js";
import JsonOption from "./json/index.js";
import JsoncOption from "./jsonc/index.js";
import YmlOption from "./yml/index.js";

export {
  JsOption,
  TsOption,
  SvelteOption,
  HtmlOption,
  JsonOption,
  JsoncOption,
  YmlOption,
};
export default class Option<
  Scope extends string,
  PluginId extends string,
  UseParser extends boolean = never,
  ParserOptions extends object = never,
  GlobalTypes extends string = never,
  ProcessorId extends string = never,
  Source extends IOLanguageSource.Source = "module",
  Ecma extends number | IOLanguageEcma.Ecma = "latest",
> {
  constructor(
    public readonly body: IOption<
      `linted/scope:${literalful<Scope>}`,
      true,
      "error",
      PluginId,
      Ecma,
      Source,
      UseParser,
      ParserOptions,
      GlobalTypes,
      ProcessorId
    >,
  ) {}
}
