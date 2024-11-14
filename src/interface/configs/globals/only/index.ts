export type Only<Base extends object, This extends object> = This & Partial<Readonly<Record<Exclude<keyof Base, keyof This>, never>>>;
