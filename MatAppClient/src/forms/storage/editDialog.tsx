import React, { useEffect, useMemo } from 'react';
import BaseDialog from '../../components/dialog/baseDialog';
import { useAdminContext } from '../../context/adminContext';
import { IBranchData, IIngredient } from '../../types';
import { TextAttributeDialog } from '../../components/dialog/dialogLines';

export const EditDialog = () => {
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
        const newData = {
          data: {},
        };
        Object.keys(data).forEach((key) => {
          if (ingredients.findIndex((a) => a.name === key) === -1) {
            //@ts-ignore
            newData[key] = data[key];
          } else {
            //@ts-ignore
            newData['data'][ingredients.find((a) => a.name === key)?.id] = parseInt(data[key]);
          }
        });
        return newData;
      }}
    >
      <>
        {ingredients?.map((ing) => (
          <TextAttributeDialog
            key={ing.id}
            name={ing.name}
            isNumber
            value={`${storageData?.data.find((i) => i.id === ing.id)?.count || 0}`}
          />
        ))}
      </>
    </BaseDialog>
  );
};
