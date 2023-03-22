import React from 'react';
import { Button } from '../../components/common/panel';
import BaseDialog from '../../components/dialog/baseDialog';
import { useAdminContext } from '../../context/adminContext';
import { useAppContext } from '../../context/appContext';
import useSocket from '../../hooks/useSocket';

//TODO: translation
export const ChangePasswordDialog = () => {
  const { socket, translate } = useAppContext();
  const { selectedItems } = useAdminContext();
  const [newPassword, getNewPassword] = useSocket(socket, 'new_password', '');
  return (
    <BaseDialog
      header="Change Password"
      sendRoute=""
    >
      <>
        <h2>
          {translate('change password for')} {selectedItems[0].name}
        </h2>
        <Button
          style={{ width: '50%', height: '3em', fontSize: '1.2em', margin: '1em auto' }}
          color="blue"
          onClick={(e) => {
            e.preventDefault();
            getNewPassword(selectedItems[0].id);
          }}
        >
          {translate('create_new_password')}
        </Button>

        <p style={{ userSelect: 'all', margin: '1em auto', textAlign: 'center', fontSize: '1.4em' }}>{newPassword}</p>
      </>
    </BaseDialog>
  );
};
