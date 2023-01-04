import { useContext, useEffect, useMemo, useState } from 'react';
import { context } from '../../../App';
import { textUpperFirst } from '../../../misc/utils';
import { AdminContext } from '../admin';
import ParamButtons from '../../../components/tableview/paramButtons';
import { defaultFilter, MakeSort } from '../../../handlers/tableview/handlers';

import './tableView.css';

import { Button, Panel } from '../../../components/common/panel';
import { IBranchData, INamedBaseModel, FilterData, Sort } from '../../../types';
import { BaseButtons } from '../../../components/tableview/baseButtons';
import { TableViewProps } from '.';

const TableViewSection = <T extends INamedBaseModel>({ data, setData, socketString, displayName, ...args }: TableViewProps<IBranchData<T>>) => {
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
              gridTemplateColumns: 'repeat(' + Object.keys(show[0]).length.toString() + ', 1fr) 6em',
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
      <div className="d-table-content">
        {show.map((x) => (
          <div key={x.id}>
            <h2
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr auto',
                width: '85%',
                padding: '0.5em 1em',
                margin: '0.4em auto',
              }}
            >
              {x.name} {x.location}
              <Button
                class="inline small-text"
                color="blue"
                onClick={() => {
                  setDialog('add');
                }}
              >
                <span className="material-symbols-outlined">add</span>
                {translate('add')}
              </Button>
            </h2>
            {x.data.map((e) => (
              <Panel
                onClick={() => setSelectedIDs(selectedIDs.includes(e.id) ? selectedIDs.filter((x) => x !== e.id) : [...selectedIDs, e.id])}
                style={{
                  outline: selectedIDs.includes(e.id) ? '1px solid #6bb0b3' : 'unset',
                  gridTemplateColumns: 'repeat(' + Object.keys(show[0]).length.toString() + ', 1fr) auto',
                }}
                key={e.id}
                class="inset"
              >
                {Object.keys(e).map((f) => (
                  // @ts-ignore
                  <div key={f}>{translate(e[f])}</div>
                ))}
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
              </Panel>
            ))}
          </div>
        ))}
      </div>
      <div className="d-buttons">{args.showButtons ? <BaseButtons /> : <></>}</div>
    </div>
  );
};

export default TableViewSection;
