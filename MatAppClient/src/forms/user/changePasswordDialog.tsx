import { Button } from '../../components/common/panel';
import BaseDialog from '../../components/dialog/baseDialog';
import { useAdminContext } from '../../context/adminContext';
import { useAppContext } from '../../context/appContext';
import useSocket from '../../hooks/useSocket';

export const ChangePasswordDialog = () => {
  const { socket } = useAppContext();
  const { selectedItems } = useAdminContext();
  const [newPassword, getNewPassword] = useSocket(socket, 'new_password', '');
  return (
    <BaseDialog
      header="Change Password"
      sendRoute=""
    >
      <p>change password for {selectedItems[0].name}</p>
      <Button
        onClick={(e) => {
          e.preventDefault();
          getNewPassword(selectedItems[0].id);
        }}
      >
        create new password
      </Button>

      <p style={{ userSelect: 'all' }}>{newPassword}</p>
    </BaseDialog>
  );
};
