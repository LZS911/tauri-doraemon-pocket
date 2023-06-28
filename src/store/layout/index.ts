import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import CONSTANT from '../../common/constant';
export interface ILayoutState {
  isExpandSider: boolean;
  siderWidth: number;
  isDrawerSider: boolean;
}
export const layoutInitialState: ILayoutState = {
  isExpandSider: false,
  siderWidth: CONSTANT.SIDER_WIDTH,
  isDrawerSider: false,
};
const layout = createSlice({
  name: 'layout',
  initialState: layoutInitialState,
  reducers: {
    setIsExpandSider: (state, action: PayloadAction<boolean>) => {
      state.isExpandSider = action.payload;
    },
    changeSiderWidth: (state, action: PayloadAction<number>) => {
      state.siderWidth = action.payload;
    },
    setIsDrawerSider: (state, action: PayloadAction<boolean>) => {
      state.isDrawerSider = action.payload;
    },
    resetLayoutState: () => layoutInitialState,
  },
});
export const {
  setIsExpandSider,
  changeSiderWidth,
  resetLayoutState,
  setIsDrawerSider,
} = layout.actions;
export default layout.reducer;
