import LogoSVG from '../../../components/common/logo';
import { Button, Panel } from '../../../components/common/panel';
import { useAppContext } from '../../../context/appContext';
import { useMainContext } from '../../../context/mainContext';
import { ISession } from '../../../types';

const CashierNotStarted = () => {
  const { translate } = useAppContext();
  const { setSession, branchID } = useMainContext();
  return (
    <div className="App">
      <Panel
        class="center center-child"
        style={{ width: 'max(40vw,400px)', height: '80vh' }}
      >
        <LogoSVG class="upper" />
        <div>
          <h1>{translate('start_session')}</h1>

          <Button
            onClick={() => {
              setSession({
                id: 1,
                branchId: branchID,
                currentOrders: [],
                startTime: new Date().toLocaleString(),
              } as ISession);
            }}
          >
            {translate('start')}
          </Button>
        </div>
        <p>{translate('arr')}</p>
      </Panel>
    </div>
  );
};

export default CashierNotStarted;
