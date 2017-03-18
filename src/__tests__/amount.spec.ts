import { List } from 'immutable';
import { Amount, Metric } from '../amount';

interface Chickens extends Metric {
  total: number;
  time: number;
  featherWeight: number;
}

describe('Amount class', () => {

  const amount = new Amount(List<Chickens>(), true);
  const answer:Chickens = {
    total: 30,
    time: Date.now(),
    featherWeight: 23
  };

  it('#getAll()', () => {
    const subject = amount.getAll();
    expect(subject.size).toBe(0);
  });

  it('#first()', () => {
    amount.load = amount.push(answer);
    expect(amount.first()).toEqual(answer);
  });

  it('#last', () => {
    amount.load = amount.push(answer);
    expect(amount.last()).toEqual(answer);
  });

  it('#current', () => {
    amount.load = amount.push(answer);
    expect(amount.last()).toEqual(answer);
  });

  it('#increment', () => {
    amount.load = amount.push(answer);
    amount.load = amount.increment(30, { exponential: false });
    expect(amount.load.last().total).toBe(60);
  });

});
