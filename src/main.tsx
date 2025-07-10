import { ConfigProvider } from 'antd';
import enUS from 'antd/locale/en_US';
import frFR from 'antd/locale/fr_FR';
import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { I18nextProvider, useTranslation } from 'react-i18next';
import { Provider } from 'react-redux';
import App from './App';
import './i18n';
import i18n from './i18n';
import './index.css';
import { store } from "./store";

const AntdLocaleProvider = ({ children }: { children: React.ReactNode }) => {
  const { i18n: i18nInstance } = useTranslation();
  const [antdLocale, setAntdLocale] = useState(enUS);

  useEffect(() => {
    const currentLang = i18nInstance.language;
    if (currentLang.startsWith('fr')) {
      setAntdLocale(frFR);
    } else {
      setAntdLocale(enUS);
    }

    const handleLanguageChanged = (lng: string) => {
      if (lng.startsWith('fr')) {
        setAntdLocale(frFR);
      } else {
        setAntdLocale(enUS);
      }
    };

    i18nInstance.on('languageChanged', handleLanguageChanged);
    return () => {
      i18nInstance.off('languageChanged', handleLanguageChanged);
    };
  }, [i18nInstance]);

  return <ConfigProvider locale={antdLocale}>{children}</ConfigProvider>;
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <AntdLocaleProvider>
          <App />
        </AntdLocaleProvider>
      </I18nextProvider>
    </Provider>
  </StrictMode>,
)
