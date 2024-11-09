export type {
  Scope,
  Input,
  ScopedConfig,
  RuleEntry,
  RuleRecord,
} from "..";

import { Files } from "./files";
import { Ignores } from "./ignores";
import { Rules } from "./rules";
import Options from "./options";

export { Options };
export class Factory {
  public readonly files: Files;
  public readonly ignores: Ignores;
  public readonly rules: Rules;

  constructor(
    files: ConstructorParameters<typeof Files>[0],
    ignores: ConstructorParameters<typeof Ignores>[0],
    rules: ConstructorParameters<typeof Rules>[0],
  ) {
    this.files = new Files(files);
    this.ignores = new Ignores(ignores);
    this.rules = new Rules(rules);
  }

  public produce(scope: string) {
    return [
      this.files.files(scope),
      this.ignores.ignores(scope),
      this.rules.rules(scope),
    ] as const;
  }
}
