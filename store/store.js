import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '~/store/rootReducer';
import rootSaga from '~/store/rootSaga';
// import { createWrapper } from 'next-redux-wrapper';
import {
  nextReduxCookieMiddleware,
  wrapMakeStore,
} from 'next-redux-cookie-wrapper';
import { composeWithDevTools } from 'redux-devtools-extension';
// import {
//   createRouterMiddleware,
//   initialRouterState,
//   routerReducer,
// } from 'connected-next-router';
import { HYDRATE, createWrapper } from 'next-redux-wrapper';
// import Router from 'next/router';

const sagaMiddleware = createSagaMiddleware();

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
