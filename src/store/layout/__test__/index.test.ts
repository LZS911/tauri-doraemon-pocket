import reducer, {
  changeSiderWidth,
  resetLayoutState,
  setIsDrawerSider,
  setIsExpandSider,
  layoutInitialState,
} from '..';
import CONSTANT from '../../../common/constant';
import { IReduxState } from '../../index';

describe('test store/layout', () => {
  test('should create action', () => {
    expect(setIsExpandSider(false)).toEqual({
      payload: false,
      type: 'layout/setIsExpandSider',
    });
    expect(changeSiderWidth(60)).toEqual({
      payload: 60,
      type: 'layout/changeSiderWidth',
    });
    expect(resetLayoutState()).toEqual({
      type: 'layout/resetLayoutState',
    });
    expect(setIsDrawerSider(false)).toEqual({
      payload: false,
      type: 'layout/setIsDrawerSider',
    });
  });

  const state: IReduxState['layout'] = {
    isExpandSider: false,
    siderWidth: CONSTANT.SIDER_WIDTH,
    isDrawerSider: false,
  };

  test('should modify isExpandSider when dispatch setIsExpandSider action', () => {
    const newState = reducer(state, setIsExpandSider(true));

    expect(newState).not.toEqual(state);
    expect(newState).toEqual({
      ...state,
      isExpandSider: true,
    });
  });

  test('should modify siderWidth when dispatch changeSiderWidth action', () => {
    const newState = reducer(state, changeSiderWidth(100));

    expect(newState).not.toEqual(state);
    expect(newState).toEqual({
      ...state,
      siderWidth: 100,
    });
  });

  test('should modify siderWidth when dispatch changeSiderWidth action', () => {
    const newState = reducer(state, changeSiderWidth(100));

    expect(newState).not.toEqual(state);
    expect(newState).toEqual({
      ...state,
      siderWidth: 100,
    });
  });

  test('should modify isDrawerSider when dispatch setIsDrawerSider action', () => {
    const newState = reducer(state, setIsDrawerSider(true));

    expect(newState).not.toEqual(state);
    expect(newState).toEqual({
      ...state,
      isDrawerSider: true,
    });
  });

  test('should reset state when dispatch resetLayoutState action', () => {
    const newState = reducer(state, resetLayoutState());
    expect(newState).toEqual(layoutInitialState);
  });
});
