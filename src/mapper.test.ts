import { ISource } from './interfaces';
import { IMap } from './map';
import mapper from './mapper';

const kebabCase = (str: string) =>
  str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/\s+/g, '-')
    .toLowerCase();

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

describe('mapper()', () => {
  it('should throw an error when source type is not an object', () => {
    const mapping = mapper.mapping((map: IMap) => ({
      address: map.get<object[]>('person.address').value,
      active: true,
    }));

    expect(() => mapper([], mapping)).toThrow(TypeError);
  });

  it('should map source against mapping definitions', () => {
    const mapping = mapper.mapping((map: IMap) => ({
      id: map
        .get<string>('person.name')
        .transform<ISource, string>(([{ firstName, lastName }]) => kebabCase(`${firstName} ${lastName}`)).value,
      'person.name': map.get<string>('person.name.firstName').value,
      'person.lastName': map.get<string>('person.lastName').value,
      address: map.get<object[]>('person.address').value,
      defaultAddress: map.get<object>('person.address[0]').value,
    }));

    const expectedMap = {
      id: kebabCase(`${source.person.name.firstName} ${source.person.name.lastName}`),
      person: {
        name: source.person.name.firstName,
        lastName: source.person.lastName,
      },
      address: source.person.address,
      defaultAddress: source.person.address[0],
    };

    expect(mapper(source, mapping)).toStrictEqual(expectedMap);
  });
});
