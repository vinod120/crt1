import { useTranslation } from "react-i18next";
import "./Footer.css";
const FooterNav: React.FC = ({}) => {
  const { t } = useTranslation();
  return (
    <>
      <div>{t("copyright")}</div>
      <div>© {new Date().getFullYear()}</div>
    </>
  );
};

export default FooterNav;
