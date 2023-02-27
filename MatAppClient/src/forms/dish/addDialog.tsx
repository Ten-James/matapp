import { useEffect, useCallback, useState } from 'react';
import { TextAttributeWithAutoCompleteDialog, TextAttributeDialog, UnsetComboBoxDialog } from '../../components/dialog/dialogLines';
import { useAdminContext } from '../../context/adminContext';
import { Button } from '../../components/common/panel';
import { useAppContext } from '../../context/appContext';
import BaseDialog from '../../components/dialog/baseDialog';

export const AddDialog = () => {
  const [lines, setLines] = useState<number>(1);
  const [dishCategories, setDishCategories] = useState<string[]>([]);
  const [estCost, setEstCost] = useState<number>(0);
  const [sideText, setSideText] = useState<string[][]>([]);

  const { translate, socket } = useAppContext();
  const { ingredients, getIngredients } = useAdminContext();
  useEffect(() => {
    if (ingredients.length === 0) getIngredients();
    socket.emit('get_dish_categories');
    socket.on('dish_categories', (data: { id: number; name: string }[]) => {
      setDishCategories(data.map((category) => category.name));
    });
  }, [ingredients, getIngredients]);

  useEffect(() => {
    console.log(sideText);
  }, [sideText]);
  return (
    <BaseDialog
      header="Add Dish"
      sendRoute="add_dishes"
      tooltip={
        sideText.length != 0 ? (
          <table>
            {sideText.map((e) => (
              <tr>
                <td>{e[0]}</td>
                <td>{e[1]}</td>
                <td>={e[2]}</td>
              </tr>
            ))}
            <tr>
              <td colSpan={2}>{translate('production price')}:</td>
              <td style={{ textAlign: 'right' }}>{sideText.at(-1)[2]}</td>
            </tr>
          </table>
        ) : null
      }
    >
      <>
        <TextAttributeDialog
          name="name"
          required
        />
        <TextAttributeWithAutoCompleteDialog
          name="category"
          combo={dishCategories}
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
        {[...Array(lines).keys()].map((line) => (
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
              onClick={() => {
                console.log('click');
                setSideText([]);
                setEstCost(
                  ([...document.querySelectorAll('select[name^="line_"]')] as HTMLInputElement[]).reduce((acc, val) => {
                    const ingredient = ingredients.find((i) => i.id === parseInt(val.value));
                    if (!ingredient) return acc;
                    setSideText((old) => [...old, [ingredient.name, `${ingredient.cost}`, `${acc + ingredient.cost}`]]);
                    return acc + ingredient.cost;
                  }, 0),
                );
              }}
            />
          </>
        ))}
        <div className="dialog-split-line"></div>
        <div>
          {translate('production price')}: {estCost}
        </div>
        <TextAttributeDialog
          required
          name="cost"
          isNumber
        />
      </>
    </BaseDialog>
  );
};
