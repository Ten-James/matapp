import { TextAttributeDialog, ComboBoxAttributeDialog, TextAttributeWithCombo, CheckboxGroupDialog } from '../components/dialogLines';

const IngredientDialogBase = () => {
  return (
    <>
      <TextAttributeDialog
        name="name"
        required
      />
      <ComboBoxAttributeDialog
        name="category"
        required
        combo={['ahoj', 'veta', 'beta', 'gamma', 'delta', 'test']}
      />
      <TextAttributeDialog
        name="cost"
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
