import type { Globals } from "./globals";

export type LanguageOptions<
  ParserOptions extends object | boolean,
  GlobalTypes extends Globals | false,
> =
 & (GlobalTypes extends never
   ? object
   : GlobalTypes extends false
     ? object
     : { globals: Record<string, unknown> }
)
& (
    ParserOptions extends never
      ? object
      : ParserOptions extends boolean
        ? ParserOptions extends true
          ? { parser: unknown }
          : object
        : { parser: unknown; parserOptions: ParserOptions }
 );
