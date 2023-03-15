import React, { useMemo } from 'react';
import { TextAttributeDialog } from '../../components/dialog/dialogLines';
import { useAdminContext } from '../../context/adminContext';
import { IBranch } from '../../types';

const BranchDialogBase = () => {
  const { selectedItems, dialog } = useAdminContext();
  const data = useMemo<IBranch>(() => {
    if (dialog === 'edit') return selectedItems[0] as IBranch;
    const item: IBranch = {
      id: 0,
      name: '',
      location: '',
      size: 0,
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
      <TextAttributeDialog
        name="location"
        required
        value={data.location}
      />
      <TextAttributeDialog
        name="size"
        required
        value={`${data.size}`}
      />
    </>
  );
};

export default BranchDialogBase;
