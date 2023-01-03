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
        name="access"
        required
        combo={['user', 'admin']}
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
