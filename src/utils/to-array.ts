const toArray = (source: string | string[]): string[] => (Array.isArray(source) ? source : [source]);

export default toArray;
