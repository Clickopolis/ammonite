import { Map, List, Iterable, Iterator } from 'immutable';
import { Amount, Metric } from './amount';

export interface AmountStore<K, V extends Metric> {
  store: Map<K, Amount<V>>;
}

export class AmountStore<K, V extends Metric> implements AmountStore<K, V> {
  constructor(store: Map<K, Amount<V>>) {
    this.store = store;
  }

  get(key: K):Amount<V> {
    return this.store.get(key);
  }

  set(key: K, value: Amount<V>):Map<K, Amount<V>> {
    return this.store.set(key, value);
  }

  getKeys():Iterator<K> {
    return this.store.keys();
  }

  update(key: K, newValue: Amount<V>):Map<K, Amount<V>> {
    return this.store.update(key, value => newValue);
  }

  forEach(sideEffect: (value: Amount<V>, key: K, iter: Iterable<K, Amount<V>>) => any):number {
    return this.store.forEach(sideEffect);
  }

  getStore() {
    return this.store;
  }
}
