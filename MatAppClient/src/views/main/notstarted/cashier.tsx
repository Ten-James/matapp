import LogoSVG from '../../../components/common/logo';
import { Button, Panel } from '../../../components/common/panel';
import { useMainContext } from '../../../context/mainContext';
import { ISession } from '../../../types';

const CashierNotStarted = () => {
  const { setSession, branchID } = useMainContext();
  return (
    <div className="App">
      <Panel
        class="center center-child"
        style={{ width: 'max(40vw,400px)', height: '80vh' }}
      >
        <LogoSVG class="upper" />
        <div>
          <h1>Please Start Session</h1>

          <Button
            onClick={() => {
              setSession({
                id: 1,
                branchId: branchID,
                currentOrders: [],
                startTime: new Date(),
              } as ISession);
            }}
          >
            Create
          </Button>
        </div>
        <p>All rights reserved</p>
      </Panel>
    </div>
  );
};

export default CashierNotStarted;
