import globals from "globals";
import type {
  Scopes,
  ScopeConfig,
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
    public readonly parser: unknown[] & { length: ParserCount },
    public readonly files: string[],
    public readonly ignores: string[],
    public readonly ruleset: Ruleset,
  ) {}

  public get configs(): readonly ScopeConfig[] {
    const {
      scope,
      files,
      ignores,
      ruleset,
      option,
    } = this;

    if (ruleset.scope !== scope)
      throw new TypeError(`Scope mismatch between option and ruleset`, { cause: { option: scope, ruleset: ruleset.scope } });

    return files.length < 1
      ? []
      : ruleset.ruleset.map(({ id, rules }) => {
        return {
          name: `linted/${id}`,
          files,
          ignores,
          rules,
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
      } satisfies OptionProto<
        ParserOptions,
        G,
        Processor,
        Language
      >;
    }
    catch (e) { throw new Error(`linted.factory.Option/scope:${this.scope}: option`, { cause: e }); }
  }

  protected abstract get languageOptions(): OptionProto<ParserOptions, G, Processor, Language>["languageOptions"];

  protected globals(group: G) {
    if (typeof group !== "string")
      throw new TypeError(`Expected string`);

    return globals[group];
  }
}
export type OptionProto<
  ParserOptions extends
  | object
  | boolean,
  G extends string | boolean,
  Processor extends object,
  Language extends object,
> = (
{ readonly languageOptions: (G extends never
  ? object
  : G extends boolean
    ? object
    : G extends string
      ? string extends G
        ? object
        : { readonly globals: Record<string, unknown> }
      : object
)
& (
   ParserOptions extends never
     ? object
     : ParserOptions extends boolean
       ? ParserOptions extends true
         ? { readonly parser: unknown }
         : object
       : { readonly parser: unknown; parserOptions: ParserOptions }
); }
& (
    Processor extends never
      ? object
      : Processor extends { readonly processor: infer P }
        ? string extends P
          ? object
          : { readonly processor: P }
        : object
    )
    & (
    Language extends never
      ? object
      : Language extends { readonly language: infer L }
        ? string extends L
          ? object
          : { readonly language: L }
        : object
    )
);
