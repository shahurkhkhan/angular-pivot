export const getFilteredArray = <T, K extends keyof T>(
  arr: T[],
  key: K,
  value: any
) => {
  if (!arr) return [];
  return arr.filter(d => {
    return d[key] === value
  })
}

export const getFilteredObject =(
  obj: any,
  value: any
) => {
  const newObj = {} as any;
  if (!obj) return newObj;
  for (const key in obj) {
    const element = obj[key];
    if ( element === value ) {
      newObj[key] = element
    }
  }
  return newObj;
}

export const findObjectKey =(
  obj: any,
  value: any
) => {
  let newObj = undefined;
  if (!obj) return newObj;
  for (const key in obj) {
    const element = obj[key];
    if ( element === value ) {
      newObj = key
    }
  }
  return newObj;
}

export const findRecord = <T, K extends keyof T>(
  arr: T[],
  key: K,
  value: any
): T => {
  if (!arr) return {} as T;
  return arr.find(d => {
    return d[key] === value
  }) as T;
}

export const slugify = (str: string) => {
  return str
  .toLowerCase()
  .trim()
  .replace(/[^\w\s-]/g, '')
  .replace(/[\s_-]+/g, '-')
  .replace(/^-+|-+$/g, '');
}

export const compareTwoArry = (
  array1: any[], array2: any[]
) => {
  return JSON.stringify(array1) === JSON.stringify(array2)
}

export const isValueType = (value: any, type: string): boolean => {
  const valueType = Object.prototype.toString.call(value);
  const typeString = `[object ${type}]`;
  return valueType === typeString;
};

export default {
  getFilteredArray,
  findRecord,
  slugify,
  isValueType
}

