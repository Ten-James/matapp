import LogoSVG from "../components/logo";
import { context } from "../App";
import React, { useContext, useEffect } from "react";
const ErrorPage = () => {
  const setLoading = useContext(context).setLoading;
  useEffect(() => {
    setLoading(false);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div className="App">
      <h1>Error 404</h1>
      <h2>We are currently cooking this page</h2>
      <LogoSVG />
    </div>
  );
};
export default ErrorPage;
