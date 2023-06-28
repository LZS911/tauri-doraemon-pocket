import { useBoolean } from 'ahooks';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IReduxState } from '../../store';
import {
  setLoginUserInfo as _setLoginUserInfo,
  setLoginState as _setLoginState,
  IUserLoginInfo,
  IUserLoginState,
} from '../../store/userConfig';

const useUserConfig = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [
    getUserInfoLoading,
    { setFalse: finishGetUserInfo, setTrue: startGetUserInfo },
  ] = useBoolean(false);
  const reduxState = useSelector((state: IReduxState) => {
    return {
      isLogin: state.userConfig.isLogin,
      token: state.userConfig.token,
      username: state.userConfig.username,
      emailAddress: state.userConfig.emailAddress,
      userProfile: state.userConfig.userProfile,
    };
  });

  const setLoginUserInfo = ({
    username,
    emailAddress,
    userProfile,
  }: IUserLoginInfo) => {
    dispatch(
      _setLoginUserInfo({
        emailAddress,
        username,
        userProfile,
      })
    );
  };

  const setLoginState = ({ token, isLogin }: IUserLoginState) => {
    dispatch(
      _setLoginState({
        token,
        isLogin,
      })
    );
  };

  const getUserConfig = useCallback(() => {
    startGetUserInfo();

    const mockGetUserConfig = () => {
      return new Promise<IUserLoginInfo>((res) => {
        setTimeout(() => {
          res({
            username: 'Gll Ly',
            emailAddress: 'demo@gamil.com',
            userProfile: 'Default user',
          });
        }, 800);
      });
    };

    mockGetUserConfig()
      .then((res) => {
        dispatch(_setLoginUserInfo(res));
      })
      .finally(() => {
        finishGetUserInfo();
      });
  }, [dispatch, finishGetUserInfo, startGetUserInfo]);

  const signOut = () => {
    setLoginUserInfo({
      emailAddress: '',
      username: '',
      userProfile: '',
    });
    setLoginState({
      isLogin: false,
      token: '',
    });

    navigate('/login');
  };

  return {
    getUserInfoLoading,
    getUserConfig,
    setLoginUserInfo,
    setLoginState,
    signOut,
    ...reduxState,
  };
};

export default useUserConfig;
