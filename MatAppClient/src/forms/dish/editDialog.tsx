import { useEffect, useCallback, useState } from 'react';
import { TextAttributeWithAutoCompleteDialog, TextAttributeDialog, UnsetComboBoxDialog } from '../../components/dialog/dialogLines';
import { useAdminContext } from '../../context/adminContext';
import { Button } from '../../components/common/panel';
import { useAppContext } from '../../context/appContext';
import BaseDialog from '../../components/dialog/baseDialog';
import { IDish } from '../../types';

export const EditDialog = () => {
  const { translate, socket } = useAppContext();
  const { ingredients, getIngredients, selectedItems } = useAdminContext();

  const [lines, setLines] = useState<number>((selectedItems[0] as IDish).ingredients.length);
  const [dishCategories, setDishCategories] = useState<string[]>([]);
  const [estCost, setEstCost] = useState<number>(0);

  useEffect(() => {
    if (ingredients.length === 0) getIngredients();
    socket.emit('get_dish_categories');
    socket.on('dish_categories', (data: { id: number; name: string }[]) => {
      setDishCategories(data.map((category) => category.name));
    });
    setEstCost(
      ([...document.querySelectorAll('select[name^="line_"]')] as HTMLInputElement[]).reduce((acc, val) => {
        const ingredient = ingredients.find((i) => i.id === parseInt(val.value));
        if (ingredient) return acc + ingredient.cost;
        return acc;
      }, 0),
    );
  }, [ingredients, getIngredients]);

  useEffect(() => {
    console.log(selectedItems[0]);
  }, [selectedItems]);

  return (
    <BaseDialog
      header="Edit Dish"
      sendRoute="edit_dishes"
    >
      <>
        <TextAttributeDialog
          name="name"
          required
          value={(selectedItems[0] as IDish).name}
        />
        <TextAttributeWithAutoCompleteDialog
          name="category"
          combo={dishCategories}
          value={(selectedItems[0] as IDish).category}
        />
        <h2>
          {translate('ingredients')}:
          <Button
            class="small inline-right"
            onClick={(e) => {
              e.preventDefault();
              setLines((old) => old + 1);
            }}
          >
            <span className="material-symbols-outlined">add</span>
          </Button>
          <Button
            class="small inline-right"
            color="red"
            disabled={lines === 0}
            onClick={(e) => {
              e.preventDefault();
              setLines((old) => old - 1);
            }}
          >
            <span className="material-symbols-outlined">delete</span>
          </Button>
        </h2>
        {ingredients.length !== 0
          ? [...Array(lines).keys()].map((line) => (
              <>
                <h2>
                  {translate('ingredient')} {line + 1}
                  {/* <Button
              class="small inline-right"
              onClick={(e) => {
                e.preventDefault();
                setLines((old) => old.map((val, id) => (id === index ? val + 1 : val)));
              }}
            >
              <span className="material-symbols-outlined">add</span>
            </Button>
            <Button
              class="small inline-right"
              color="red"
              disabled={lines[index] === 1}
              onClick={(e) => {
                e.preventDefault();
                setLines((old) => old.map((val, id) => (id === index ? val - 1 : val)));
              }}
            >
              <span className="material-symbols-outlined">delete</span>
            </Button> */}
                </h2>

                <UnsetComboBoxDialog
                  name={`line_${line}`}
                  comboValue={[
                    { name: '-- vyber ingredienci --', value: '0' },
                    ...ingredients.map((i) => {
                      return { name: i.name, value: `${i.id}` };
                    }),
                  ]}
                  value={ingredients.find((x) => x.name === (selectedItems[0] as IDish).ingredients[line])?.id.toString()}
                  onClick={() => {
                    console.log('click');
                    setEstCost(
                      ([...document.querySelectorAll('select[name^="line_"]')] as HTMLInputElement[]).reduce((acc, val) => {
                        const ingredient = ingredients.find((i) => i.id === parseInt(val.value));
                        if (ingredient) return acc + ingredient.cost;
                        return acc;
                      }, 0),
                    );
                  }}
                />
              </>
            ))
          : 'loading'}
        <div className="dialog-split-line"></div>
        <div>
          {translate('production price')}: {estCost}
        </div>
        <TextAttributeDialog
          required
          name="cost"
          isNumber
          value={(selectedItems[0] as IDish).cost.toString()}
        />
      </>
    </BaseDialog>
  );
};
