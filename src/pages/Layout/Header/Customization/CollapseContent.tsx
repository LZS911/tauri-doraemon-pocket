import { CollapseContentProps } from '.';
import usePropsValue from '../../../../hooks/usePropsValue';

const CollapseContent: <ValueType>(
  props: CollapseContentProps<ValueType>
) => React.ReactElement = ({ value, defaultValue, onChange, list }) => {
  const [internalValue, setInternalValue] = usePropsValue({
    value,
    defaultValue,
    onChange,
  });
  return (
    <div className="flex flex-wrap">
      {list.map((v) => {
        return (
          <div
            onClick={() => {
              setInternalValue(v.value);
            }}
            key={v.key}
            className={`mr-2 flex cursor-pointer flex-col items-center rounded px-4 py-4 pb-1 text-center transition-[background] ${
              v.value === internalValue ? 'bg-secondary' : ''
            }`}
          >
            <div className="mb-1">{v.content && v.content}</div>
            {v.describe && (
              <span className="text-xs opacity-80">{v.describe}</span>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CollapseContent;
