import type { Scope } from "../Options.js";

export default abstract class Option<
  S extends Scope,
  PluginId extends string,
  IsEcma extends boolean = true,
  ParserOptions extends object | boolean = false,
  ParserCount extends 0 | 1 | 2 = 0,
  GlobalTypes extends string = never,
  Processor extends object = never,
> {
  public readonly linterOptions = {
    noInlineConfig: true,
    reportUnusedDisableDirectives: "error",
  } as const;

  public abstract readonly name: literalful<`scope:${S}`>;
  public abstract readonly processor: (Interface<Processor> extends never ? object : Interface<Processor> extends { "interface": string } ? Interface<Processor> : object);

  constructor(
    public readonly files: readonly string[],
    public readonly plugins: IOPlugins<PluginId>,
    public readonly parser: Tuple<unknown, ParserCount>,
  ) {}

  public get option() {
    const {
      name,
      files,
      plugins,
      linterOptions,
      languageOptions,
      processor,
    } = this;

    return {
      name,
      files,
      linterOptions,
      languageOptions,
      plugins,
      ...processor,
    } satisfies IOption<
      `scope:${S}`,
      PluginId,
      IsEcma,
      ParserOptions,
      GlobalTypes,
      Processor
    >;
  }

  public abstract get languageOptions(): IOLanguage<
    IsEcma,
    ParserOptions,
    GlobalTypes
  >;
}
