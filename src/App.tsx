import { ConfigProvider, theme } from 'antd';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import AdminLayout from "./layouts/adminLayout";
import { RootState } from './store';

const App = () => {
  const themeType = useSelector((state: RootState) => state.theme.theme);

  return (
      <ConfigProvider theme={{ algorithm: themeType === 'light' ? theme.defaultAlgorithm : theme.darkAlgorithm }}>
        <Router>
          <AdminLayout />
        </Router>
      </ConfigProvider>
  );
};

export default App;