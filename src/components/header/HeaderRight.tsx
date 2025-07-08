import { AppDispatch, RootState } from "@/store";
import { toggleTheme } from "@/store/slices/themeSlice";
import {
    BellOutlined,
    MoonOutlined,
    SettingOutlined,
    SunOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";

const HeaderRight: React.FC = () => {
  const themeType = useSelector((state: RootState) => state.theme.theme);
  const dispatch = useDispatch<AppDispatch>();
  return (
    <div className="crt-header-right">
      <Button
        type="text"
        icon={<SettingOutlined />}
        className="crt-header-button"
      />
      <Button type="text" icon={<BellOutlined />} className="crt-header-button">
        <span className="crt-notification-badge">3</span>
      </Button>
      <Button
        type="text"
        icon={<UserOutlined />}
        className="crt-header-button"
      />
      <Button
        type="text"
        icon={themeType === "light" ? <SunOutlined /> : <MoonOutlined />}
        onClick={() => dispatch(toggleTheme())}
        className="crt-header-button"
      />
    </div>
  );
};

export default HeaderRight;
