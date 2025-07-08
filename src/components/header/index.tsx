import "./Header.css";
import HeaderLeft from "./HeaderLeft";
import HeaderRight from "./HeaderRight";

const Header = () => {
  return (
    <div className='crt-header'>
        <HeaderLeft />
        <HeaderRight />
    </div>
  );
};

export default Header;
