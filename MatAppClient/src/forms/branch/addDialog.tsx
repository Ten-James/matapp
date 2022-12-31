import { useState } from 'react';
import BaseDialog from '../../components/dialog/baseDialog';
import BranchDialogBase from './dialogBase';

export const AddDialog = () => {
  const [error, setError] = useState('');

  return (
    <BaseDialog
      header="Add Branch"
      sendRoute="add_branches"
    >
      <BranchDialogBase />
      {error && <p className="error">{error}</p>}
    </BaseDialog>
  );
};
