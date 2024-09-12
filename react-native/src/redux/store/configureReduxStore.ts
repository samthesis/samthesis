import { createStore, applyMiddleware, compose } from 'redux';

import rootReducer from '../reducer';

import { apiMiddleware } from '../middleware/middlewares';

export default function configureReduxStore(initialState: Partial<{ user: never; }> | undefined) {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  return createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(apiMiddleware))
  );
}


// import {configureStore} from '@reduxjs/toolkit';
// import rootReducer from './reducer';

// /**
//  * Define and configure redux store
//  */
// const store = configureStore({
//   reducer: rootReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: false, // Disable SerializableStateInvariantMiddleware
//     }),
// });

// export default store;
