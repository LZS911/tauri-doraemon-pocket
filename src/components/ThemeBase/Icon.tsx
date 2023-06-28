import { Badge, Tooltip } from 'antd';
import classNames from 'classnames';
import React from 'react';
import { IIconProps } from '.';
import useTheme, {
  getCurrentColorSchemeStrings,
} from '../../customHooks/useTheme';

const Icon: React.FC<IIconProps> = ({
  icon,
  className = '',
  hidden = false,
  isHoverCls = true,
  isWaterWaveCls = true,
  badge,
  tooltip,
  ...props
}) => {
  const { isDark, currentColorScheme } = useTheme();

  const genBadge = (el: React.ReactNode) => {
    return badge ? (
      <Badge
        {...badge}
        size="small"
        offset={[0, 2]}
        color={getCurrentColorSchemeStrings(isDark, currentColorScheme)[0]}
        className="leading-[0.875rem]"
      >
        <span className="dark:text-white">{el}</span>
      </Badge>
    ) : (
      el
    );
  };

  const genToolTip = (el: React.ReactNode) => {
    return tooltip ? <Tooltip {...tooltip}>{el}</Tooltip> : <>{el}</>;
  };

  return genToolTip(
    <div
      {...props}
      hidden={hidden}
      className={classNames(
        {
          ['hover:bg-slate-200 dark:hover:bg-slate-400']: isHoverCls,
        },
        {
          ['after:water-wave-hide active:after:water-wave-show']:
            isWaterWaveCls,
        },
        className,
        'transparent relative flex cursor-pointer items-center justify-center rounded-md bg-transparent p-2 transition-colors dark:text-white'
      )}
    >
      {genBadge(icon)}
    </div>
  );
};

export default Icon;
