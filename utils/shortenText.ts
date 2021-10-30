const truncate = (fullStr, strLen, separator = "...", type?) => {
  if (fullStr.length <= strLen) return fullStr;

  var sepLen = separator.length,
    charsToShow = strLen - sepLen,
    frontChars = Math.ceil(charsToShow / 2),
    backChars = Math.floor(charsToShow / 2);

  return type === "tail"
    ? fullStr.slice(0, strLen) + separator
    : fullStr.substr(0, frontChars) +
        separator +
        fullStr.substr(fullStr.length - backChars);
};

export default truncate;
