export type {
  Scope,
  Input,
  ScopedConfig,
  RuleEntry,
  RuleRecord,
} from "..";

import { Files } from "./files";
import { Rulesets } from "./rulesets";
import Options from "./options";

export { Options };
export class Factory {
  public readonly files: Files;
  public readonly rulesets: Rulesets;

  constructor(
    files: ConstructorParameters<typeof Files>[0],
    rules: ConstructorParameters<typeof Rulesets>[0],
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
