import { useDispatch as originalDispatch, useSelector as originalSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import { initialState, RootState } from './state';
import { setStoreState } from './actions';
import { rootReducer } from './reducers';

/*
 * Baseline store and its typed hooks
 */

const createStore = (preloadedState: RootState) => configureStore({
  reducer: rootReducer,
  preloadedState,
});

// Use these typed hooks throughout the app instead of plain `useDispatch` and `useSelector`
type AppDispatch = ReturnType<typeof createStore>['dispatch'];
export const useDispatch: () => AppDispatch = originalDispatch;
export const useSelector: TypedUseSelectorHook<RootState> = originalSelector;

/*
 * Isomorphic store magic
 */

let store;

export const initServerStore = () => {
  // Create new server-side store
  store = createStore(initialState);
  return store;
};

export const useStore = (preloadedState?: RootState) => {
  // Server-side
  // The store is already created and filled with data in getServerSideProps/getInitialProps
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
    // create the store using data from getServerSideProps/getInitialProps
    store = createStore(preloadedState);
  } else {
    // After navigating to another page (so the store already exists),
    // reset it using data from getServerSideProps, if there's any
    // (for getInitialProps-powered pages, though, this is not needed,
    // so gIP should set preloadedState to null when on client-side)
    if (preloadedState) {
      setTimeout(() => {
        store.dispatch(setStoreState(preloadedState));
      }, 0);
    }
  }
  return store;
}

let pageLoadingAction = null;

export const getIsomorphicDataPopulation = reduxAction => async ctx => {
  // Server-side
  if (ctx.req) {
    const store = initServerStore();
    await store.dispatch(reduxAction(ctx)); // await for results to populate preloadedState before sending response
    return { preloadedState: store.getState() };
  }

  // Client-side
  const store = useStore();
  pageLoadingAction?.abort(); // cancel the previous page-loading action in case that's still running
  pageLoadingAction = store.dispatch(reduxAction(ctx)); // no await, the function must return immediately for proper loading state
  return { preloadedState: null };
};
