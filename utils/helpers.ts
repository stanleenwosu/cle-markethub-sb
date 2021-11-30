export const formatCurrency = (number: number): string => {
  const result = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
  }).format(number);
  return result;
};
