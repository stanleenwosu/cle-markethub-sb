const getURLParams = (params) =>
  Object.keys(params || {}).reduce((result, field) => {
    if (params[field]) {
      result += result
        ? `&${field}=${params[field]}`
        : `?${field}=${params[field]}`;
    }
    return result;
  }, "");

export default getURLParams;
