const splitName = (fullname: string) => {
  const [firstName, lastName] = fullname.split(" ");
  return { firstName, lastName };
};

export default splitName;
