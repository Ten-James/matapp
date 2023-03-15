import React, { useEffect, useMemo } from 'react';
import { ComboBoxDialog, TextAttributeDialog } from '../../components/dialog/dialogLines';
import { IUser } from '../../types';
import { useAdminContext } from '../../context/adminContext';

const UserDialogBase = () => {
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
