export const getVerboseName = (vehicle: any) => {
  const { make, model, year } = vehicle || {};
  if (!make || !model || !year) return "";
  return `${make.name} ${model.name} ${year}`;
};
