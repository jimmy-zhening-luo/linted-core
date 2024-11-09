import type { ConfigProperty } from "..";

export type GlobalConfigIgnores = Partial<Record<
  Exclude<
    ConfigProperty,
    "ignores"
  >,
  never
>> & {
  ignores: string[];
};
