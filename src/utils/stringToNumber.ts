const stringToNumber = (stringNumber: string, lang = 'pt-BR'): number => {
  return lang === 'pt-BR'
    ? Number(stringNumber.replace(/\./g, '').replace(',', '.'))
    : Number(stringNumber.replace(/\,/g, '').replace(',', '.'));
};

export default stringToNumber;
