import { useContext, useEffect, useMemo, useState } from "react";
import { context } from "../../../App";
import { Translate } from "../../../misc/transcripter";
import { textUpperFirst } from "../../../misc/utils";
import { AdminContext } from "../admin";
import ParamButtons from "./paramButtons";

import "./tableView.css";

import { Button, Panel } from "../../../components/panel";
import { BaseProp, FilterData, Sort } from "../../../types";

interface Props<T> {
  data: T[];
  setData: (data: T[]) => void;
  socketString: string;
  displayName: string;
}

const MakeSort = <T extends BaseProp>(e: string, t: string, ord: boolean) => {
  if (ord) {
    if (t === "string") {
      // @ts-ignore
      return (a: T, b: T): number => a[e].localeCompare(b[e]);
    }
    // @ts-ignore
    return (a: T, b: T): number => a[e] - b[e];
  } else {
    if (t === "string") {
      // @ts-ignore
      return (a: T, b: T): number => b[e].localeCompare(a[e]);
    }
    // @ts-ignore
    return (a: T, b: T): number => b[e] - a[e];
  }
};

const TableView = <T extends BaseProp>({
  data,
  setData,
  socketString,
  displayName,
}: Props<T>) => {
  const { selectedIDs, setSelectedIDs, setDialog } = useContext(AdminContext);
  const { socket, language } = useContext(context);

  const [show, setShow] = useState(data);
  const [sort, setSort] = useState<Sort[]>([{ name: "id", type: "number" }]);
  const [categories, setCategories] = useState<string[]>([]);

  const [filter, setFilter] = useState<FilterData<T>>({
    filterMatch: (x) => true,
    sort: (a, b) => 1,
  });

  socket.on(socketString, (data: T[]) => {
    setData(data);
    setShow(data.filter(filter.filterMatch).sort(filter.sort));
  });

  useMemo(() => {
    if (data.length === 0) return setShow([]);
    setShow(data.filter(filter.filterMatch).sort(filter.sort));
  }, [filter, data]);

  useEffect(() => {
    if (data.length === 0) {
      socket.emit(`get_${socketString}`);
    }
    setSelectedIDs([]);
    setFilter({
      filterMatch: (x) => true,
      sort: (a, b) => 1,
    });
    if (data.length === 0) return;
    setSort(
      Object.keys(data[0]).map<Sort>((e) => ({
        name: e,
        type: typeof data[0][e],
      }))
    );
    setCategories(
      // @ts-ignore
      data.map((e) => e.category).filter((e, i, a) => a.indexOf(e) === i)
    );
  }, [data]);

  return (
    <div className="d-grid">
      <h1 className="d-name">{Translate(displayName, language)}</h1>
      <div className="d-parameters">
        <ParamButtons
          filter={filter}
          setFilter={setFilter}
          showCategory={categories.length > 1}
          categories={categories}
        />
      </div>
      <div className="d-table-header">
        {show.length > 0 && (
          <div
            style={{
              display: "grid",
              width: "85%",
              margin: "0.3em auto",
              gridTemplateColumns:
                "repeat(" + Object.keys(show[0]).length.toString() + ", 1fr)",
            }}
          >
            {Object.keys(show[0]).map((e) => (
              <div key={e}>
                <div className="d-table-header-label">
                  {textUpperFirst(Translate(e, language))}
                  <span
                    className="material-symbols-outlined d-table-header-asc"
                    onClick={() => {
                      setFilter({
                        filterMatch: filter.filterMatch,
                        sort: MakeSort(e, typeof show[0][e], true),
                      });
                    }}
                  >
                    expand_more
                  </span>
                  <span
                    className="material-symbols-outlined d-table-header-dsc"
                    onClick={() => {
                      setFilter({
                        filterMatch: filter.filterMatch,
                        sort: MakeSort(e, typeof show[0][e], false),
                      });
                    }}
                  >
                    expand_less
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div
        className="d-table-content"
        style={{
          overflowY: "scroll",
          height: "100%",
        }}
      >
        {show.map((e) => (
          <Panel
            onClick={() =>
              setSelectedIDs(
                selectedIDs.includes(e.id)
                  ? selectedIDs.filter((x) => x !== e.id)
                  : [...selectedIDs, e.id]
              )
            }
            style={{
              display: "grid",
              width: "85%",
              gridTemplateColumns:
                "repeat(" + Object.keys(show[0]).length.toString() + ", 1fr)",
              outline: selectedIDs.includes(e.id)
                ? "1px solid #6bb0b3"
                : "unset",
              padding: "0.5em 2em",
              margin: "0.4em auto",
            }}
            key={e.id}
            class="inset"
          >
            {Object.keys(e).map((f) => (
              // @ts-ignore
              <div key={f}>{Translate(e[f], language)}</div>
            ))}
          </Panel>
        ))}
      </div>
      <div className="d-buttons">
        <Button onClick={() => setDialog("add")}>
          <span className="material-symbols-outlined">add</span>
          {Translate("add", language)}
        </Button>
        <Button>
          <span className="material-symbols-outlined">edit</span>
          {Translate("edit", language)}
        </Button>
        <Button>
          <span className="material-symbols-outlined">delete</span>
          {Translate("delete", language)}
        </Button>
      </div>
    </div>
  );
};

export default TableView;
