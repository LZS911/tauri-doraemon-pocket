import { LinearProgressProps } from '@material/react-linear-progress';
import HeaderProgress from './HeaderProgress';
export interface IHeaderProgressProps<T> extends LinearProgressProps<T> {
  children?: React.ReactNode;
  className?: string;
}
export default HeaderProgress;
