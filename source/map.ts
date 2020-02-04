import toArray from '../src/utils/to-array';
import { pick } from '@arg-def/dot-notation';

const map = (source: any) => <T>(key: string | string[]) => {
  const MAP_KEYS = toArray(key).map(k => pick(k, source));

  //return MAP_KEYS.length > 1 ? MAP_KEYS : MAP_KEYS[0];

  return {
    transform(callback: (...args: unknown[]) => T): T {
      return callback(1);
    },
  };
};

const mapp = map({ person: { name: 'John Doe' } });

mapp<string>('person.name');

export default map;
