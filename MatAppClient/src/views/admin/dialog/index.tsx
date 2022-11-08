import { useContext, useEffect, useRef, useState } from "react";
import { context } from "../../../App";
import { Button, Panel } from "../../../components/panel";
import { Translate } from "../../../misc/transcripter";
import { AdminContext } from "../admin";
import {
  ComboBoxAttributeDialog,
  TextAttributeDialog,
  TextAttributeWithCombo,
} from "./components";
import * as Handlers from "./handlers";
import "./style.css";

interface BaseDialogProp {
  header: string;
  children: JSX.Element | JSX.Element[];
}

const BaseDialog = ({ header, children }: BaseDialogProp) => {
  const { language } = useContext(context);
  const form = useRef<HTMLFormElement | null>(null);
  const [translateY, setTranslateY] = useState("-100vh");
  const { setDialog } = useContext(AdminContext);

  const handleHide = (e: Event) => Handlers.hide(e, setTranslateY, setDialog);
  const handleSubmit = (e: Event) =>
    Handlers.submit(e, form.current, setTranslateY, setDialog);

  useEffect(() => {
    setTimeout(() => {
      setTranslateY("0");
    }, 100);
  }, []);

  return (
    <form ref={form} className="dialog-background">
      <Panel class="dialog" style={{ transform: `translateY(${translateY})` }}>
        <h1 className="dialog-header">{Translate(header, language)}</h1>
        <div className="dialog-content">{children}</div>
        <div className="dialog-buttons">
          <Button onClick={handleHide}>{Translate("cancel", language)}</Button>
          <Button onClick={handleSubmit}>
            {Translate("confirm", language)}
          </Button>
        </div>
      </Panel>
    </form>
  );
};

export const AddDialog = () => {
  const [error, setError] = useState("");

  return (
    <BaseDialog header="Add Ingredient">
      <TextAttributeDialog name="name" required />
      <ComboBoxAttributeDialog
        name="category"
        required
        combo={["ahoj", "veta", "beta", "gamma", "delta", "test"]}
      />
      <TextAttributeDialog name="cost" isNumber />
      <TextAttributeWithCombo
        name="text"
        isNumber
        required
        combo={["ks", "ml"]}
      />
      <TextAttributeDialog name="name2" required />
      <TextAttributeDialog name="name3" required />
      <TextAttributeDialog name="name4" required />
      <TextAttributeDialog name="name5" required />
      <TextAttributeDialog name="name6" required />

      {error && <p className="error">{error}</p>}
    </BaseDialog>
  );
};
