import { invoke } from '@tauri-apps/api';
import { useEffect } from 'react';
import FilePath from '../../components/FilePath';
import { AppConfType } from '../../typing/invoke.type';
import { APP_CONF_PATH } from '../../utils/path';

const Setting: React.FC = () => {
  useEffect(() => {
    // invoke<AppConfType>('get_app_conf')
    //   .then((conf) => {
    //     console.log(conf);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }, []);
  return <section>{/* <FilePath paths={APP_CONF_PATH} /> */}</section>;
};

export default Setting;
