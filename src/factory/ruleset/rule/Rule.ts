import type Input from "../../../boundary/input/input.js";

export default class {
  constructor(
    public readonly id: string,
    public readonly rules: Input.Rules.Entry.Object,
  ) {}
}
