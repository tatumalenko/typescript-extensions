/* eslint-disable func-names */
/* eslint-disable no-extend-native */

export function notUndefined<T>(x: T | undefined): x is T {
    return x !== undefined;
}

export function notNull<T>(x: T | null): x is T {
    return x !== null;
}

export function notNone<T>(x: T | undefined | null): x is T {
    return notUndefined(x) && notNull(x);
}

declare global {
    interface Array<T> {
        isEmpty(this: T[]): boolean;
        isNotEmpty(this: T[]): boolean;
        flatMap<E>(this: T[], mapper: (element: T) => E[]): E[];
        first(this: T[], predicate?: (element: T) => boolean): T | undefined;
        last(this: T[], predicate?: (element: T) => boolean): T | undefined;
        includesAny(this: T[], of: T[]): boolean;
        filterNotNone(this: (T | undefined | null)[]): NonNullable<T>[];
        at(this: T[], index: number): T | undefined;
    }
    interface String {
        isEmpty(this: string): boolean;
        isNotEmpty(this: string): boolean;
        includesAny(this: string, of: string[]): boolean;
        splitOnceLast(this: string, using: string): [string, string];
    }
}

Array.prototype.isEmpty = function<T> (this: T[]): boolean {
    return this.length === 0;
};

Array.prototype.isNotEmpty = function<T> (this: T[]): boolean {
    return !this.isEmpty();
};

Array.prototype.flatMap = function<T, E> (this: T[], mapper: (element: T) => E[]): E[] {
    let array: E[] = [];
    for (const e of this) {
        array = array.concat(mapper(e));
    }
    return array;
};

Array.prototype.first = function<T> (this: T[], predicate?: (element: T) => boolean): T | undefined {
    const results = this.filter((e: T) => {
        if (predicate) {
            return predicate(e);
        }
        return true;
    });
    return results[0];
};

Array.prototype.last = function<T> (this: T[], predicate?: (element: T) => boolean): T | undefined {
    const results = this.filter((e: T) => {
        if (predicate) {
            return predicate(e);
        }
        return true;
    });
    return results[results.length - 1];
};

Array.prototype.includesAny = function<T> (this: T[], of: T[]): boolean {
    return this.isEmpty() ? false : this.some((e) => of.includes(e));
};

Array.prototype.filterNotNone = function<T> (this: (T | undefined | null)[]): NonNullable<T>[] {
    return this.filter(notNone) as NonNullable<T>[];
};

Array.prototype.at = function<T> (this: T[], index: number): T | undefined {
    return this.length - 1 >= index ? this[index] : undefined;
};

String.prototype.isEmpty = function (this: string): boolean {
    return this.length === 0;
};

String.prototype.isNotEmpty = function (this: string): boolean {
    return !this.isEmpty();
};

String.prototype.includesAny = function (this: string, of: string[]): boolean {
    return of.some((e) => this.includes(e));
};

String.prototype.splitOnceLast = function (this: string, using: string): [ string, string ] {
    const lastIndex = this.lastIndexOf(using);

    if (lastIndex === -1 || this.length === 0) {
        return [ this, "" ];
    }

    return [
        this.substring(0, lastIndex),
        this.substring(lastIndex + 1, this.length)
    ];
};
