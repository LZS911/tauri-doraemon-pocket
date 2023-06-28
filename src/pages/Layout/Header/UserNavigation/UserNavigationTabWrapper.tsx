import { UserNavigationTabWrapperProps } from '.';

const UserNavigationTabWrapper: React.FC<UserNavigationTabWrapperProps> = ({
  dataSource,
}) => {
  return (
    <div className="flex flex-col">
      {dataSource.map((v) => {
        return (
          !v.hidden && (
            <div
              key={v.text}
              onClick={v.onClick}
              className="flex cursor-pointer items-center rounded-sm px-4 py-2 transition-[background] hover:bg-slate-200 dark:text-white dark:hover:bg-slate-500"
            >
              {v.icon}
              <div className="ml-4">{v.text}</div>
            </div>
          )
        );
      })}
    </div>
  );
};

export default UserNavigationTabWrapper;
