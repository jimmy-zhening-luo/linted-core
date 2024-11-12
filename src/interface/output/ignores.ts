import type { ConfigProperty } from "..";

export type GlobalConfigIgnores = Partial<Record<
  Exclude<
    ConfigProperty,
    | "name"
    | "ignores"
  >,
  never
>> & {
  name: "linted/global/ignores";
  ignores: string[];
};
