import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { context } from '../App';
import LogoSVG from '../components/common/logo';
import { Panel } from '../components/common/panel';
const ErrorPage = () => {
  const { setLoading } = useContext(context);
  useEffect(() => {
    setLoading(false);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div className="App">
      <Panel class="center">
        <h1>Error 404</h1>
        <h2>We are currently cooking this page</h2>
        <LogoSVG />
        <Link to="/admin">Go to Admin</Link>
      </Panel>
    </div>
  );
};
export default ErrorPage;
