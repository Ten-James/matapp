import { IBaseModel } from '../../types';

export const MakeSort = <T extends IBaseModel>(e: string, t: string, ord: boolean) => {
  if (ord) {
    if (t === 'string') {
      // @ts-ignore
      return (a: T, b: T): number => a[e].localeCompare(b[e]);
    }
    // @ts-ignore
    return (a: T, b: T): number => a[e] - b[e];
  } else {
    if (t === 'string') {
      // @ts-ignore
      return (a: T, b: T): number => b[e].localeCompare(a[e]);
    }
    // @ts-ignore
    return (a: T, b: T): number => b[e] - a[e];
  }
};

export const defaultFilter = { filterMatch: (x: any) => true, sort: (a: any, b: any) => 1 };
