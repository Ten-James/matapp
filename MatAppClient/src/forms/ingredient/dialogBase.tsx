import { useContext, useEffect, useState } from 'react';
import { TextAttributeDialog, ComboBoxAttributeDialog, TextAttributeWithCombo, CheckboxGroupDialog } from '../../components/dialog/dialogLines';
import { context } from '../../App';

const IngredientDialogBase = () => {
  const { socket } = useContext(context);
  const [categoires, setCategoires] = useState(['']);

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
      />
      <ComboBoxAttributeDialog
        name="category"
        required
        combo={categoires}
      />
      <TextAttributeDialog
        name="cost"
        required
        isNumber
      />
      <TextAttributeWithCombo
        name="text"
        isNumber
        required
        combo={['ks', 'ml']}
      />
      <CheckboxGroupDialog
        name="allergens"
        radios={['1', '2', '3', '4', '5', '6', '7', '8', '9']}
      />
    </>
  );
};

export default IngredientDialogBase;
