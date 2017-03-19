import { Map, List } from 'immutable';
import { AmountStore } from '../amount-store';
import { Amount, Metric } from '../amount';

interface TestMetric extends Metric {
  testProp: number;
}

describe('AmountStore', () => {

  const testMetricAmounts = new Amount(List<TestMetric>(), true);
  const answer:TestMetric = {
    total: 30,
    time: Date.now(),
    testProp: 40
  };
  testMetricAmounts.push(answer);
  const store = new AmountStore(Map<string, Amount<TestMetric>>());

  it('#constructor', () => {
    store.store = store.set('test', testMetricAmounts);
    expect(store.store.size).toBe(1);
  });

  it('#get', () => {
    const subject = store.get('test');
    expect(subject).toEqual(testMetricAmounts);
  });

  it('#getKeys', () => {
    console.log(store.getKeys());
  });

  it('#update', () => {
    const newMetric = {
      total: 44,
      time: Date.now(),
      testProp: 12
    };
    const newMetricAmt = new Amount(List<TestMetric>(), true);
    newMetricAmt.load = newMetricAmt.push(newMetric);
    const updated = store.update('test', newMetricAmt);
    expect(updated.get('test').first().total).toBe(44);
  });

});
