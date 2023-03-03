import { useMemo } from 'react';
import { useAdminContext } from '../../context/adminContext';
import { useAppContext } from '../../context/appContext';
import { IBranchData, IIngredient } from '../../types';
import BaseDialog from '../../components/dialog/baseDialog';

export const ReorderDialog = () => {
  const { translate } = useAppContext();
  const { selectedItems } = useAdminContext();
  const storageData = useMemo(() => selectedItems as IBranchData<IIngredient>[], [selectedItems]);

  return (
    <BaseDialog
      header="Reorder"
      sendRoute="_"
    >
      <div className="selectable">
        {storageData?.map((storage) => (
          <div>
            <h3>{storage.name}</h3>
            {storage.data.map((ing) =>
              ing.count < ing.recommendedCount ? (
                <p>
                  {ing.recommendedCount - ing.count}x {ing.name}{' '}
                </p>
              ) : null,
            )}
          </div>
        ))}
      </div>
    </BaseDialog>
  );
};
