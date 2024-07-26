import type { Input } from "../../../boundary/boundary.js";

export default class {
  constructor(
    public readonly id: string,
    public readonly rules: Input.Rules.Preset.Entry.Object,
  ) {}
}
