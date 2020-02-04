import { MAP_SUPPRESS_ENTRY } from '../../map';

import suppress from '../suppress-entries';

describe('utils/suppressEntries()', () => {
  it('should suppress flagged entries', () => {
    const source = {
      name: 'John',
      lastName: 'Doe',
      age: undefined as string,
      gender: MAP_SUPPRESS_ENTRY,
    };

    const expects = {
      name: 'John',
      lastName: 'Doe',
      age: undefined as string,
    };

    expect(suppress(source)).toStrictEqual(expects);
  });
});
