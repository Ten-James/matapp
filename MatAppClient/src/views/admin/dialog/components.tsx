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
			<input id={name} type={isNumber ? "number" : "text"} ref={ref} />
		</div>
	);
};
