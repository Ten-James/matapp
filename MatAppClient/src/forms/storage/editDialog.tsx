import { useEffect, useMemo } from 'react';
import BaseDialog from '../../components/dialog/baseDialog';
import { useAdminContext } from '../../context/adminContext';
import { useAppContext } from '../../context/appContext';
import { IBranchData, IIngredient } from '../../types';
import { TextAttributeDialog } from '../../components/dialog/dialogLines';

export const EditDialog = () => {
  const { translate } = useAppContext();
  const { ingredients, getIngredients, selectedItems } = useAdminContext();
  const storageData = useMemo(() => selectedItems[0] as IBranchData<IIngredient>, [selectedItems]);

  useEffect(() => {
    if (ingredients.length === 0) getIngredients();
  }, [ingredients, getIngredients]);
  return (
    <BaseDialog
      header="Edit Storage"
      sendRoute="edit_storage"
      afterProcess={(data) => {
        let newData = {
          data: {},
        };
        Object.keys(data).forEach((key) => {
          if (ingredients.findIndex((a) => a.name === key) === -1) {
            newData[key] = data[key];
          } else {
            newData['data'][ingredients.find((a) => a.name === key)?.id] = parseInt(data[key]);
          }
        });
        return newData;
      }}
    >
      <>
        {ingredients?.map((ing) => (
          <TextAttributeDialog
            name={ing.name}
            isNumber
            value={`${storageData?.data.find((i) => i.id === ing.id)?.count || 0}`}
          />
        ))}
      </>
    </BaseDialog>
  );
};
