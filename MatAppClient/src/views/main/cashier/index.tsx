import { useMainContext } from '../../../context/mainContext';

const Cashier = () => {
  const { branchID } = useMainContext();

  return (
    <div>
      <h1>Cashier</h1>
      <h2>Branch ID: {branchID}</h2>
    </div>
  );
};

export default Cashier;
