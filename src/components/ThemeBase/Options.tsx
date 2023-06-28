import { useBoolean } from 'ahooks';
import { Popover } from 'antd';
import classNames from 'classnames';
import { IOptionsProps } from '.';
import usePropsValue from '../../hooks/usePropsValue';

const Options: <ValueType>(
  props: IOptionsProps<ValueType>
) => React.ReactElement = ({
  children,
  list,
  value,
  onChange,
  defaultValue,
  className = '',
  ...props
}) => {
  const [internalValue, setInternalValue] = usePropsValue({
    defaultValue,
    value,
    onChange,
  });
  const [open, { setFalse: closePopover, setTrue: openPopover }] = useBoolean();

  const onOpenChange = (open: boolean) => {
    if (open) {
      openPopover();
    } else {
      closePopover();
    }
  };

  return (
    <Popover
      {...props}
      className={`theme-options rounded-lg ${className}`}
      trigger="click"
      placement="bottom"
      onOpenChange={onOpenChange}
      open={open}
      content={list.map((v) => {
        return (
          <div
            onClick={() => {
              setInternalValue(v.value);
              v.onClick?.();
              closePopover();
            }}
            key={v.key}
            className={classNames(
              {
                ['options-selected-item bg-secondary hover:!bg-secondary']:
                  internalValue === v.value,
              },
              'w-48 cursor-pointer rounded-sm px-4 py-2 transition-[background] hover:bg-slate-200 dark:text-white dark:hover:bg-slate-500'
            )}
          >
            <span className="leading-6">{v.text}</span>
          </div>
        );
      })}
    >
      <div onClick={openPopover}>{children}</div>
    </Popover>
  );
};

export default Options;
