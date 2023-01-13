import { useState } from 'react';
import BaseDialog from '../../components/dialog/baseDialog';
import BranchDialogBase from './dialogBase';

export const EditDialog = () => {
  return (
    <BaseDialog
      header="Edit Branch"
      sendRoute="edit_branches"
    >
      <BranchDialogBase />
    </BaseDialog>
  );
};
