import type { EcmaVersion } from "./ecma";
import type { SourceType } from "./source";

export type LanguageOptions<
  IsEcma extends boolean,
  ParserOptions extends object | boolean,
  GlobalTypes extends string,
> =
 & (Truth<IsEcma> extends never ? object : { ecmaVersion: EcmaVersion; sourceType: SourceType })
 & (literalful<GlobalTypes> extends never ? object : { globals: Record<string, unknown> })
 & (
    ParserOptions extends boolean
      ? Truth<ParserOptions> extends never
        ? object
        : { parser: unknown }
      : ParserOptions extends object
        ? Interface<ParserOptions> extends never
          ? object
          : { parser: unknown; parserOptions: ParserOptions }
        : object
  );
