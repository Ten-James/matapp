import { ComboBoxAttributeDialog, TextAttributeDialog } from '../../components/dialog/dialogLines';

const DishDialogBase = () => {
  return (
    <>
      <TextAttributeDialog
        name="name"
        required
      />
      <TextAttributeDialog
        name="cost"
        isNumber
      />
      <ComboBoxAttributeDialog
        name="category"
        combo={['test', 'test2', 'test3']}
      />
    </>
  );
};

export default DishDialogBase;
