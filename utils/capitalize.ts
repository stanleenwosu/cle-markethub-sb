const capitalize = (word: string) => {
  return word ? word.charAt(0).toUpperCase() + word.toLowerCase().slice(1) : "";
};

export default capitalize;
