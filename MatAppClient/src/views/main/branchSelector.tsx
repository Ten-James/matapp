import React, { useEffect } from 'react';
import LogoSVG from '../../components/common/logo';
import { Button, Panel } from '../../components/common/panel';
import { GenerateFries } from '../../misc/fries';
import { useAppContext } from '../../context/appContext';
import { useMainContext } from '../../context/mainContext';
import { Link } from 'react-router-dom';

const BranchSelector = () => {
  const { branches, getBranches, setLoading, translate } = useAppContext();
  const { setBranchID } = useMainContext();

  useEffect(() => {
    setLoading(true);
    setTimeout(GenerateFries, 20);
    setTimeout(() => {
      setLoading(false);
      getBranches();
    }, 3000);
  }, []);

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
                {translate('log_in')}
              </Button>
            </Panel>
          ))}
        </div>
        <div>
          <Link
            style={{ marginRight: '2em' }}
            to="/"
          >
            {translate('goback')}
          </Link>
          <p>{translate('arr')}</p>
        </div>
      </Panel>
    </div>
  );
};

export default BranchSelector;
