import { useEffect, useMemo, useState } from 'react';

const useStatus = () => {
  const [status, setStatus] = useState('');
  const [extraData, setExtraData] = useState('');
  const [statusTranslate, setStatusTranslate] = useState('-5em');
  const statusStyle = useMemo<React.CSSProperties>(() => {
    return { transform: `translate(-50%, ${statusTranslate})` };
  }, [statusTranslate]);
  useEffect(() => {
    const id = setTimeout(() => {
      setStatusTranslate('-5em');
    }, 10000);
    return () => clearTimeout(id);
  }, [statusTranslate]);

  const setStatusHandler = (status: string, ...data: any) => {
    setExtraData('');
    if (data.length > 0) {
      console.log(data);
      setExtraData(data[0]);
    }
    setStatus(status);
    setStatusTranslate('1em');
  };
  const onClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    setStatusTranslate('-5em');
  };
  return { status, statusStyle, setStatusHandler, onClick, extraData };
};

export default useStatus;
