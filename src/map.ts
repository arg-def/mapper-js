import { pick } from '@arg-def/dot-notation';

import { ISource } from './interfaces';
import toArray from './utils/to-array';

const MAP_KEYS = Symbol('MAP_KEYS');
const MAP_VALUE = Symbol('MAP_VALUE');

export interface IMap {
  [MAP_KEYS]: any[];
  [MAP_VALUE]: any | any[];
  get: <T>(key: string | string[]) => IMap;
  transform: <T, V>(callback: (values: T[]) => V) => IMap;
  value: any | any[] | undefined | null;
}

/**
 * Map
 * @param {object} source
 */
const map = (source: ISource): IMap => ({
  [MAP_KEYS]: [],
  [MAP_VALUE]: undefined,
  get<T>(key: string | string[]): IMap {
    toArray(key).forEach(k => this[MAP_KEYS].push(pick(k, source)));

    this[MAP_VALUE] = this[MAP_KEYS].length > 1 ? (this[MAP_KEYS] as T[]) : (this[MAP_KEYS][0] as T);

    return this;
  },
  transform<T, V>(callback: (values: T[]) => V): IMap {
    this[MAP_VALUE] = callback(this[MAP_KEYS]) as V;

    return this;
  },
  get value(): any | any[] | undefined | null {
    const storedValue = this[MAP_VALUE];

    this[MAP_KEYS].length = 0;
    this[MAP_VALUE] = undefined;

    return storedValue;
  },
});

export default map;
