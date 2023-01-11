import { MysqlError } from 'mysql';

const PreprocessData = (data: any) => {
  if (data instanceof Array) {
    return data.map((x) => PreprocessData(x));
  }
  // todo fix this hack
  return data;
};

export const noResponseQueryCallback = (err: MysqlError, result: any) => {
  if (err) throw err;
};
