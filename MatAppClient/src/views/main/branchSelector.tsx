import React, { useEffect } from 'react';
import LogoSVG from '../../components/common/logo';
import { Button, Panel } from '../../components/common/panel';
import { GenerateFries } from '../../misc/fries';
import { useAppContext } from '../../context/appContext';
import { Link } from 'react-router-dom';

interface props {
  setBranchID: React.Dispatch<React.SetStateAction<number>>;
  goBackVisible?: boolean;
}

const BranchSelector: React.FC<props> = ({ setBranchID, goBackVisible }) => {
  const { branches, getBranches, setLoading, translate } = useAppContext();

  useEffect(() => {
    getBranches();
    if (!goBackVisible) return;
    setLoading(true);
    setTimeout(GenerateFries, 20);
    setTimeout(() => {
      setLoading(false);
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
          {goBackVisible ? (
            <Link
              style={{ marginRight: '2em' }}
              to="/"
            >
              {translate('goback')}
            </Link>
          ) : null}
          <p>{translate('arr')}</p>
        </div>
      </Panel>
    </div>
  );
};

export default BranchSelector;
