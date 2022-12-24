import { useContext } from 'react';
import { AdminContext } from '../admin';
import './style.css';
import { AddIngredient } from '../../../forms/ingredient';
import { AddUser } from '../../../forms/user';
import { AddDish } from '../../../forms/dish';
import { AddBranch } from '../../../forms/branch';

const Dialog = () => {
  const { dialog, setDialog } = useContext(AdminContext);
  if (window.location.pathname.includes('ingredients')) {
    if (dialog === 'add') return <AddIngredient />;
  }

  if (window.location.pathname.includes('users')) {
    if (dialog === 'add') return <AddUser />;
  }

  if (window.location.pathname.includes('dishes')) {
    if (dialog === 'add') return <AddDish />;
  }

  if (window.location.pathname.includes('branches')) {
    if (dialog === 'add') return <AddBranch />;
  }

  setDialog('hidden');
  return null;
};

export default Dialog;
