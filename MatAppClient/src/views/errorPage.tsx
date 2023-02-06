import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LogoSVG from '../components/common/logo';
import { Panel } from '../components/common/panel';
import { useAppContext } from '../context/appContext';
const ErrorPage = () => {
  const { setLoading } = useAppContext();
  useEffect(() => {
    setLoading(false);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div className="App">
      <Panel class="center">
        <h1>Error 404</h1>
        <h2>We are currently cooking this page</h2>
        <LogoSVG />
        <Link
          style={{ marginRight: '2em' }}
          to="/admin"
        >
          Go to Admin{' '}
        </Link>
        <Link
          style={{ marginRight: '2em' }}
          to="/main/cashier"
        >
          Go to Cashier{' '}
        </Link>
        <Link
          style={{ marginRight: '2em' }}
          to="/main/kitchen"
        >
          Go to Kitchen{' '}
        </Link>
      </Panel>
    </div>
  );
};
export default ErrorPage;
