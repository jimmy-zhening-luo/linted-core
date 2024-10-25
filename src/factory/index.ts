export type { Scope, Input, Output } from "..";

import type { Input } from "..";
import { Files } from "./files";
import { Rulesets } from "./rulesets";

export Options from "./options";
export class Factory {
  public readonly files: Files;
  public readonly rulesets: Rulesets;

  constructor(
    files: Input["files"],
    rules: Input["rules"],
  ) {
    this.files = new Files(files);
    this.rulesets = new Rulesets(rules);
  }

  public produce(scope: string) {
    return [
      this.files.files(scope),
      this.rulesets.ruleset(scope),
    ] as const;
  }
}
