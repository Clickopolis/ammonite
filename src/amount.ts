interface Metric {
  number: number;
  time: number;
  [extra: string]: any;
}

export interface Amount<T> {
  load: Array<T>;
  treatAsInteger: boolean;
}

export class Amount<T> implements Amount<T> {
  constructor(load: Array<T>, treatAsInteger: boolean = false) {
    this.load = load;
    this.treatAsInteger = treatAsInteger;
  }

  getFirst() {
    return this.load[0];
  }

  getCurrent() {
    return this.load[this.load.length - 1];
  }




}
