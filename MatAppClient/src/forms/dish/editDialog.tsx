import React, { useEffect, useCallback, useState } from 'react';
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
  const [sideText, setSideText] = useState<string[][]>([]);

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
    setTimeout(() => {
      setSideText([]);
      setEstCost(
        ([...document.querySelectorAll('select[name^="line_"]')] as HTMLInputElement[]).reduce((acc, val) => {
          const ingredient = ingredients.find((i) => i.id === parseInt(val.value));
          if (!ingredient) return acc;
          console.log(val.name.split('_')[1]);
          console.log(document.querySelector(`input[name="line_${val.name.split('_')[1]}_amount"]`));
          const count = parseInt(document.querySelector<HTMLInputElement>(`input[name="line_${val.name.split('_')[1]}_amount"]`)?.value || '1') || 1;
          setSideText((old) => [...old, [ingredient.name, `${count}x ${ingredient.cost}`, `${acc + ingredient.cost * count}`]]);
          return acc + ingredient.cost * count;
        }, 0),
      );
    }, 100);
  }, [selectedItems]);

  return (
    <BaseDialog
      header="Edit Dish"
      sendRoute="edit_dishes"
      tooltip={
        sideText.length != 0 ? (
          <table>
            {sideText.map((e) => (
              <tr key={e[0]}>
                <td>{e[0]}</td>
                <td>{e[1]}</td>
                <td style={{ textAlign: 'right' }}>={e[2]}</td>
              </tr>
            ))}
            <tr>
              <td colSpan={2}>{translate('production price')}:</td>
              <td style={{ textAlign: 'right' }}>{(sideText.at(-1) || [0, 0, 0])[2]}</td>
            </tr>
          </table>
        ) : (
          <></>
        )
      }
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
                <div style={{ paddingLeft: '1em' }}>
                  <UnsetComboBoxDialog
                    name={`line_${line}`}
                    comboValue={[
                      { name: '-- vyber ingredienci --', value: '0' },
                      ...ingredients.map((i) => {
                        return { name: i.name, value: `${i.id}` };
                      }),
                    ]}
                    value={(selectedItems[0] as IDish).ingredients.length !== 0 ? ingredients.find((x) => x.name === (selectedItems[0] as IDish).ingredients[line].name)?.id.toString() : '0'}
                    onClick={() => {
                      console.log('click');
                      setSideText([]);
                      setEstCost(
                        ([...document.querySelectorAll('select[name^="line_"]')] as HTMLInputElement[]).reduce((acc, val) => {
                          const ingredient = ingredients.find((i) => i.id === parseInt(val.value));
                          if (!ingredient) return acc;
                          console.log(val.name.split('_')[1]);
                          console.log(document.querySelector(`input[name="line_${val.name.split('_')[1]}_amount"]`));
                          const count = parseInt(document.querySelector<HTMLInputElement>(`input[name="line_${val.name.split('_')[1]}_amount"]`)?.value || '1') || 1;
                          setSideText((old) => [...old, [ingredient.name, `${count}x ${ingredient.cost}`, `${acc + ingredient.cost * count}`]]);
                          return acc + ingredient.cost * count;
                        }, 0),
                      );
                    }}
                  />

                  <TextAttributeDialog
                    name={`line_${line}_amount`}
                    visibleName="count"
                    value={(selectedItems[0] as IDish)?.ingredients[line]?.count?.toString() || '1'}
                    isNumber
                    required
                    onClick={() => {
                      console.log('click');
                      setSideText([]);
                      setEstCost(
                        ([...document.querySelectorAll('select[name^="line_"]')] as HTMLInputElement[]).reduce((acc, val) => {
                          const ingredient = ingredients.find((i) => i.id === parseInt(val.value));
                          if (!ingredient) return acc;
                          console.log(val.name.split('_')[1]);
                          console.log(document.querySelector(`input[name="line_${val.name.split('_')[1]}_amount"]`));
                          const count = parseInt(document.querySelector<HTMLInputElement>(`input[name="line_${val.name.split('_')[1]}_amount"]`)?.value || '1') || 1;
                          setSideText((old) => [...old, [ingredient.name, `${count}x ${ingredient.cost}`, `${acc + ingredient.cost * count}`]]);
                          return acc + ingredient.cost * count;
                        }, 0),
                      );
                    }}
                  />
                </div>
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
