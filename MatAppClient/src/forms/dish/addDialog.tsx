import { useState } from 'react';
import BaseDialog from '../../components/dialog/baseDialog';
import DishDialogBase from './dialogBase';

export const AddDialog = () => {
  return (
    <BaseDialog
      header="Add Dish"
      sendRoute="add_dishes"
    >
      <DishDialogBase />
    </BaseDialog>
  );
};
