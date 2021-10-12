import axios from 'axios';
import https from 'https';
const baseDomain = 'https://api.cle.ng:26623'; // API for products
export const basePostUrl = 'https://api.cle.ng:26623'; // API for post
export const baseStoreURL = 'https://api.cle.ng:26623'; // API for vendor(store)

//https://beta.apinouthemes.com
export const customHeaders = {
  Accept: 'application/json',
};

export const baseUrl = `${baseDomain}`;

export default axios.create({
  baseUrl,
  headers: customHeaders,
  // httpsAgent: new https.Agent({
  //   rejectUnauthorized: false,
  // }),
});

export const serializeQuery = (query) => {
  return Object.keys(query)
    .map(
      (key) => `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`
    )
    .join('&');
};
