export interface ISource<T> {
  [index: string]: T | ISource<T>;
}

export type IMap = <T>(key: string | string[], options?: IMapperOptions) => IMapMethods<T>;

export interface IMapMethods<T> {
  transform: (callback: (...args: unknown[]) => T) => IMapMethods<T>;
  value: T;
}

export type IMapping = (map: IMap) => ISource<unknown>;

export interface IMapperOptions {
  suppressNullUndefined?: boolean;
  suppressionStrategy?: (value: unknown) => boolean;
}
