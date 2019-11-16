import { parse } from '@arg-def/dot-notation';

import { IMapper, IMapperOptions, IMapping, ISource } from './interfaces';
import map, { IMap } from './map';
import suppress from './utils/suppress-entries';

const mapper = (source: ISource, mapping: Function, options?: IMapperOptions): IMapper => {
  if (Array.isArray(source) || !(source instanceof Object)) {
    const typeOfSource = Array.isArray(source) ? 'array' : typeof source;
    throw new TypeError(`Instance of "source" must be an object, but instead got ${typeOfSource}`);
  }

  return parse(suppress(mapping(map(source, options))));
};

mapper.mapping = (callback: (map: IMap) => IMapping): Function => callback;

export default mapper;
