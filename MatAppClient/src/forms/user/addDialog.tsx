import React from 'react';
import BaseDialog from '../../components/dialog/baseDialog';
import UserDialogBase from './dialogBase';

export const AddDialog = () => {
  return (
    <BaseDialog
      header="Add User"
      sendRoute="add_users"
    >
      <UserDialogBase />
    </BaseDialog>
  );
};
