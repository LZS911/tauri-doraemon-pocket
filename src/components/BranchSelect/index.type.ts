import { SelectProps } from 'antd';
import { RepositoryKind } from '../../common/enum';

export type BranchSelectProps = {
  projectID: string;
  projectRepositoryKind: RepositoryKind;
  token: string;
  gitlabToken: string;
  gitlabUrl: string;
} & SelectProps;
