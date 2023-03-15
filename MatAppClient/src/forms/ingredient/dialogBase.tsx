import React, { useEffect, useMemo, useState } from 'react';
import { TextAttributeDialog, TextAttributeWithAutoCompleteDialog, TextAttributeWithCombo, CheckboxGroupDialog } from '../../components/dialog/dialogLines';
import { IIngredient } from '../../types';
import { useAdminContext } from '../../context/adminContext';
import { useAppContext } from '../../context/appContext';

const IngredientDialogBase = () => {
  const { socket } = useAppContext();
  const { selectedItems, dialog } = useAdminContext();
  const [categories, setCategories] = useState(['']);
  const data = useMemo<IIngredient>(() => {
    if (dialog === 'edit') return selectedItems[0] as IIngredient;
    const item: IIngredient = {
      id: 0,
      name: '',
      category: '',
      cost: 0,
      text: '1',
      allergens: '',
      recommendedCount: 10,
    };
    return item;
  }, [selectedItems]);

  socket.on('ingredient_types', (data: string[]) => {
    console.log(data);
    setCategories(data);
  });

  useEffect(() => {
    socket.emit('get_ingredient_types');
  }, []);

  return (
    <>
      <TextAttributeDialog
        name="name"
        required
        value={data.name}
      />
      <TextAttributeWithAutoCompleteDialog
        name="category"
        required
        combo={categories}
        value={data.category}
      />
      <TextAttributeDialog
        name="cost"
        required
        isNumber
        value={`${data.cost}`}
      />
      <TextAttributeDialog
        name="recommendedCount"
        required
        isNumber
        value={`${data.recommendedCount}`}
      />
      <TextAttributeWithCombo
        name="text"
        isNumber
        required
        value={data.text}
        combo={['ks', 'ml', 'g']}
      />
      <CheckboxGroupDialog
        name="allergens"
        radios={['1', '2', '3', '4', '5', '6', '7', '8', '9']}
        checked={data.allergens}
      />
    </>
  );
};

export default IngredientDialogBase;
