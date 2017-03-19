# ammonite ![ammonite](media/ammonite.png)

[![Travis](https://img.shields.io/travis/Clickopolis/ammonite.svg?style=flat-square)]()
[![Coveralls](https://img.shields.io/coveralls/Clickopolis/ammonite.svg?style=flat-square)]()
[![npm](https://img.shields.io/npm/v/ammonite.svg?style=flat-square)]()
[![license](https://img.shields.io/github/license/Clickopolis/ammonite.svg?style=flat-square)]()
[![stability](https://img.shields.io/badge/stability-experimental-orange.svg?style=flat-square)]()

Ammonite is a small library made for incremental games.

## Features
- **Small** (under ~3Kb)
- **Immutable** leverages Immutable.js constructs
- **Functional** focuses on pure functions, helps ensure fewer side-effects

## Installation

```
npm install ammonite --save
```

## Usage

```Typescript
import { Amount, AmountStore, Metric, NewEntryOptions } from 'ammonite';
```

## API

### `Amount`

Amount is a class that Ammonite uses to control metrics. Its constructor takes a `List` of an item that has the same subset of properties as `Metric` (see [Metric](#Metric) for more information). It uses a list as an easy way to maintain a record of all values&mdash;in a lot of incremental games, this ability is often lost, as it simply mutates a single value over time.

| Property       | Type                   | Optional? | Default |
|----------------|------------------------|------------|----------|
| `load`           | `List<T extends Metric>` | No |      |
| `treatAsInteger` | boolean                | Yes | false |

- `load` is the `List`
- `treatAsInteger` will round the value after each evaluation

#### Methods
#### `Amount(load, treatAsInteger)`

This is the constructor function for the Amount class. Remember that it requires an interface which extends from Metric.

**Example**

```Typescript
interface Dogs {
  total: number;
  averageWoof: number;
  averageBark: number;
}
let dogs = new Amount(List<Dogs>(), true);
```

#### `getAll()`

Returns all items in the load.

### `first()`

Returns the first item in the load.

### `last()`

Returns the last item in the load.

### `current()`

Return the last item item in the load (alias for `last()`).

### `getSize()`

Returns the size of the load.

### `push(n: T)`

Pushes a new value to the load and returns the new load.

Note that the type of `n` must satisfy `T`, which is F-bounded to `Metric`.

### `includes(v: T)`

Returns a true if `v` is included in the load.
Returns false otherwise.

### `sort<C>(prop: string)`

Returns a new sorted `List`

- `C` generic corresponds to the type of the property
- `prop` is the property accessor for the `Metric` property

**Example**

```Typescript
amount.sort<number>(prop: 'total');

amount.sort<number>(prop: 'time');

amount.sort<string>(prop: 'alphabet');
```

### `increment(inc: number, opts: NewEntryOptions<T>)`

Increments the last value of the load and then returns a new load with the added value pushed onto it.

See [`NewEntryOptions<T>`](#newentryoptionst) for more information.

**Example**

```Typescript
amount.load = amount.increment(43);

amount.load = amount.increment(1.057, { exponential: true });
```

### `decrement(inc: number, opts: NewEntryOptions<T>)`

Same as increment, except it substracts the given value, i.e. `decrement(43)` would _subtract_ 43 from the most recent value.

### `Metric`

Metric is an interface that is F-bounded to `Amount`.

| Property | Type   | Optional? | Default |
|----------|--------|------------|------|
| `total`    | number | No |   |
| `time`     | number | Yes |    |
| [prop: string]     | any | Yes | |

All generic types of `Amount` must extend from `Metric`. This is easy to do with `extends`.

```Typescript
interface Click extends Metric {
    total: number;
    doubleClick?: boolean;
}
```

### `NewEntryOptions<T>`

NewEntryOptions is the interface for new additions via `increment` and `decrement`.

| Property | Type   | Optional? | Default |
|----------|--------|------------|------|
| `exponential`    | number | No |   |
| `extra`     | any | Yes |    |

- `exponential` determines whether the increment number is treated as an exponential
- `extra` is for additional metadata that may be required

## FAQ

### WTF is an Ammonite?
It's [this](https://www.google.com/search?q=ammonite&source=lnms&tbm=isch&sa=X&ved=0ahUKEwjU8vfRgODSAhUE9WMKHQyXDDwQ_AUICCgB&biw=892&bih=935).


<p align="center">
<small><code>Ammonite made by <a href="http://www.freepik.com" title="Freepik">Freepik</a> from <a href="http://www.flaticon.com" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></code></small>
</p>
