export const textUpperFirst = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);

export const fillArrayWithNulls = (arr: { [key: string]: number }): { [key: string]: number } => {
  // keys is new Date().toLocaleDateString('cs-CZ')

  const keys = Object.keys(arr);
  if (keys.length === 0) return arr;
  const first = new Date(parseInt(keys[0].split('.').reverse()[0]), parseInt(keys[0].split('.')[1]) - 1, parseInt(keys[0].split('.')[0]));
  const last = new Date(parseInt(keys[keys.length - 1].split('.').reverse()[0]), parseInt(keys[keys.length - 1].split('.')[1]) - 1, parseInt(keys[keys.length - 1].split('.')[0]));
  const diff = Math.floor((last.getTime() - first.getTime()) / (1000 * 3600 * 24));
  const newKeys = [];
  for (let i = 0; i <= diff; i++) {
    newKeys.push(new Date(first.getTime() + i * (1000 * 3600 * 24)).toLocaleDateString('cs-CZ'));
  }
  const newArr = {};
  newKeys.forEach((key) => {
    if (arr[key]) {
      // @ts-ignore
      newArr[key] = arr[key];
    } else {
      // @ts-ignore
      newArr[key] = 0;
    }
  });
  return newArr;
};
