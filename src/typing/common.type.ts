import { RuleObject } from 'antd/es/form';
import { ColumnGroupType, ColumnType, TableProps } from 'antd/es/table';

type DictionaryValue = string | number | boolean | Dictionary;
export interface Dictionary {
  [key: string]: DictionaryValue;
}
export interface StringDictionary {
  [key: string]: string;
}
export type ModalState = {
  [key: string]: boolean;
};

export interface IColorSchemeKey {
  primary: string;
  secondary: string;
  darkPrimary: string;
  darkSecondary: string;
}

export type TableColumn<RecordType = unknown, OtherColumnKes = ''> = Array<
  (ColumnGroupType<RecordType> | ColumnType<RecordType>) & {
    dataIndex: keyof RecordType | OtherColumnKes;
  }
>;

export type TableChange<RecordType = unknown> = Required<
  TableProps<RecordType>
>['onChange'];

export type TablePaginationProps = {
  current: number;
  pageSize: number;
};

export type FormValidatorRule = RuleObject['validator'];

export type TemplateKeyPath<T> = {
  [key in keyof T]: key extends string
    ? T[key] extends Record<string, any>
      ? `${key}.${TemplateKeyPath<T[key]>}`
      : key
    : never;
}[keyof T];
