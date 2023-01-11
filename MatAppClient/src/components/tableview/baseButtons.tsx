import { useContext } from 'react';
import { context } from '../../App';
import { Button } from '../common/panel';
import { AdminContext } from '../../views/admin/admin';

export const BaseButtons = () => {
  const { setDialog, selectedIDs, setSelectedIDs } = useContext(AdminContext);
  const { translate } = useContext(context);
  return (
    <>
      <Button
        color="blue"
        onClick={() => setDialog('add')}
      >
        <span className="material-symbols-outlined">add</span>
        {translate('add')}
      </Button>
      <Button
        onClick={() => setDialog('edit')}
        disabled={selectedIDs.length === 0}
      >
        <span className="material-symbols-outlined">edit</span>
        {translate('edit')}
      </Button>
      <Button
        color="red"
        onClick={() => setDialog('delete')}
      >
        <span className="material-symbols-outlined">delete</span>
        {translate('delete')}
      </Button>
      <Button
        color="red"
        disabled={selectedIDs.length === 0}
        onClick={() => {
          setSelectedIDs([]);
        }}
      >
        <span className="material-symbols-outlined">clear</span>
        {translate('clear')}
      </Button>
    </>
  );
};
