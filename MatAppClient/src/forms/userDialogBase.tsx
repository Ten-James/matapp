import { TextAttributeDialog, ComboBoxAttributeDialog, TextAttributeWithCombo, RadioGroupDialog } from '../components/dialogLines';

const IngredientDialogBase = () => {
  return (
    <>
      <TextAttributeDialog
        name="name"
        required
      />
      <TextAttributeDialog
        name="password"
        required
      />
      <ComboBoxAttributeDialog
        name="branch"
        required
        combo={['ahoj', 'veta', 'beta', 'gamma', 'delta', 'test']}
      />
    </>
  );
};

export default IngredientDialogBase;
