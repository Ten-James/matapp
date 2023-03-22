import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../context/appContext';
import { useAdminContext } from '../../context/adminContext';
import BaseDialog from '../../components/dialog/baseDialog';
import { ComboBoxDialog, UnsetComboBoxDialog } from '../../components/dialog/dialogLines';
import { IDishCategory } from '../../types';

const EnabledIcons = ['menu_book', 'restaurant', 'restaurant_menu', 'lunch_dining', 'cake', 'local_cafe', 'local_bar', 'liquor', 'local_pizza', 'icecream', 'egg'];

export const EditDishCategoriesDialog = () => {
  const [dishCategories, setDishCategories] = useState<IDishCategory[]>([]);

  const { translate, socket } = useAppContext();
  const { ingredients, getIngredients } = useAdminContext();
  useEffect(() => {
    if (ingredients.length === 0) getIngredients();
    socket.emit('get_dish_categories');
    socket.on('dish_categories', (data: IDishCategory[]) => {
      setDishCategories(data);
      console.log(data);
    });
  }, [ingredients, getIngredients]);

  return (
    <BaseDialog
      header={translate('edit_dish_categories')}
      sendRoute="edit_dish_categories"
      afterProcess={(data) => {
        // data contains keys that have name instead of id change that
        const newData = {
          data: {},
        };
        Object.keys(data).forEach((key) => {
          if (dishCategories.findIndex((a) => a.name === key) === -1) {
            //@ts-ignore
            newData[key] = data[key];
          } else {
            //@ts-ignore
            newData['data'][dishCategories.find((a) => a.name === key)?.id] = data[key];
          }
        });
        return newData;
      }}
      tooltip={
        <>
          {EnabledIcons.map((icon) => (
            <div key={icon}>
              {translate(icon)}:<span className="material-symbols-outlined">{icon}</span>
            </div>
          ))}
        </>
      }
    >
      <>
        {dishCategories?.map((item) => (
          <>
            <ComboBoxDialog
              name={item.name}
              comboValue={EnabledIcons.map((i) => {
                return { name: translate(i), value: i };
              })}
              value={item.icon}
            />
          </>
        ))}
      </>
    </BaseDialog>
  );
};
