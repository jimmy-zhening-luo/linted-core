declare type OmitFilesRuleset<A> = A extends readonly [unknown, unknown, ...infer An_1] ? An_1 : never;
