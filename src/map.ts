/* eslint-disable @typescript-eslint/no-explicit-any */
import { pick } from '@arg-def/dot-notation';

import { IMapperOptions, ISource } from './interfaces';
import toArray from './utils/to-array';

const MAP_SETTINGS = Symbol('MAP_SETTINGS');
const MAP_KEYS = Symbol('MAP_KEYS');
const MAP_VALUE = Symbol('MAP_VALUE');
const MAP_SUPPRESS_ENTRY = Symbol('MAP_SUPPRESS_ENTRY');

const defaultOptions: Required<IMapperOptions> = {
  suppressNullUndefined: false,
  suppressionStrategy: () => false,
};

export interface IMap {
  [MAP_SETTINGS]: Required<IMapperOptions>;
  [MAP_KEYS]: any[];
  [MAP_VALUE]: any | any[];
  get: <T>(key: string | string[], options?: IMapperOptions) => IMap;
  transform: <T, V>(callback: (values: Partial<T>[]) => V) => IMap;
  value: any | any[] | undefined | null;
}

/**
 * Map
 * @param {object} source
 * @param {object} mapperOptions
 */
const map = (source: ISource, mapperOptions?: IMapperOptions): IMap => ({
  [MAP_SETTINGS]: defaultOptions,
  [MAP_KEYS]: [],
  [MAP_VALUE]: undefined,
  get<T>(key: string | string[], options?: IMapperOptions): IMap {
    toArray(key).forEach(k => this[MAP_KEYS].push(pick(k, source)));

    this[MAP_SETTINGS] = { ...this[MAP_SETTINGS], ...mapperOptions, ...options };

    this[MAP_VALUE] = this[MAP_KEYS].length > 1 ? (this[MAP_KEYS] as T[]) : (this[MAP_KEYS][0] as T);

    return this;
  },
  transform<T, V>(callback: (values: T) => V): IMap {
    this[MAP_VALUE] = callback(this[MAP_KEYS]) as V;

    return this;
  },
  get value(): any | any[] | undefined | null {
    const { suppressNullUndefined, suppressionStrategy } = this[MAP_SETTINGS];
    const storedValue = this[MAP_VALUE];

    this[MAP_KEYS].length = 0;
    this[MAP_VALUE] = undefined;

    return (!storedValue && suppressNullUndefined) || suppressionStrategy(storedValue)
      ? MAP_SUPPRESS_ENTRY
      : storedValue;
  },
});

export { MAP_SUPPRESS_ENTRY };
export default map;
