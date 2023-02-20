import { useEffect, useState } from 'react';
import { useAppContext } from '../../context/appContext';
import { useAdminContext } from '../../context/adminContext';
import BaseDialog from '../../components/dialog/baseDialog';
import { UnsetComboBoxDialog } from '../../components/dialog/dialogLines';

interface IdishCategory {
  id: number;
  name: string;
}

const EnabledIcons = ['menu_book', 'restaurant', 'restaurant_menu', 'lunch_dining', 'cake', 'local_cafe', 'local_bar', 'liquor', 'local_pizza', 'icecream', 'egg'];

export const EditDishCategoriesDialog = () => {
  const [dishCategories, setDishCategories] = useState<IdishCategory[]>([]);

  const { translate, socket } = useAppContext();
  const { ingredients, getIngredients } = useAdminContext();
  useEffect(() => {
    if (ingredients.length === 0) getIngredients();
    socket.emit('get_dish_categories');
    socket.on('dish_categories', (data: IdishCategory[]) => {
      setDishCategories(data);
    });
  }, [ingredients, getIngredients]);

  return (
    <BaseDialog
      header={translate('edit_dish_categories')}
      sendRoute="edit_dish_categories"
    >
      <>
        {EnabledIcons.map((icon) => (
          <div>
            {translate(icon)}:<span className="material-symbols-outlined">{icon}</span>
          </div>
        ))}
        <UnsetComboBoxDialog
          name="test"
          comboValue={EnabledIcons.map((i) => {
            return { name: translate(i), value: i };
          })}
        />
      </>
    </BaseDialog>
  );
};
