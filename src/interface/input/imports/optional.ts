export type OptionalImports<
  OptionalImport extends string,
> = Partial<
  Record<
    OptionalImport,
    {
      plugin: unknown;
      parser: unknown;
    }
  >
>;
