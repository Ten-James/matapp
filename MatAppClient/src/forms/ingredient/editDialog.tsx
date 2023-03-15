import React from 'react';
import BaseDialog from '../../components/dialog/baseDialog';
import IngredientDialogBase from './dialogBase';

export const EditDialog = () => {
  return (
    <BaseDialog
      header="Edit Ingredient"
      sendRoute="edit_ingredients"
    >
      <IngredientDialogBase />
    </BaseDialog>
  );
};
