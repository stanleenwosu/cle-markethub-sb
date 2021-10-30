const splitNumber = (num: number) => {
  var digits = num.toString().split("");
  var realDigits = digits.map(Number);
  return realDigits;
};

export default splitNumber;
