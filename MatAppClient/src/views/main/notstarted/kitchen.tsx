import React from 'react';
import LogoSVG from '../../../components/common/logo';
import { Panel } from '../../../components/common/panel';
import { useAppContext } from '../../../context/appContext';

const KitchenNotStarted = () => {
  const { translate } = useAppContext();
  return (
    <div className="App">
      <Panel
        class="center center-child"
        style={{ width: 'max(40vw,400px)', height: '80vh' }}
      >
        <LogoSVG class="upper" />
        <div>
          <h1>{translate('wait_for_cashier')}</h1>
        </div>
        <p>{translate('arr')}</p>
      </Panel>
    </div>
  );
};

export default KitchenNotStarted;
