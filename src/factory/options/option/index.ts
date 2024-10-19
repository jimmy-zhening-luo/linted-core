import globals from "globals";
import type { Ruleset } from "../../rulesets/ruleset";
import type {
  Scope,
  Input,
  Output,
  OptionTemplate,
  LanguageOptions,
  Plugins,
  Globals,
} from "./template";

export default abstract class Option<
  S extends Scope,
  Plugin extends keyof Input["plugins"],
  IsEcma extends boolean = true,
  ParserOptions extends object | boolean = false,
  ParserCount extends 0 | 1 | 2 = 0,
  Global extends Globals = never,
  Processor extends object = never,
> {
  private readonly linterOptions = { noInlineConfig: true, reportUnusedDisableDirectives: "error" } as const;

  public abstract readonly scope: literalful<S>;
  public abstract readonly processor: Interface<Processor> extends never
    ? object
    : Interface<Processor> extends Readonly<Record<"processor", string>>
      ? Interface<Processor>
      : object;

  constructor(
    public readonly plugins: Plugins<Plugin>,
    public readonly parser: Tuple<unknown, ParserCount>,
    public readonly files: string[],
    public readonly ruleset: Ruleset,
  ) {}

  public get configs(): Output {
    const {
      scope,
      ruleset,
      files,
      option,
    } = this;

    if (ruleset.scope !== scope)
      throw new TypeError(`Scope mismatch between option and ruleset`, { cause: { option: scope, ruleset: ruleset.scope } });

    return files.length < 1
      ? []
      : ruleset.ruleset.map(({ id, rule }) => {
        return {
          name: `linted/${id}`,
          files,
          rules: rule,
          ...option,
        };
      });
  }

  private get option() {
    try {
      const {
        plugins,
        linterOptions,
        languageOptions,
        processor,
      } = this;

      return {
        plugins,
        linterOptions,
        languageOptions,
        ...processor,
      } satisfies OptionTemplate<
        Plugin,
        IsEcma,
        ParserOptions,
        Global,
        Processor
      >;
    }
    catch (e) { throw new Error(`linted.factory.Option/scope:${this.scope}: option`, { cause: e }); }
  }

  protected abstract get languageOptions(): LanguageOptions<IsEcma, ParserOptions, Global>;

  protected globals(type: Global) {
    return globals[type];
  }
}
