import { useContext, useEffect, useRef, useState } from 'react';
import { context } from '../../App';
import { Button, Panel } from '../common/panel';
import * as Handlers from '../../handlers/dialog/handlers';
import { AdminContext } from '../../views/admin/admin';

interface BaseDialogProp {
  header: string;
  sendRoute: string;
  children: JSX.Element | JSX.Element[];
}

// TODO: make available for custom button color.
const BaseDialog = ({ header, sendRoute, children }: BaseDialogProp) => {
  const { translate, socket } = useContext(context);
  const [error, setError] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const form = useRef<HTMLFormElement | null>(null);
  const [translateY, setTranslateY] = useState('-100vh');
  const { setDialog, selectedIDs, refresh } = useContext(AdminContext);

  const handleHide = (e: Event) => Handlers.hide(e, setTranslateY, setDialog);
  const handleSubmit = (e: Event) =>
    Handlers.submit(
      e,
      form.current,
      selectedIDs,
      setButtonDisabled,
      (data) => {
        socket.emit(sendRoute, data);
        setTranslateY('-100vh');
        setTimeout(() => setDialog('hidden'), 500);
        setTimeout(refresh, 500);
      },
      setError,
    );

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
        <div className="dialog-content">
          {children}

          {error && <p className="error">{error}</p>}
        </div>
        <div className="dialog-buttons">
          <Button onClick={handleHide}>{translate('cancel')}</Button>
          <Button
            color="blue"
            onClick={handleSubmit}
            disabled={buttonDisabled}
          >
            {translate('confirm')}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default BaseDialog;
