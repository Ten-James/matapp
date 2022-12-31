import { useState } from 'react';
import BaseDialog from '../../components/dialog/baseDialog';
import DishDialogBase from './dialogBase';

export const AddDialog = () => {
  const [error, setError] = useState('');

  return (
    <BaseDialog
      header="Add Dish"
      sendRoute="add_dishes"
    >
      <DishDialogBase />
      {error && <p className="error">{error}</p>}
    </BaseDialog>
  );
};
