import { useContext, useEffect, useMemo } from 'react';
import { ComboBoxDialog, TextAttributeDialog, TextAttributeWithAutoCompleteDialog } from '../../components/dialog/dialogLines';
import { IBranch, IUser } from '../../types';
import { useAdminContext } from '../../context/adminContext';
import { useAppContext } from '../../context/appContext';

const UserDialogBase = () => {
  const { socket } = useAppContext();
  const { selectedItems, dialog, branches, getBranches } = useAdminContext();

  useEffect(() => {
    if (branches.length === 0) getBranches();
  });

  const data = useMemo<IUser>(() => {
    if (dialog === 'edit') return selectedItems[0] as IUser;
    const item: IUser = {
      id: 0,
      name: '',
      access: 1,
      branchId: 0,
    };
    return item;
  }, [selectedItems]);
  return (
    <>
      <TextAttributeDialog
        name="name"
        required
        value={data.name}
      />
      <TextAttributeDialog name="password" />
      <ComboBoxDialog
        name="access"
        required
        value={`${data.access}`}
        comboValue={[
          { name: 'user', value: '1' },
          { name: 'admin', value: '2' },
        ]}
      />
      <ComboBoxDialog
        name="branch"
        required
        comboValue={branches.map((x) => ({ name: x.name, value: `${x.id}` }))}
      />
    </>
  );
};

export default UserDialogBase;
