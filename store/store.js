import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '~/store/rootReducer';
import rootSaga from '~/store/rootSaga';
import { createWrapper } from 'next-redux-wrapper';
import {
  nextReduxCookieMiddleware,
  wrapMakeStore,
} from 'next-redux-cookie-wrapper';
import { composeWithDevTools } from 'redux-devtools-extension';

// import { persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
// import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
// import thunkMiddleware from 'redux-thunk';
// import persistStore from 'redux-persist/es/persistStore';

// let store;
// const bindMiddleware = (middleware) => {
//   if (process.env.NODE_ENV !== 'production') {
//     const { composeWithDevTools } = require('redux-devtools-extension');
//     return composeWithDevTools(applyMiddleware(...middleware));
//   }
//   return applyMiddleware(...middleware);
// };

// const persistConfig = {
//   key: 'root',
//   storage,
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();

// const makeConfiguredStore = (reducer) =>
//   createStore(reducer, undefined, applyMiddleware(sagaMiddleware));

// export const makeStore = () => {
//   const isServer = typeof window === 'undefined';

// if (isServer) {
//   return makeConfiguredStore(rootReducer);
// } else {
//   // we need it only on client side
//   const { persistStore, persistReducer } = require('redux-persist');
//   const storage = require('redux-persist/lib/storage').default;

//   const persistConfig = {
//     key: 'nextjs',
//     whitelist: ['fromClient'], // make sure it does not clash with server keys
//     storage,
//   };

//   const persistedReducer = persistReducer(persistConfig, rootReducer);
//   const store = makeConfiguredStore(persistedReducer);

//   store.__persistor = persistStore(store); // Nasty hack
//   store.sagaTask = sagaMiddleware.run(rootSaga);

//   return store;
// }

// const sagaMiddleware = createSagaMiddleware();
// store = createStore(
//   // rootReducer,
//   persistedReducer,
//   context,
//   bindMiddleware([sagaMiddleware])
//   // composeWithDevTools(applyMiddleware(thunkMiddleware))
// );

// store.sagaTask = sagaMiddleware.run(rootSaga);
// return store;
// };

// export const store2 = createStore(
//   // rootReducer,
//   persistedReducer,
//   bindMiddleware([sagaMiddleware])
//   // composeWithDevTools(applyMiddleware(thunkMiddleware))
// );

// export const persistedStore2 = persistStore(store1);

// export const wrapper = createWrapper(makeStore, { debug: false });

const makeStore = wrapMakeStore(() => {
  const storeReal = createStore(
    rootReducer,
    composeWithDevTools(
      applyMiddleware(
        sagaMiddleware,
        nextReduxCookieMiddleware({
          secure: false,
          compress: false,
          subtrees: [
            { subtree: 'auth' },
            { subtree: 'ecomerce' },
            // { subtree: 'order' },
          ],
        })
      )
    )
  );
  storeReal.sagaTask = sagaMiddleware.run(rootSaga);
  return storeReal;
});

export const wrapper = createWrapper(makeStore, { debug: true });
