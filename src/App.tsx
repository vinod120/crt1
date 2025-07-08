import { ConfigProvider, theme } from 'antd';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import AppLayout from "./layout/appLayout";
import { RootState } from './store';

const App = () => {
  const themeType = useSelector((state: RootState) => state.theme.theme);
  return (
      <ConfigProvider theme={{ algorithm: themeType === 'light' ? theme.defaultAlgorithm : theme.darkAlgorithm }}>
        <div className="app-container">
        <Router>
          <AppLayout />
        </Router>
        </div>
      </ConfigProvider>
  );
};

export default App;