import { useDispatch, useSelector } from 'react-redux';
import { IReduxState } from '../../store';
import {
  setIsExpandSider as _setIsExpandSider,
  changeSiderWidth as _changeSiderWidth,
  setIsDrawerSider as _setIDrawerSider,
} from '../../store/layout';

const useLayoutRedux = () => {
  const dispatch = useDispatch();
  const reduxState = useSelector((state: IReduxState) => {
    return {
      isExpandSider: state.layout.isExpandSider,
      siderWidth: state.layout.siderWidth,
      isDrawerSider: state.layout.isDrawerSider,
    };
  });

  const setIsExpandSider = (state: boolean) => {
    dispatch(_setIsExpandSider(state));
  };

  const changeSiderWidth = (width: number) => {
    dispatch(_changeSiderWidth(width));
  };

  const setIsDrawerSider = (mode: boolean) => {
    dispatch(_setIDrawerSider(mode));
  };

  return {
    ...reduxState,
    setIsExpandSider,
    changeSiderWidth,
    setIsDrawerSider,
  };
};

export default useLayoutRedux;
