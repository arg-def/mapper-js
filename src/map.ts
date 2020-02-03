import { pick } from '@arg-def/dot-notation';

import { ISource, IMapperOptions, IMap, IMapMethods } from './interfaces';
import toArray from './utils/to-array';

const MAP_SUPPRESS_ENTRY = Symbol('MAP_SUPPRESS_ENTRY');

const defaultOptions: Required<IMapperOptions> = {
  suppressNullUndefined: false,
  suppressionStrategy: () => false,
};

/**
 * Map
 * @param {object} source
 * @param {object} mapperOptions
 */
const map = (source: ISource<unknown>, mapperOptions?: IMapperOptions): IMap => <T>(
  key: string | string[],
  options?: IMapperOptions,
): IMapMethods<T> => {
  const MAP_SETTINGS = { ...defaultOptions, ...mapperOptions, ...options };
  const MAP_KEYS = toArray(key).map(k => pick(k, source));
  let MAP_VALUE = MAP_KEYS.length > 1 ? MAP_KEYS : MAP_KEYS[0];

  return {
    transform(callback: (...args: unknown[]) => T): IMapMethods<T> {
      MAP_VALUE = callback(...MAP_KEYS) as T;

      return this as IMapMethods<T>;
    },
    get value(): T {
      const { suppressNullUndefined, suppressionStrategy } = MAP_SETTINGS;
      const storedValue = MAP_VALUE;

      MAP_KEYS.length = 0;
      MAP_VALUE = undefined;

      return ((!storedValue && suppressNullUndefined) || suppressionStrategy(storedValue)
        ? MAP_SUPPRESS_ENTRY
        : storedValue) as T;
    },
  };
};

export { MAP_SUPPRESS_ENTRY };
export default map;
