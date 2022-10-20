import { useRef } from "react";
import { Button } from "../../../components/panel";
import { FilterData, BaseProp, Sort } from "../../../types";

interface Props<T extends BaseProp> {
  filter: FilterData<T>;
  setFilter: (filter: FilterData<T>) => void;
  sorts: Sort[];
  showCategory: boolean;
  categories: string[];
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

const ParamButtons = <T extends BaseProp>({ filter, setFilter, sorts, showCategory, categories }: Props<T>) => {
  const filterSelect = useRef<HTMLSelectElement | null>(null);
  const sortSelect = useRef<HTMLSelectElement | null>(null);
  return (
    <>
      {showCategory && (
        <>
          <label htmlFor='filter'>Filter Category</label>
          <select
            id='filter'
            ref={filterSelect}
            onChange={() => {
              if (!filterSelect.current) return;
              setFilter({
                filterMatch: (x) => {
                  // @ts-ignore
                  return x.category.toLowerCase().includes(filterSelect.current.value.toLowerCase());
                },
                sort: filter.sort,
              });
            }}
          >
            <option value=''>All</option>
            {categories.map((e, index) => (
              <option key={index} value={e}>
                {e}
              </option>
            ))}
          </select>
        </>
      )}

      <label htmlFor='sort'>Sort:</label>
      <select
        id='sort'
        ref={sortSelect}
        onChange={() => {
          if (!sortSelect.current) return;
          // @ts-ignore
          const a = sorts.find((e) => sortSelect.current?.value.includes(e.name));
          if (!a) return;
          setFilter({ filterMatch: filter.filterMatch, sort: MakeSort(a.name, a.type, sortSelect.current.value.includes("ASC")) });
        }}
      >
        {sorts.map((e, index) => (
          <>
            <option key={index * 2} value={e.name + "ASC"}>
              {e.name} Ascending
            </option>
            <option key={index * 2 + 1} value={e.name + "DSC"}>
              {e.name} Descending
            </option>
          </>
        ))}
      </select>
    </>
  );
};

export default ParamButtons;
