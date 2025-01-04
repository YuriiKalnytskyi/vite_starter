const formatCreditCardNumber = (_value: string) => {
  const cleanNumber = _value?.replace(/\D/g, '').slice(0, 16);
  const formattedNumber = cleanNumber?.match(/.{1,4}/g) ?? [];

  return formattedNumber ? formattedNumber.join('  ') : '';
};

const formatCreditCardDate = (_value: string) => {
  const cleanDate = _value?.replace(/\D/g, '').slice(0, 4);
  const formattedDate = cleanDate?.match(/.{1,2}/g);

  return formattedDate ? formattedDate.join(' / ') : '';
};

const formatCVC = (_value: string) => {
  return _value?.replace(/\D/g, '').slice(0, 3);
};

const formatObject = {
  card: formatCreditCardNumber,
  date: formatCreditCardDate,
  cvc: formatCVC
};

export const changeCard = (type: 'card' | 'date' | 'cvc', value: string) => {
  return formatObject[type](value);
};
