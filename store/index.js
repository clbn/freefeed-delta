import { configureStore } from '@reduxjs/toolkit';

import { setStoreState } from './actions';
import { rootReducer } from './reducers';

let store;

const initialState = {
  attachments: {},
  comments: {},
  feeds: {},
  me: {},
  posts: {},
  users: {},
};

const createStore = (preloadedState) => configureStore({
  reducer: rootReducer,
  preloadedState,
});

export const initServerStore = () => {
  // Create new server-side store
  store = createStore(initialState);
  return store;
};

export function useStore(preloadedState) {
  // Server-side
  // The store is already created and filled with data in getServerSideProps
  if (typeof window === 'undefined') {
    // However, it can be undefined on the server start
    if (!store) {
      store = createStore(initialState);
    }
    return store;
  }

  // Client-side
  // The store has to be created (or reset after navigating to another page)
  if (!store) {
    // For initial page load (when there's no store yet),
    // create the store using data from getServerSideProps (i.e. "hydrate")
    store = createStore(preloadedState);
  } else {
    // After navigating to another page (so the store already exists),
    // reset it using data from getServerSideProps
    setTimeout(() => {
      store.dispatch(setStoreState(preloadedState));
    }, 0);
  }
  return store;
}
