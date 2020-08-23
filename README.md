# typescript-extensions
> A mostly bad use of monkey patching to extend global types in TypeScript

This module aims to extend the global built-in types in TypeScript (namely `String` and `Array`). Some may ask "is this good practice?", the answer is "no". Some may also ask "does it make it easier more fun to write code", the answer is "100%". For example, say you want to filter out any nullable (that is, `undefined` and `null` values) of an array and then determine if any values remain. This is the code using no extensions:
```typescript
const names = [ "Tatum", "Mike", undefined, "Jeremy", null, "Andrew", undefined ];
const hasNames = names.filter((name) => name !== undefined && name !== null).length !== 0
```

With global type extensions, the code becomes much clearer:
```typescript
const names = [ "Tatum", "Mike", undefined, "Jeremy", null, "Andrew", undefined ];
const hasNames = names.filterNotNone().isNotEmpty();
```

Another classic example is array indexing. TypeScript decided to leave array indexing unsafe in the sense that accessing an array index with no value returns `undefined` at run-time but the compiler infers a non-nullable type:
```typescript
const names = [ "Tatum", "Mike", "Jeremy", "Andrew" ];
const secondName = names[1]; // OK => "Mike"
const sixthName = names[5]; // OK => undefined
const sixthNameIncludesMik = sixthName.includes("Mik"); // BAD => TypeError: Cannot read property 'includes' of undefined
```

With `Array.at(number)`, you can leverage the type system safely since TypeScript knows that array indexing using `at` is a nullable type at compile-time forcing you to chain optionals:
```typescript
const names = [ "Tatum", "Mike", "Jeremy", "Andrew" ];
const secondName = names.at(1); // OK => "Mike"
const sixthName = names.at(5); // OK => undefined
// const sixthNameIncludesMik = sixthName.includes("Mik"); // Object is possibly 'undefined'.ts(2532)
const sixthNameIncludesMik = sixthName?.includes("Mik"); // OK => undefined
```

Another extremely common use case is to retrieve the first or last element of an array. Again, since array indexing is unsafe by default, it can become cumbersome to write safe code for this:
```typescript
const names = [ "Tatum", "Mike", "Jeremy", "Andrew" ];
const predicate = (name: string) => name.length > 3 && name.includes("Mik")
const firstNameIncludesMik = names[0] && names[0].includes("Mik");
const lastNameIncludesMik = names[names.length - 1] && names[names.length - 1].includes("Mik");
const namesThatSatisfyPredicate = names.filter(predicate)
const lastNameThatSatisfiesPredicate = namesThatSatisfyPredicate[namesThatSatisfyPredicate.length - 1];
const runTimeUnsafe = lastNameThatSatisfiesPredicate.includes("T"); // BAD => Oops, forgot to check for undefined here, crashes at run-time
```

```typescript
const names = [ "Tatum", "Mike", "Jeremy", "Andrew" ];
const predicate = (name: string) => name.length > 3 && name.includes("Mik")
const firstNameIncludesMik = names.first()?.includes("Mik");
const lastNameIncludesMik = names.last()?.includes("Mik");
const lastNameThatSatisfiesPredicate = names.last(predicate);
const compileTimeSafe = lastNameThatSatisfiesPredicate?.includes("T"); // OK => undefined
```
