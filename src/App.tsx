import RouterComponent from './router';
import { ConfigProvider, theme } from 'antd';
import useTheme, {
  getCurrentColorSchemeStrings,
  useInitTheme,
} from './customHooks/useTheme';
import { useInitFontFamily } from './customHooks/useFontFamily';
import { BrowserRouter } from 'react-router-dom';
import 'antd/dist/reset.css';

function App() {
  const { isDark, currentColorScheme } = useTheme();
  const [primaryColor] = getCurrentColorSchemeStrings(
    isDark,
    currentColorScheme
  );

  console.log(currentColorScheme, primaryColor, isDark);

  useInitTheme();
  useInitFontFamily();

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
