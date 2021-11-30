const shortenNumber = (number: number, limit: number = 1000) => {
  if (number < 1000 || number < limit) return number;

  const values = [1e3, 1e6, 1e9, 1e12];

  const units = ["k", "M", "B", "T"];

  const selectedIndex =
    values.findIndex((value) => {
      console.log(value, number);
      return number < value && value >= limit;
    }) - 1;

  const selectedUnit = units[selectedIndex];

  return selectedUnit
    ? (number / values[selectedIndex]).toFixed(2).toString() + selectedUnit
    : number;
};

export default shortenNumber;
