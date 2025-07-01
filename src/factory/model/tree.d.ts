export type ITree<
  Scope extends string,
> = Array<
  readonly [
    Scope,
    readonly Scope[],
  ]
>;
