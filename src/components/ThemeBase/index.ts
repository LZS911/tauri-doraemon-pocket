import { PopoverProps, BadgeProps, TooltipProps } from 'antd';
import React, { MouseEventHandler } from 'react';
import Paper from './Paper';
import Icon from './Icon';
import Options from './Options';

export interface IThemeBaseProps {
  children?: React.ReactNode;
  className?: string;
  hidden?: boolean;
  'data-testid'?: string;
}
export type IPaperProps = IThemeBaseProps;
export interface IIconProps extends IThemeBaseProps {
  icon: React.ReactNode;
  onClick?: MouseEventHandler<HTMLSpanElement>;
  isHoverCls?: boolean;
  badge?: BadgeProps;
  tooltip?: TooltipProps;
  isWaterWaveCls?: boolean;
}

export interface IOptionsProps<T>
  extends Omit<PopoverProps, 'trigger' | 'content'> {
  list: Array<{
    key: string;
    value: T;
    text: string;
    onClick?: () => void;
  }>;
  defaultValue?: T;
  value?: T;
  onChange?: (val?: T) => void;
}

const ThemeBase = {
  Paper,
  Icon,
  Options,
};
export default ThemeBase;
