import LogoSVG from "../components/logo";
import { context } from "../App";
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
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
      <Link to="/admin">Go to Admin</Link>
    </div>
  );
};
export default ErrorPage;
