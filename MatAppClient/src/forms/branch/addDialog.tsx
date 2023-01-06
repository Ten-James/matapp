import { useState } from 'react';
import BaseDialog from '../../components/dialog/baseDialog';
import BranchDialogBase from './dialogBase';

export const AddDialog = () => {
  return (
    <BaseDialog
      header="Add Branch"
      sendRoute="add_branches"
    >
      <BranchDialogBase />
    </BaseDialog>
  );
};
