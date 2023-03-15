import React from 'react';
import { Button } from '../common/panel';
import { useAdminContext } from '../../context/adminContext';
import { useAppContext } from '../../context/appContext';

interface IBaseButtonsProps {
  children?: React.ReactNode;
}

export const BaseButtons = ({ children }: IBaseButtonsProps) => {
  const { setDialog, selectedIDs, setSelectedIDs } = useAdminContext();
  const { translate } = useAppContext();
  return (
    <>
      <Button
        color="blue"
        onClick={() => setDialog('add')}
      >
        <span className="material-symbols-outlined">add</span>
        {translate('add')}
      </Button>
      <Button
        onClick={() => setDialog('edit')}
        disabled={selectedIDs.length === 0}
      >
        <span className="material-symbols-outlined">edit</span>
        {translate('edit')}
      </Button>
      <Button
        color="red"
        onClick={() => setDialog('delete')}
      >
        <span className="material-symbols-outlined">delete</span>
        {translate('delete')}
      </Button>
      <Button
        color="red"
        disabled={selectedIDs.length === 0}
        onClick={() => {
          setSelectedIDs([]);
        }}
      >
        <span className="material-symbols-outlined">clear</span>
        {translate('clear')}
      </Button>
      {children}
    </>
  );
};
