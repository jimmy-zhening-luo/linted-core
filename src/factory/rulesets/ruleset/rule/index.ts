import type { Input } from "../../../../boundary/index.js";

export default class {
  constructor(
    public readonly id: string,
    public readonly rules: Input.Rules.RuleBase.RuleEntry.RuleObject,
  ) {}
}
