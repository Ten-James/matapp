import { useContext, useEffect } from 'react';
import LogoSVG from '../components/common/logo';
import { Button, Panel } from '../components/common/panel';
import { GenerateFries } from '../misc/fries';
import { IBranch } from '../types';
import { useAppContext } from '../context/appContext';
interface Props {
  branches: IBranch[];
}

const BranchSelector = ({ branches }: Props) => {
  const { setBranches, setLoading, socket } = useAppContext();
  useEffect(() => {
    setLoading(true);
    setTimeout(GenerateFries, 20);
    setTimeout(() => socket.emit('get_branches'), 3000);
    socket.on('branches', (data: IBranch[]) => {
      setLoading(false);
      //duplicate data for testing
      setBranches(data.concat(data));
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="App">
      <Panel
        class="center center-child"
        style={{ width: 'max(40vw,400px)', height: '80vh' }}
      >
        <LogoSVG class="upper" />
        <h2>this part is currently unavailable</h2>
        <div className="branches">
          {branches.map((branch) => (
            <Panel
              class="branch"
              key={branch.id}
            >
              <div className="branch-name">{branch.name}</div>
              <div className="branch-location">{branch.location}</div>
              <Button class="branch-button">Log in</Button>
            </Panel>
          ))}
        </div>
        <p>All rights reserved</p>
      </Panel>
    </div>
  );
};

export default BranchSelector;
