import type { Defaults } from "./defaults";

export type Extensions<Scopes extends string> = (
  & {
    "*"?: Partial<Defaults<Scopes>["settings"]> & {
      override?: boolean;
      ignores?: Defaults<Scopes>["ignores"]["*"];
    };
  }
  & Partial<Record<
    Scopes,
    {
      files?: Defaults<Scopes>["files"][Scopes];
      ignores?: Defaults<Scopes>["ignores"][Scopes];
      rules?: Defaults<Scopes>["rules"][Scopes][number]["rules"];
    }
  >>
);
