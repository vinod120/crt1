import { Button, ButtonProps } from 'antd';
import React from 'react';
import { IoMdRefresh } from "react-icons/io";

interface RefreshBtnProps extends ButtonProps {
  icon?: boolean;
}

const RefreshBtn: React.FC<RefreshBtnProps> = ({ icon, ...others }) => {
  return (
    <Button
      name="refresh-btn"
      id="refresh-btn"
      icon={icon ? <IoMdRefresh /> : null}
      onClick={() => window.location.reload()}
      {...others}
    >
      Refresh page
    </Button>
  );
};

export default RefreshBtn;
