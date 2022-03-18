// 如果值为0的时候,转值
export const isFalsy = (value) => (value === 0 ? false : !value);
// 清除无参数传入的数据
export const cleanObj = (object) => {
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isFalsy(value)) {
      delete result[key];
    }
    
  });
  return result;
};
