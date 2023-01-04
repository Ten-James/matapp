import { useContext, useEffect, useMemo, useState } from 'react';
import { context } from '../../../App';
import { textUpperFirst } from '../../../misc/utils';
import { AdminContext } from '../admin';
import ParamButtons from '../../../components/tableview/paramButtons';
import { defaultFilter, MakeSort } from '../../../handlers/tableview/handlers';

import './tableView.css';

import { Button, Panel } from '../../../components/common/panel';
import { IBaseModel, IDish, FilterData, Sort } from '../../../types';
import { BaseButtons } from '../../../components/tableview/baseButtons';
import { TableViewProps } from '.';

const TableViewDishes = ({ data, setData, socketString, displayName, ...args }: TableViewProps<IDish>) => {
  const { selectedIDs, setSelectedIDs, setDialog } = useContext(AdminContext);
  const { socket, translate } = useContext(context);

  const [filter, setFilter] = useState<FilterData<IDish>>(defaultFilter);

  socket.on(socketString, (data: IDish[]) => {
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
              gridTemplateColumns: 'repeat(' + (Object.keys(show[0]).length - 1).toString() + ', 1fr) 6em',
            }}
          >
            {Object.keys(show[0]).map(
              (e) =>
                e !== 'ingredients' && (
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
                ),
            )}
          </div>
        )}
      </div>
      <div className="d-table-content">
        {show.map((e) => (
          <Panel
            onClick={() => setSelectedIDs(selectedIDs.includes(e.id) ? selectedIDs.filter((x) => x !== e.id) : [...selectedIDs, e.id])}
            style={{
              outline: selectedIDs.includes(e.id) ? '1px solid #6bb0b3' : 'unset',
            }}
            key={e.id}
            class="inset"
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(' + (Object.keys(show[0]).length - 1).toString() + ', 1fr) auto',
              }}
            >
              <div>{e.id}</div>
              <div>{e.name}</div>
              <div>{e.cost}</div>
              <div>{e.category}</div>
              <div>
                <Button
                  class="inline small"
                  style={{ marginRight: '0.5rem' }}
                  onClick={() => {
                    setSelectedIDs([e.id]);
                    setDialog('edit');
                  }}
                >
                  <span className="material-symbols-outlined">edit</span>
                </Button>
                <Button
                  class="inline small"
                  color="red"
                  onClick={() => {
                    setSelectedIDs([e.id]);
                    setDialog('delete');
                  }}
                >
                  <span className="material-symbols-outlined">delete</span>
                </Button>
              </div>
            </div>
            <div
              style={{
                fontWeight: '600',
                fontSize: '1.2em',
                marginTop: '0.5em',
              }}
            >
              {translate('Ingredients')}:
            </div>
            <div>{selectedIDs.includes(e.id) ? e.ingredients.map((e) => <div>{e}</div>) : <div>{e.ingredients[0]}...</div>}</div>
          </Panel>
        ))}
      </div>
      <div className="d-buttons">{args.showButtons ? <BaseButtons /> : <></>}</div>
    </div>
  );
};

export default TableViewDishes;
