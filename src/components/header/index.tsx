import "./Header.css";
import HeaderLeft from "./HeaderLeft";
import HeaderRight from "./HeaderRight";

const Header = () => {
  return (
    <header className="crt-header">
      <HeaderLeft />
      <HeaderRight />
    </header>
  );
};

export default Header;
