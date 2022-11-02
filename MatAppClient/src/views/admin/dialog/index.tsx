import { Panel, Button } from "../../../components/panel";
import { useContext, useEffect, useState, useRef } from "react";
import { TextAttributeDialog, TextAttributeWithCombo } from "./components";
import "./style.css";
import { AdminContext } from "../admin";
import * as Handlers from "./handlers";

interface BaseDialogProp {
	header: string;
	children: JSX.Element | JSX.Element[];
}

const BaseDialog = ({ header, children }: BaseDialogProp) => {
	const form = useRef<HTMLFormElement | null>(null);
	const [translateY, setTranslateY] = useState("-100vh");
	const { setDialog } = useContext(AdminContext);

	const handleHide = (e: Event) => Handlers.hide(e, setTranslateY, setDialog);
	const handleSubmit = (e: Event) => Handlers.submit(e, form.current, setTranslateY, setDialog);

	useEffect(() => {
		setTimeout(() => {
			setTranslateY("0");
		}, 100);
	}, []);

	return (
		<form ref={form} className='dialog-background'>
			<Panel class='dialog' style={{ transform: `translateY(${translateY})` }}>
				<h1>{header}</h1>
				<div className='container'>{children}</div>
				<div className='buttons'>
					<Button onClick={handleHide}>Cancel</Button>
					<Button onClick={handleSubmit}>Confirm</Button>
				</div>
			</Panel>
		</form>
	);
};

export const AddDialog = () => {
	const [error, setError] = useState("");

	return (
		<BaseDialog header='Add Ingredient'>
			<TextAttributeDialog name='name' required />
			<TextAttributeDialog name='cost' isNumber />
			<TextAttributeWithCombo name='text' isNumber combo={["ks", "ml"]} />
			<TextAttributeDialog name='category' required />
			{error && <p className='error'>{error}</p>}
		</BaseDialog>
	);
};
