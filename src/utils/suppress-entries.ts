import { ISource } from '../interfaces';
import { MAP_SUPPRESS_ENTRY } from '../map';

const suppressEntries = (mapped: ISource<unknown>): ISource<unknown> =>
  Object.keys(mapped).reduce((acc, key) => {
    if (mapped[key] !== MAP_SUPPRESS_ENTRY) {
      acc[key] = mapped[key];
    }

    return acc;
  }, {} as ISource<unknown>);

export default suppressEntries;
