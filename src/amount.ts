import { List, Iterable } from 'immutable';

export interface Metric {
  total: number;
  time: number;
}

export interface Amount<T extends Metric> {
  load: List<T>;
  treatAsInteger: boolean;
}

export interface IncrementOptions<T> {
  exponential?: boolean;
  extra?: any;
}

export type DecrementOptions<T> = IncrementOptions<T>;

export class Amount<T extends Metric> implements Amount<T> {
  constructor(load: List<T>, treatAsInteger: boolean = false) {
    this.load = load;
    this.treatAsInteger = treatAsInteger;
  }

  getAll():List<T> {
    return this.load;
  }

  first():T | undefined {
    return this.load.first();
  }

  last():T | undefined {
    return this.load.last();
  }

  current():T | undefined {
    return this.load.last();
  }

  push(n: T):List<T> {
    return this.load.push(n);
  }

  includes(v: T):boolean {
    return this.load.includes(v);
  }

  sortBy(prop: string):Iterable<number, T> {
    return this.load.sortBy((metric:any) => metric[prop]);
  }

  increment(inc: number, opts: IncrementOptions<T>):List<T> {
    const newAmount = opts.exponential ?
                      Math.pow(this.load.last().total, inc) :
                      this.load.last().total + inc;
    const newEntry:Metric = {
      total: this.treatAsInteger ? Math.round(newAmount) : newAmount,
      time: Date.now(),
    };
    return this.push(<T>newEntry);
  }

  decrement(inc: number, opts: DecrementOptions<T>):List<T> {
    const newAmount = opts.exponential ?
                      Math.pow(this.load.last().total, inc) :
                      this.load.last().total - inc;
    const newEntry:Metric = {
      total: this.treatAsInteger ? Math.round(newAmount) : newAmount,
      time: Date.now(),
    };
    return this.push(<T>newEntry);
  }


}
