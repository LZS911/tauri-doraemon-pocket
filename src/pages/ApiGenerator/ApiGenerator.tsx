import { useTranslation } from 'react-i18next';
import { ApiGeneratorFields } from '.';
import PageHeader from '../../components/PageHeader';
import ApiGeneratorForm from './ApiGeneratorForm';

const ApiGenerator = () => {
  const { t } = useTranslation();
  const submit = (values: ApiGeneratorFields) => {
    console.log(values);
  };
  return (
    <section>
      <PageHeader
        title={t('router.title.apiGenerator')}
        desc={t('apiGenerate.pageDesc')}
      />

      <div className="mt-6 w-full">
        <ApiGeneratorForm submit={submit} />
      </div>
    </section>
  );
};
export default ApiGenerator;
