import { useState } from 'react';
import BaseDialog from '../../components/dialog/baseDialog';
import IngredientDialogBase from './dialogBase';

export const AddDialog = () => {
  return (
    <BaseDialog
      header="Add Ingredient"
      sendRoute="add_ingredients"
    >
      <IngredientDialogBase />
    </BaseDialog>
  );
};
