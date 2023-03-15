import React, { useState } from 'react';
import BaseDialog from '../components/dialog/baseDialog';
import { useAdminContext } from '../context/adminContext';

interface Props {
  sendRoute: string;
}

const DeleteDialog = ({ sendRoute }: Props) => {
  const { selectedItems } = useAdminContext();

  return (
    <BaseDialog
      header="Delete?"
      sendRoute={`delete_${sendRoute}`}
    >
      <>
        {selectedItems.map((item) => (
          /*TODO better display casting*/
          <div key={item.id}>{item.name}</div>
        ))}
      </>
    </BaseDialog>
  );
};

export default DeleteDialog;
