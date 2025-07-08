import "./Footer.css";
const FooterNav: React.FC = ({}) => {
  return (
    <>
      <div>Copyright © Amphenol Advanced Sensors - All rights reserved.</div>
      <div>© {new Date().getFullYear()}</div>
    </>
  );
};

export default FooterNav;
