import type { Defaults } from "./defaults";

export type * from "./defaults";
export type Extensions<Scopes extends string> = (
  & {
    readonly "*"?: Partial<Defaults<Scopes>["settings"]> & {
      readonly override?: boolean;
      readonly ignores?: Defaults<Scopes>["ignores"]["*"];
    };
  }
  & Partial<Record<
    Scopes,
    {
      readonly files?: Defaults<Scopes>["files"][Scopes];
      readonly ignores?: Defaults<Scopes>["ignores"][Scopes];
      readonly rules?: Defaults<Scopes>["rules"][Scopes][number][1];
    }
  >>
);
