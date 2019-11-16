import { ISource } from './interfaces';
import map, { MAP_SUPPRESS_ENTRY } from './map';

const source: ISource = {
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
    expect(map(source).get('person.name').value).toEqual(source.person.name);
    expect(map(source).get('person.address[0]').value).toEqual(source.person.address[0]);
    expect(map(source).get('person.address[0].street').value).toEqual(source.person.address[0].street);
  });

  it('should map non existent values from source', () => {
    expect(map(source).get('person.age').value).toEqual(undefined);
  });

  it('should flag to suppress null/undefined values', () => {
    expect(map(source).get('person.age', { suppressNullUndefined: true }).value).toEqual(MAP_SUPPRESS_ENTRY);
  });

  it('should flag to suppress with custom suppression strategy', () => {
    const suppressionStrategy = (value: unknown): boolean => value === 'John';

    expect(map(source).get('person.name.firstName', { suppressionStrategy }).value).toEqual(MAP_SUPPRESS_ENTRY);
  });

  it('should map and transform values', () => {
    expect(
      map(source)
        .get<string>('person.name')
        .transform<string, string>(([name]) => `${name} ${name}`).value,
    ).toEqual(`${source.person.name} ${source.person.name}`);

    expect(
      map(source)
        .get<ISource>('person.address[0]')
        .transform<ISource, number>(([address]) => address.postalCode).value,
    ).toEqual(source.person.address[0].postalCode);
  });

  it('should map and transform multiple values', () => {
    expect(
      map(source)
        .get<string>(['person.name', 'person.lastName'])
        .transform<string, string>(([name, lastName]) => `${name} ${lastName}`).value,
    ).toEqual(`${source.person.name} ${source.person.lastName}`);
  });
});
