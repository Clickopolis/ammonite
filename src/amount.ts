import { List } from 'immutable';

interface Metric {
  total: number;
  time: number;
}

export interface Amount<T extends Metric> {
  load: List<T>;
  treatAsInteger: boolean;
}

interface IncrementOptions<T> {
  exponential?: boolean;
  extra?: any;
}

type DecrementOptions<T> = IncrementOptions<T>;

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
    return this.last();
  }

  push(n: T):void {
    this.load.push(n);
  }

  includes(v: T):boolean {
    return this.load.includes(v);
  }

  sortBy(prop: string) {
    return this.load.sortBy(metric => metric[prop]);
  }

  incremenet(inc: number, opts: IncrementOptions<T>) {
    const newAmount = opts.exponential ?
                      Math.pow(this.load.last().total, inc) :
                      this.load.last().total + inc;
    const newEntry:Metric = {
      total: this.treatAsInteger ? Math.round(newAmount) : newAmount,
      time: Date.now(),
    };
    this.load.push(<T>newEntry);
  }

  decrement(inc: number, opts: DecrementOptions<T>) {
    const newAmount = opts.exponential ?
                      Math.pow(this.load.last().total, inc) :
                      this.load.last().total - inc;
    const newEntry:Metric = {
      total: this.treatAsInteger ? Math.round(newAmount) : newAmount,
      time: Date.now(),
    };
    this.load.push(<T>newEntry);
  }


}
