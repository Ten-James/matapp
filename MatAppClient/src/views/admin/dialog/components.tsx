import { useContext, useRef, useState } from "react";
import { context } from "../../../App";
import { Translate } from "../../../misc/transcripter";
import { textUpperFirst } from "../../../misc/utils";

interface TextAttributeDialogProp {
  name: string;
  required?: boolean;
  isNumber?: boolean;
}
export const TextAttributeDialog = ({
  name,
  required = false,
  isNumber,
}: TextAttributeDialogProp) => {
  const { language } = useContext(context);
  const ref = useRef<HTMLInputElement | null>(null);
  return (
    <div className="dialog-line">
      <label htmlFor={name} className={required ? "required" : ""}>
        {textUpperFirst(Translate(name, language))}
      </label>
      <div>
        <input
          id={name}
          name={name}
          type={isNumber ? "number" : "text"}
          ref={ref}
        />
      </div>
    </div>
  );
};

interface TextAttributeDialogWithComboProp extends TextAttributeDialogProp {
  combo: string[];
}

export const TextAttributeWithCombo = ({
  name,
  required = false,
  isNumber,
  combo,
}: TextAttributeDialogWithComboProp) => {
  const { language } = useContext(context);
  const ref = useRef<HTMLInputElement | null>(null);
  return (
    <div className="dialog-line text-with-combo">
      <label htmlFor={name + "-text"} className={required ? "required" : ""}>
        {textUpperFirst(Translate(name, language))}
      </label>
      <div>
        <input
          id={name + "-text"}
          name={name + "-text"}
          type={isNumber ? "number" : "text"}
          ref={ref}
        />
        <select id={name + "-combo"} name={name + "-combo"}>
          {combo &&
            combo.map((x, ind) => (
              <option key={ind} value={x}>
                {x}
              </option>
            ))}
        </select>
      </div>
    </div>
  );
};

export const ComboBoxAttributeDialog = ({
  name,
  required = false,
  combo,
}: TextAttributeDialogWithComboProp) => {
  const { language } = useContext(context);
  const [values, setValues] = useState(combo);
  return (
    <div className="combo-input dialog-line">
      <label htmlFor={name + "-text"} className={required ? "required" : ""}>
        {textUpperFirst(Translate(name, language))}
      </label>
      <div>
        <input
          type="text"
          className="combo-input"
          id={name + "-text"}
          onKeyUp={(e) => {
            setValues(combo.filter((x) => x.startsWith(e.currentTarget.value)));
          }}
        />
        <div className="combo-select">
          {values &&
            values.map((x) => (
              <input
                key={x}
                type="button"
                onClick={() =>
                  (document.querySelector<HTMLInputElement>(
                    `#${name}-text`
                  ).value = x)
                }
                value={x}
              />
            ))}
        </div>
      </div>
    </div>
  );
};
