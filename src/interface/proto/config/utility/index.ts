import type { Config } from "..";

export type PickConfig<
  Name extends Config["name"],
  Picks extends Exclude<
    keyof Config,
    | "name"
    | keyof Rest
  >,
  Plugins extends string = string,
  Rest extends object = object,
> = (
  & Rest
  & Pick<Config<Plugins>, Picks>
  & { name: Name }
  & Partial<Record<
    Exclude<
      keyof Config,
      | "name"
      | keyof Rest
      | Picks
    >,
    never
  >>
);
