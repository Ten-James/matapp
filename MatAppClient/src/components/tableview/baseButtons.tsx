import { useContext } from 'react';
import { context } from '../../App';
import { Button } from '../common/panel';
import { AdminContext } from '../../views/admin/admin';

export const BaseButtons = () => {
  const { setDialog } = useContext(AdminContext);
  const { translate } = useContext(context);
  return (
    <>
      <Button onClick={() => setDialog('add')}>
        <span className="material-symbols-outlined">add</span>
        {translate('add')}
      </Button>
      <Button onClick={() => setDialog('edit')}>
        <span className="material-symbols-outlined">edit</span>
        {translate('edit')}
      </Button>
      <Button onClick={() => setDialog('delete')}>
        <span className="material-symbols-outlined">delete</span>
        {translate('delete')}
      </Button>
    </>
  );
};
