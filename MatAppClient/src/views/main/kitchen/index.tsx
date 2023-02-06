import { useMainContext } from '../../../context/mainContext';

const Kitchen = () => {
  const { branchID } = useMainContext();

  return (
    <div>
      <h1>Kitchen</h1>
      <h2>Branch ID: {branchID}</h2>
    </div>
  );
};

export default Kitchen;
