import map, { MAP_SUPPRESS_ENTRY } from './map';

const source = {
  person: {
    name: {
      firstName: 'John',
      lastName: 'Doe',
    },
    address: [
      {
        street: 'Infinite Loop',
        city: 'Cupertino',
        state: 'CA',
        postalCode: 95014,
        country: 'United States',
      },
      {
        street: '1600 Amphitheatre',
        city: 'Mountain View',
        state: 'CA',
        postalCode: 94043,
        country: 'United States',
      },
    ],
  },
};

describe('map()', () => {
  it('should map simple values', () => {
    expect(map(source)('person.name').value).toEqual(source.person.name);
    expect(map(source)('person.address[0]').value).toEqual(source.person.address[0]);
    expect(map(source)('person.address[0].street').value).toEqual(source.person.address[0].street);
  });

  it('should map non existent values from source', () => {
    expect(map(source)('person.age').value).toEqual(undefined);
  });

  it('should flag to suppress null/undefined values', () => {
    expect(map(source)('person.age', { suppressNullUndefined: true }).value).toEqual(MAP_SUPPRESS_ENTRY);
  });

  it('should flag to suppress with custom suppression strategy', () => {
    const suppressionStrategy = (value: unknown): boolean => value === 'John';

    expect(map(source)('person.name.firstName', { suppressionStrategy }).value).toEqual(MAP_SUPPRESS_ENTRY);
  });

  it('should map and transform values', () => {
    expect(map(source)<string>('person.name').transform(name => `${name} ${name}`).value).toEqual(
      `${source.person.name} ${source.person.name}`,
    );

    expect(
      map(source)<number>('person.address[0]').transform((address: { postalCode: number }) => address.postalCode).value,
    ).toEqual(source.person.address[0].postalCode);
  });

  it('should map and transform multiple values', () => {
    expect(
      map(source)<string>(['person.name.firstName', 'person.name.lastName']).transform(
        (name: string, lastName: string) => `${name} ${lastName}`,
      ).value,
    ).toEqual(`${source.person.name.firstName} ${source.person.name.lastName}`);
  });
});
