import { useContext, useRef } from 'react';
import { context } from '../../App';
import { IBaseModel, FilterData } from '../../types';

interface Props<T extends IBaseModel> {
  filter: FilterData<T>;
  setFilter: (filter: FilterData<T>) => void;
  showCategory: boolean;
  categories: string[];
}

const ParamButtons = <T extends IBaseModel>({ filter, setFilter, showCategory, categories }: Props<T>) => {
  const { translate } = useContext(context);
  const searchRef = useRef<HTMLInputElement | null>(null);
  const filterSelect = useRef<HTMLSelectElement | null>(null);
  return (
    <>
      <span className="material-symbols-outlined">search</span>
      <input
        placeholder={translate('search')}
        id="search"
        type="text"
        ref={searchRef}
        onKeyUp={() => {
          if (!filterSelect.current) return;
          if (!searchRef.current) return;
          if (showCategory)
            return setFilter({
              filterMatch: (x) => {
                return (
                  // @ts-ignore
                  x['category'].includes(filterSelect.current.value) &&
                  // @ts-ignore
                  x['name'].toLowerCase().includes(searchRef.current.value.toLowerCase())
                );
              },
              sort: filter.sort,
            });
          setFilter({
            filterMatch: (x) => {
              return (
                // @ts-ignore
                x['name'].toLowerCase().includes(searchRef.current.value.toLowerCase())
              );
            },
            sort: filter.sort,
          });
        }}
      />
      {showCategory && (
        <>
          <label htmlFor="filter">{translate('Filter Category')}</label>
          <select
            id="filter"
            ref={filterSelect}
            onChange={() => {
              if (!filterSelect.current) return;
              setFilter({
                filterMatch: (x) => {
                  // @ts-ignore
                  return x['category'].includes(filterSelect.current.value);
                },
                sort: filter.sort,
              });
            }}
          >
            <option
              key={-1}
              value=""
            >
              {translate('all')}
            </option>
            {categories.map((e, index) => (
              <option
                key={index}
                value={e}
              >
                {e}
              </option>
            ))}
          </select>
        </>
      )}

      {/* <label htmlFor='sort'>Sort:</label>
			<select
				id='sort'
				ref={sortSelect}
				onChange={() => {
					if (!sortSelect.current) return;
					// @ts-ignore
					const a = sorts.find((e) => sortSelect.current?.value.includes(e.name));
					if (!a) return;
					setFilter({
						filterMatch: filter.filterMatch,
						sort: MakeSort(a.name, a.type, sortSelect.current.value.includes("ASC")),
					});
				}}
			>
				{sorts.map((e) => (
					<option key={e.name + 1} value={e.name + "ASC"}>
						{textUpperFirst(e.name)} asc
					</option>
				))}
				{sorts.map((e) => (
					<option key={e.name + 2} value={e.name + "DSC"}>
						{textUpperFirst(e.name)} desc
					</option>
				))}
			</select> */}
    </>
  );
};

export default ParamButtons;
