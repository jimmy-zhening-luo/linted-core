import globals from "globals";
import type {
  Scope,
  ScopedConfig,
} from "..";
import type {
  OptionTemplate,
  LanguageOptions,
  Globals,
} from "./template";
import type { Ruleset } from "../../rulesets/ruleset";

export default abstract class Option<
  S extends Scope,
  ParserOptions extends
  | object
  | boolean = false,
  ParserCount extends 0 | 1 | 2 = 0,
  Global extends Globals = never,
  Processor extends object = never,
  Language extends object = never,
> {
  public abstract readonly scope: literalful<S>;
  public abstract readonly processor: Interface<Processor> extends never
    ? object
    : Interface<Processor> extends Readonly<Record<"processor", string>>
      ? Interface<Processor>
      : object;
  public abstract readonly language: Interface<Language> extends never
    ? object
    : Interface<Language> extends Readonly<Record<"language", string>>
      ? Interface<Language>
      : object;

  constructor(
    public readonly parser: Tuple<ParserCount, unknown>,
    public readonly files: string[],
    public readonly ruleset: Ruleset,
  ) {}

  public get configs(): ScopedConfig[] {
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
          ignores: [],
          rules: rule,
          ...option,
        };
      });
  }

  private get option() {
    try {
      const {
        languageOptions,
        processor,
        language,
      } = this;

      return {
        languageOptions,
        ...processor,
        ...language,
      } satisfies OptionTemplate<
        ParserOptions,
        Global,
        Processor,
        Language
      >;
    }
    catch (e) { throw new Error(`linted.factory.Option/scope:${this.scope}: option`, { cause: e }); }
  }

  protected abstract get languageOptions(): LanguageOptions<ParserOptions, Global>;

  protected globals(type: Global) {
    return globals[type];
  }
}
