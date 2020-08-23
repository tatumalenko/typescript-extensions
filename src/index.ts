/* eslint-disable func-names */
/* eslint-disable no-extend-native */
import "../index.d.ts";

export function notUndefined<T>(x: T | undefined): x is T {
    return x !== undefined;
}

export function notNull<T>(x: T | null): x is T {
    return x !== null;
}

export function notNone<T>(x: T | undefined | null): x is T {
    return notUndefined(x) && notNull(x);
}

Array.prototype.isEmpty = function<T> (this: T[]): boolean {
    return this.length === 0;
};

Array.prototype.flatMap = function<T, E> (this: T[], mapper: (element: T) => E[]): E[] {
    let array: E[] = [];
    for (const e of this) {
        array = array.concat(mapper(e));
    }
    return array;
};

Array.prototype.first = function<T> (this: T[], filter?: (element: T) => boolean): T | undefined {
    const results = this.filter((e: T) => {
        if (filter) {
            return filter(e);
        }
        return true;
    });
    return results.length > 0 ? results[0] : undefined;
};

Array.prototype.last = function<T> (this: T[]): T | undefined {
    const size = this.length;
    if (size > 0) {
        return this[size - 1];
    }
    return undefined;
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
