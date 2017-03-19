import { List } from 'immutable';
import { Amount, Metric, NewEntryOptions } from '../amount';

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

  it('#clone', () => {
    const clone = amount.clone();
    expect(clone).toEqual(amount);
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
    const subject = new Amount(List<Chicken>(), true);
    subject.load = amount.push(answer);
    subject.load = amount.push(answer);
    expect(amount.getSize()).toBe(3);
  });

  it('#sort', () => {
    const newChicken:Chicken = {
      total: -45,
      time: Date.now(),
      featherWeight: 67
    };
    amount.load = amount.push(newChicken);
    amount.load = amount.sort<number>('total');
    expect(amount.first()).toEqual(newChicken);
  });

  it('#sum', () => {
    const subject = amount.sum('total');
    expect(subject).toBe(45);
    const subject2 = amount.sum();
    expect(subject).toBe(45);
  });

  it('#average', () => {
    const subject = amount.average();
    expect(subject).toBe(11.25);
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
