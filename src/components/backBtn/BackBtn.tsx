import { Button, ButtonProps, Tooltip } from 'antd';
import React from 'react';
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

interface BackBtnProps extends ButtonProps {
  wIcon?: boolean;
  iconOnly?: boolean;
}

const BackBtn: React.FC<BackBtnProps> = ({ wIcon, iconOnly, ...others }) => {
  const navigate = useNavigate();

  return (
    <Tooltip title="Navigate to previous page">
      <Button
        name="go back"
        id="go-back"
        icon={wIcon || iconOnly ? <FaArrowLeft /> : null}
        onClick={() => navigate(-1)}
        {...others}
      >
        {!iconOnly && 'Go back'}
      </Button>
    </Tooltip>
  );
};

export default BackBtn;
