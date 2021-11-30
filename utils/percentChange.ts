const getPercentChange = (oldValue: number, newValue: number) => {
  let percent;
  if (newValue !== 0) {
    if (oldValue !== 0) {
      percent = ((newValue - oldValue) / oldValue) * 100;
    } else {
      percent = newValue * 100;
    }
  } else {
    percent = -oldValue * 100;
  }
  return Math.floor(percent);
};

export default getPercentChange;
