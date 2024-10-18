import type { Input } from ".";

export class Rule {
  constructor(
    public readonly id: string,
    public readonly rules: Input["rules"]["rules"]["html"][number][1],
  ) {}
}
