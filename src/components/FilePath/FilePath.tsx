import { Space, Typography } from 'antd';
import cls from 'classnames';
import { useEffect, useState } from 'react';
import { FilePathProps } from '.';
import { join } from '@tauri-apps/api/path';
import { doraemonRoot } from '../../utils/path';
import { open } from '@tauri-apps/api/shell';

const FilePath: React.FC<FilePathProps> = ({
  className,
  label = 'PATH:',
  content,
  paths,
  url,
}) => {
  const [filePath, setPath] = useState('');

  useEffect(() => {
    if (!(paths || url)) {
      return;
    }

    (async () => {
      if (url) {
        setPath(url);
        return;
      }
      setPath(
        await join(
          await doraemonRoot(),
          ...(paths ?? '').split('/').filter((i) => !!i)
        )
      );
    })();
  }, [url, paths]);
  return (
    <Space className="text-xs">
      <Typography.Text>{label}</Typography.Text>
      <Typography.Link className={cls(className, 'text-xs')}>
        <a onClick={() => open(filePath)} title={filePath}>
          {content ? content : filePath}
        </a>
      </Typography.Link>
    </Space>
  );
};

export default FilePath;
