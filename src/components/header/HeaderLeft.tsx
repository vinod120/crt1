import { AppDispatch } from "@/store";
import { toggle } from "@/store/slices/sidebarSlice";
import { MenuOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useDispatch } from "react-redux";

const HeaderLeft: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <div className="crt-header-left">
      <Button
        type="text"
        icon={
          <MenuOutlined
            className="crt-header-menu"
            style={{ fontSize: "20px", color: "#5b6b79" }}
          />
        }
        onClick={() => dispatch(toggle())}
        className="crt-header-button"
      />
    </div>
  );
};

export default HeaderLeft;
