import ApiGenerator from './ApiGenerator';

export type ApiGeneratorFields = {
  outputPath: string;
  branch: string;
  project: string;
  swaggerPath?: string;
  token: string;
  isHandleFormUrlEncodedValue?: boolean;
};

export type ApiGeneratorFormProps = {
  submit: (values: ApiGeneratorFields) => void;
};

export interface IProject {
  value: ProjectType;
  label: string;
}

export type ProjectType =
  | 'sqle-ee'
  | 'umc'
  | 'umc-init-fe'
  | 'umc-init'
  | 'pluto'
  | 'dtle'
  | 'umc-fe'
  | 'provision'
  | 'oceanBase'
  | 'urds'
  | 'dms';

export default ApiGenerator;
