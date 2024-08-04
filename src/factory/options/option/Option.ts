import globals from "globals";
import type { Scope } from "../../../scopes/Scopes.js";
import type { Ruleset } from "../../factory.js";
import type { Plugins } from "../../../dependency/dependency.js";
import type { Output } from "../../../boundary/boundary.js";

export default abstract class Option<
  S extends Scope,
  PluginId extends Plugins,
  IsEcma extends boolean = true,
  ParserOptions extends object | boolean = false,
  ParserCount extends 0 | 1 | 2 = 0,
  GlobalTypes extends keyof typeof globals = never,
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
    public readonly plugins: IOPlugins<PluginId>,
    public readonly parser: Tuple<unknown, ParserCount>,
  ) {}

  public get configs(): Output[] {
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
    catch (e) { throw new Error(`linted.factory.Option/scope:${this.scope}: option`, { cause: e }); }
  }

  protected abstract get languageOptions(): IOLanguage<IsEcma, ParserOptions, GlobalTypes>;

  protected globals(type: GlobalTypes) {
    return globals[type];
  }
}
