import {
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  SettingOutlined,
  WarningOutlined,
} from '@ant-design/icons';
import i18n from '../../../../locale';
import Notification from './Notification';

export default Notification;

export enum NotificationTypeEnum {
  system = 'system',
  information = 'information',
  error = 'error',
  warn = 'warn',
}
export enum NotificationStatusEnum {
  read = 'read',
  unread = 'unread',
}
export interface INotificationList {
  id: number;
  status: NotificationStatusEnum;
  message: string;
  desc: string;
  time: string;
  type: NotificationTypeEnum;
}

export const mockNotificationList = () => {
  return Promise.resolve<INotificationList[]>([
    {
      id: 1,
      status: NotificationStatusEnum.unread,
      message: i18n.t('backend.notification.message1'),
      desc: i18n.t('backend.notification.desc1'),
      time: '8:00 AM',
      type: NotificationTypeEnum.system,
    },
    {
      id: 2,
      status: NotificationStatusEnum.unread,
      message: i18n.t('backend.notification.message2'),
      desc: i18n.t('backend.notification.desc2'),
      time: '10:00 AM',
      type: NotificationTypeEnum.information,
    },
    {
      id: 3,
      status: NotificationStatusEnum.read,
      message: i18n.t('backend.notification.message3'),
      desc: i18n.t('backend.notification.desc3'),
      time: '1:00 PM',
      type: NotificationTypeEnum.error,
    },
    {
      id: 4,
      status: NotificationStatusEnum.read,
      message: i18n.t('backend.notification.message4'),
      desc: i18n.t('backend.notification.desc4'),
      time: '4:00 PM',
      type: NotificationTypeEnum.warn,
    },
  ]);
};

export const genTypeIcon = (type: NotificationTypeEnum) => {
  const typeCorrespondIconMap = new Map<NotificationTypeEnum, JSX.Element>([
    [
      NotificationTypeEnum.system,
      <div
        className="flex h-7 w-7 items-center justify-center rounded-[50%] bg-violet-50"
        key="system"
      >
        <SettingOutlined className="text-violet-500" />
      </div>,
    ],
    [
      NotificationTypeEnum.error,
      <div
        className="flex h-7 w-7 items-center justify-center rounded-[50%] bg-red-50"
        key="system"
      >
        <CloseCircleOutlined className="text-red-500" />
      </div>,
    ],
    [
      NotificationTypeEnum.information,
      <div
        className="flex h-7 w-7 items-center justify-center rounded-[50%] bg-slate-50"
        key="system"
      >
        <ExclamationCircleOutlined className="text-slate-500" />
      </div>,
    ],
    [
      NotificationTypeEnum.warn,
      <div
        className="flex h-7 w-7 items-center justify-center rounded-[50%] bg-yellow-50"
        key="system"
      >
        <WarningOutlined className="text-yellow-500" />
      </div>,
    ],
  ]);

  return typeCorrespondIconMap.get(type);
};
