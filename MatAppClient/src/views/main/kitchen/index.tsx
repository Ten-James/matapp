import { useMainContext } from '../../../context/mainContext';

const Kitchen = () => {
  const { branchID, session } = useMainContext();

  return (
    <div>
      <h1>Kitchen</h1>
      <h2>Branch ID: {branchID}</h2>
      {session.currentOrders?.length !== 0 ? <></> : <p>No orders</p>}
    </div>
  );
};

export default Kitchen;
