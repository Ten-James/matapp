import { useContext, useState, useEffect, useMemo } from "react";
import { context } from "../../../App";
import { AdminContext } from "../admin";
import ParamButtons from "./paramButtons";

import "../../../styles/admin/ingredients.css";

import { Button, Panel } from "../../../components/panel";
import { FilterData, BaseProp, Sort } from "../../../types";

interface Props<T> {
  data: T[];
  setData: (data: T[]) => void;
  socketString: string;
  displayName: string;
}

const TableView = <T extends BaseProp>({ data, setData, socketString, displayName }: Props<T>) => {
  const { selectedIDs, setSelectedIDs } = useContext(AdminContext);
  const [show, setShow] = useState(data);
  const [sort, setSort] = useState<Sort[]>([{ name: "id", type: "number" }]);
  const [categories, setCategories] = useState<string[]>([]);
  const [filter, setFilter] = useState<FilterData<T>>({
    filterMatch: (x) => true,
    sort: (a, b) => 1,
  });
  console.log(selectedIDs);

  useMemo(() => {
    setShow(data.filter(filter.filterMatch).sort(filter.sort));
  }, [filter, data]);

  const { socket } = useContext(context);
  // if he spams views, he lose some data
  socket.on(`${socketString}`, (newData: T[]) => {
    setData([...newData, ...data]);
    // @ts-ignore
    setSort(Object.keys(data[0]).map<Sort>((e) => ({ name: e, type: typeof data[0][e] })));
    // @ts-ignore
    setCategories(data.map((e) => e.category).filter((e, i, a) => a.indexOf(e) === i));
  });
  useEffect(() => {
    console.log(data);
    if (data.length === 0) {
      socket.emit(`get_${socketString}`);
    }
    setSelectedIDs([]);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div className='d-grid'>
      <h1 className='d-name'>{displayName}</h1>
      <div className='d-parameters'>
        {show.length > 0 && (
          <ParamButtons filter={filter} setFilter={setFilter} sorts={sort} showCategory={categories.length > 1} categories={categories} />
        )}
      </div>
      <div className='d-table-header'>
        {show.length > 0 && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(" + Object.keys(show[0]).length.toString() + ", 1fr)",
            }}
          >
            {Object.keys(show[0]).map((e) => (
              <div key={e}>{e.charAt(0).toUpperCase() + e.slice(1)}</div>
            ))}
          </div>
        )}
      </div>
      <div
        className='d-table-content'
        style={{
          overflowY: "scroll",
          height: "100%",
        }}
      >
        {show.map((e) => (
          <Panel
            onClick={() => setSelectedIDs(selectedIDs.includes(e.id) ? selectedIDs.filter((x) => x !== e.id) : [...selectedIDs, e.id])}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(" + Object.keys(show[0]).length.toString() + ", 1fr)",
              outline: selectedIDs.includes(e.id) ? "1px solid #6bb0b3" : "unset",
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
      <div className='d-buttons'>
        {JSON.stringify(selectedIDs)}
        <Button>
          <span className='material-symbols-outlined'>add</span>
          Add
        </Button>
        <Button>
          <span className='material-symbols-outlined'>edit</span>
          Edit
        </Button>
        <Button>
          <span className='material-symbols-outlined'>delete</span>
          Delete
        </Button>
      </div>
    </div>
  );
};

export default TableView;
