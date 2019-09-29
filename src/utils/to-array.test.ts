import toArray from './to-array';

describe('utils/toArray()', () => {
  it('should convert non array value to array', () => {
    const source = 'bacon cheeseburger';

    expect(toArray(source)).toStrictEqual([source])
  });

  it('should return value when its type is an array', () => {
    const source = ['bacon cheeseburger'];

    expect(toArray(source)).toStrictEqual(source)
  })
});