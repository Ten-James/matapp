import { useContext, useEffect, useRef, useState } from 'react';
import { context } from '../../App';
import { Button, Panel } from '../common/panel';
import * as Handlers from '../../handlers/dialog/handlers';
import { AdminContext } from '../../views/admin/admin';

interface BaseDialogProp {
  header: string;
  children: JSX.Element | JSX.Element[];
}

const BaseDialog = ({ header, children }: BaseDialogProp) => {
  const { translate } = useContext(context);
  const form = useRef<HTMLFormElement | null>(null);
  const [translateY, setTranslateY] = useState('-100vh');
  const { setDialog } = useContext(AdminContext);

  const handleHide = (e: Event) => Handlers.hide(e, setTranslateY, setDialog);
  const handleSubmit = (e: Event) => Handlers.submit(e, form.current, setTranslateY, setDialog);

  useEffect(() => {
    setTimeout(() => {
      setTranslateY('0');
    }, 100);
  }, []);

  return (
    <form
      ref={form}
      className="dialog-background"
    >
      <Panel
        class="dialog"
        style={{ transform: `translateY(${translateY})` }}
      >
        <h1 className="dialog-header">{translate(header)}</h1>
        <div className="dialog-content">{children}</div>
        <div className="dialog-buttons">
          <Button onClick={handleHide}>{translate('cancel')}</Button>
          <Button onClick={handleSubmit}>{translate('confirm')}</Button>
        </div>
      </Panel>
    </form>
  );
};

export default BaseDialog;