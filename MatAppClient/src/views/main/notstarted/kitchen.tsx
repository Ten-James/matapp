import LogoSVG from '../../../components/common/logo';
import { Panel } from '../../../components/common/panel';

const KitchenNotStarted = () => {
  return (
    <div className="App">
      <Panel
        class="center center-child"
        style={{ width: 'max(40vw,400px)', height: '80vh' }}
      >
        <LogoSVG class="upper" />
        <div>
          <h1>Wait till cashier start Session</h1>
        </div>
        <p>All rights reserved</p>
      </Panel>
    </div>
  );
};

export default KitchenNotStarted;
