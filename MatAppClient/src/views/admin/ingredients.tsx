import { useContext, useState, useEffect, useMemo } from "react";
import { context } from "../../App";
import { AdminContext } from "./admin";

import "../../styles/admin/ingredients.css";

import { Button, Panel } from "../../components/panel";

interface FilterData {
  filterMatch: () => {};
  sort: () => {};
}

const IngredientsView = () => {
  const { Ingredients, setIngredients, SelectedRow, setSelectedRow } = useContext(AdminContext);
  const [Show, setShow] = useState(Ingredients);
  const [Filter, setFilter] = useState();
  // setShow(useMemo(() =>{Ingredients.filter(Filter.filterMatch).sort(Filter.sort)},[Filter, Ingredients]);
  const { socket } = useContext(context);
  socket.on("ingredients", (data) => {
    setIngredients(data);
  });
  useEffect(() => {
    if (Ingredients.length === 0) {
      socket.emit("get_ingredients");
    }
    setSelectedRow([]);
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
          {Ingredients.map((e, idx) => (
            <Panel
              onClick={() => setSelectedRow([idx, ...SelectedRow])}
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(" + Object.keys(Ingredients[0]).length.toString() + ", 1fr)",
                padding: "0.5em",
              }}
              key={e.id}
            >
              {Object.keys(e).map((f) => (
                <div key={f}>{{ ...e }[f]}</div>
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
