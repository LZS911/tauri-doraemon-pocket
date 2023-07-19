import React, { useState } from 'react';
import { Select } from 'antd';
import type { SelectProps } from 'antd';
import { BranchSelectProps } from './index.type';
import { RepositoryKind } from '../../common/enum';
import Github from '../../api/Github';
import Gitlab from '../../api/Gitlab';

let timeout: ReturnType<typeof setTimeout> | null;
let currentValue: string;

const fetch = (
  value: string,
  params: Pick<
    BranchSelectProps,
    | 'projectID'
    | 'projectRepositoryKind'
    | 'token'
    | 'gitlabToken'
    | 'gitlabUrl'
  >,
  callback: any
) => {
  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }
  currentValue = value;

  const getBranch = () => {
    const { projectID, projectRepositoryKind, token, gitlabToken, gitlabUrl } =
      params;

    if (projectRepositoryKind === RepositoryKind.GitHub) {
      Github.getBranch(projectID, value, token).then((res) => {
        res?.data?.name &&
          callback([{ value: res.data.name, label: res.data.name }]);
      });
    } else if (projectRepositoryKind === RepositoryKind.GitLab) {
      Gitlab.getAllBranches(
        Number(projectID),
        gitlabToken,
        gitlabUrl,
        value
      ).then((res) => {
        if (res.data && Array.isArray(res.data)) {
          callback(
            res.data.map((item) => ({
              label: item.name,
              value: item.name,
            }))
          );
        }
      });
    }
  };

  if (value) {
    timeout = setTimeout(getBranch, 300);
  } else {
    callback([]);
  }
};

const BranchSelect: React.FC<BranchSelectProps> = (props) => {
  const [data, setData] = useState<SelectProps['options']>([]);
  const [value, setValue] = useState<string>();

  const handleSearch = (newValue: string) => {
    fetch(
      newValue,
      {
        projectID: props.projectID,
        projectRepositoryKind: props.projectRepositoryKind,
        token: props.token,
        gitlabToken: props.gitlabToken,
        gitlabUrl: props.gitlabUrl,
      },
      setData
    );
  };

  const handleChange = (newValue: string) => {
    setValue(newValue);
  };

  return (
    <Select
      showSearch
      value={value}
      placeholder={props.placeholder}
      style={props.style}
      defaultActiveFirstOption={false}
      showArrow={false}
      filterOption={false}
      onSearch={handleSearch}
      onChange={handleChange}
      notFoundContent={null}
      options={data}
    />
  );
};

export default BranchSelect;
