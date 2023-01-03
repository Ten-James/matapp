import { useContext } from 'react';
import { AdminContext } from '../admin';
import './style.css';
import { AddIngredient } from '../../../forms/ingredient';
import { AddUser } from '../../../forms/user';
import { AddDish } from '../../../forms/dish';
import { AddBranch } from '../../../forms/branch';
import DeleteDialog from '../../../forms/deleteDialog';

const Dialog = () => {
  const { dialog, setDialog, selectedIDs } = useContext(AdminContext);

  if ((dialog === 'delete' || dialog === 'edit' || dialog === 'edit_multiple') && selectedIDs.length === 0) {
    setDialog('hidden');
    return null;
  }

  if (window.location.pathname.includes('ingredients')) {
    if (dialog === 'add') return <AddIngredient />;
    if (dialog === 'delete') return <DeleteDialog sendRoute="ingredients" />;
  }

  if (window.location.pathname.includes('users')) {
    if (dialog === 'add') return <AddUser />;
    if (dialog === 'delete') return <DeleteDialog sendRoute="users" />;
  }

  if (window.location.pathname.includes('dishes')) {
    if (dialog === 'add') return <AddDish />;
    if (dialog === 'delete') return <DeleteDialog sendRoute="dishes" />;
  }

  if (window.location.pathname.includes('branches')) {
    if (dialog === 'add') return <AddBranch />;
    if (dialog === 'delete') return <DeleteDialog sendRoute="branches" />;
  }

  setDialog('hidden');
  return null;
};

export default Dialog;
