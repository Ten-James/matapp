import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import LogoSVG from '../components/common/logo';
import { Panel } from '../components/common/panel';
import { useAppContext } from '../context/appContext';
const ErrorPage = () => {
  const { setLoading, translate } = useAppContext();
  useEffect(() => {
    setLoading(false);
  }, []);
  return (
    <div className="App">
      <Panel class="center">
        <h1>Error 404</h1>
        <h2>{translate('cooking_page')}</h2>
        <LogoSVG />
        <Link
          style={{ marginRight: '2em' }}
          to="/admin"
        >
          {translate('goto')} Admin
        </Link>
        <Link
          style={{ marginRight: '2em' }}
          to="/main/cashier"
        >
          {translate('goto')} Cashier
        </Link>
        <Link
          style={{ marginRight: '2em' }}
          to="/main/kitchen"
        >
          {translate('goto')} Kitchen
        </Link>
      </Panel>
    </div>
  );
};
export default ErrorPage;
