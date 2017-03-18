# ammonite ![ammonite](media/ammonite.png)

[![Travis](https://img.shields.io/travis/Clickopolis/ammonite.svg?style=flat-square)]()
[![Coveralls](https://img.shields.io/coveralls/Clickopolis/ammonite.svg?style=flat-square)]()
[![npm](https://img.shields.io/npm/v/ammonite.svg?style=flat-square)]()
[![license](https://img.shields.io/github/license/Clickopolis/ammonite.svg?style=flat-square)]()

Ammonite is a small library made for incremental games.

## Features
- **Small** (under ~3Kb)
- **Immutable** leverages Immutable.js constructs
- **Functional** focuses on pure functions, helps ensure fewer side-effects

## Installation

`npm install ammonite --save`

## API

### `Amount`

Amount is a class that Ammonite uses to control metrics. Its constructor takes a `List` of an item that has the same subset of properties as `Metric` (see [Metric](#Metric) for more information).

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


### `Metric`

Metric is an interface that is F-bounded to `Amount`.

| Property | Type   | Optional? | Default |
|----------|--------|------------|------|
| `total`    | number | No |   |
| `time`     | number | Yes |    |

All generic types of `Amount` must extend from `Metric`. This is easy to do with `extends`.

```Typescript
interface Click extends Metric {
    total: number;
    doubleClick?: boolean;
}
```


## FAQ

### WTF is an Ammonite?
It's [this](https://www.google.com/search?q=ammonite&source=lnms&tbm=isch&sa=X&ved=0ahUKEwjU8vfRgODSAhUE9WMKHQyXDDwQ_AUICCgB&biw=892&bih=935).



Ammonite made by <a href="http://www.freepik.com" title="Freepik">Freepik</a> from <a href="http://www.flaticon.com" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a>
