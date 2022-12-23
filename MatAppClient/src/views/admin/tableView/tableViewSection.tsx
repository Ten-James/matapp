import { useContext, useEffect, useMemo, useState } from 'react';
import { context } from '../../../App';
import { textUpperFirst } from '../../../misc/utils';
import { AdminContext } from '../admin';
import ParamButtons from './components/paramButtons';

import './tableView.css';

import { Button, Panel } from '../../../components/panel';
import { IBranchData, IBaseModel, FilterData, Sort } from '../../../types';
import { BaseButtons } from './components/baseButtons';

interface Props<T extends IBaseModel> {
  data: IBranchData<T>[];
  setData: (data: IBranchData<T>[]) => void;
  socketString: string;
  displayName: string;
}

const MakeSort = <T extends IBaseModel>(e: string, t: string, ord: boolean) => {
  if (ord) {
    if (t === 'string') {
      // @ts-ignore
      return (a: T, b: T): number => a[e].localeCompare(b[e]);
    }
    // @ts-ignore
    return (a: T, b: T): number => a[e] - b[e];
  } else {
    if (t === 'string') {
      // @ts-ignore
      return (a: T, b: T): number => b[e].localeCompare(a[e]);
    }
    // @ts-ignore
    return (a: T, b: T): number => b[e] - a[e];
  }
};

const defaultFilter = { filterMatch: (x) => true, sort: (a, b) => 1 };

const TableViewSection = <T extends IBaseModel>({ data, setData, socketString, displayName }: Props<T>) => {
  const { selectedIDs, setSelectedIDs, setDialog } = useContext(AdminContext);
  const { socket, translate } = useContext(context);

  const [filter, setFilter] = useState<FilterData<T>>(defaultFilter);

  socket.on(socketString, (data: IBranchData<T>[]) => {
    if (data.length === 0) return;
    setData(data);
  });

  useEffect(() => {
    if (data.length === 0) {
      socket.emit(`get_${socketString}`);
    }
    setSelectedIDs([]);
    setFilter(defaultFilter);
  }, [data]);

  const show = useMemo(
    () =>
      data.length === 0
        ? []
        : data.map((x) => {
            return { ...x, data: x.data.filter(filter.filterMatch).sort(filter.sort) };
          }),
    [filter, data],
  );

  const categories = useMemo(() => {
    if (data.length === 0) return [];
    let tmp = [];
    // @ts-ignore
    data.forEach((x) => x.data.forEach((e) => tmp.push(e.category)));
    return [...new Set(tmp)];
  }, [data]);

  return (
    <div className="d-grid">
      <h1 className="d-name">{translate(displayName)}</h1>
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
              display: 'grid',
              width: '85%',
              margin: '0.3em auto',
              gridTemplateColumns: 'repeat(' + Object.keys(show[0]).length.toString() + ', 1fr)',
            }}
          >
            {Object.keys(show[0].data[0]).map((e) => (
              <div key={e}>
                <div className="d-table-header-label">
                  {textUpperFirst(translate(e))}
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
          overflowY: 'scroll',
          height: '100%',
        }}
      >
        {show.map((x) => (
          <div key={x.id}>
            <h2
              style={{
                display: 'grid',
                width: '85%',
                padding: '0.5em 1em',
                margin: '0.4em auto',
              }}
            >
              {x.name} {x.location}
            </h2>
            {x.data.map((e) => (
              <Panel
                onClick={() => setSelectedIDs(selectedIDs.includes(e.id) ? selectedIDs.filter((x) => x !== e.id) : [...selectedIDs, e.id])}
                style={{
                  display: 'grid',
                  width: '85%',
                  gridTemplateColumns: 'repeat(' + Object.keys(show[0]).length.toString() + ', 1fr)',
                  outline: selectedIDs.includes(e.id) ? '1px solid #6bb0b3' : 'unset',
                  padding: '0.5em 1em',
                  margin: '0.4em auto',
                }}
                key={e.id}
                class="inset"
              >
                {Object.keys(e).map((f) => (
                  // @ts-ignore
                  <div key={f}>{Translate(e[f])}</div>
                ))}
              </Panel>
            ))}
          </div>
        ))}
      </div>
      <div className="d-buttons">
        <BaseButtons />
      </div>
    </div>
  );
};

export default TableViewSection;
