import NProgress from "nprogress";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./Nprogress.css";
NProgress.configure({ showSpinner: false });

const NProgressLoader = () => {
  const location = useLocation();

  useEffect(() => {
    NProgress.start();
    const timeout = setTimeout(() => {
      NProgress.done();
    }, 300);

    return () => {
      clearTimeout(timeout);
      NProgress.done();
    };
  }, [location.pathname]);

  return null;
};

export default NProgressLoader;
