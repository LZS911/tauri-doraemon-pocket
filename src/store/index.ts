import { configureStore, Store } from '@reduxjs/toolkit';
import userConfig from './config';
import layout from './layout';
const store: Store = configureStore({
  reducer: {
    userConfig,
    layout,
  },
});
export type IReduxState = ReturnType<typeof store.getState>;
export default store;
