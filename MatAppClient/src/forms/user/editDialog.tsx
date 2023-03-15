import React from 'react';
import BaseDialog from '../../components/dialog/baseDialog';
import UserDialogBase from './dialogBase';

export const EditDialog = () => {
  return (
    <BaseDialog
      header="Edit User"
      sendRoute="edit_users"
    >
      <UserDialogBase />
    </BaseDialog>
  );
};
