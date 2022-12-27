import { useContext, useEffect, useRef, useState } from 'react';
import { context } from '../../App';
import { Button, Panel } from '../common/panel';
import * as Handlers from '../../handlers/dialog/handlers';
import { AdminContext } from '../../views/admin/admin';

interface BaseDialogProp {
  header: string;
  children: JSX.Element | JSX.Element[];
}

// TODO: make available for custom button color.
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
      autoComplete="off"
      className="dialog-background"
    >
      <div
        className="dialog"
        style={{ transform: `translateY(${translateY})` }}
      >
        <h1 className="dialog-header">{translate(header)}</h1>
        <div className="dialog-content">{children}</div>
        <div className="dialog-buttons">
          <Button onClick={handleHide}>{translate('cancel')}</Button>
          <Button
            color="blue"
            onClick={handleSubmit}
          >
            {translate('confirm')}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default BaseDialog;
