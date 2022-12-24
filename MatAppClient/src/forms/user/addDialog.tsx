import { useState } from 'react';
import BaseDialog from '../../components/dialog/baseDialog';
import UserDialogBase from './dialogBase';

export const AddDialog = () => {
  const [error, setError] = useState('');

  return (
    <BaseDialog header="Add User">
      <UserDialogBase />
      {error && <p className="error">{error}</p>}
    </BaseDialog>
  );
};
