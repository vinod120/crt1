import { AppDispatch } from "@/store";
import { toggle } from "@/store/slices/sidebarSlice";
import { Button } from "antd";
import { FiMenu } from "react-icons/fi";
import { useDispatch } from "react-redux";

const HeaderLeft: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="crt-header-left">
      <Button
        type="text"
        className="crt-header-icon"
        icon={<FiMenu fontSize={25} />}
        onClick={() => dispatch(toggle())}
      />
    </div>
  );
};

export default HeaderLeft;
