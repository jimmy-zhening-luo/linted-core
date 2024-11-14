import type globals from "globals";
import type {
  Scopes,
  Configs,
} from "../..";
import type { Ruleset } from "../ruleset";

export abstract class ScopeSetting<
  S extends Scopes,
  ParserOptions extends
  | object
  | boolean = false,
  ParserCount extends 0 | 1 | 2 = ParserOptions extends false ? 0 : 1,
  G extends keyof typeof globals & (
    | "mocha"
  ) | false = false,
  Processor extends object = object,
  Language extends object = object,
> {
  public abstract readonly scope: S;
  public abstract readonly processor: (Processor extends never
    ? object
    : Processor extends { readonly processor: infer P }
      ? string extends P
        ? object
        : { readonly processor: P }
      : object);
  public abstract readonly language: (Language extends never
    ? object
    : Language extends { readonly language: infer L }
      ? string extends L
        ? object
        : { readonly language: L }
      : object);
  constructor(
    public readonly parser: readonly unknown[] & { length: ParserCount },
    public readonly files: readonly string[],
    public readonly ignores: readonly string[],
    public readonly ruleset: Ruleset,
  ) {}

  public get configs(): readonly Configs.Scoped[] {
    const { files, ignores, ruleset } = this;

    if (ruleset.scope !== this.scope)
      throw new TypeError(`Scope mismatch between config "${this.scope} and inner ruleset "${ruleset.scope}"`);

    return files.length < 1
      ? [] as const
      : ruleset.ruleset.map(({ id, rules }) => ({
        name: `linted/${id}`,
        files,
        ignores,
        rules,
        ...this.option,
      } as const));
  }

  private get option() {
    try {
      const { languageOptions, processor, language } = this;

      return {
        languageOptions,
        ...processor,
        ...language,
      } as const;
    }
    catch (e) { throw new Error(`linted.factory.Option/scope:${this.scope}: option`, { cause: e }); }
  }

  protected abstract get languageOptions():
    (G extends never
      ? object
      : G extends boolean
        ? object
        : G extends string
          ? string extends G
            ? object
            : { readonly globals: Readonly<Record<string, unknown>> }
          : object
    ) & ParserOptions extends never
      ? object
      : ParserOptions extends boolean
        ? ParserOptions extends true
          ? { readonly parser: unknown }
          : object
        : { readonly parser: unknown; readonly parserOptions: ParserOptions };
}
