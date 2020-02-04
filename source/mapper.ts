import { parse } from '@arg-def/dot-notation';

const mapper = <T>(source: any, mapping: Function): T => {
  if (Array.isArray(source) || !(source instanceof Object)) {
    const typeOfSource = Array.isArray(source) ? 'array' : typeof source;
    throw new TypeError(`Instance of "source" must be an object, but instead got ${typeOfSource}`);
  }

  return parse<T>(mapping());
};


export default mapper;
