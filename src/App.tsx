import RouterComponent from './router';
import { ConfigProvider, theme } from 'antd';
import useTheme, {
  getCurrentColorSchemeStrings,
  useInitTheme,
} from './customHooks/useTheme';
import { BrowserRouter } from 'react-router-dom';
import 'antd/dist/reset.css';
import { useInitLanguage } from './customHooks/useLanguage';

function App() {
  const { isDark, currentColorScheme } = useTheme();
  const [primaryColor] = getCurrentColorSchemeStrings(
    isDark,
    currentColorScheme
  );

  useInitTheme();
  useInitLanguage();
  // useInitFontFamily(); todo

  return (
    <BrowserRouter>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: primaryColor,
          },
          algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
        }}
      >
        <RouterComponent />
      </ConfigProvider>
    </BrowserRouter>
  );
}

export default App;
