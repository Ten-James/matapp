import { useContext, useEffect, useRef, useState } from 'react';
import { context } from '../../../App';
import { AdminContext } from '../admin';
import IngredientDialogBase from '../../../forms/ingredientDialogBase';
import './style.css';
import BaseDialog from '../../../components/dialog/baseDialog';

export const AddDialog = () => {
  const [error, setError] = useState('');

  return (
    <BaseDialog header="Add Ingredient">
      <IngredientDialogBase />
      {error && <p className="error">{error}</p>}
    </BaseDialog>
  );
};

const Dialog = () => {
  const { dialog } = useContext(AdminContext);
  console.log(window.location.pathname);
  if (dialog === 'add') {
    return <AddDialog />;
  }

  return null;
};

export default Dialog;
