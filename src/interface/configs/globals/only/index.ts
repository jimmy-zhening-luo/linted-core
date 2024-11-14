export type Only<
  Base extends object,
  This extends object,
> = This & Readonly<Partial<Record<Exclude<keyof Base, keyof This>, never>>>;
