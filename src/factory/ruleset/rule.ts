import type { Input } from "@eslinted/core/input";

export class Rule {
  constructor(
    public readonly id: string,
    public readonly rules: Input["rules"]["rules"]["html"][number][1],
  ) {}
}
