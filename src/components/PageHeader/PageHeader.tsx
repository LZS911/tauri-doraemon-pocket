import { Card, Space, Typography } from 'antd';
import { PageHeaderProps } from '.';

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  desc,
  children,
  className,
}) => {
  return (
    <Card bordered={false} className={className}>
      <Space direction="vertical" size={2}>
        <Typography.Title level={4}>{title}</Typography.Title>
        <Typography.Text type="secondary">{desc}</Typography.Text>
        {children}
      </Space>
    </Card>
  );
};
export default PageHeader;
