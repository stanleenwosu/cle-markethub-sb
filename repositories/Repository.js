import axios from 'axios';

import Cookies from 'js-cookie';
// console.log('🚀 ~ Cookies', Cookies.get('auth'));

const baseDomain = 'https://api.cle.ng:26623'; // API for products
export const basePostUrl = 'https://api.cle.ng:26623'; // API for post
export const baseStoreURL = 'https://api.cle.ng:26623'; // API for vendor(store)

const isServer = typeof window === 'undefined';

let auth;

if (!isServer) {
  const authCookie = Cookies.get('auth');
  // console.log('🚀 ~ authCookie', authCookie);
  auth = authCookie ? JSON.parse(authCookie) : '';
}
// console.log("🚀 ~ Cookies.get('auth')", Cookies.get('auth'));

//https://beta.apinouthemes.com
export const customHeaders = {
  Accept: 'application/json',
  ...(auth?.token ? { Authorization: `Bearer ${auth?.token}` } : false),
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
