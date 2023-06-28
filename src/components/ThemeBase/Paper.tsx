import { IPaperProps } from '.';

const Paper: React.FC<IPaperProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-white dark:bg-darkMode dark:text-white ${className}`}>
      {children}
    </div>
  );
};

export default Paper;
