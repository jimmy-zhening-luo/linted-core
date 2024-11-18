export type Imports<Parsers extends string> = Readonly<Record<
  "parsers",
  Readonly<Record<
    Parsers,
    unknown
  >>
>>;
