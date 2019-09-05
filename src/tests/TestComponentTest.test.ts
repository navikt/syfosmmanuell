import { testFunction } from '../components/TestComponent';

test('basic', () => {
    expect(testFunction()).toBe(1);
})