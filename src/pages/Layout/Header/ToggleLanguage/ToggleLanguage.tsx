import { TranslationOutlined } from '@ant-design/icons';
import { genLanguageOptions } from '.';
import ThemeBase, { IOptionsProps } from '../../../../components/ThemeBase';
import useLanguage from '../../../../customHooks/useLanguage';
import { SupportLanguage } from '../../../../locale';

const ToggleLanguage: React.FC = () => {
  const { changeLanguage, currentLanguage } = useLanguage();

  const handleClickLanguageItem: IOptionsProps<SupportLanguage>['onChange'] = (
    lang
  ) => {
    lang && changeLanguage(lang);
  };

  return (
    <ThemeBase.Options
      value={currentLanguage}
      onChange={handleClickLanguageItem}
      list={genLanguageOptions()}
    >
      <ThemeBase.Icon
        data-testid="open-language-options"
        icon={<TranslationOutlined className="text-[1rem]" />}
        className="mr-2 bg-slate-100 dark:bg-black"
      />
    </ThemeBase.Options>
  );
};

export default ToggleLanguage;
