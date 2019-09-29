/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ISource {
  [index: string]: any;
}

export interface IMapping {
  [index: string]: string | number | boolean | undefined | string[] | number[] | boolean[] | object[] | object | null;
}

export interface IMapper {
  [key: string]: any;
}
