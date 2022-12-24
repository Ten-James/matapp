import { useState } from 'react';
import BaseDialog from '../../components/dialog/baseDialog';
import IngredientDialogBase from './dialogBase';

export const AddDialog = () => {
  const [error, setError] = useState('');

  return (
    <BaseDialog header="Add Ingredient">
      <IngredientDialogBase />
      {error && <p className="error">{error}</p>}
    </BaseDialog>
  );
};
