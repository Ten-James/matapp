import { useContext, useEffect, useMemo, useState } from 'react';
import { context } from '../../../App';
import { textUpperFirst } from '../../../misc/utils';
import { AdminContext } from '../admin';
import ParamButtons from '../../../components/tableview/paramButtons';
import { defaultFilter, MakeSort } from '../../../handlers/tableview/handlers';

import './tableView.css';

import { Button, Panel } from '../../../components/common/panel';
import { IBaseModel, FilterData, Sort } from '../../../types';
import { BaseButtons } from '../../../components/tableview/baseButtons';

export interface TableViewProps<T> {
  data: T[];
  setData: (data: T[]) => void;
  socketString: string;
  displayName: string;
  showButtons?: boolean;
}

const TableView = <T extends IBaseModel>({ data, setData, socketString, displayName, ...args }: TableViewProps<T>) => {
  const { selectedIDs, setSelectedIDs } = useContext(AdminContext);
  const { socket, translate } = useContext(context);

  const [filter, setFilter] = useState<FilterData<T>>(defaultFilter);

  socket.on(socketString, (data: T[]) => {
    setData(data);
  });

  useEffect(() => {
    if (data.length === 0) {
      socket.emit(`get_${socketString}`);
    }
    setSelectedIDs([]);
    setFilter(defaultFilter);
  }, [data]);

  const show = useMemo(() => (data.length === 0 ? [] : data.filter(filter.filterMatch).sort(filter.sort)), [filter, data]);

  const categories = useMemo(() => (data.length === 0 ? [] : Object.keys(data[0]).filter((e) => typeof data[0][e] === 'string')), [data]);

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
            {Object.keys(show[0]).map((e) => (
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
        {show.map((e) => (
          <Panel
            onClick={() => setSelectedIDs(selectedIDs.includes(e.id) ? selectedIDs.filter((x) => x !== e.id) : [...selectedIDs, e.id])}
            style={{
              display: 'grid',
              width: '85%',
              gridTemplateColumns: 'repeat(' + Object.keys(show[0]).length.toString() + ', 1fr)',
              outline: selectedIDs.includes(e.id) ? '1px solid #6bb0b3' : 'unset',
              padding: '0.5em 2em',
              margin: '0.4em auto',
            }}
            key={e.id}
            class="inset"
          >
            {Object.keys(e).map((f) => (
              // @ts-ignore
              <div key={f}>{translate(e[f])}</div>
            ))}
          </Panel>
        ))}
      </div>
      <div className="d-buttons">{args.showButtons ? <BaseButtons /> : <></>}</div>
    </div>
  );
};

export default TableView;
