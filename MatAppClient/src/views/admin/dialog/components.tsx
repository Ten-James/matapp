import { textUpperFirst } from "../../../misc/utils";
import { useRef } from "react";

interface TextAttributeDialogProp {
	name: string;
	required?: boolean;
	isNumber?: boolean;
}
export const TextAttributeDialog = ({ name, required = false, isNumber }: TextAttributeDialogProp) => {
	const ref = useRef<HTMLInputElement | null>(null);
	return (
		<div>
			<label htmlFor={name}>
				{textUpperFirst(name)} {required && "*"}
			</label>
			<input id={name} name={name} type={isNumber ? "number" : "text"} ref={ref} />
		</div>
	);
};

interface TextAttributeDialogWithComboProp extends TextAttributeDialogProp {
	combo: string[];
}

export const TextAttributeWithCombo = ({ name, required = false, isNumber, combo }: TextAttributeDialogWithComboProp) => {
	const ref = useRef<HTMLInputElement | null>(null);
	return (
		<div>
			<label htmlFor={name + "-text"}>
				{textUpperFirst(name)} {required && "*"}
			</label>
			<input id={name + "-text"} name={name + "-text"} type={isNumber ? "number" : "text"} ref={ref} />
			<select id={name + "-combo"} name={name + "-combo"}>
				{combo &&
					combo.map((x, ind) => (
						<option key={ind} value={x}>
							{x}
						</option>
					))}
			</select>
		</div>
	);
};
