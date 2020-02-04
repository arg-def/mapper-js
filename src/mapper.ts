import { parse } from '@arg-def/dot-notation';

import { ISource, IMapping, IMapperOptions } from './interfaces';
import map from './map';
import suppress from './utils/suppress-entries';

const mapper = <T>(source: ISource<unknown>, mapping: IMapping, options?: IMapperOptions): T => {
  if (Array.isArray(source) || !(source instanceof Object)) {
    const typeOfSource = Array.isArray(source) ? 'array' : typeof source;
    throw new TypeError(`Instance of "source" must be an object, but instead got ${typeOfSource}`);
  }

  return parse<T>(suppress(mapping(map(source, options))));
};

mapper.mapping = (callback: IMapping): IMapping => callback;

export default mapper;
