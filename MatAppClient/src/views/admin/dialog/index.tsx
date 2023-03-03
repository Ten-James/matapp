import './style.css';
import { useAdminContext } from '../../../context/adminContext';
import { EditStorage, AddIngredient, EditIngredient, DeleteDialog, AddBranch, EditBranch, AddDish, EditDish, EditDishCategoriesDialog, AddUser, ChangePasswordDialog, EditUser, ReorderDialog } from '../../../forms';

const Dialog = () => {
  const { dialog, setDialog, selectedIDs } = useAdminContext();

  //TODO add edit-multiple

  if ((dialog === 'delete' || dialog === 'edit' || dialog === 'edit_multiple') && selectedIDs.length === 0) {
    setDialog('hidden');
    return null;
  }

  if (window.location.pathname.includes('ingredients')) {
    if (dialog === 'add') return <AddIngredient />;
    if (dialog === 'delete') return <DeleteDialog sendRoute="ingredients" />;
    if (dialog === 'edit') return <EditIngredient />;
  }

  if (window.location.pathname.includes('users')) {
    if (dialog === 'add') return <AddUser />;
    if (dialog === 'other') return <ChangePasswordDialog />;
    if (dialog === 'delete') return <DeleteDialog sendRoute="users" />;
    if (dialog === 'edit') return <EditUser />;
  }

  if (window.location.pathname.includes('dishes')) {
    if (dialog === 'add') return <AddDish />;
    if (dialog === 'delete') return <DeleteDialog sendRoute="dishes" />;
    if (dialog === 'other') return <EditDishCategoriesDialog />;
    if (dialog === 'edit') return <EditDish />;
  }

  if (window.location.pathname.includes('storage')) {
    if (dialog === 'edit') return <EditStorage />;
    if (dialog === 'other') return <ReorderDialog />;
    return null;
  }

  if (window.location.pathname.includes('branches')) {
    if (dialog === 'add') return <AddBranch />;
    if (dialog === 'delete') return <DeleteDialog sendRoute="branches" />;
    if (dialog === 'edit') return <EditBranch />;
  }

  setDialog('hidden');
  return null;
};

export default Dialog;
