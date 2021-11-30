import { Customer } from "interfaces";

const getFullName = (user: Customer) => {
  const { firstname, lastname } = user;
  return `${firstname} ${lastname}`;
};

export default getFullName;
