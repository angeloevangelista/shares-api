const stringToNumber = (stringFloat: string): number => {
  return Number(stringFloat.replace(/\./g, '').replace(',', '.'));
};

export default stringToNumber;
