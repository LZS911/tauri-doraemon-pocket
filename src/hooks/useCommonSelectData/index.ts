import { invoke } from '@tauri-apps/api';
import { SelectProps } from 'antd';
import { useCallback, useMemo, useState } from 'react';
import { ProjectConf } from '../../typing/invoke.type';

const useCommonSelectData = () => {
  const [projects, setProjects] = useState<ProjectConf[]>([]);
  const updateProjects = useCallback(() => {
    invoke<ProjectConf[]>('get_project_conf').then((res) => {
      setProjects(res);
    });
  }, []);
  const projectOptions = useMemo<SelectProps['options']>(() => {
    return projects.map((v) => ({
      label: v.name,
      value: v.id,
    }));
  }, [projects]);

  return {
    projects,
    projectOptions,
    updateProjects,
  };
};

export default useCommonSelectData;
