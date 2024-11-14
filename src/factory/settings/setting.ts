import globals from "globals";
import type { Scopes } from "../..";

export abstract class ScopeSetting<
  S extends Scopes,
  ParserOptions extends
  | object
  | boolean = false,
  ParserCount extends 0 | 1 | 2 = ParserOptions extends false ? 0 : 1,
  G extends keyof typeof globals | false = false,
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
  constructor(public readonly parser: readonly unknown[] & { length: ParserCount }) {}

  public get option() {
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

  protected globals(global: G & keyof typeof globals) {
    if (typeof global === "boolean")
      throw new TypeError("`global` must be a string key of `globals` package");

    return globals[global];
  }
}
