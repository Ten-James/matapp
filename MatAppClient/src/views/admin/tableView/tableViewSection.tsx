import { useEffect, useMemo, useState } from 'react';
import { textUpperFirst } from '../../../misc/utils';
import ParamButtons from '../../../components/tableView/paramButtons';
import { defaultFilter, MakeSort } from '../../../handlers/tableView/handlers';

import './tableView.css';

import { Button, Panel } from '../../../components/common/panel';
import { IBranchData, INamedBaseModel, FilterData, Sort } from '../../../types';
import { BaseButtons } from '../../../components/tableView/baseButtons';
import { TableViewProps } from '.';
import { useAdminContext } from '../../../context/adminContext';
import { useAppContext } from '../../../context/appContext';

const TableViewSection = <T extends INamedBaseModel>({ data, getData, displayName, ...args }: TableViewProps<IBranchData<T>>) => {
  const { selectedIDs, setSelectedIDs, setDialog } = useAdminContext();
  const { socket, translate } = useAppContext();

  const [filter, setFilter] = useState<FilterData<T>>(defaultFilter);

  useEffect(() => {
    if (data.length === 0) {
      getData();
    }
    setSelectedIDs([]);
    setFilter(defaultFilter);
  }, [data]);

  const show = useMemo(
    () =>
      data?.length === 0
        ? []
        : data?.map((x) => {
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
        {show.length > 0 ? (
          show[0].data.length > 0 ? (
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
          ) : null
        ) : null}
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
                class="inline"
                color="blue"
                style={{ height: '2em' }}
                onClick={() => {
                  setSelectedIDs([x.id]);
                  setDialog('edit');
                }}
              >
                <span className="material-symbols-outlined">add</span>
                {translate('edit')}
              </Button>
            </h2>
            {x.data.map((e) => (
              <Panel
                style={{
                  outline: 'unset',
                  gridTemplateColumns: 'repeat(' + Object.keys(show[0]).length.toString() + ', 1fr) auto',
                }}
                key={e.id}
                class="inset"
              >
                {Object.keys(e).map((f) => (
                  // @ts-ignore
                  <div key={f}>{translate(e[f])}</div>
                ))}
                <div></div>
              </Panel>
            ))}
          </div>
        ))}
      </div>
      <div className="d-buttons">{args.showButtons ? <BaseButtons children={args?.additionalButtons} /> : <></>}</div>
    </div>
  );
};

export default TableViewSection;
