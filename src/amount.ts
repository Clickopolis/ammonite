import { List } from 'immutable';

interface Metric {
  total: number;
  time: number;
  [extra: string]: any;
}

export interface Amount<T extends Metric> {
  load: List<T>;
  treatAsInteger: boolean;
}


export const increment = (original: number, inc: number) => {
  return original + inc;
};

export const incrementByPower = (original: number, exponent: number = 1.07) => {
  return Math.pow(original, exponent);
};

interface IncrementOptions<T> {
  exponential: boolean;
  extra: any;
}

type DecrementOptions<T> = IncrementOptions<T>;

export class Amount<T extends Metric> implements Amount<T> {
  constructor(load: List<T>, treatAsInteger: boolean = false) {
    this.load = load;
    this.treatAsInteger = treatAsInteger;
  }

  first():T | undefined {
    return this.load.first();
  }

  last():T | undefined {
    return this.load.last();
  }

  push(n: T):void {
    this.load.push(n);
  }

  includes(v: T):boolean {
    return this.load.includes(v);
  }

  incremenet(inc: number, opts: IncrementOptions<T>) {
    const newAmount = opts.exponential ?
                      Math.pow(this.load.last().total, inc) :
                      this.load.last().total + inc;
    const newEntry:Metric = {
      total: newAmount,
      time: Date.now(),
    };
    this.load.push(<T>newEntry);
  }

  decrement(inc: number, opts: DecrementOptions<T>) {
    const newAmount = opts.exponential ?
                      Math.pow(this.load.last().total, inc) :
                      this.load.last().total - inc;
    const newEntry:Metric = {
      total: newAmount,
      time: Date.now(),
    };
    this.load.push(<T>newEntry);
  }


}
