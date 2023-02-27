import { useContext, useEffect, useRef, useState } from 'react';
import { Button, Panel } from '../common/panel';
import * as Handlers from '../../handlers/dialog/handlers';
import { useAppContext } from '../../context/appContext';
import { useAdminContext } from '../../context/adminContext';

interface BaseDialogProp {
  header: string;
  sendRoute: string;
  children: React.ReactElement;
  tooltip?: React.ReactElement;
  afterProcess?: (data: any) => any;
}

// TODO: make available for custom button color.
const BaseDialog = ({ header, sendRoute, children, tooltip, afterProcess }: BaseDialogProp) => {
  const { translate, socket } = useAppContext();
  const [error, setError] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const form = useRef<HTMLFormElement | null>(null);
  const [translateY, setTranslateY] = useState('-100vh');
  const [tooltipX, setTooltipX] = useState('-101vh');
  const { setDialog, selectedIDs, refresh } = useAdminContext();

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
      afterProcess || ((data) => data),
    );

  useEffect(() => {
    setTimeout(() => {
      setTranslateY('0');
    }, 100);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (tooltip != null) setTooltipX('0');
      else setTooltipX('-100vh');
    }, 100);
  }, [tooltip]);

  return (
    <form
      ref={form}
      autoComplete="off"
      className="dialog-background"
    >
      <div
        className="dialog dialog-tooltip"
        style={{ transform: `translateX(${translateY === '-100vh' ? translateY : tooltipX})` }}
      >
        {tooltip}
      </div>
      <div
        className="dialog"
        style={{ transform: `translateY(${translateY})`, gridColumn: '2' }}
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
