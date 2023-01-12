import { useContext, useState } from 'react';
import BaseDialog from '../components/dialog/baseDialog';
import { useAdminContext } from '../context/adminContext';

interface Props {
  sendRoute: string;
}

const DeleteDialog = ({ sendRoute }: Props) => {
  const { selectedItems } = useAdminContext();
  const [error, setError] = useState('');

  return (
    <BaseDialog
      header="Delete?"
      sendRoute={`delete_${sendRoute}`}
    >
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
