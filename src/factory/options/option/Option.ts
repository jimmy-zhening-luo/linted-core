import type { Scope } from "../Options.js";
import type { Ruleset } from "../../Factory.js";
import type { IConfig } from "../../../boundary/boundary.js";

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

  public abstract readonly scope: literalful<S>;
  public abstract readonly processor: (Interface<Processor> extends never ? object : Interface<Processor> extends { "interface": string } ? Interface<Processor> : object);

  constructor(
    public readonly files: readonly string[],
    public readonly ruleset: Ruleset<S>,
    public readonly plugins: IOPlugins<PluginId>,
    public readonly parser: Tuple<unknown, ParserCount>,
  ) {}

  public get configs(): IConfig[] {
    const {
      scope,
      ruleset,
      files,
      option,
    } = this;

    if (ruleset.id !== scope)
      throw new TypeError(
        `Option and Ruleset scope mismatch`,
        { cause: { option: scope, ruleset: ruleset.id } },
      );
    else if (files.length < 1)
      return [];
    else {
      const baseName = `scope:${scope}/rule:${ruleset.id}` as const;

      return ruleset.records.map(
        ([ruleId, rules]) => {
          const name = `${baseName}+${ruleId}` as const;

          return {
            name,
            files,
            rules,
            ...option,
          };
        },
      );
    }
  }

  public get option() {
    const {
      plugins,
      linterOptions,
      languageOptions,
      processor,
    } = this;

    return {
      linterOptions,
      languageOptions,
      plugins,
      ...processor,
    } satisfies IOption<
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
