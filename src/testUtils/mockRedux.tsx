import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import layout from '../store/layout';
import userConfig from '../store/userConfig';
import { Dictionary } from '../typing/common.type';
import { Provider } from 'react-redux';
import React, { ReactNode } from 'react';
const reducers = combineReducers({
  layout,
  userConfig,
});
export const storeFactory: any = (initStore: Dictionary = {}) => {
  return configureStore({
    reducer: reducers,
    preloadedState: initStore,
  });
};

export const CustomProvider: React.FC<{
  initStore: Dictionary;
  children: ReactNode;
}> = (props) => {
  return (
    <Provider store={storeFactory(props.initStore)}>{props.children}</Provider>
  );
};
