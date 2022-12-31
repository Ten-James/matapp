import React, { useContext, useRef, useState } from 'react';
import { context } from '../../App';
import { textUpperFirst } from '../../misc/utils';

interface TextAttributeDialogProp {
  name: string;
  required?: boolean;
  isNumber?: boolean;
}
export const TextAttributeDialog = ({ name, required = false, isNumber }: TextAttributeDialogProp) => {
  const { translate } = useContext(context);
  const ref = useRef<HTMLInputElement | null>(null);
  return (
    <div className="dialog-line">
      <label
        htmlFor={name}
        className={required ? 'required' : ''}
      >
        {textUpperFirst(translate(name))}
      </label>
      <div>
        <input
          id={name}
          name={name}
          type={isNumber ? 'number' : name === 'password' ? 'password' : 'text'}
          ref={ref}
        />
      </div>
    </div>
  );
};

interface TextAttributeDialogWithComboProp extends TextAttributeDialogProp {
  combo: string[];
}

export const TextAttributeWithCombo = ({ name, required = false, isNumber, combo }: TextAttributeDialogWithComboProp) => {
  const { translate } = useContext(context);
  const ref = useRef<HTMLInputElement | null>(null);
  return (
    <div className="dialog-line text-with-combo">
      <label
        htmlFor={name}
        className={required ? 'required' : ''}
      >
        {textUpperFirst(translate(name))}
      </label>
      <div>
        <input
          id={name}
          name={name + '-text'}
          type={isNumber ? 'number' : 'text'}
          ref={ref}
        />
        <select
          id={name + '-combo'}
          name={name + '-combo'}
        >
          {combo &&
            combo.map((x, ind) => (
              <option
                key={ind}
                value={x}
              >
                {x}
              </option>
            ))}
        </select>
      </div>
    </div>
  );
};

export const ComboBoxAttributeDialog = ({ name, required = false, combo }: TextAttributeDialogWithComboProp) => {
  const { translate } = useContext(context);
  const [values, setValues] = useState(combo);
  return (
    <div className="combo-input dialog-line">
      <label
        htmlFor={name + '-text'}
        className={required ? 'required' : ''}
      >
        {textUpperFirst(translate(name))}
      </label>
      <div>
        <input
          type="text"
          className="combo-input"
          id={name + '-text'}
          onKeyUp={(e) => {
            setValues(combo.filter((x) => x.startsWith(e.currentTarget.value)));
          }}
        />
        <div className="combo-select">
          {values &&
            values.map((x) => (
              <input
                type="button"
                key={x}
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector<HTMLInputElement>(`#${name}-text`).value = x;
                }}
                value={x}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

interface CheckboxGroupDialogProp {
  name: string;
  radios: string[];
}

export const CheckboxGroupDialog = ({ name, radios }: CheckboxGroupDialogProp) => {
  const { translate } = useContext(context);
  return (
    <div className="dialog-line line-noflex">
      <label>{textUpperFirst(translate(name))}</label>
      <div className="dialog-radios">
        {radios &&
          radios.map((x, ind) => (
            <React.Fragment key={ind}>
              <input
                type="checkbox"
                id={name + '-' + ind}
                name={name}
                value={x}
              />
              <label htmlFor={name + ind}>{x}</label>
            </React.Fragment>
          ))}
      </div>
    </div>
  );
};
