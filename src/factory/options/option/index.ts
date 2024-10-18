import type { Ruleset } from "../../ruleset";
import type {
  Input,
  Scope,
  Output,
  OptionTemplate,
  LanguageOptions,
  Plugins,
  Globals,
} from "./template";
import globals from "globals";

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
    public readonly files: readonly string[],
    public readonly ruleset: Ruleset<S>,
    public readonly plugins: Plugins<Plugin>,
    public readonly parser: Tuple<unknown, ParserCount>,
  ) {}

  public get configs(): Output {
    try {
      const {
        scope,
        ruleset,
        files,
        option,
      } = this;

      if (ruleset.id !== scope)
        throw new TypeError(`Option and Ruleset scope mismatch`, { cause: { option: scope, ruleset: ruleset.id } });
      else if (files.length < 1)
        return [];
      else {
        const baseName = `linted/scope:${scope}/rule:${ruleset.id}` as const;

        return ruleset.records.map(([ruleId, rules]) => {
          const name = `${baseName}+${ruleId}` as const;

          return {
            name,
            files,
            rules,
            ...option,
          };
        });
      }
    }
    catch (e) { throw new Error(`linted.factory.Option/scope:${this.scope}: configs`, { cause: e }); }
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
