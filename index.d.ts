export function notUndefined<T>(x: T | undefined): x is T;
export function notNull<T>(x: T | null): x is T;
export function notNone<T>(x: T | undefined | null): x is T;
declare global {
    interface Array<T> {
        isEmpty(this: T[]): boolean;
        flatMap<E>(this: T[], mapper: (element: T) => E[]): E[];
        first(this: T[], filter?: (element: T) => boolean): T | undefined;
        last(this: T[]): T | undefined;
        includesAny(this: T[], of: T[]): boolean;
        filterNotNone(this: (T | undefined | null)[]): NonNullable<T>[];
        at(this: T[], index: number): T | undefined;
    }
    interface String {
        isEmpty(this: string): boolean;
        includesAny(this: string, of: string[]): boolean;
        splitOnceLast(this: string, using: string): [string, string];
    }
}
