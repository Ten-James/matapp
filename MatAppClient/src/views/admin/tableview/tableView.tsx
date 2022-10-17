import { useContext, useState, useEffect, useMemo } from "react";
import { context } from "../../../App";
import { AdminContexter } from "../admin";

import "../../../styles/admin/ingredients.css";

import { Button, Panel } from "../../../components/panel";
import { FilterData, Ingredient, BaseProp } from "../../../types";

interface Props<T> {
  data: T[];
  setData: (data: T[]) => void;
  socketString: string;
  displayName: string;
}

const TableView = <T extends BaseProp>({ data, setData, socketString, displayName }: Props<T>) => {
  const { SelectedRow, setSelectedRow } = useContext(AdminContexter);
  const [Show, setShow] = useState(data);
  const [Filter, setFilter] = useState<FilterData<T>>({
    filterMatch: (x) => true,
    sort: (a, b) => 1,
  });
  useMemo(() => {
    setShow(data.filter(Filter.filterMatch).sort(Filter.sort));
  }, [Filter, data]);
  const { socket } = useContext(context);
  socket.on(`${socketString}`, (data: T[]) => {
    setData(data);
  });
  useEffect(() => {
    console.log(data);
    if (data.length === 0) {
      socket.emit(`get_${socketString}`);
    }
    setSelectedRow([]);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div className="d-grid">
      <h1 className="d-name">{displayName}</h1>
      <div className="d-parameters"></div>
      <div className="d-table">
        {
          //get headers from ingredients
          Show.length > 0 && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(" + Object.keys(Show[0]).length.toString() + ", 1fr)" }}>
              {Object.keys(Show[0]).map((e) => (
                <div key={e}>{e.charAt(0).toUpperCase() + e.slice(1)}</div>
              ))}
            </div>
          )
        }
        <div className="d-table-content">
          {Show.map((e, idx) => (
            <Panel
              onClick={() => setSelectedRow([idx, ...SelectedRow])}
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(" + Object.keys(Show[0]).length.toString() + ", 1fr)",
                padding: "0.5em",
              }}
              key={e.id}
            >
              {Object.keys(e).map((f) => (
                // @ts-ignore
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

export default TableView;
