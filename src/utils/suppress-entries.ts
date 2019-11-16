import { ISource } from '../interfaces';
import { MAP_SUPPRESS_ENTRY } from '../map';

const suppressEntries = (mapped: ISource): ISource =>
  Object.keys(mapped).reduce((acc, key) => {
    if (mapped[key] !== MAP_SUPPRESS_ENTRY) {
      acc[key] = mapped[key];
    }

    return acc;
  }, {} as ISource);

export default suppressEntries;
