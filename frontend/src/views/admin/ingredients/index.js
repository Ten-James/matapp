import React, { useContext, useEffect } from "react";
import { context } from "../../../App";
import { AdminContext } from "../main";

import "../../../styles/admin/ingredients.css";

import { Button, Panel } from "../../../components/panel";

const IngredientsView = () => {
  const { Ingredients, setIngredients, Selected, setSelected } = useContext(AdminContext);
  const { socket } = useContext(context);
  socket.on("ingredients", (data) => {
    setIngredients(data);
  });
  useEffect(() => {
    if (Ingredients.length === 0) {
      socket.emit("get_ingredients");
    }
    setSelected([]);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div className="d-grid">
      <h1 className="d-name">Ingredients</h1>
      <div className="d-parameters">filter combobox here</div>
      <div className="d-table">
        {
          //get headers from ingredients
          Ingredients.length > 0 && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(" + Object.keys(Ingredients[0]).length.toString() + ", 1fr)" }}>
              {Object.keys(Ingredients[0]).map((e) => (
                <div key={e}>{e.charAt(0).toUpperCase() + e.slice(1)}</div>
              ))}
            </div>
          )
        }
        <div className="d-table-content">
          {Ingredients.map((e) => (
            <Panel
              onClick={() => setSelected([e.id, ...Selected])}
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(" + Object.keys(Ingredients[0]).length.toString() + ", 1fr)",
                padding: "0.5em",
              }}
              key={e.id}
            >
              {Object.keys(e).map((f) => (
                <div key={f}>{e[f]}</div>
              ))}
            </Panel>
          ))}
        </div>
      </div>

      <div className="d-buttons">
        <Button>
          <span className="material-symbols-outlined">add</span>
        </Button>
        <Button>
          <span className="material-symbols-outlined">edit</span>
        </Button>
        <Button>
          <span className="material-symbols-outlined">delete</span>
        </Button>
      </div>
    </div>
  );
};

export default IngredientsView;
