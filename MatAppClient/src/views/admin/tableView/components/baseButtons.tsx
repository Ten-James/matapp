import { useContext } from 'react';
import { context } from '../../../../App';
import { Button } from '../../../../components/panel';
import { AdminContext } from '../../admin';

export const BaseButtons = () => {
  const { setDialog } = useContext(AdminContext);
  const { translate } = useContext(context);
  return (
    <>
      <Button onClick={() => setDialog('add')}>
        <span className="material-symbols-outlined">add</span>
        {translate('add')}
      </Button>
      <Button>
        <span className="material-symbols-outlined">edit</span>
        {translate('edit')}
      </Button>
      <Button>
        <span className="material-symbols-outlined">delete</span>
        {translate('delete')}
      </Button>
    </>
  );
};
