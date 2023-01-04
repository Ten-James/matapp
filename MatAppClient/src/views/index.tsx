import { useContext, useEffect } from 'react';
import { context } from '../App';
import { Button, Panel } from '../components/common/panel';
import LogoSVG from '../components/common/logo';
import { SelectorContainer } from '../components/default';
import { GenerateFries } from '../misc/fries';

interface Props {
  showSettings: () => void;
}
const BaseView = ({ showSettings }: Props) => {
  const { setLoading } = useContext(context);
  useEffect(() => {
    GenerateFries();
    setTimeout(() => setLoading(false), 1000);
  }, []);
  return (
    <div className="App">
      <Panel
        class="center center-child"
        style={{ width: 'max(40vw,400px)', height: '80vh' }}
      >
        <LogoSVG class="upper" />
        <SelectorContainer showSettings={showSettings} />
        <p>All rights reserved</p>
      </Panel>
    </div>
  );
};

export default BaseView;
