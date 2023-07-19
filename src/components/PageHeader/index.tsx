import PageHeader from './PageHeader';

export type PageHeaderProps = {
  title: string;
  desc?: string;
  ghost?: boolean;
  children?: React.ReactNode;
  className?: string;
};

export default PageHeader;
