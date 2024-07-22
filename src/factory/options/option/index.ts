import type { Scope } from "../index.js";

export default class Option<
  S extends Scope,
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
      `linted/scope:${literalful<S>}`,
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
