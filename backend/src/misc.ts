import { MysqlError } from 'mysql';

const PreprocessData = (data: any) => {
  if (data instanceof Array) {
    return data.map((x) => PreprocessData(x));
  }
  // todo fix this hack
  return data;
};

export const noResponseQuery = (err: MysqlError, result: any) => {
  if (err) {
    console.error(err);
  }
  console.log(result);
};

export const noResponseQueryCallback = (callback: () => void, err: MysqlError, result: any) => {
  if (err) {
    callback();
    console.error(err);
  }
  console.log(result);
};
