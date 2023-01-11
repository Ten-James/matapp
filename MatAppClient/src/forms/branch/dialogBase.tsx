import { TextAttributeWithAutoCompleteDialog, TextAttributeDialog } from '../../components/dialog/dialogLines';

const BranchDialogBase = () => {
  return (
    <>
      <TextAttributeDialog
        name="name"
        required
      />
      <TextAttributeDialog
        name="location"
        required
      />
    </>
  );
};

export default BranchDialogBase;
