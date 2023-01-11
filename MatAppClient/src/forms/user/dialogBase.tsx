import { useContext, useEffect, useMemo } from 'react';
import { ComboBoxDialog, TextAttributeDialog, TextAttributeWithAutoCompleteDialog } from '../../components/dialog/dialogLines';
import { AdminContext } from '../../views/admin/admin';
import { IBranch, IUser } from '../../types';
import { context } from '../../App';

const UserDialogBase = () => {
  const { socket } = useContext(context);
  const { selectedItems, dialog, branches, setBranches } = useContext(AdminContext);

  useEffect(() => {
    if (branches.length === 0) socket.emit('get_branches');
    socket.on('branches', (data: IBranch[]) => {
      setBranches(data);
    });
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
