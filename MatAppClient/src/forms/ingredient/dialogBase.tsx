import { useContext, useEffect, useMemo, useState } from 'react';
import { TextAttributeDialog, TextAttributeWithAutoCompleteDialog, TextAttributeWithCombo, CheckboxGroupDialog } from '../../components/dialog/dialogLines';
import { context } from '../../App';
import { AdminContext } from '../../views/admin/admin';
import { IIngredient } from '../../types';

const IngredientDialogBase = () => {
  const { socket } = useContext(context);
  const { selectedItems, dialog } = useContext(AdminContext);
  const [categoires, setCategoires] = useState(['']);
  const data = useMemo<IIngredient>(() => {
    if (dialog === 'edit') return selectedItems[0] as IIngredient;
    const item: IIngredient = {
      id: 0,
      name: '',
      category: '',
      cost: 0,
      text: '',
      allergens: '',
    };
    return item;
  }, [selectedItems]);

  socket.on('ingredient_types', (data: string[]) => {
    console.log(data);
    setCategoires(data);
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
        combo={categoires}
        value={data.category}
      />
      <TextAttributeDialog
        name="cost"
        required
        isNumber
        value={`${data.cost}`}
      />
      <TextAttributeWithCombo
        name="text"
        isNumber
        required
        value={data.text}
        combo={['ks', 'ml']}
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
