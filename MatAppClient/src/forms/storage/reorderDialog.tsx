import React, { useMemo } from 'react';
import { useAdminContext } from '../../context/adminContext';
import { IBranchData, IIngredient } from '../../types';
import BaseDialog from '../../components/dialog/baseDialog';

export const ReorderDialog = () => {
  const { selectedItems } = useAdminContext();
  const storageData = useMemo(() => selectedItems as IBranchData<IIngredient>[], [selectedItems]);

  return (
    <BaseDialog
      header="Reorder"
      sendRoute="_"
    >
      <div className="selectable">
        {storageData?.map((storage) => (
          <div key={storage.id}>
            <h3>{storage.name}</h3>
            {storage.data.map((ing) =>
              ing.count || 1 < ing.recommendedCount ? (
                <p key={ing.id}>
                  {ing.recommendedCount - (ing.count || 1)}x {ing.name}{' '}
                </p>
              ) : null,
            )}
          </div>
        ))}
      </div>
    </BaseDialog>
  );
};
