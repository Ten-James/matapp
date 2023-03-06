import React, { useContext, useEffect, useRef, useState } from 'react';
import { useAppContext } from '../../context/appContext';
import { textUpperFirst } from '../../misc/utils';

interface TextAttributeDialogProp {
  name: string;
  visibleName?: string;
  required?: boolean;
  isNumber?: boolean;
  onClick?: VoidFunction;
  value?: string;
}
export const TextAttributeDialog = ({ name, required = false, isNumber, value, visibleName, onClick }: TextAttributeDialogProp) => {
  const { translate } = useAppContext();
  const ref = useRef<HTMLInputElement | null>(null);
  return (
    <div className="dialog-line">
      <label
        htmlFor={name}
        className={required ? 'required' : ''}
      >
        {textUpperFirst(translate(visibleName || name))}
      </label>
      <div>
        <input
          id={name}
          name={name}
          type={isNumber ? 'number' : name === 'password' ? 'password' : 'text'}
          required={required}
          onChange={onClick}
          defaultValue={value}
          ref={ref}
        />
      </div>
    </div>
  );
};

interface TextAttributeDialogWithComboProp extends TextAttributeDialogProp {
  combo?: string[];
  comboValue?: { name: string; value: string }[];
}

export const TextAttributeWithCombo = ({ name, required = false, isNumber, combo, value }: TextAttributeDialogWithComboProp) => {
  const { translate } = useAppContext();
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
          name={name}
          type={isNumber ? 'number' : 'text'}
          required={required}
          defaultValue={value.split(' ')[0]}
          ref={ref}
        />
        <select
          id={name + '_combo'}
          name={name + '_combo'}
          required={required}
        >
          {combo &&
            combo.map((x, ind) => (
              <option
                key={ind}
                selected={x === value.split(' ')[1]}
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

export const ComboBoxDialog = ({ name, required = false, comboValue, value }: TextAttributeDialogWithComboProp) => {
  const { translate } = useAppContext();
  const [values, setValues] = useState([...comboValue]);
  useEffect(() => {
    setValues([...comboValue]);
  }, [comboValue]);
  return (
    <div className="combo-input dialog-line">
      <label
        htmlFor={name}
        className={required ? 'required' : ''}
      >
        {textUpperFirst(translate(name))}
      </label>
      <div>
        <select
          name={name}
          id={name}
          defaultValue={value}
        >
          {values.map((x) => (
            <option
              key={x.value}
              value={x.value}
            >
              {x.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export const UnsetComboBoxDialog = ({ name, required = false, comboValue, value, onClick }: TextAttributeDialogWithComboProp) => {
  const { translate } = useAppContext();
  const [values, setValues] = useState([...comboValue]);
  useEffect(() => {
    setValues([...comboValue]);
  }, [comboValue]);
  return (
    <div className="combo-input dialog-line dialog-unset">
      <div>
        <select
          name={name}
          id={name}
          defaultValue={value}
          onChange={onClick}
        >
          {values.map((x) => (
            <option
              key={x.value}
              value={x.value}
            >
              {x.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export const TextAttributeWithAutoCompleteDialog = ({ name, required = false, combo, value }: TextAttributeDialogWithComboProp) => {
  const { translate } = useAppContext();
  const [values, setValues] = useState([...combo]);
  useEffect(() => {
    setValues([...combo]);
  }, [combo]);

  const [show, setShow] = useState(true);
  return (
    <div className="combo-input dialog-line">
      <label
        htmlFor={name}
        className={required ? 'required' : ''}
      >
        {textUpperFirst(translate(name))}
      </label>
      <div>
        <input
          type="text"
          className="combo-input"
          required={required}
          id={name}
          name={name}
          defaultValue={value}
          onKeyUp={(e) => {
            setValues(combo.filter((x) => x.startsWith(e.currentTarget.value)));
            setShow(true);
          }}
        />
        <div className="combo-select">
          {show &&
            values?.map((x) => (
              <input
                type="button"
                key={x}
                onClick={(e) => {
                  e.preventDefault();
                  const input = document.querySelector<HTMLInputElement>(`#${name}`);
                  input.value = x;
                  setShow((old) => !old);
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
  checked?: string;
}

export const CheckboxGroupDialog = ({ name, radios, checked }: CheckboxGroupDialogProp) => {
  const { translate } = useAppContext();
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
                defaultChecked={checked.includes(x)}
                value={x}
              />
              <label htmlFor={name + ind}>{x}</label>
            </React.Fragment>
          ))}
      </div>
    </div>
  );
};
