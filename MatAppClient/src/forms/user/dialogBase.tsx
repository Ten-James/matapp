import { TextAttributeDialog, ComboBoxAttributeDialog } from '../../components/dialog/dialogLines';

const UserDialogBase = () => {
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

export default UserDialogBase;
