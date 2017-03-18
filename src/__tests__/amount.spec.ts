import { List } from 'immutable';
import { Amount, Metric } from '../amount';

interface Chicken extends Metric {
  total: number;
  time: number;
  featherWeight: number;
}

describe('Amount class', () => {

  const amount = new Amount(List<Chicken>(), true);
  const answer:Chicken = {
    total: 30,
    time: Date.now(),
    featherWeight: 23
  };

  it('#constructor', () => {
    const subject = new Amount(List<Chicken>(), true);
    expect(subject.load.size).toBe(0);
    expect(subject.treatAsInteger).toBe(true);
  });

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

  it('#size', () => {
    amount.load = amount.push(answer);
    amount.load = amount.push(answer);
    expect(amount.getSize()).toBe(2);
  });

  it('#includes', () => {
    amount.load = amount.push(answer);
    expect(amount.includes(answer)).toBe(true);
  });

  it('#increment', () => {
    amount.load = amount.push(answer);
    amount.load = amount.increment(30);
    expect(amount.load.last().total).toBe(60);
  });

  it('#decrement', () => {
    amount.load = amount.push(answer);
    amount.load = amount.decrement(30);
    expect(amount.load.last().total).toBe(0);
  });

});
