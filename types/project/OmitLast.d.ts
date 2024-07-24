declare type OmitFirst<A> = A extends readonly [unknown, ...infer An_1] ? An_1 : never;
