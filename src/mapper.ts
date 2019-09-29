import { parse } from '@arg-def/dot-notation';

import { IMapper, IMapping, ISource } from './interfaces';
import map, { IMap } from './map';

const mapper = (source: ISource, mapping: Function): IMapper => {
  if (Array.isArray(source) || !(source instanceof Object)) {
    const typeOfSource = Array.isArray(source) ? 'array' : typeof source;
    throw new TypeError(`Instance of "source" must be an object, but instead got ${typeOfSource}`);
  }

  return parse(mapping(map(source)));
};

mapper.mapping = (callback: (map: IMap) => IMapping): Function => callback;

export default mapper;
