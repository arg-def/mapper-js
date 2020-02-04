import { ISource, IMap } from '../interfaces';
import mapper from '../mapper';

const kebabCase = (str: string) =>
  str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/\s+/g, '-')
    .toLowerCase();

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

describe('mapper()', () => {
  it('should throw an error when source type is not an object', () => {
    const mapping = mapper.mapping((map: IMap) => ({
      address: map<object[]>('person.address').value,
      active: true,
    }));

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(() => mapper([] as any, mapping)).toThrow(TypeError);
  });

  it('should map source against mapping definitions', () => {
    const mapping = mapper.mapping((map: IMap) => ({
      id: map<string>('person.name').transform(({ firstName, lastName }) => kebabCase(`${firstName} ${lastName}`))
        .value,
      'person.name': map<string>('person.name.firstName').value,
      'person.lastName': map<string>('person.name.lastName').value,
      address: map<object[]>('person.address').value,
      defaultAddress: map<object>('person.address[0]').value,
    }));

    interface IExpected {
      id: string;
      person: {
        name: string;
        lastName: string;
      };
      address: object;
      defaultAddress: object;
    }

    const expectedMap = {
      id: kebabCase(`${source.person.name.firstName} ${source.person.name.lastName}`),
      person: {
        name: source.person.name.firstName,
        lastName: source.person.name.lastName,
      },
      address: source.person.address,
      defaultAddress: source.person.address[0],
    };

    expect(mapper<IExpected>(source, mapping)).toStrictEqual(expectedMap);
  });

  describe('behaviour as per configuration', () => {
    it('should remove null/undefined values from mapping', () => {
      const suppressionStrategy = (address: ISource<number>): boolean => address && address.postalCode === 95014;

      const mapping = mapper.mapping((map: IMap) => ({
        'person.name': map<string>('person.name.firstName').value,
        'person.age': map<string>('person.age').value,
        'person.gender': map<string>('person.gender', { suppressNullUndefined: false }).value,
        address: map<string>('person.address[0]', { suppressionStrategy }).value,
        businessAddress: map<string>('person.address[2]', { suppressionStrategy, suppressNullUndefined: false }).value,
        deliveryAddress: map<string>('person.address[3]', { suppressionStrategy }).value,
      }));

      interface IExpected {
        person: {
          name: string;
          gender: string;
        };
        businessAddress: object;
      }

      const expectedMap = {
        person: {
          name: source.person.name.firstName,
          gender: undefined as string,
        },
        businessAddress: undefined as object,
      };

      expect(
        mapper<IExpected>(source, mapping, { suppressNullUndefined: true }),
      ).toStrictEqual(expectedMap);
    });
  });
});
