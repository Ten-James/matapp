import { TextAttributeDialog, ComboBoxAttributeDialog } from '../components/dialog/dialogLines';

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
