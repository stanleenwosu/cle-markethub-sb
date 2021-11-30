export const formatAsCurrency = (amount, currency = "NGN") => {
  if (!amount) {
    return `${currency} 0.00`;
  }
  const formatter = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency,
  });
  return formatter.format(amount);
};
