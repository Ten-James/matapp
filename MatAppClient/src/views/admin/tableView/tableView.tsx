import React, { useEffect, useMemo, useState } from 'react';
import { textUpperFirst } from '../../../misc/utils';

import './tableView.css';

import { Button, Panel } from '../../../components/common/panel';
import { IBaseModel, FilterData } from '../../../types';
import { useAdminContext } from '../../../context/adminContext';
import { useAppContext } from '../../../context/appContext';
import { BaseButtons } from '../../../components/tableView/baseButtons';
import ParamButtons from '../../../components/tableView/paramButtons';
import { defaultFilter, MakeSort } from '../../../handlers/tableView/handlers';
import { TableViewProps } from './type';

const TableView = <T extends IBaseModel>({ data, getData, displayName, ...args }: TableViewProps<T>) => {
  const { selectedIDs, setSelectedIDs, setDialog } = useAdminContext();
  const { translate } = useAppContext();

  const [filter, setFilter] = useState<FilterData<T>>(defaultFilter);

  useEffect(() => {
    if (data.length === 0) {
      getData();
    }
    setSelectedIDs([]);
    setFilter(defaultFilter);
  }, [data]);

  const show = useMemo(() => (data?.length === 0 ? [] : data?.filter(filter.filterMatch).sort(filter.sort)), [filter, data]);

  const categories = useMemo(() => {
    if (data.length === 0) {
      return [];
    }
    if ('category' in data[0] === false) {
      return [];
    }
    const categories: string[] = data.map((e) => ('category' in e && typeof e.category === 'string' ? e.category : '')).filter((e) => e !== '');
    return [...new Set(categories)];
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
            {Object.keys(show[0]).map((e) => (
              <div key={e}>
                <div className="d-table-header-label">
                  {textUpperFirst(translate(e))}
                  <span
                    className="material-symbols-outlined d-table-header-asc"
                    onClick={() => {
                      setFilter({
                        filterMatch: filter.filterMatch,
                        //@ts-ignore
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
                        //@ts-ignore
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
        {show.map((e) => (
          <Panel
            onClick={() => setSelectedIDs(selectedIDs.includes(e.id) ? selectedIDs.filter((x) => x !== e.id) : [...selectedIDs, e.id])}
            style={{
              gridTemplateColumns: 'repeat(' + Object.keys(show[0]).length.toString() + ', 1fr) auto',
              outline: selectedIDs.includes(e.id) ? '1px solid var(--blue-color)' : 'unset',
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
      <div className="d-buttons">{args.showButtons ? <BaseButtons>{args.additionalButtons}</BaseButtons> : <></>}</div>
    </div>
  );
};

export default TableView;
