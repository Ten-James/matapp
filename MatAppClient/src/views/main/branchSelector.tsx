import { useContext, useEffect } from 'react';
import LogoSVG from '../../components/common/logo';
import { Button, Panel } from '../../components/common/panel';
import { GenerateFries } from '../../misc/fries';
import { IBranch } from '../../types';
import { useAppContext } from '../../context/appContext';
import { useMainContext } from '../../context/mainContext';

const BranchSelector = () => {
  const { branches, setBranches, setLoading, socket } = useAppContext();
  const { setBranchID } = useMainContext();

  useEffect(() => {
    setLoading(true);
    setTimeout(GenerateFries, 20);
    setTimeout(() => socket.emit('get_branches'), 3000);
    socket.on('branches', (data: IBranch[]) => {
      setLoading(false);
      setBranches(data);
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="App">
      <Panel
        class="center center-child"
        style={{ width: 'max(40vw,400px)', height: '80vh' }}
      >
        <LogoSVG class="upper" />
        <div className="branches">
          {branches.map((branch) => (
            <Panel
              class="branch"
              key={branch.id}
            >
              <div className="branch-name">{branch.name}</div>
              <div className="branch-location">{branch.location}</div>
              <Button
                onClick={() => {
                  setBranchID(branch.id);
                }}
                class="branch-button"
              >
                Log in
              </Button>
            </Panel>
          ))}
        </div>
        <p>All rights reserved</p>
      </Panel>
    </div>
  );
};

export default BranchSelector;
