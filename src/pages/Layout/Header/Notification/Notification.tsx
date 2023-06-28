import { BellOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { Popover, Tooltip } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  genTypeIcon,
  INotificationList,
  mockNotificationList,
  NotificationStatusEnum,
} from '.';
import ThemeBase from '../../../../components/ThemeBase';

const Notification: React.FC = () => {
  const { t } = useTranslation();
  const [notificationList, setNotificationList] = useState<INotificationList[]>(
    []
  );

  const notificationTipsCount = useMemo(() => {
    return notificationList.filter(
      (v) => v.status === NotificationStatusEnum.unread
    )?.length;
  }, [notificationList]);

  const markAsAllRead = () => {
    setNotificationList((list) => {
      const cloneList = [...list];
      list.forEach((v) => {
        v.status = NotificationStatusEnum.read;
      });
      return cloneList;
    });
  };

  useEffect(() => {
    mockNotificationList().then((res) => {
      setNotificationList(res);
    });
  }, []);

  return (
    <Popover
      content={
        <div className="w-[26rem]">
          <header className="flex items-center justify-between p-5 dark:pt-2">
            <span className="text-sm">
              {t('layout.header.notification.title')}
            </span>
            <ThemeBase.Icon
              data-testid="mark-all-read"
              hidden={notificationTipsCount === 0}
              onClick={markAsAllRead}
              icon={
                <CheckCircleOutlined className="text-[1rem] text-primary" />
              }
              tooltip={{
                title: t('layout.header.notification.titleTips'),
              }}
              className="hover:!bg-secondary"
            />
          </header>
          <div>
            {notificationList.map((v) => {
              return (
                <div
                  className={`flex cursor-pointer items-center border-t border-stone-100 px-4 py-2  dark:border-stone-700 ${
                    v.status === NotificationStatusEnum.read
                      ? 'hover:bg-zinc-200 dark:hover:bg-zinc-700'
                      : 'bg-slate-50  hover:!bg-secondary dark:bg-black'
                  }`}
                  key={v.id}
                >
                  <div>{genTypeIcon(v.type)}</div>
                  <div className="mx-4 w-[16rem]">
                    <Tooltip title={v.message}>
                      <div className="mb-1 truncate">
                        <span className="text-sm">{v.message}</span>
                      </div>
                    </Tooltip>

                    <div className="text-xs opacity-50">{v.desc}</div>
                  </div>
                  <div className="text-xs">{v.time}</div>
                </div>
              );
            })}
          </div>
          <footer className="w-full cursor-pointer border-t border-stone-100 px-4 py-3 text-center text-primary transition-[background] hover:bg-slate-200 dark:border-stone-700 dark:hover:bg-zinc-700 ">
            {t('layout.header.notification.viewAll')}
          </footer>
        </div>
      }
      trigger="click"
    >
      <ThemeBase.Icon
        data-testid="popover-switch-icon"
        badge={{
          count: notificationTipsCount,
        }}
        icon={<BellOutlined className="text-[1rem]" />}
        className="mr-2 bg-slate-100 dark:bg-black"
      />
    </Popover>
  );
};

export default Notification;
