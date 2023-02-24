import { useEffect, useMemo } from 'react';
import BaseDialog from '../../components/dialog/baseDialog';
import { useAdminContext } from '../../context/adminContext';
import { useAppContext } from '../../context/appContext';
import { IBranchData, IIngredient } from '../../types';

export const EditDialog = () => {
  const { translate } = useAppContext();
  const { ingredients, getIngredients, selectedItems } = useAdminContext();
  const storageData = useMemo(() => selectedItems[0] as IBranchData<IIngredient>, [selectedItems]);
  useEffect(() => {
    console.log(selectedItems);
  }, [selectedItems]);

  useEffect(() => {
    if (ingredients.length === 0) getIngredients();
  }, [ingredients, getIngredients]);
  return (
    <BaseDialog
      header="Edit Storage"
      sendRoute="edit_storage"
    >
      <>
        {ingredients?.map((ing) => (
          <div>
            <h2>{ing.name}</h2>
            <p>{storageData?.data.find((i) => i.id === ing.id)?.count || 0}</p>
          </div>
        ))}
      </>
    </BaseDialog>
  );
};
