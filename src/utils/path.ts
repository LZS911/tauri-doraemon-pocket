import { homeDir, join } from '@tauri-apps/api/path';

export const APP_CONF_PATH = 'doraemon.conf.json';

export const doraemonRoot = async () => {
  return join(await homeDir(), '.doraemon-pocket');
};
