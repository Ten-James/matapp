import { useEffect, useCallback, useState } from 'react';
import { TextAttributeWithAutoCompleteDialog, TextAttributeDialog, UnsetComboBoxDialog } from '../../components/dialog/dialogLines';
import { useAdminContext } from '../../context/adminContext';
import { Button } from '../../components/common/panel';
import { useAppContext } from '../../context/appContext';

const DishDialogBase = () => {
  const [lines, setLines] = useState<number[]>([]);
  const [dishCategories, setDishCategories] = useState<string[]>([]);
  const [estCost, setEstCost] = useState<number>(0);

  const { translate, socket } = useAppContext();
  const { ingredients, getIngredients } = useAdminContext();
  useEffect(() => {
    if (ingredients.length === 0) getIngredients();
    socket.emit('get_dish_categories');
    socket.on('dish_categories', (data: { id: number; name: string }[]) => {
      setDishCategories(data.map((category) => category.name));
    });
  }, [ingredients, getIngredients]);

  return (
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
            setLines((old) => [...old, 1]);
          }}
        >
          <span className="material-symbols-outlined">add</span>
        </Button>
        <Button
          class="small inline-right"
          color="red"
          disabled={lines.length === 0}
          onClick={(e) => {
            e.preventDefault();
            setLines((old) => old.slice(0, old.length - 1));
          }}
        >
          <span className="material-symbols-outlined">delete</span>
        </Button>
      </h2>
      {lines.map((line, index) => (
        <>
          <h2>
            {translate('ingredient')} {index + 1}
            <Button
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
            </Button>
          </h2>
          {[...Array(line).keys()].map((id) => (
            <>
              <UnsetComboBoxDialog
                name={`line_${index}_${id}`}
                comboValue={[
                  { name: '-- vyber ingredienci --', value: '0' },
                  ...ingredients.map((i) => {
                    return { name: i.name, value: `${i.id}` };
                  }),
                ]}
                onClick={() => {
                  console.log('click');
                  setEstCost(
                    lines.reduce((acc, line, lineIndex) => {
                      const lineCost = [...Array(line).keys()].reduce((lineAcc, row) => {
                        const value = (document.getElementById(`line_${lineIndex}_${row}`) as HTMLSelectElement)?.value;
                        console.log(`line_${lineIndex}_${row}`, value);
                        if (ingredients.some((i) => i.id === parseInt(value))) {
                          return lineAcc + ingredients.find((i) => i.id === parseInt(value))?.cost;
                        }
                        return lineAcc;
                      }, 0);
                      return acc + lineCost;
                    }, 0),
                  );
                }}
              />
              {/* {id !== line - 1 ? <div className="dialog-unset">Nebo</div> : null} */}
            </>
          ))}
          <div className="dialog-split-line"></div>
        </>
      ))}
      <div>
        {translate('production price')}: {estCost}
      </div>
      <TextAttributeDialog
        required
        name="cost"
        isNumber
      />
    </>
  );
};

export default DishDialogBase;
