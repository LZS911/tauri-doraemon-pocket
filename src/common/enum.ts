export enum ThemeModeEnum {
  'Dark' = 'dark',
  'Light' = 'light',
  'System' = 'system',
}
export enum ColorSchemeEnum {
  'Blue' = 'theme-blue',
  'Purple' = 'theme-purple',
  'Green' = 'theme-green',
}
export enum DarkColorSchemeEnum {
  'Blue' = 'dark-theme-blue',
  'Purple' = 'dark-theme-purple',
  'Green' = 'dark-theme-green',
}

export enum FontFamilyEnum {
  Default = 'Default',
  Inter = 'inter',
  Roboto = 'roboto',
  Poppins = 'poppins',
  Serif = 'serif',
  Mono = 'mono',
  PublicSans = 'publicSans',
}

export enum AutoUpdateEnum {
  Prompt = 'Prompt',
  Silent = 'Silent',
}

export enum ResponseCode {
  SUCCEEDED = 'SUCCEEDED',
  FAILED = 'FAILED',
}

export type ResponseType = {
  code: ResponseCode;
  message: string;
  data: any;
};

export enum RepositoryKind {
  GitHub = 'github',
  GitLab = 'gitlab',
}
