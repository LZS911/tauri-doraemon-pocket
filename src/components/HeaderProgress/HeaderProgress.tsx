import { IHeaderProgressProps } from '.';
import LinearProgress from '@material/react-linear-progress';

const HeaderProgress: React.FC<IHeaderProgressProps<HTMLDivElement>> = ({
  className = '',
}) => {
  return (
    <LinearProgress
      bufferingDots={false}
      indeterminate={true}
      className={`absolute top-0 z-[9999999] ${className}`}
    />
  );
};

export default HeaderProgress;
