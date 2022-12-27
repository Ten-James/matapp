import { useContext, useState } from 'react';
import BaseDialog from '../components/dialog/baseDialog';
import { AdminContext } from '../views/admin/admin';
const DeleteDialog = () => {
  const { selectedItems } = useContext(AdminContext);
  const [error, setError] = useState('');

  return (
    <BaseDialog header="Delete?">
      <>
        {selectedItems.map((item) => (
          /*TODO better display casting*/
          <div>{item.name}</div>
        ))}
      </>
    </BaseDialog>
  );
};

export default DeleteDialog;
